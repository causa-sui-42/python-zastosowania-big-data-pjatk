import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from '../zaoczne/o-kursie.module.css';

type Zasada = { ikona: string; tytul: string; opis: string };

const ZASADY: Zasada[] = [
  { ikona: '💻', tytul: 'Kod na pierwszym miejscu', opis: 'Każdy koncept pokazujemy na działającym kodzie — nie na suchej teorii.' },
  { ikona: '☁️', tytul: 'Praca w chmurze', opis: 'Ćwiczenia działają na Google Colab — zero instalacji, zero bólu głowy.' },
  { ikona: '📈', tytul: 'Progresywna trudność', opis: 'Zaczynamy od statystyki. Kończymy na strumieniowaniu danych w czasie rzeczywistym.' },
  { ikona: '🌍', tytul: 'Realne dane', opis: 'Analizujemy realistyczne zbiory danych — sport, sprzedaż, e-sport, transakcje, IoT.' },
];

type WymaganieItem = { label: string; opis: string };

const WYMAGANIA: WymaganieItem[] = [
  { label: 'Python',     opis: 'Znajomość podstaw (zmienne, pętle, funkcje, listy, słowniki)' },
  { label: 'SQL',        opis: 'Umiejętność pisania prostych zapytań SELECT..WHERE..GROUP BY' },
  { label: 'Terminal',   opis: 'Praca w wierszu poleceń — na poziomie podstawowym' },
  { label: 'Matematyka', opis: 'Algebra liniowa i statystyka opisowa — podstawy' },
];

type SyllabusItem = { nr: number; tytul: string; opis: string; wykladHref?: string; labHref?: string; specjalny?: 'egzamin' };

const SYLLABUS: SyllabusItem[] = [
  { nr: 1, tytul: 'Statystyka opisowa i EDA', opis: 'Miary tendencji centralnej, rozkłady prawdopodobieństwa, eksploracyjna analiza danych, intuicja wnioskowania statystycznego.', wykladHref: '/stacjonarne/materialy/wyklady/01-statystyka-opisowa-eda', labHref: '/stacjonarne/materialy/cwiczenia/01-eda-statystyki-sportowe' },
  { nr: 2, tytul: 'Formaty i przechowywanie danych', opis: 'CSV vs Parquet, kompresja, partycjonowanie, przetwarzanie równoległe, Data Lake i Lakehouse.', wykladHref: '/stacjonarne/materialy/wyklady/02-formaty-przechowywanie-danych', labHref: '/stacjonarne/materialy/cwiczenia/02-formaty-danych-hulajnogi' },
  { nr: 3, tytul: 'Big Data i ekosystem Hadoop', opis: '5V, HDFS, MapReduce, YARN — fundamenty przetwarzania danych na skalę.', wykladHref: '/stacjonarne/materialy/wyklady/03-big-data-hadoop-ekosystem', labHref: '/stacjonarne/materialy/cwiczenia/03-mapreduce-analiza-recenzji' },
  { nr: 4, tytul: 'Apache Spark — architektura i RDD', opis: 'SparkSession, RDD, transformacje i akcje, podstawy PySpark.', wykladHref: '/stacjonarne/materialy/wyklady/04-apache-spark-rdd-podstawy', labHref: '/stacjonarne/materialy/cwiczenia/04-pyspark-rdd-logi-serwera' },
  { nr: 5, tytul: 'Spark SQL i DataFrames', opis: 'Zapytania, transformacje, joiny, schematy danych.', wykladHref: '/stacjonarne/materialy/wyklady/05-spark-sql-dataframes', labHref: '/stacjonarne/materialy/cwiczenia/05-spark-sql-siec-kawiarni' },
  { nr: 6, tytul: 'Zaawansowany Spark SQL', opis: 'Window functions, Catalyst Optimizer, partycjonowanie i wydajność.', wykladHref: '/stacjonarne/materialy/wyklady/06-spark-sql-zaawansowany', labHref: '/stacjonarne/materialy/cwiczenia/06-window-functions-rowery-miejskie' },
  { nr: 7, tytul: 'Feature Engineering', opis: 'Przygotowanie danych do ML — encoding, skalowanie, pipeline’y scikit-learn.', wykladHref: '/stacjonarne/materialy/wyklady/07-feature-engineering-ml', labHref: '/stacjonarne/materialy/cwiczenia/07-feature-engineering-esport' },
  { nr: 8, tytul: 'Modele ML — klasyfikacja i ewaluacja', opis: 'Regresja, klasyfikacja, metryki, cross-validation, tuning.', wykladHref: '/stacjonarne/materialy/wyklady/08-modele-ml-ewaluacja', labHref: '/stacjonarne/materialy/cwiczenia/08-churn-silownia-klasyfikacja' },
  { nr: 9, tytul: 'Spark MLlib — wprowadzenie', opis: 'ML na dużą skalę — Pipeline, VectorAssembler, klasyfikacja w Spark.', wykladHref: '/stacjonarne/materialy/wyklady/09-mllib-wprowadzenie', labHref: '/stacjonarne/materialy/cwiczenia/09-mllib-ctr-reklamy' },
  { nr: 10, tytul: 'Zaawansowany MLlib', opis: 'CrossValidator, ParamGridBuilder, klasy niezbalansowane na dużych zbiorach.', wykladHref: '/stacjonarne/materialy/wyklady/10-mllib-zaawansowany', labHref: '/stacjonarne/materialy/cwiczenia/10-mllib-wykrywanie-fraudow' },
  { nr: 11, tytul: 'Cloud Computing i GCP', opis: 'BigQuery, Dataproc, architektura data lake / data warehouse.', wykladHref: '/stacjonarne/materialy/wyklady/11-cloud-computing-gcp', labHref: '/stacjonarne/materialy/cwiczenia/11-bigquery-przejazdy-taksowek' },
  { nr: 12, tytul: 'Przetwarzanie strumieniowe', opis: 'Spark Structured Streaming, okna czasowe, wprowadzenie do Apache Kafka.', wykladHref: '/stacjonarne/materialy/wyklady/12-streaming-structured-kafka', labHref: '/stacjonarne/materialy/cwiczenia/12-streaming-jakosc-powietrza' },
  { nr: 13, tytul: 'Egzamin teoretyczny + obrona projektu', opis: 'Test pisemny obejmujący wykłady 1-12 oraz obrony projektów zaliczeniowych.', wykladHref: '/stacjonarne/materialy/egzamin', labHref: '/stacjonarne/materialy/projekt-zaliczeniowy', specjalny: 'egzamin' },
];

