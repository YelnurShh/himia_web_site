'use client';
import { useEffect,useState } from 'react';
import { getProjects } from '@/lib/firebase/firestore';
import type { Project } from '@/types';
import { ProjectDetail } from './project-detail';
export function RemoteProject({slug}:{slug:string}){const [project,setProject]=useState<Project|null>(null),[loading,setLoading]=useState(true);useEffect(()=>{void getProjects().then(data=>setProject(data.find(x=>x.slug===slug)||null)).finally(()=>setLoading(false));},[slug]);if(loading)return <div className="container section"><div className="loading-card">Жоба жүктелуде…</div></div>;if(!project)return <div className="container section"><div className="empty">Жоба табылмады немесе жарияланбаған.</div></div>;return <ProjectDetail initial={project}/>}
