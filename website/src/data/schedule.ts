/**
 * Course schedule data for Python w Zastosowaniach Big Data
 * Semester: Spring 2025/2026
 */

export type Zajecia = {
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

export const PLAN_ZAOCZNE: Zajecia[] = [
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
