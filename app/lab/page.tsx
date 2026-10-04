import type { Metadata } from 'next';
import { LabSimulator } from '@/components/lab/lab-simulator';
import Link from 'next/link';
export const metadata:Metadata={title:'Виртуалды зертхана',description:'Алты қауіпсіз виртуалды химиялық тәжірибеде реагенттерді таңдап, реакцияны бақылаңыз.',openGraph:{title:'Zertte зертханасы',description:'Химиялық реакцияларды қауіпсіз симуляцияда зерттеңіз.'}};
export default function Page(){return <><section className="page-hero"><div className="container"><span className="eyebrow">Қауіпсіз зерттеу кеңістігі</span><h1>Виртуалды зертхана</h1><p>Реагенттерді таңда, нәтижесін бақыла және реакцияның себебін түсін. Бұл — оқу симуляциясы; қауіпті тәжірибелерді үйде қайталама.</p><Link className="button button-outline" href="/safety">Қауіпсіздік белгілерін қарау ↗</Link></div></section><section className="container section-sm"><LabSimulator/></section></>}
