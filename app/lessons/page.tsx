import type { Metadata } from 'next';
import { LessonCatalog } from '@/components/lessons/catalog';
export const metadata:Metadata={title:'Сабақтар',description:'7–11 сыныптарға арналған 15 толық химия сабағын іздеп, оқып, тесттен өтіңіз.',openGraph:{title:'Zertte сабақтары',description:'Қазақ тіліндегі интерактивті химия сабақтары.'}};
export default function LessonsPage(){return <><section className="page-hero"><div className="container"><span className="eyebrow">Білім қоры</span><h1>Химия сабақтары</h1><p>Қызығушылығыңа сай тақырыпты таңда. Әр сабақта теория, сәйкестендіру тапсырмасы және бес сұрақтық тест бар.</p></div></section><section className="container section-sm"><LessonCatalog/></section></>}
