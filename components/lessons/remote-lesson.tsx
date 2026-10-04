'use client';
import { useEffect,useState } from 'react';
import { getLesson } from '@/lib/firebase/firestore';
import type { Lesson } from '@/types';
import { LessonDetail } from './lesson-detail';
export function RemoteLesson({slug}:{slug:string}){const [lesson,setLesson]=useState<Lesson|null>(null),[loading,setLoading]=useState(true);useEffect(()=>{void getLesson(slug).then(setLesson).finally(()=>setLoading(false));},[slug]);if(loading)return <div className="container section"><div className="loading-card">Сабақ жүктелуде…</div></div>;if(!lesson)return <div className="container section"><div className="empty">Сабақ табылмады немесе жарияланбаған.</div></div>;return <LessonDetail initial={lesson}/>}
