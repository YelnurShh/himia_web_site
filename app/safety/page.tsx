import type { Metadata } from 'next';
import Link from 'next/link';
import { SafetySymbol, type SafetySymbolName } from '@/components/safety/safety-symbol';
import styles from './safety.module.css';

export const metadata: Metadata = {
  title: 'Зертхана қауіпсіздігі',
  description: 'Химия зертханасындағы тыйым салу, қауіп ескерту белгілері және негізгі құрал-жабдықтар.',
  openGraph: { title: 'Зертхана қауіпсіздігі | Zertte', description: 'Қауіпсіздік белгілерін және зертханалық құралдарды таныңыз.' },
};

type Item = { name: SafetySymbolName; title: string; description: string };

const prohibitions: Item[] = [
  { name: 'no-taste', title: 'Дәмін татпа', description: 'Ешбір реактивті ауызға салма және оның дәмін тексерме.' },
  { name: 'no-sink', title: 'Раковинаға төкпе', description: 'Қалдықты мұғалім көрсеткен арнайы ыдысқа жина.' },
  { name: 'no-return', title: 'Қалдықты құтыға қайтарма', description: 'Құйылып алынған реактивті бастапқы құтысына қайта салма.' },
  { name: 'no-mix', title: 'Рұқсатсыз араластырма', description: 'Заттарды тек мұғалім берген нұсқаулық бойынша қолдан.' },
  { name: 'no-open-bottle', title: 'Құтыны ашық қалдырма', description: 'Реактив ыдысының қақпағын қолданған соң жап.' },
  { name: 'no-sniff', title: 'Тікелей иіскеме', description: 'Бу мен газды ыдысқа жақындап тұрып иіскеуге болмайды.' },
];

const warnings: Item[] = [
  { name: 'warning', title: 'Жалпы сақтық', description: 'Жұмысты бастар алдында мұғалімнің нұсқауын оқы.' },
  { name: 'harmful', title: 'Зиянды зат', description: 'Теріге, көзге немесе тыныс жолына әсер етуі мүмкін.' },
  { name: 'corrosive', title: 'Күйдіргіш зат', description: 'Тері мен көзді зақымдауы мүмкін; қорғаныш құралдарын пайдалан.' },
  { name: 'toxic', title: 'Улы зат', description: 'Мұндай затпен тек маманның бақылауымен жұмыс істейді.' },
  { name: 'oxidizer', title: 'Күшті тотықтырғыш', description: 'Жануды күшейтуі мүмкін; жанғыш заттардан алыс ұста.' },
  { name: 'explosive', title: 'Жарылыс қаупі', description: 'Жылу мен соққыға сезімтал зат немесе жағдай болуы мүмкін.' },
  { name: 'radiation', title: 'Сәулелену қаупі', description: 'Арнайы рұқсат пен қорғаныс талап етілетін аймақ.' },
  { name: 'flammable', title: 'Тұтанғыш зат', description: 'Ашық оттан және қыздыру көзінен алыс ұста.' },
  { name: 'electric', title: 'Электр қаупі', description: 'Құрылғыны мұғалімнің рұқсатынсыз ашпа немесе жөндеме.' },
];

