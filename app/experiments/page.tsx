import type { Metadata } from 'next';
import Link from 'next/link';
import { SafetySymbol } from '@/components/safety/safety-symbol';
import { topExperiments } from '@/data/top-experiments';
import styles from './experiments.module.css';

export const metadata: Metadata = {
  title: 'Тәжірибелер',
  description: 'Химиядағы 10 көрнекі тәжірибе: бақылау, түсіндірме, қауіпсіздік және бейне.',
  openGraph: { title: 'Zertte тәжірибелері', description: 'Химиялық құбылыстарды 10 тәжірибе арқылы таныңыз.' },
};

export default function ExperimentsPage() {
  return <>
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">Көр де, түсін</span>
        <h1>Тәжірибелер</h1>
        <p>Бертаева Мақпалдың «Химиядағы топ 10 тәжірибе» кітапшасы бойынша жасалған топтама. Әр тәжірибені ашып, не байқалатынын және оның ғылыми себебін оқы.</p>
        <div className={styles.heroFacts}><span>{topExperiments.length} тәжірибе</span><span>{topExperiments.filter(item => item.video).length} бейне</span><span>Түсінікті химия</span></div>
      </div>
    </section>
    <section className={`container ${styles.safetyTeaser}`} aria-label="Зертхана қауіпсіздігі">
      <div className={styles.safetyTeaserIcons} aria-hidden="true"><SafetySymbol name="no-taste" variant="prohibition" size={54} /><SafetySymbol name="corrosive" variant="warning" size={54} /><SafetySymbol name="flammable" variant="warning" size={54} /></div>
      <div><span className="eyebrow">Алдымен қауіпсіздік</span><h2>Белгілерді танып ал</h2><p>Тыйым салу және қауіп ескерту таңбаларының мағынасын тәжірибені көрмей тұрып оқы.</p></div>
      <Link className="button button-outline" href="/safety">Белгілерді қарау <span aria-hidden="true">↗</span></Link>
    </section>
    <section className="container section-sm" aria-label="Тәжірибелер тізімі">
      <div className={styles.intro}><div><span className="eyebrow">Топ 10</span><h2>Құбылысты өз көзіңмен көр</h2></div><p>Көрсетілімдерде қолданылатын кейбір реактивтер мен ашық жалын қауіпті. Қауіпсіздік ескертулерін міндетті түрде оқы.</p></div>
      <div className={styles.grid}>
        {topExperiments.map((experiment, index) => <Link className={styles.card} href={`/experiments/${experiment.slug}`} key={experiment.slug}>
          <div className={`${styles.cardVisual} ${styles[experiment.accent]}`} aria-hidden="true"><span className={styles.bigNumber}>{String(index + 1).padStart(2, '0')}</span><span className={styles.bubbleOne}/><span className={styles.bubbleTwo}/><span className={styles.bubbleThree}/></div>
          <div className={styles.cardBody}><div className={styles.cardMeta}><span>{experiment.category}</span><span>{experiment.video?.externalOnly ? '↗ YouTube-та көру' : experiment.video ? '▶ Бейне бар' : 'Оқу материалы'}</span></div><h3>{experiment.title}</h3><p>{experiment.summary}</p><span className="button-link">Тәжірибені ашу <span aria-hidden="true">↗</span></span></div>
        </Link>)}
      </div>
    </section>
  </>;
}
