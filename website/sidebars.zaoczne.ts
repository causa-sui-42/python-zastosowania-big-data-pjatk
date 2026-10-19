import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  zaoczneSidebar: [
    {
      type: 'category',
      label: '📖 Wykłady',
      link: {
        type: 'generated-index',
        title: 'Wykłady',
        description: 'Materiały z wykładów — slajdy, nagrania i notatki.',
        slug: '/wyklady',
      },
      items: [
        'wyklady/01-statystyka-projektant-rzeczywistosci',
        'wyklady/02-big-data-hadoop-spark',
        'wyklady/03-spark-sql-dataframes',
        'wyklady/04-intro-ml-data-preparation',
        'wyklady/05-mllib-spark-ml',
        'wyklady/06-cloud-computing-gcp',
        'wyklady/07-spark-streaming',
      ],
    },
    {
      type: 'category',
      label: '🧪 Ćwiczenia',
      link: {
        type: 'generated-index',
        title: 'Ćwiczenia i Laboratoria',
        description: 'Praktyczne laboratoria na Google Colab — gotowe do uruchomienia.',
        slug: '/cwiczenia',
      },
      items: [
        'cwiczenia/01-wstep-do-statystyki',
        'cwiczenia/02-pyspark-ecommerce',
        'cwiczenia/03-spark-sql-advanced',
        'cwiczenia/04-ml-data-preparation',
        'cwiczenia/05-mllib-spark',
        'cwiczenia/06-cloud-gcp-qwiklabs',
        'cwiczenia/07-spark-streaming',
      ],
    },
    {
      type: 'link',
      label: '🔗 Zasoby',
      href: '/zasoby',
    },
    {
      type: 'category',
      label: '📝 Zadania domowe',
      link: {
        type: 'doc',
        id: 'zadania-domowe/zadania-domowe-index',
      },
      items: [],
    },
    {
      type: 'doc',
      id: 'projekt-zaliczeniowy',
      label: '🎓 Projekt zaliczeniowy',
    },
  ],
};

export default sidebars;
