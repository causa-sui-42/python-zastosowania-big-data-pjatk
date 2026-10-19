import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './index.module.css';

type Track = {
  emoji: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  cta: string;
  available: boolean;
};

const TRACKS: Track[] = [
  {
    emoji: '🌙',
    title: 'Studia zaoczne',
    description:
      'Kurs w formie 8 niedzielnych zjazdów — wykład i ćwiczenia w jednym dniu. Wykłady, laboratoria na Colab, zadania domowe i projekt zaliczeniowy.',
    meta: 'Semestr letni 2025/2026 · 8 zjazdów',
    href: '/zaoczne',
    cta: 'Wejdź do materiałów',
    available: true,
  },
  {
    emoji: '☀️',
    title: 'Studia stacjonarne',
    description:
      'Kurs w formie cotygodniowych zajęć we wtorki — 12 wykładów i 12 ćwiczeń (wykład i ćwiczenia na każdych zajęciach). Ostatnie, 13. zajęcia to egzamin teoretyczny i obrona projektu.',
    meta: 'Semestr zimowy 2026/2027 · 12 wykładów + 12 ćwiczeń (wtorki)',
    href: '/stacjonarne',
    cta: 'Wejdź do materiałów',
    available: true,
  },
];

function TrackCard({ emoji, title, description, meta, href, cta, available }: Track): ReactNode {
  return (
    <Link to={href} className={clsx(styles.trackCard, !available && styles.trackCardSoon)}>
      {!available && <span className={styles.soonBadge}>Wkrótce</span>}
      <div className={styles.trackEmoji}>{emoji}</div>
      <Heading as="h2" className={styles.trackTitle}>{title}</Heading>
      <p className={styles.trackDesc}>{description}</p>
      <p className={styles.trackMeta}>{meta}</p>
      <span className={styles.trackCta}>{cta} →</span>
    </Link>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Kurs akademicki Python w Zastosowaniach Big Data — PJATK. Wybierz swój tryb studiów: zaoczne lub stacjonarne."
    >
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <div className={styles.heroBadge}>🎓 PJATK</div>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroTagline}>
            Poznaj świat <strong>Big Data</strong> przez pryzmat Pythona —
            od Hadoopa i Sparka po analizę w chmurze.
          </p>
          <p className={styles.heroSubtitle}>Wybierz swój tryb studiów, aby zobaczyć wykłady, ćwiczenia i harmonogram:</p>
        </div>
      </header>
      <main>
        <section className={styles.tracks}>
          <div className="container">
            <div className={styles.trackGrid}>
              {TRACKS.map((t) => (
                <TrackCard key={t.title} {...t} />
              ))}
            </div>
            <p className={styles.footNote}>
              🃏 <Link to="/fiszki">Fiszki</Link> i 🔗{' '}
              <Link to="/zasoby">materiały dodatkowe</Link> są wspólne dla obu trybów studiów.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
