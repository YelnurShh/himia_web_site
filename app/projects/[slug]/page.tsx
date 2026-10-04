import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { RemoteProject } from '@/components/projects/remote-project';
export async function generateStaticParams(){return projects.map(x=>({slug:x.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(x=>x.slug===slug);return {title:p?.title||'Ғылыми жоба',description:p?.description,openGraph:{title:p?.title||'Ғылыми жоба',description:p?.description}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <RemoteProject slug={slug}/>}
