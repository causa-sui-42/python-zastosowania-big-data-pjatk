import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const enableGitMetadata = process.env.DOCUSAURUS_ENABLE_GIT_METADATA === 'true';

const config: Config = {
  title: 'Python w Zastosowaniach Big Data',
  tagline: 'Kurs akademicki — PJATK',
  favicon: 'img/favicon.ico',

  url: 'https://causa-sui-42.github.io',
  baseUrl: '/python-zastosowania-big-data-pjatk/',

  organizationName: 'causa-sui-42',
  projectName: 'python-zastosowania-big-data-pjatk',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
    localeConfigs: {
      pl: {
        label: 'Polski',
        direction: 'ltr',
        htmlLang: 'pl',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zaoczne',
        path: 'docs/zaoczne',
        routeBasePath: 'zaoczne/materialy',
        sidebarPath: './sidebars.zaoczne.ts',
        showLastUpdateTime: enableGitMetadata,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'stacjonarne',
        path: 'docs/stacjonarne',
        routeBasePath: 'stacjonarne/materialy',
        sidebarPath: './sidebars.stacjonarne.ts',
        showLastUpdateTime: enableGitMetadata,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zasoby',
        path: 'docs/zasoby',
        routeBasePath: 'zasoby',
        sidebarPath: './sidebars.zasoby.ts',
        showLastUpdateTime: enableGitMetadata,
      },
    ],
  ],

  themeConfig: {
    image: 'img/og-card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'semester-2026-2027-winter',
      content:
        '🎉 Nowy semestr zimowy 2026/2027 — ruszyły materiały dla Studiów stacjonarnych! Studia zaoczne pozostają dostępne jako archiwum semestru letniego 2025/2026.',
      backgroundColor: '#4f46e5',
      textColor: '#ffffff',
      isCloseable: true,
    },
    navbar: {
      title: 'Python & Big Data',
      logo: {
        alt: 'Python w Zastosowaniach Big Data',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Strona główna',
          to: '/',
          position: 'left',
        },
        {
          label: '🌙 Zaoczne',
          position: 'left',
          items: [
            { label: '📖 Wykłady', to: '/zaoczne/materialy/wyklady' },
            { label: '🧪 Ćwiczenia', to: '/zaoczne/materialy/cwiczenia' },
            { label: '📝 Zadania domowe', to: '/zaoczne/materialy/zadania-domowe' },
            { label: '📅 Plan zajęć', to: '/zaoczne/plan-zajec' },
            { label: 'ℹ️ O kursie', to: '/zaoczne/o-kursie' },
          ],
        },
        {
          label: '☀️ Stacjonarne',
          position: 'left',
          items: [
            { label: '📖 Wykłady', to: '/stacjonarne/materialy/wyklady' },
            { label: '🧪 Ćwiczenia', to: '/stacjonarne/materialy/cwiczenia' },
            { label: '📝 Zadania domowe', to: '/stacjonarne/materialy/zadania-domowe' },
            { label: '🎓 Projekt zaliczeniowy', to: '/stacjonarne/materialy/projekt-zaliczeniowy' },
            { label: '📝 Egzamin teoretyczny', to: '/stacjonarne/materialy/egzamin' },
            { label: '📅 Plan zajęć', to: '/stacjonarne/plan-zajec' },
            { label: 'ℹ️ O kursie', to: '/stacjonarne/o-kursie' },
          ],
        },
        {
          label: 'Fiszki',
          to: '/fiszki',
          position: 'left',
        },
        {
          label: 'Zasoby',
          to: '/zasoby',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Studia zaoczne',
          items: [
            { label: 'Wykłady', to: '/zaoczne/materialy/wyklady' },
            { label: 'Ćwiczenia', to: '/zaoczne/materialy/cwiczenia' },
            { label: 'Zadania domowe', to: '/zaoczne/materialy/zadania-domowe' },
            { label: 'Plan zajęć', to: '/zaoczne/plan-zajec' },
            { label: 'O kursie', to: '/zaoczne/o-kursie' },
          ],
        },
        {
          title: 'Studia stacjonarne',
          items: [
            { label: 'Wykłady', to: '/stacjonarne/materialy/wyklady' },
            { label: 'Ćwiczenia', to: '/stacjonarne/materialy/cwiczenia' },
            { label: 'Zadania domowe', to: '/stacjonarne/materialy/zadania-domowe' },
            { label: 'Projekt zaliczeniowy', to: '/stacjonarne/materialy/projekt-zaliczeniowy' },
            { label: 'Egzamin teoretyczny', to: '/stacjonarne/materialy/egzamin' },
            { label: 'Plan zajęć', to: '/stacjonarne/plan-zajec' },
            { label: 'O kursie', to: '/stacjonarne/o-kursie' },
          ],
        },
        {
          title: 'Wspólne',
          items: [
            { label: 'Fiszki', to: '/fiszki' },
            { label: 'Materiały dodatkowe', to: '/zasoby' },
          ],
        },
        {
          title: 'Kontakt',
          items: [
            {
              label: '📧 Email: melnyk@pjwstk.edu.pl',
              href: 'mailto:melnyk@pjwstk.edu.pl',
            },
            {
              label: 'Konsultacje: Podczas zajęć',
              href: '/zaoczne/o-kursie#konsultacje',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Python w Zastosowaniach Big Data — PJATK. Zbudowane z Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'yaml', 'json'],
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;