type OcenaItem = { procent: string; tytul: string; opis: string; href?: string };

const OCENA: OcenaItem[] = [
  { procent: '70%', tytul: 'Egzamin teoretyczny', opis: 'Test pisemny obejmujący materiał z wykładów 1-12, na ostatnich zajęciach 19.01.2027.', href: '/stacjonarne/materialy/egzamin' },
  { procent: '30%', tytul: 'Projekt zaliczeniowy', opis: 'Indywidualny projekt Big Data — wybór tematu, realizacja, prezentacja i obrona 19.01.2027.', href: '/stacjonarne/materialy/projekt-zaliczeniowy' },
  { procent: '+10%', tytul: 'Aktywność na zajęciach (bonus)', opis: 'Dodatkowe punkty ponad 100% za udział w dyskusjach i aktywną pracę na zajęciach.' },
];

export default function StacjonarneOKursie(): ReactNode {
  return (
    <Layout
      title="O kursie — Studia stacjonarne"
      description="Informacje o kursie Python w Zastosowaniach Big Data dla toru stacjonarnego — wymagania, zaliczenie, kontakt."
    >
      <main className={styles.page}>
        <div className="container">

          {/* Header */}
          <div className={styles.hero}>
            <Heading as="h1">ℹ️ O kursie — Studia stacjonarne</Heading>
            <p className={styles.lead}>
              <strong>Python w Zastosowaniach Big Data</strong> to kurs akademicki na Polsko-Japońskiej Akademii
              Technik Komputerowych (PJATK), który uczy, jak pracować z danymi w skali — od gigabajtów do petabajtów —
              używając Pythona i ekosystemu Apache Spark/Hadoop. Tor <strong>stacjonarny</strong> realizowany jest
              w formie cotygodniowych zajęć we <strong>wtorki</strong>, semestr zimowy 2026/2027.
            </p>
          </div>

          {/* Zasady */}
          <section className={styles.section}>
            <Heading as="h2">🎯 Filozofia kursu</Heading>
            <div className={styles.zasadyGrid}>
              {ZASADY.map(({ ikona, tytul, opis }) => (
                <div key={tytul} className={styles.zasadaCard}>
                  <div className={styles.zasadaIkona}>{ikona}</div>
                  <Heading as="h4" className={styles.zasadaTytul}>{tytul}</Heading>
                  <p className={styles.zasadaOpis}>{opis}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Syllabus */}
          <section className={styles.section}>
            <Heading as="h2">📚 Program kursu (Syllabus)</Heading>
            <p className={styles.syllabusIntro}>
              Kurs składa się z <strong>13 cotygodniowych zajęć</strong> (wtorki, 06.10.2026 – 19.01.2027, z przerwą
              świąteczno-noworoczną 22.12–29.12.2026). Każde zajęcia obejmują wykład teoretyczny oraz praktyczne
              ćwiczenia. Pełny harmonogram dostępny na stronie{' '}
              <Link to="/stacjonarne/plan-zajec">Plan zajęć</Link>.
            </p>

            <div className={styles.syllabusGrid}>
              {SYLLABUS.map(({ nr, tytul, opis, wykladHref, labHref }) => (
                <div className={styles.syllabusItem} key={nr}>
                  <div className={styles.syllabusNum}>{nr}</div>
                  <div className={styles.syllabusContent}>
                    <h3>{tytul}</h3>
                    <p>{opis}</p>
                    <div className={styles.syllabusLinks}>
                      {wykladHref && <Link to={wykladHref}>{nr === 13 ? '📝 Egzamin' : `📖 Wykład ${nr}`}</Link>}
                      {labHref && <Link to={labHref}>{nr === 13 ? '🎓 Projekt' : `🧪 Ćwiczenia ${nr}`}</Link>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.twoCol}>
            {/* Wymagania */}
            <section className={styles.section}>
              <Heading as="h2">📋 Wymagania wstępne</Heading>
              <ul className={styles.list}>
                {WYMAGANIA.map(({ label, opis }) => (
                  <li key={label} className={styles.listItem}>
                    <span className={styles.listLabel}>{label}</span>
                    <span className={styles.listOpis}>{opis}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.note}>
                💡 Brak doświadczenia z Big Data? Świetnie — właśnie po to tu jesteś!
              </p>
            </section>

            {/* Zaliczenie */}
            <section className={styles.section}>
              <Heading as="h2">📊 Zasady zaliczenia</Heading>
              <p>
                Ocena końcowa składa się z dwóch obowiązkowych elementów (łącznie 100%) oraz bonusu za aktywność:
              </p>
              <ul className={styles.gradeList}>
                {OCENA.map(({ procent, tytul, opis, href }) => (
                  <li key={tytul} className={styles.gradeItem}>
                    <span className={styles.procent}>{procent}</span>
                    <span>
                      <strong>{tytul}</strong> — {opis}{href && <> (<Link to={href}>szczegóły</Link>)</>}
                    </span>
                  </li>
                ))}
              </ul>
              <p className={styles.note}>
                📝 <strong>Zadania domowe</strong> nie są obowiązkowe i nie są oceniane — to materiał do samodzielnej praktyki,
                który świetnie przygotowuje do egzaminu i projektu (<Link to="/stacjonarne/materialy/zadania-domowe">lista zadań</Link>).
              </p>
              <p className={styles.note} style={{ marginTop: '0.5rem', color: '#dc2626' }}>
                ⚠️ <strong>Obecność jest obowiązkowa.</strong> Dopuszczalne są maksymalnie <strong>2 nieobecności</strong>{' '}
                w semestrze — jest to warunek konieczny do zaliczenia kursu.
              </p>
            </section>
          </div>

          {/* Kontakt */}
          <section className={styles.section}>
            <Heading as="h2" id="konsultacje">📬 Kontakt i konsultacje</Heading>
            <div className={styles.contactCard}>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:melnyk@pjwstk.edu.pl">melnyk@pjwstk.edu.pl</a>
              </p>
              <p>
                <strong>Konsultacje:</strong> Najlepiej zadawać pytania podczas zajęć lub wysyłać e-mailem.
                Kwestie organizacyjne (np. dotyczące obecności, zaliczeń) proszę kierować bezpośrednio do dziekanatu.
              </p>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}

