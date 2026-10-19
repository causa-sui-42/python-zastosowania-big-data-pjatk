import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './o-kursie.module.css';

type Zasada = { ikona: string; tytul: string; opis: string };

const ZASADY: Zasada[] = [
  { ikona: '💻', tytul: 'Kod na pierwszym miejscu', opis: 'Każdy koncept pokazujemy na działającym kodzie — nie na suchej teorii.' },
  { ikona: '☁️', tytul: 'Praca w chmurze', opis: 'Ćwiczenia działają na Google Colab — zero instalacji, zero bólu głowy.' },
  { ikona: '📈', tytul: 'Progresywna trudność', opis: 'Zaczynamy od prostych danych. Kończymy na terabajtowych zbiorach na klastrze.' },
  { ikona: '🌍', tytul: 'Realne dane', opis: 'Analizujemy prawdziwe zbiory danych — e-commerce, logi serwisów, dane IoT.' },
];

type WymaganieItem = { label: string; opis: string };

const WYMAGANIA: WymaganieItem[] = [
  { label: 'Python',     opis: 'Znajomość podstaw (zmienne, pętle, funkcje, listy, słowniki)' },
  { label: 'SQL',        opis: 'Umiejętność pisania prostych zapytań SELECT..WHERE..GROUP BY' },
  { label: 'Terminal',   opis: 'Praca w wierszu poleceń — na poziomie podstawowym' },
  { label: 'Matematyka', opis: 'Algebra liniowa i statystyka opisowa — podstawy' },
];

type ZaliczeniaItem = { procent: string; opis: string };

const ZALICZENIA: ZaliczeniaItem[] = [
  { procent: '10%', opis: 'Oryginalność pomysłu badawczego i jasno określony cel projektu' },
  { procent: '30%', opis: 'Prezentacja wyników (slajdy, sposób prezentowania, ogólne wrażenia)' },
  { procent: '20%', opis: 'Rozmiar projektu, spójność treści, opisów i wykresów z celem (20–30 slajdów)' },
  { procent: '50%', opis: 'Samodzielna realizacja pracy, umiejętność odpowiadania na pytania prowadzącego' },
];

