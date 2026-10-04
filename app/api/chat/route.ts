type ChatMessage = { role: 'user' | 'assistant'; content: string };

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
const MAX_BODY_BYTES = 32_000;
const MAX_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 2_000;
const RATE_LIMIT = 12;
const WINDOW_MS = 60_000;
const requests = new Map<string, { count: number; resetAt: number }>();

const SYSTEM_PROMPT = `Сен Zertte платформасының қазақ тіліндегі химия көмекшісісің. 7–11 сынып оқушыларына ұғымдарды қарапайым тілмен, нақты мысалдармен түсіндір. Жауапты әдетте 2–5 қысқа абзацпен бер. Қажет болса формула мен реакция теңдеуін дұрыс жаз. Формулаларды кәдімгі мәтінмен және Unicode төменгі/жоғарғы сандарымен жаз: H₂O, H₂SO₄, CO₂, Na⁺, SO₄²⁻, 2H₂ + O₂ → 2H₂O. LaTeX, доллар таңбалары, кері қиғаш сызықты командалар және Markdown таңбаларын қолданба. Белгісіз нәрсені ойдан шығарма; сенімсіз болсаң, ашық айт. Қауіпті заттар мен тәжірибелер туралы сұрақтарға қауіпсіздікке мән беріп жауап бер. Пайдаланушы басқа тілде сұраса да, әдепкіде қазақша жауап бер.`;

function jsonError(error: string, status: number, headers?: HeadersInit) {
  return Response.json({ error }, { status, headers });
}

async function readLimitedBody(request: Request) {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let body = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error('BODY_TOO_LARGE');
    }
    body += decoder.decode(value, { stream: true });
  }
  return body + decoder.decode();
}

function validMessages(value: unknown): value is ChatMessage[] {
  return Array.isArray(value) && value.length > 0 && value.length <= MAX_MESSAGES &&
    value.every(message => message && typeof message === 'object' &&
      (message.role === 'user' || message.role === 'assistant') &&
      typeof message.content === 'string' && message.content.trim().length > 0 &&
      message.content.length <= MAX_MESSAGE_LENGTH) &&
    value.at(-1)?.role === 'user';
}

function withinRateLimit(request: Request) {
  const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || entry.resetAt <= now) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return 0;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT ? Math.ceil((entry.resetAt - now) / 1000) : 0;
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return jsonError('ЖИ чат әлі бапталмаған. GROQ_API_KEY қосыңыз.', 503);

  let payload: unknown;
  try {
    payload = JSON.parse(await readLimitedBody(request));
  } catch (error) {
    return error instanceof Error && error.message === 'BODY_TOO_LARGE'
      ? jsonError('Хабарлама көлемі тым үлкен.', 413)
      : jsonError('Сұрау пішімі қате.', 400);
  }

  const messages = (payload as { messages?: unknown })?.messages;
  if (!validMessages(messages)) return jsonError('Хабарламаларды тексеріңіз.', 400);
  const retryAfter = withinRateLimit(request);
  if (retryAfter) return jsonError('Бір минуттағы сұрау шегі толды. Сәлден кейін қайталаңыз.', 429, { 'Retry-After': String(retryAfter) });

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        reasoning_effort: 'low',
        reasoning_format: 'hidden',
        max_completion_tokens: 1800,
        temperature: 0.45,
      }),
      signal: request.signal,
      cache: 'no-store',
    });
  } catch {
    return jsonError('ЖИ сервисіне қосылу мүмкін болмады. Қайта байқап көріңіз.', 502);
  }

  if (!upstream.ok || !upstream.body) {
    if (upstream.status === 429) {
      const retryAfter = upstream.headers.get('retry-after');
      return jsonError('Groq лимиті уақытша толды. Сәлден кейін қайталаңыз.', 429, retryAfter ? { 'Retry-After': retryAfter } : undefined);
    }
    if (upstream.status === 401 || upstream.status === 403) return jsonError('Groq API кілтін тексеріңіз.', 502);
    return jsonError('ЖИ сервисі қазір жауап бере алмады.', 502);
  }

  return new Response(upstream.body, {
    headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache, no-transform', 'X-Accel-Buffering': 'no' },
  });
}
