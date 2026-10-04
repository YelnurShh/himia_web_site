import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { topExperiments } from '@/data/top-experiments';
import { SafetySymbol } from '@/components/safety/safety-symbol';
import styles from '../experiments.module.css';

type PageProps = { params: Promise<{ slug: string }> };
const hazardLabels = { warning: 'Сақтық', harmful: 'Зиянды зат', corrosive: 'Күйдіргіш зат', oxidizer: 'Тотықтырғыш', flammable: 'Тұтанғыш зат' };

export function generateStaticParams() {
  return topExperiments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = topExperiments.find(item => item.slug === slug);
  if (!experiment) return { title: 'Тәжірибе табылмады' };
  return { title: experiment.title, description: experiment.summary, openGraph: { title: `${experiment.title} | Zertte`, description: experiment.summary } };
}

export default async function ExperimentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experiment = topExperiments.find(item => item.slug === slug);
  if (!experiment) notFound();
  const index = topExperiments.indexOf(experiment);
  const video = experiment.video;
  const embedUrl = video?.externalOnly ? null : video?.platform === 'tiktok'
    ? `https://www.tiktok.com/player/v1/${video.id}`
    : video ? `https://www.youtube-nocookie.com/embed/${video.id}?playsinline=1` : null;

  return <>
    <section className="page-hero"><div className="container"><div className="crumbs"><Link href="/">Басты бет</Link> / <Link href="/experiments">Тәжірибелер</Link> / {experiment.title}</div><span className="eyebrow">№ {String(index + 1).padStart(2, '0')} · {experiment.category}</span><h1>{experiment.title}</h1><p>{experiment.summary}</p></div></section>
    <div className={`container section-sm ${styles.detailGrid}`}>
      <div className={styles.videoColumn}>
        {embedUrl ? <div className={styles.videoFrame}><iframe title={`${experiment.title} бейнесі`} src={embedUrl} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div> : video?.externalOnly ? <>
          <a className={styles.externalVideo} href={video.url} target="_blank" rel="noopener noreferrer" style={{ backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(8, 15, 32, .9)), url(https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg)` }} aria-label={`${experiment.title} бейнесін YouTube-та ашу`}>
            <span className={styles.externalPlay} aria-hidden="true">▶</span>
            <strong>Бейнені YouTube-та көру ↗</strong>
          </a>
          <p className={styles.externalNote}>YouTube жас шектеуіне байланысты бейне сайт ішінде ойналмайды.</p>
        </> : <div className={styles.videoMissing}><span aria-hidden="true">◌</span><strong>Бейне әлі қосылмаған</strong><p>Бұл тәжірибенің түсіндірмесі төменде берілген.</p></div>}
        {video && !video.externalOnly && <a className={styles.videoLink} href={video.url} target="_blank" rel="noopener noreferrer">Бейнені {video.platform === 'tiktok' ? 'TikTok' : 'YouTube'} сайтында ашу ↗</a>}
      </div>
      <div className={styles.detailContent}>
        <section className={styles.infoCard}><span className="eyebrow">Бақылау</span><h2>Не байқаймыз?</h2><p>{experiment.observation}</p></section>
        <section className={styles.infoCard}><span className="eyebrow">Ғылыми түсіндірме</span><h2>Неге бұлай болады?</h2><p>{experiment.explanation}</p></section>
        <section className={styles.infoCard}><span className="eyebrow">Құжаттағы заттар</span><h2>Қолданылатын заттар</h2><ul className={styles.materials}>{experiment.materials.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section className={styles.safetyCard}><div className={styles.safetyTitle}><SafetySymbol name="warning" variant="warning" size={38} /><strong>Қауіпсіздік</strong></div><div className={styles.hazardList}>{experiment.hazards.map(name => <span key={name}><SafetySymbol name={name} variant="warning" size={31} />{hazardLabels[name]}</span>)}</div><p>{experiment.safety}</p><Link href="/safety">Қауіпсіздік белгілерін көру ↗</Link></section>
        <Link className="button-link" href="/experiments">← Барлық тәжірибеге қайту</Link>
      </div>
    </div>
  </>;
}
