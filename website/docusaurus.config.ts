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
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'materialy',
          showLastUpdateTime: enableGitMetadata,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
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
      id: 'semester-2026',
      content:
        'Semestr letni 2025/2026 — materiały są regularnie aktualizowane. Sprawdzaj nowe ćwiczenia!',
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
          label: 'Wykłady',
          to: '/materialy/wyklady',
          position: 'left',
        },
        {
          label: 'Ćwiczenia',
          to: '/materialy/cwiczenia',
          position: 'left',
        },
        {
          label: 'Fiszki',
          to: '/fiszki',
          position: 'left',
        },
        {
          label: 'Materiały',
          to: '/materialy/zasoby',
          position: 'left',
        },
        {
          label: 'Plan zajęć',
          to: '/plan-zajec',
          position: 'left',
        },
        {
          label: 'O kursie',
          to: '/o-kursie',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Kurs',
          items: [
            { label: 'Wykłady', to: '/materialy/wyklady' },
            { label: 'Ćwiczenia', to: '/materialy/cwiczenia' },
            { label: 'Zadania domowe', to: '/materialy/zadania-domowe' },
            { label: 'Fiszki', to: '/fiszki' },
          ],
        },
        {
          title: 'Zasoby',
          items: [
            { label: 'Materiały dodatkowe', to: '/materialy/zasoby' },
            { label: 'Plan zajęć', to: '/plan-zajec' },
            { label: 'O kursie', to: '/o-kursie' },
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
              href: '/o-kursie#konsultacje',
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
