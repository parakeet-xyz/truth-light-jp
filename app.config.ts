export default defineAppConfig({
  truthlight: {
    site: {
      name: 'Truth Light',
      topPageName: 'Truth Light | 薬物依存症のハームリダクションと回復支援サイト',
      topPageDescription: 'Truth Lightは「日本版Erowid」を目指し、薬物とその依存症に対する正しい情報と回復の道を提供します。',
      ogImage: '/og-default.png'
    },
    theme: {
      customizable: true,
      color: 'slate',
      radius: 0.5
    },
    header: {
      title: 'Truth Light',
      showTitle: true,
      showTitleInMobile: true,
      darkModeToggle: true,
      languageSwitcher: {
        enable: false,
        triggerType: 'icon',
        dropdownType: 'select',
      },
      logo: {
        white: './logo/Jesus_fish_03_ol_white.png',
        black: './logo/Jesus_fish_03_ol_grey.png',
      },
      border: false,

      nav: {
        database: { type: "link", title: '規制物質DB', to: '/substances' },
        basics: {
          type: "menu",
          title: "ドラッグ基礎編",
          meth: { type: "link", title: "🧊 メタンフェタミン", to: '/docs/basics/methamphetamine' },
          cocaine: { type: "link", title: '🚴 コカイン',to: '/docs/basics/cocaine' },
          mdma: { type: "link", title: '❌️ エクスタシー', to: '/docs/basic' },
        },
        recovery: { type: "link", title: '依存症からの回復', to: '/docs/recovery' },
        info: {
          type: "menu",
          title: "当サイトについて",
          about: { type: "link", title: 'インフォメーション', to: '/docs/info/mission'},
          disclaimer: { type: "link", title: '免責事項', to: '/docs/info/disclaimer'}
        }
      },
      socialLinks: {
        links: [{
          title: 'Truth Light JP',
          icon: './icon/X/x-logo-black.png',
          to: 'https://x.com/TruthLightJP',
          target: '_blank',
        }]
      }
    },
    categories: {
      stimulants: "中枢神経刺激薬", 
      psychedelics: 'サイケデリックス',
      dissociatives: "解離薬",
      deliriants: "せん妄誘発薬剤",
      depressant: '鎮静薬',
      opioid: "オピオイド",
      cannabinoids: "カンナビノイド"
    }, 
    aside: {
      useLevel: true,
      levelStyle: 'header',
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
      padded: true
    },
    footer: {
      credits: 'Copyright © 2025-2026 Truth Light. All rights reserved.',
      links: [{
        title: 'Truth Light JP',
        icon: './icon/X/x-logo-black.png',
        to: 'https://x.com/TruthLightJP',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
      style: 'input',
    }
  }
});