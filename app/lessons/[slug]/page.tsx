import type { Metadata } from 'next';
import { lessons } from '@/data/lessons';
import { RemoteLesson } from '@/components/lessons/remote-lesson';
export async function generateStaticParams(){return lessons.map(x=>({slug:x.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const l=lessons.find(x=>x.slug===slug);return {title:l?.title||'Сабақ',description:l?.description,openGraph:{title:l?.title||'Химия сабағы',description:l?.description}};}
export default async function LessonPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <RemoteLesson slug={slug}/>}
