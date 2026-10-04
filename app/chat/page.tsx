import type { Metadata } from 'next';
import { ChatInterface } from '@/components/chat/chat-interface';
import './chat.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'ЖИ химия көмекшісі',
  description: 'Химия туралы сұрақ қойып, қазақ тілінде түсінікті жауап алыңыз.',
};

export default function ChatPage() {
  return <ChatInterface configured={Boolean(process.env.GROQ_API_KEY)} model={process.env.GROQ_MODEL || 'openai/gpt-oss-20b'} />;
}
