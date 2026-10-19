import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// Shared "Zasoby" resources (books/cheatsheets/links) — used by both the
// zaoczne and stacjonarne tracks, hosted at a neutral top-level route so it
// isn't branded as belonging to either specific track.
const sidebars: SidebarsConfig = {
  zasobySidebar: [
    {
      type: 'category',
      label: '🔗 Zasoby',
      link: {
        type: 'doc',
        id: 'index',
      },
      items: ['ksiazki', 'cheatsheets', 'linki'],
    },
  ],
};

export default sidebars;
