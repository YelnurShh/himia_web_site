import type { Metadata } from 'next';
import { PeriodicTable } from '@/components/periodic-table/table';
export const metadata:Metadata={title:'Периодтық жүйе',description:'Барлық 118 химиялық элементті қазақ тілінде интерактивті түрде зерттеңіз.',openGraph:{title:'Интерактивті периодтық жүйе',description:'Химиялық элементтердің қасиеттері мен қолданылуы.'}};
export default function Page(){return <><section className="page-hero"><div className="container"><span className="eyebrow">Элементтер әлемі</span><h1>Периодтық жүйе</h1><p>Кестедегі элементті таңдаңыз: атомдық масса, топ, электрондық конфигурация және қызықты дерек бірден ашылады.</p></div></section><section className="container section-sm"><PeriodicTable/></section></>}
