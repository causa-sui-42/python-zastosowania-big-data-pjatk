import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { PLAN_STACJONARNE } from '../../data/schedule';
import { getClosestLectureLink } from '../../utils/scheduleUtils';
import styles from '../zaoczne/index.module.css';

type Feature = {
  emoji: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

const FEATURES: Feature[] = [
  {
    emoji: '📖',
    title: 'Wykłady',
    description:
      '12 wykładów — od statystyki i formatów danych, przez Hadoop, Spark SQL i MLlib, po Cloud Computing i streaming.',
    href: '/stacjonarne/materialy/wyklady',
    cta: 'Przeglądaj wykłady',
  },
  {
    emoji: '🧪',
    title: 'Ćwiczenia',
    description:
      '12 praktycznych laboratoriów — od EDA i Parquet, przez PySpark i MLlib, po BigQuery i Structured Streaming. Pobierz notebooki i uruchom w Google Colab.',
    href: '/stacjonarne/materialy/cwiczenia',
    cta: 'Otwórz ćwiczenia',
  },
  {
    emoji: '📝',
    title: 'Zadania domowe',
    description:
      'Nieobowiązkowe i nieoceniane zadania do samodzielnej praktyki po każdych zajęciach — najlepsze przygotowanie do egzaminu i projektu.',
    href: '/stacjonarne/materialy/zadania-domowe',
    cta: 'Zobacz zadania',
  },
  {
    emoji: '🎓',
    title: 'Projekt zaliczeniowy',
    description:
      'Indywidualny projekt Big Data — 30% oceny końcowej. Wymagania, terminy i przykładowy notebook demonstracyjny.',
    href: '/stacjonarne/materialy/projekt-zaliczeniowy',
    cta: 'Zobacz wymagania',
  },
  {
    emoji: '📝',
    title: 'Egzamin teoretyczny',
    description:
      'Ostatnie zajęcia (19.01.2027) — egzamin teoretyczny, 70% oceny. Przewodnik do nauki i przykładowe pytania.',
    href: '/stacjonarne/materialy/egzamin',
    cta: 'Przygotuj się',
  },
  {
    emoji: '📅',
    title: 'Plan zajęć',
    description:
      'Harmonogram semestru zimowego 2026/2027 — 12 cotygodniowych zajęć (wykład + ćwiczenia) we wtorki oraz egzamin i obrona projektu.',
    href: '/stacjonarne/plan-zajec',
    cta: 'Zobacz plan',
  },
  {
    emoji: 'ℹ️',
    title: 'O kursie',
    description:
      'Informacje o kursie, wymaganiach wstępnych, zasadach zaliczenia (egzamin 70% + projekt 30% + bonus 10% za aktywność) i kontakcie do prowadzącego.',
    href: '/stacjonarne/o-kursie',
    cta: 'Poznaj kurs',
  },
];

function FeatureCard({ emoji, title, description, href, cta }: Feature): ReactNode {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Link to={href} className={styles.featureCard}>
        <div className={styles.featureEmoji}>{emoji}</div>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
        <span className={styles.featureCta}>{cta} →</span>
      </Link>
    </div>
  );
}

export default function StacjonarneHome(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Studia stacjonarne`}
      description="Kurs akademicki Python w Zastosowaniach Big Data — PJATK, tor stacjonarny. Wykłady, ćwiczenia i harmonogram."
    >
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>🎓 PJATK — Studia stacjonarne — Semestr zimowy 2026/2027</div>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroTagline}>
              Poznaj świat <strong>Big Data</strong> przez pryzmat Pythona —
              od Hadoopa i Sparka po analizę w chmurze.{' '}
              <em>Praktycznie, z kodem i bez nudy.</em>
            </p>
            <div className={styles.heroButtons}>
              <Link
                className={clsx('button button--lg', styles.btnPrimary)}
                to={getClosestLectureLink(PLAN_STACJONARNE, '/stacjonarne/materialy/wyklady')}
              >
                📖 Zacznij od wykładu
              </Link>
              <Link className={clsx('button button--lg', styles.btnSecondary)} to="/stacjonarne/materialy/zadania-domowe">
                📝 Zadania domowe
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}><span className={styles.statNum}>12</span><span className={styles.statLabel}>Wykładów</span></div>
              <div className={styles.statDivider} />
              <div className={styles.stat}><span className={styles.statNum}>12</span><span className={styles.statLabel}>Laboratoriów</span></div>
              <div className={styles.statDivider} />
              <div className={styles.stat}><span className={styles.statNum}>13</span><span className={styles.statLabel}>Zajęć (wtorki)</span></div>
              <div className={styles.statDivider} />
              <div className={styles.stat}><span className={styles.statNum}>100%</span><span className={styles.statLabel}>Colab-ready</span></div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <Heading as="h2" className={styles.featuresHeading}>
              Co znajdziesz na tej stronie?
            </Heading>
            <div className="row">
              {FEATURES.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>
              🃏 <Link to="/fiszki">Fiszki</Link> i 🔗{' '}
              <Link to="/zasoby">materiały dodatkowe</Link> są wspólne z torem{' '}
              <Link to="/zaoczne">zaocznym</Link>.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

