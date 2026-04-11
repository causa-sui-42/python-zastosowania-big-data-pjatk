import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './plan-zajec.module.css';

type Zajecia = {
  zjazd: number;
  data: string;
  wyklad: string;
  wykladMaterialy?: string;
  wykladHref?: string;
  lab: string;
  labMaterialy?: string;
  labHref?: string;
  zadanieDomowe?: string;
  zadanieHref?: string;
};

const PLAN_ZAOCZNE: Zajecia[] = [
  {
    zjazd: 1,
    data: '08.03.2026',
    wyklad: 'Statystyka — Projektant Rzeczywistości. Podstawy statystyki opisowej i wnioskowania',
    wykladMaterialy: 'Wykład 1',
    wykladHref: '/materialy/wyklady/01-statystyka-projektant-rzeczywistosci',
    lab: 'Wstęp do statystyki w Pythonie — NumPy, pandas, wizualizacje',
    labMaterialy: 'Lab 1',
    labHref: '/materialy/cwiczenia/01-wstep-do-statystyki',
    zadanieDomowe: 'Analiza statystyczna',
    zadanieHref: '/zadania/zad1-analiza-statystyczna.md',
  },
  {
    zjazd: 2,
    data: '22.03.2026',
    wyklad: 'Wprowadzenie do Big Data — skala, wyzwania, ekosystem Hadoop i Apache Spark',
    wykladMaterialy: 'Wykład 2',
    wykladHref: '/materialy/wyklady/02-big-data-hadoop-spark',
    lab: 'Analiza danych e-commerce z PySpark',
    labMaterialy: 'Lab 2',
    labHref: '/materialy/cwiczenia/02-pyspark-ecommerce',
    zadanieDomowe: 'Podstawy PySpark',
    zadanieHref: '/zadania/zad2-podstawy-pyspark.md',
  },
  {
    zjazd: 3,
    data: '12.04.2026',
    wyklad: 'Spark SQL, DataFrames i optymalizacja zapytań. Zaawansowane przetwarzanie danych',
    wykladMaterialy: 'Wykład 3',
    wykladHref: '/materialy/wyklady/03-spark-sql-dataframes',
    lab: 'Spark SQL i zaawansowane transformacje',
    labMaterialy: 'Lab 3',
    labHref: '/materialy/cwiczenia/03-spark-sql-advanced',
    zadanieDomowe: 'Spark SQL Queries',
    zadanieHref: '/zadania/zad3-spark-sql-queries.md',
  },
  {
    zjazd: 4,
    data: '26.04.2026',
    wyklad: 'Wstęp do Machine Learning. Przygotowanie danych i budowanie modeli ML',
    wykladMaterialy: 'Wykład 4',
    wykladHref: '/materialy/wyklady/04-intro-ml-data-preparation',
    lab: 'Przygotowanie danych i modele ML z scikit-learn',
    labMaterialy: 'Lab 4',
    labHref: '/materialy/cwiczenia/04-ml-data-preparation',
    zadanieDomowe: 'ML Pipeline',
    zadanieHref: '/zadania/zad4-ml-prep-pipeline.md',
  },
  {
    zjazd: 5,
    data: '17.05.2026',
    wyklad: 'Machine Learning na dużych zbiorach — MLlib w Spark',
    wykladMaterialy: 'Wykład 5',
    wykladHref: '/materialy/wyklady/05-mllib-spark-ml',
    lab: 'MLlib — budowanie modeli ML na dużych zbiorach danych',
    labMaterialy: 'Lab 5',
    labHref: '/materialy/cwiczenia/05-mllib-spark',
    zadanieDomowe: 'MLlib Classification',
    zadanieHref: '/zadania/zad5-mllib-classification.md',
  },
  {
    zjazd: 6,
    data: '31.05.2026',
    wyklad: 'Cloud Computing i zarządzanie klastrami Spark w chmurze (GCP)',
    wykladMaterialy: 'Wykład 6',
    wykladHref: '/materialy/wyklady/06-cloud-computing-gcp',
    lab: 'BigQuery, Dataproc i Spark w chmurze GCP',
    labMaterialy: 'Lab 6',
    labHref: '/materialy/cwiczenia/06-cloud-gcp-qwiklabs',
    zadanieDomowe: 'GCP Dataproc Job',
    zadanieHref: '/zadania/zad6-gcp-dataproc-simple.md',
  },
  {
    zjazd: 7,
    data: '14.06.2026',
    wyklad: 'Spark Streaming i przetwarzanie strumieniowe danych',
    wykladMaterialy: 'Wykład 7',
    wykladHref: '/materialy/wyklady/07-spark-streaming',
    lab: 'Structured Streaming — przetwarzanie danych w czasie rzeczywistym',
    labMaterialy: 'Lab 7',
    labHref: '/materialy/cwiczenia/07-spark-streaming',
    zadanieDomowe: 'Streaming Basics',
    zadanieHref: '/zadania/zad7-streaming-basics.md',
  },
  {
    zjazd: 8,
    data: '28.06.2026',
    wyklad: 'Podsumowanie kursu i przegląd kluczowych zagadnień',
    lab: 'Obrona projektu zaliczeniowego',
  },
];

