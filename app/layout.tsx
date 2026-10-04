import type { Metadata } from 'next';
import '@fontsource-variable/montserrat/wght.css';
import './globals.css';
import './modern.css';
import { AuthProvider } from '@/contexts/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
export const metadata:Metadata={title:{default:'Zertte — химияны тәжірибе арқылы үйрен',template:'%s | Zertte'},description:'7–11 сыныптарға арналған қазақ тіліндегі интерактивті химия платформасы: сабақтар, тесттер, периодтық жүйе және виртуалды зертхана.',openGraph:{title:'Zertte',description:'Химияны түсініп, зерттеп, тәжірибе арқылы үйрен.',type:'website',locale:'kk_KZ'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="kk" data-scroll-behavior="smooth"><body><AuthProvider><Header/><main id="main-content">{children}</main><Footer/></AuthProvider></body></html>}