const equipment: Item[] = [
  { name: 'test-tube', title: 'Сынауық', description: 'Аз мөлшердегі заттарды бақылауға арналған.' },
  { name: 'spatula', title: 'Шпатель', description: 'Қатты реактивтің аз мөлшерін алуға арналған.' },
  { name: 'beaker', title: 'Химиялық стақан', description: 'Ерітінділерді араластыруға арналған ыдыс.' },
  { name: 'test-tube-holder', title: 'Сынауық қысқышы', description: 'Сынауықты қол тигізбей ұстайды.' },
  { name: 'flask', title: 'Колба', description: 'Ерітінді дайындауға және сақтауға арналған.' },
  { name: 'round-flask', title: 'Домалақ түпті колба', description: 'Қыздыру мен реакцияларды бақылауға арналған.' },
  { name: 'cylinder', title: 'Өлшеуіш цилиндр', description: 'Сұйықтық көлемін өлшейді.' },
  { name: 'dropper', title: 'Тамшуыр', description: 'Сұйықтықты тамшылатып алуға көмектеседі.' },
  { name: 'reagent-bottle', title: 'Реактив құтысы', description: 'Реактивтерді таңбаланған күйде сақтайды.' },
  { name: 'glass-rod', title: 'Шыны таяқша', description: 'Ерітінділерді араластыруға арналған.' },
  { name: 'funnel', title: 'Құйғы', description: 'Сұйықтықты құюға немесе сүзуге арналған.' },
  { name: 'crucible', title: 'Тигель', description: 'Жоғары температурада қыздыруға арналған ыдыс.' },
  { name: 'rack', title: 'Сынауық тұрғысы', description: 'Сынауықтарды тік орналастырады.' },
  { name: 'spot-plate', title: 'Тамшы табақшасы', description: 'Аз мөлшердегі реакцияларды қатар бақылауға болады.' },
  { name: 'mortar', title: 'Келі мен келсап', description: 'Қатты заттарды ұнтақтауға арналған.' },
  { name: 'separatory-funnel', title: 'Бөлгіш құйғы', description: 'Араласпайтын сұйықтықтарды ажыратады.' },
  { name: 'stand', title: 'Зертханалық штатив', description: 'Құралдарды бекітіп ұстайды.' },
  { name: 'gas-generator', title: 'Газ генераторы', description: 'Зертханалық газ алу қондырғысының үлгісі.' },
  { name: 'burette', title: 'Бюретка', description: 'Сұйықтықты дәл көлеммен жібереді.' },
  { name: 'distilling-flask', title: 'Айдау колбасы', description: 'Бу өткізетін бүйір түтігі бар колба.' },
  { name: 'tongs', title: 'Қысқыш', description: 'Ыстық ыдысты ұстауға көмектеседі.' },
  { name: 'dish', title: 'Буландыру табақшасы', description: 'Ерітіндіні буландыруға арналған.' },
];

function SymbolGrid({ items, variant }: { items: Item[]; variant: 'prohibition' | 'warning' | 'equipment' }) {
  return <div className={styles.grid}>{items.map(item => <article className={styles.card} key={item.name}>
    <div className={styles.symbol}><SafetySymbol name={item.name} variant={variant} /></div>
    <h3>{item.title}</h3><p>{item.description}</p>
  </article>)}</div>;
}

export default function SafetyPage() {
  return <>
    <section className="page-hero"><div className="container"><span className="eyebrow">Зертханаға кірмес бұрын</span><h1>Қауіпсіздік белгілері</h1><p>Тыйым салу және қауіп ескерту белгілерінің мағынасын, сондай-ақ негізгі зертханалық құралдардың атауын үйрен.</p></div></section>
    <div className="container section-sm">
      <div className={styles.note}><strong>Есте сақта</strong><p>Бұл суреттер оқу үшін берілген. Нақты химиялық заттың қаупін оның қаптамасындағы таңбадан және қауіпсіздік парағынан тексер. Тәжірибені мұғалімнің нұсқауынсыз бастама.</p></div>
      <section className={styles.section}><div className={styles.heading}><span className="eyebrow">Қызыл шеңбер</span><h2>Не істеуге болмайды?</h2><p>Тыйым салу белгілері зертханада жиі кездесетін қате әрекеттерді еске салады.</p></div><SymbolGrid items={prohibitions} variant="prohibition" /></section>
      <section className={styles.section}><div className={styles.heading}><span className="eyebrow">Сары үшбұрыш</span><h2>Қауіп туралы ескертулер</h2><p>Белгінің атауын ғана емес, жанындағы нұсқаулықты да оқы.</p></div><SymbolGrid items={warnings} variant="warning" /></section>
      <section className={styles.section}><div className={styles.heading}><span className="eyebrow">Құрал-жабдықтар</span><h2>Зертхана құралдарын таны</h2><p>Құралдардың сызбасын қарап, атауы мен қызметін есте сақта.</p></div><SymbolGrid items={equipment} variant="equipment" /></section>
      <div className={styles.backLinks}><Link className="button" href="/experiments">Тәжірибелерге өту</Link><Link className="button button-outline" href="/lab">Виртуалды зертхана</Link></div>
    </div>
  </>;
}
