import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth/auth-form';
export const metadata:Metadata={title:'Тіркелу',description:'Zertte платформасына тіркеліп, химияны зерттеуді бастаңыз.',openGraph:{title:'Zertte — тіркелу',description:'Жеке оқу жолыңызды бастаңыз.'}};
export default function Page(){return <AuthForm mode="register"/>}
