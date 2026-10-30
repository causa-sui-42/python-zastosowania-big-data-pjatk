import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// Note: "Zasoby" (books/cheatsheets/links) content is shared across tracks and
// lives only under the zaoczne docs instance to avoid duplication.
const sidebars: SidebarsConfig = {
  stacjonarneSidebar: [
    {
      type: 'category',
      label: '📖 Wykłady',
      link: {
        type: 'generated-index',
        title: 'Wykłady',
        description: 'Materiały z wykładów — slajdy, nagrania i notatki (Studia stacjonarne).',
        slug: '/wyklady',
      },
      items: [
        'wyklady/00-python-podstawy-pandas-spark',
        'wyklady/01-statystyka-opisowa-eda',
        'wyklady/02-formaty-przechowywanie-danych',
        'wyklady/03-big-data-hadoop-ekosystem',
        'wyklady/04-apache-spark-rdd-podstawy',
        'wyklady/05-spark-sql-dataframes',
        'wyklady/06-feature-engineering-ml',
        'wyklady/07-modele-ml-ewaluacja',
        'wyklady/08-mllib-wprowadzenie',
        'wyklady/09-cloud-computing-gcp',
        'wyklady/10-streaming-structured-kafka',
      ],
    },
    {
      type: 'category',
      label: '🧪 Ćwiczenia',
      link: {
        type: 'generated-index',
        title: 'Ćwiczenia i Laboratoria',
        description: 'Praktyczne laboratoria na Google Colab — gotowe do uruchomienia (Studia stacjonarne).',
        slug: '/cwiczenia',
      },
      items: [
        'cwiczenia/00-python-podstawy-pandas-spark',
        'cwiczenia/01-eda-statystyki-sportowe',
        'cwiczenia/02-formaty-danych-hulajnogi',
        'cwiczenia/03-mapreduce-analiza-recenzji',
        'cwiczenia/04-pyspark-rdd-logi-serwera',
        'cwiczenia/05-spark-sql-siec-kawiarni',
        'cwiczenia/06-feature-engineering-esport',
        'cwiczenia/07-churn-silownia-klasyfikacja',
        'cwiczenia/08-mllib-ctr-reklamy',
        'cwiczenia/09-bigquery-przejazdy-taksowek',
        'cwiczenia/10-streaming-jakosc-powietrza',
      ],
    },
    {
      type: 'link',
      label: '🔗 Zasoby',
      href: '/zasoby',
    },
    {
      type: 'doc',
      id: 'zadania-domowe/zadania-domowe-index',
      label: '📝 Zadania domowe',
    },
    {
      type: 'doc',
      id: 'projekt-zaliczeniowy',
      label: '🎓 Projekt zaliczeniowy',
    },
    {
      type: 'doc',
      id: 'egzamin',
      label: '📝 Egzamin teoretyczny',
    },
  ],
};

export default sidebars;

