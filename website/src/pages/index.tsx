import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { PLAN_ZAOCZNE } from '../data/schedule';
import { getClosestLectureLink } from '../utils/scheduleUtils';

import styles from './index.module.css';

/* ---- Feature card data ---- */
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
      'Slajdy i materiały z każdego wykładu — od podstaw Hadoop przez Apache Spark po architekturę Big Data w chmurze.',
    href: '/materialy/wyklady',
    cta: 'Przeglądaj wykłady',
  },
  {
    emoji: '🧪',
    title: 'Ćwiczenia',
    description:
      'Praktyczne laboratoria z PySpark, BigQuery i więcej. Pobierz notebooki i uruchom je w Google Colab.',
    href: '/materialy/cwiczenia',
    cta: 'Otwórz ćwiczenia',
  },
  {
    emoji: '📝',
    title: 'Zadania domowe',
    description:
      'Nieobowiązkowe zadania domowe, które pomogą Ci utrwalić materiał i przygotować się do laboratoriów.',
    href: '/materialy/zadania-domowe',
    cta: 'Zobacz zadania',
  },
  {
    emoji: '🃏',
    title: 'Fiszki',
    description:
      'Interaktywne fiszki do powtórki kluczowych pojęć z Hadoop, Spark i Pythona — idealne przed egzaminem.',
    href: '/fiszki',
    cta: 'Ucz się z fiszkami',
  },
  {
    emoji: '🔗',
    title: 'Materiały',
    description:
      'Polecane książki, cheat sheety, linki do dokumentacji i zasoby do samodzielnego pogłębiania wiedzy.',
    href: '/materialy/zasoby',
    cta: 'Znajdź zasoby',
  },
  {
    emoji: '📅',
    title: 'Plan zajęć',
    description:
      'Harmonogram semestru — tematy wykładów, terminy lab i ważne daty (kolokwia, oddawanie projektów).',
    href: '/plan-zajec',
    cta: 'Zobacz plan',
  },
  {
    emoji: 'ℹ️',
    title: 'O kursie',
    description:
      'Informacje o kursie, wymaganiach wstępnych, zasadach zaliczenia i kontakcie do prowadzącego.',
    href: '/o-kursie',
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

function Hero(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>🎓 PJATK — Semestr letni 2025/2026</div>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroTagline}>
            Poznaj świat <strong>Big Data</strong> przez pryzmat Pythona —
            od Hadoopa i Sparka po analizę w chmurze.{' '}
            <em>Praktycznie, z kodem i bez nudy.</em>
          </p>
          <div className={styles.heroButtons}>
            <Link className={clsx('button button--lg', styles.btnPrimary)} to={getClosestLectureLink(PLAN_ZAOCZNE)}>
              📖 Zacznij od wykładu
            </Link>
            <Link className={clsx('button button--lg', styles.btnSecondary)} to="/materialy/zadania-domowe">
              📝 Zadania domowe
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}><span className={styles.statNum}>7</span><span className={styles.statLabel}>Wykładów</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><span className={styles.statNum}>7</span><span className={styles.statLabel}>Laboratoriów</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><span className={styles.statNum}>40+</span><span className={styles.statLabel}>Fiszek</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><span className={styles.statNum}>100%</span><span className={styles.statLabel}>Colab-ready</span></div>
          </div>
        </div>
      </div>
    </header>
  );
}

function TechStack(): ReactNode {
  const techs = ['Python 3.10+', 'Apache Spark', 'Hadoop', 'PySpark', 'Kafka', 'BigQuery', 'GCP', 'pandas'];
  return (
    <section className={styles.techStack}>
      <div className="container">
        <p className={styles.techLabel}>Technologie omawiane na kursie</p>
        <div className={styles.techPills}>
          {techs.map((t) => (
            <span key={t} className={styles.techPill}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Kurs akademicki Python w Zastosowaniach Big Data — PJATK. Wykłady, ćwiczenia Colab, fiszki i materiały."
    >
      <Hero />
      <TechStack />
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
          </div>
        </section>
      </main>
    </Layout>
  );
}
