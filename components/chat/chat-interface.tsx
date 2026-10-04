'use client';

import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/icons';
import { formatChemistryText } from '@/lib/chat/format-chemistry';

type Message = { id: string; role: 'user' | 'assistant'; content: string };
type WireMessage = Pick<Message, 'role' | 'content'>;

const suggestions = [
  'Атом мен молекуланың айырмасы қандай?',
  'pH шкаласын қарапайым тілмен түсіндір',
  'Химиялық теңдеуді қалай теңестіремін?',
];

function eventContent(event: string) {
  const data = event.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
  if (!data || data === '[DONE]') return '';
  try {
    const json = JSON.parse(data) as { choices?: { delta?: { content?: string } }[] };
    return json.choices?.[0]?.delta?.content || '';
  } catch {
    return '';
  }
}

function answerText(content: string) {
  return formatChemistryText(content).split('\n').map((line, index) => <Fragment key={index}>
    {index > 0 ? '\n' : null}
    {/[→⇌↔=]/.test(line) && line.trim().length <= 90 ? <span className="chat-equation">{line}</span> : line}
  </Fragment>);
}

export function ChatInterface({ configured, model }: { configured: boolean; model: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const controllerRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);
  useEffect(() => () => controllerRef.current?.abort(), []);

  async function send(question: string) {
    const text = question.trim();
    if (!text || busy || controllerRef.current || !configured) return;
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    const answerId = crypto.randomUUID();
    const history: WireMessage[] = [...messages, userMessage].slice(-16).map(({ role, content }) => ({ role, content: role === 'assistant' ? formatChemistryText(content) : content }));
    const controller = new AbortController();
    controllerRef.current = controller;
    setDraft('');
    setError('');
    setBusy(true);
    setMessages(previous => [...previous, userMessage, { id: answerId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(result?.error || 'Жауап алу мүмкін болмады.');
      }
      if (!response.body) throw new Error('Жауап ағыны ашылмады.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let received = false;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.replace(/\r\n/g, '\n').split('\n\n');
        buffer = events.pop() || '';
        for (const event of events) {
          const content = eventContent(event);
          if (!content) continue;
          received = true;
          setMessages(previous => previous.map(message => message.id === answerId
            ? { ...message, content: message.content + content } : message));
        }
      }
      if (!received && !controller.signal.aborted) throw new Error('Бос жауап келді. Қайта байқап көріңіз.');
    } catch (caught) {
      if (!controller.signal.aborted) {
        setError(caught instanceof Error ? caught.message : 'Белгісіз қате болды.');
      }
      setMessages(previous => previous.filter(message => message.id !== answerId || message.content.length > 0));
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null;
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  return <div className="chat-page">
    <div className="container chat-layout">
      <aside className="chat-sidebar">
        <span className="eyebrow">ЖИ КӨМЕКШІ</span>
        <h1>Химияны сұрап түсін.</h1>
        <p>Күрделі тақырыпты қарапайым тілмен түсіндіріп, есептің шешу жолын табуға көмектеседі.</p>
        <div className="chat-suggestions">
          <strong>Мына сұрақтан баста</strong>
          {suggestions.map(suggestion => <button key={suggestion} type="button" onClick={() => void send(suggestion)} disabled={busy || !configured}>
            <span>{suggestion}</span><span aria-hidden="true">↗</span>
          </button>)}
        </div>
        <div className="chat-sidebar-note"><Icon name="spark" size={20}/><span>7–11 сынып химиясына арналған қазақша көмекші</span></div>
      </aside>

      <section className="chat-panel" aria-label="ЖИ чат">
        <div className="chat-panel-header"><div className="chat-assistant-avatar"><Icon name="spark" size={21}/></div><div><strong>Химия көмекшісі</strong><span>Groq · {model === 'openai/gpt-oss-20b' ? 'GPT-OSS 20B' : model === 'openai/gpt-oss-120b' ? 'GPT-OSS 120B' : model}</span></div>{messages.length > 0 && <button className="chat-clear" type="button" onClick={() => { controllerRef.current?.abort(); setMessages([]); setError(''); }} aria-label="Чатты тазарту">Жаңа чат</button>}</div>
        <div className="chat-messages" role="log" aria-label="Хабарламалар">
          {messages.length === 0 && <div className="chat-welcome"><div className="chat-welcome-icon"><Icon name="atom" size={32}/></div><h2>Сәлем! Қандай сұрағың бар?</h2><p>Элементтер, реакциялар, формулалар немесе есептер туралы сұрай бер.</p><div className="chat-formula-example">{formatChemistryText('2H2 + O2 -> 2H2O')}</div></div>}
          {messages.map(message => <div className={`chat-message ${message.role}`} key={message.id}>
            {message.role === 'assistant' && <div className="chat-message-avatar" aria-hidden="true"><Icon name="spark" size={16}/></div>}
            <div className="chat-bubble">{message.content ? (message.role === 'assistant' ? answerText(message.content) : message.content) : <span className="chat-thinking">Жауап дайындалып жатыр<span className="chat-dots">…</span></span>}</div>
          </div>)}
          <div ref={bottomRef}/>
        </div>
        <div className="chat-composer-wrap">
          {!configured && <p className="chat-error" role="alert">Чатты қосу үшін серверге GROQ_API_KEY енгізіңіз.</p>}
          {error && <p className="chat-error" role="alert">{error}</p>}
          <form className="chat-composer" onSubmit={submit}>
            <label className="sr-only" htmlFor="chat-question">Химия туралы сұрағыңыз</label>
            <textarea id="chat-question" value={draft} maxLength={2000} placeholder="Химия туралы сұрағыңды жаз…" disabled={!configured} rows={2} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void send(draft); } }}/>
            {busy ? <button className="chat-send chat-stop" type="button" onClick={() => controllerRef.current?.abort()} aria-label="Жауапты тоқтату">■</button>
              : <button className="chat-send" type="submit" disabled={!draft.trim() || !configured} aria-label="Сұрақты жіберу"><Icon name="arrow" size={19}/></button>}
          </form>
          <p className="chat-privacy">Enter — жіберу · Shift+Enter — жаңа жол. Сұрақ Groq сервисіне жіберіледі, жеке дерек жазбаңыз. Жауапты маңызды ақпарат үшін тексеріңіз.</p>
        </div>
      </section>
    </div>
  </div>;
}