const TYP_CONFIG = {
  wyklad:     { label: 'Wykład',       cls: styles.badgeWyklad },
  lab:        { label: 'Ćwiczenia', cls: styles.badgeLab },
  projekt:    { label: 'Projekt',      cls: styles.badgeProjekt },
};

export default function PlanZajec(): ReactNode {
  return (
    <Layout
      title="Plan zajęć"
      description="Harmonogram semestru — tematy wykładów i laboratoriów, ważne daty."
    >
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <Heading as="h1">📅 Plan zajęć</Heading>
            <p className={styles.subtitle}>
              Harmonogram semestru letniego 2025/2026 — Python w Zastosowaniach Big Data.
              <br />
              <strong>Studia zaoczne</strong> — 8 niedzielnych zjazdów. Każdy zjazd zawiera wykład i ćwiczenia.
              <br />
              Podane daty są orientacyjne i mogą ulec zmianie — sprawdzaj tę stronę regularnie!
            </p>
            <div className={styles.legend}>
              <span className={`${styles.badge} ${styles.badgeWyklad}`}>Wykład</span>
              <span className={`${styles.badge} ${styles.badgeLab}`}>Laboratorium</span>
              <span className={`${styles.badge} ${styles.badgeProjekt}`}>Projekt</span>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Zjazd</th>
                  <th>Data</th>
                  <th>Wykład</th>
                  <th>Materiały</th>
                  <th>Ćwiczenia</th>
                  <th>Materiały</th>
                  <th>Zadanie domowe</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_ZAOCZNE.map(({ zjazd, data, wyklad, wykladMaterialy, wykladHref, lab, labMaterialy, labHref, zadanieDomowe, zadanieHref }) => (
                  <tr key={zjazd} className={zjazd === 8 ? styles.rowWolne : undefined}>
                    <td className={styles.tdNum}>{zjazd}</td>
                    <td className={styles.tdData}>{data}</td>
                    <td>
                      <span className={`${styles.badge} ${zjazd === 8 ? styles.badgeProjekt : styles.badgeWyklad}`}>
                        {zjazd === 8 ? 'Projekt' : 'Wykład'}
                      </span>{' '}
                      {wyklad}
                    </td>
                    <td>
                      {wykladMaterialy && wykladHref ? (
                        <a href={wykladHref}>{wykladMaterialy}</a>
                      ) : (
                        <span className={styles.soon}>—</span>
                      )}
                    </td>
                    <td>
                      <span className={`${styles.badge} ${zjazd === 8 ? styles.badgeProjekt : styles.badgeLab}`}>
                        {zjazd === 8 ? 'Projekt' : 'Lab'}
                      </span>{' '}
                      {lab}
                    </td>
                    <td>
                      {labMaterialy && labHref ? (
                        <a href={labHref}>{labMaterialy}</a>
                      ) : (
                        <span className={styles.soon}>—</span>
                      )}
                    </td>
                    <td>
                      {zadanieDomowe && zadanieHref ? (
                        <a href={zadanieHref} download>
                          📝 {zadanieDomowe}
                        </a>
                      ) : (
                        <span className={styles.soon}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  );
}
