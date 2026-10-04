import type { Metadata } from 'next';
import { TeacherPanel } from '@/components/auth/teacher-panel';
export const metadata:Metadata={title:'Мұғалім панелі',description:'Оқушы прогресін және оқу мазмұнын басқаруға арналған мұғалім кеңістігі.',openGraph:{title:'Zertte — мұғалім панелі',description:'Оқу үдерісін басқару.'}};
export default function Page(){return <TeacherPanel/>}
