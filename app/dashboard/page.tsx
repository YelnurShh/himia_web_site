import type { Metadata } from 'next';
import { Dashboard } from '@/components/auth/dashboard';
export const metadata:Metadata={title:'Оқушы кабинеті',description:'Сабақ, тест, зертхана және жоба прогресін бақылаңыз.',openGraph:{title:'Zertte — жеке кабинет',description:'Жеке оқу прогресі.'}};
export default function Page(){return <Dashboard/>}