export default function OKursie(): ReactNode {
  return (
    <Layout
      title="O kursie"
      description="Informacje o kursie Python w Zastosowaniach Big Data — wymagania, zaliczenie, kontakt."
    >
      <main className={styles.page}>
        <div className="container">

          {/* Header */}
          <div className={styles.hero}>
            <Heading as="h1">ℹ️ O kursie</Heading>
            <p className={styles.lead}>
              <strong>Python w Zastosowaniach Big Data</strong> to kurs akademicki na Polsko-Japońskiej Akademii
              Technik Komputerowych (PJATK), który uczy, jak pracować z danymi w skali — od gigabajtów do petabajtów —
              używając Pythona i ekosystemu Apache Spark/Hadoop.
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
              Kurs składa się z <strong>8 zjazdów</strong> (niedziele). Każdy zjazd zawiera wykład teoretyczny 
              oraz praktyczne ćwiczenia. Pełny harmonogram dostępny na stronie{' '}
              <Link to="/zaoczne/plan-zajec">Plan zajęć</Link>.
            </p>
            
            <div className={styles.syllabusGrid}>
              <div className={styles.syllabusItem}>
                <div className={styles.syllabusNum}>1</div>
                <div className={styles.syllabusContent}>
                  <h3>Statystyka — Projektant Rzeczywistości</h3>
                  <p>Podstawy statystyki opisowej i wnioskowania. Miary tendencji centralnej, rozkłady prawdopodobieństwa, testy hipotez.</p>
                  <div className={styles.syllabusLinks}>
                    <Link to="/zaoczne/materialy/wyklady/01-statystyka-projektant-rzeczywistosci">📖 Wykład 1</Link>
                    <Link to="/zaoczne/materialy/cwiczenia/01-wstep-do-statystyki">🧪 Ćwiczenia 1</Link>
                  </div>
                </div>
              </div>

              <div className={styles.syllabusItem}>
                <div className={styles.syllabusNum}>2</div>
                <div className={styles.syllabusContent}>
                  <h3>Wprowadzenie do Big Data, Hadoop i Spark</h3>
                  <p>Skala danych, wyzwania 5V, ekosystem Hadoop (HDFS, MapReduce, YARN), Apache Spark i analiza danych e-commerce z PySpark.</p>
                  <div className={styles.syllabusLinks}>
                    <Link to="/zaoczne/materialy/wyklady/02-big-data-hadoop-spark">📖 Wykład 2</Link>
                    <Link to="/zaoczne/materialy/cwiczenia/02-pyspark-ecommerce">🧪 Ćwiczenia 2</Link>
                  </div>
                </div>
              </div>

              <div className={styles.syllabusItem}>
                <div className={styles.syllabusNum}>3</div>
                <div className={styles.syllabusContent}>
                  <h3>Spark SQL i optymalizacja</h3>
                  <p>Zaawansowane transformacje, joiny, window functions, UDF, Catalyst Optimizer i wskazówki wydajnościowe.</p>
                  <div className={styles.syllabusLinks}>
                    <Link to="/zaoczne/materialy/wyklady/03-spark-sql-dataframes">📖 Wykład 3</Link>
                    <Link to="/zaoczne/materialy/cwiczenia/03-spark-sql-advanced">🧪 Ćwiczenia 3</Link>
                  </div>
                </div>
              </div>

              <div className={styles.syllabusItem}>
                <div className={styles.syllabusNum}>4</div>
                <div className={styles.syllabusContent}>
                  <h3>Machine Learning — podstawy</h3>
                  <p>Przygotowanie danych, feature engineering, budowanie modeli ML z scikit-learn, ewaluacja i metryki.</p>
                  <div className={styles.syllabusLinks}>
                    <Link to="/zaoczne/materialy/wyklady/04-intro-ml-data-preparation">📖 Wykład 4</Link>
                    <Link to="/zaoczne/materialy/cwiczenia/04-ml-data-preparation">🧪 Ćwiczenia 4</Link>
                  </div>
                </div>
              </div>

              <div className={styles.syllabusItem}>
                <div className={styles.syllabusNum}>5</div>
                <div className={styles.syllabusContent}>
                  <h3>MLlib — ML na dużych zbiorach</h3>
                  <p>Spark MLlib, VectorAssembler, Pipelines, klasyfikacja churn, CrossValidator i tuning hiperparametrów.</p>
                  <div className={styles.syllabusLinks}>
                    <Link to="/zaoczne/materialy/wyklady/05-mllib-spark-ml">📖 Wykład 5</Link>
                    <Link to="/zaoczne/materialy/cwiczenia/05-mllib-spark">🧪 Ćwiczenia 5</Link>
                  </div>
                </div>
              </div>

              <div className={styles.syllabusItem}>
                <div className={styles.syllabusNum}>6</div>
                <div className={styles.syllabusContent}>
                  <h3>Cloud Computing i GCP</h3>
                  <p>Zarządzanie klastrami Spark w chmurze, BigQuery, Dataproc, architektura data lake i data warehouse.</p>
                  <div className={styles.syllabusLinks}>
                    <Link to="/zaoczne/materialy/wyklady/06-cloud-computing-gcp">📖 Wykład 6</Link>
                    <Link to="/zaoczne/materialy/cwiczenia/06-cloud-gcp-qwiklabs">🧪 Ćwiczenia 6</Link>
                  </div>
                </div>
              </div>

              <div className={styles.syllabusItem}>
                <div className={styles.syllabusNum}>7</div>
                <div className={styles.syllabusContent}>
                  <h3>Spark Streaming</h3>
                  <p>Structured Streaming, przetwarzanie w czasie rzeczywistym, okna czasowe, watermarks i system alertów IoT.</p>
                  <div className={styles.syllabusLinks}>
                    <Link to="/zaoczne/materialy/wyklady/07-spark-streaming">📖 Wykład 7</Link>
                    <Link to="/zaoczne/materialy/cwiczenia/07-spark-streaming">🧪 Ćwiczenia 7</Link>
                  </div>
                </div>
              </div>

              <div className={styles.syllabusItem}>
                <div className={styles.syllabusNum}>8</div>
                <div className={styles.syllabusContent}>
                  <h3>Podsumowanie i projekt</h3>
                  <p>Przegląd kluczowych zagadnień z całego kursu. Obrona projektu zaliczeniowego przed prowadzącym.</p>
                  <div className={styles.syllabusLinks}>
                    <Link to="/zaoczne/materialy/projekt-zaliczeniowy">🎓 Projekt</Link>
                  </div>
                </div>
              </div>
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
                Kurs zaliczany jest na podstawie <strong>samodzielnie wykonanego projektu</strong> oraz jego{' '}
                <strong>obrony ustnej</strong> na ostatnich zajęciach (28.06.2026). Projekt powinien
                demonstrować zrozumienie i praktyczne zastosowanie materiału z kursu.
              </p>
              <ul className={styles.gradeList}>
                {ZALICZENIA.map(({ procent, opis }) => (
                  <li key={opis} className={styles.gradeItem}>
                    <span className={styles.procent}>{procent}</span>
                    <span>{opis}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.note}>
                📄 Szczegółowe wymagania projektowe znajdziesz na stronie{' '}
                <Link to="/zaoczne/materialy/projekt-zaliczeniowy">Projekt zaliczeniowy</Link>.
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
