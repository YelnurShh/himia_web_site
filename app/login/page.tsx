import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth/auth-form';
export const metadata:Metadata={title:'Кіру',description:'Zertte жеке кабинетіне email немесе Google арқылы кіріңіз.',openGraph:{title:'Zertte — кіру',description:'Химияны үйренуді жалғастырыңыз.'}};
export default function Page(){return <AuthForm mode="login"/>}
