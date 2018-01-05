export default [
  { header: 'Core documentation' },
  {
    title: 'Getting started',
    group: '/getting-started',
    icon: 'mdi-speedometer',
    items: [
      { href: 'quick-start', title: 'Quick Start' },
      { href: 'why-vuetify', title: 'Why Vuetify?' },
      { href: 'frequently-asked-questions', title: 'Frequently asked questions' },
      { href: 'sponsors-and-backers', title: 'Sponsors and backers' },
      { href: 'contributing', title: 'Contributing' },
      { href: 'roadmap', title: 'Roadmap' }
    ]
  },
  {
    title: 'Application layout',
    group: '/layout',
    icon: 'mdi-page-layout-body',
    items: [
      { href: 'pre-defined', title: 'Pre-defined', badge: 'updated' },
      { href: 'spacing', title: 'Spacing' },
      { href: 'alignment', title: 'Text alignment' },
      { href: 'display', title: 'Display' },
      { href: 'elevation', title: 'Elevation' },
      { href: 'sandbox', title: 'Sandbox' }
    ]
  },
  {
    title: 'Styles & themes',
    group: '/style',
    icon: 'mdi-format-color-fill',
    items: [
      { href: 'colors', title: 'Colors', badge: 'updated' },
      { href: 'theme', title: 'Theme', badge: 'updated' },
      { href: 'typography', title: 'Typography' },
      { href: 'content', title: 'Content' }
    ]
  },
  {
    title: 'Motion & transitions',
    group: '/motion',
    icon: 'mdi-clock-fast',
    items: [
      { href: 'transitions', title: 'Transitions' }
    ]
  },
  {
    title: 'UI components',
    group: '/components',
    icon: 'mdi-view-dashboard',
    items: [
      { href: 'alerts', title: 'Alerts' },
      { href: 'avatars', title: 'Avatars' },
      { href: 'badges', title: 'Badges' },
      { href: 'bottom-navigation', title: 'Bottom navigation' },
      { href: 'bottom-sheets', title: 'Bottom sheets' },
      { href: 'breadcrumbs', title: 'Breadcrumbs' },
      { href: 'buttons', title: 'Buttons' },
      { href: 'floating-action-buttons', title: 'Buttons: Floating Action Buttons' },
      { href: 'cards', title: 'Cards' },
      { href: 'carousels', title: 'Carousels' },
      { href: 'chips', title: 'Chips' },
      { href: 'data-iterator', title: 'Data iterator', badge: 'new' },
      { href: 'data-tables', title: 'Data tables' },
      { href: 'dialogs', title: 'Dialogs' },
      { href: 'dividers', title: 'Dividers' },
      { href: 'expansion-panels', title: 'Expansion panels' },
      { href: 'footer', title: 'Footer' },
      {
        title: 'Grid & breakpoints',
        group: '/grid',
        namespace: '/components',
        items: [
          { href: 'grid', title: 'Grid' },
          { href: 'grid-lists', title: 'Grid lists' },
        ]
      },
      {
        title: 'Inputs & controls',
        group: '/(forms|selects|selection|text-fields)',
        namespace: '/components',
        items: [
          { href: 'forms', title: 'Forms' },
          { href: 'selects', title: 'Selects' },
          { href: 'selection-controls', title: 'Selection controls' },
          { href: 'text-fields', title: 'Text fields' }
        ]
      },
      { href: 'icons', title: 'Icons' },
      { href: 'lists', title: 'Lists' },
      { href: 'jumbotrons', title: 'Jumbotrons', badge: 'new' },
      { href: 'menus', title: 'Menus' },
      { href: 'navigation-drawers', title: 'Navigation drawers' },
      { href: 'paginations', title: 'Paginations' },
      { href: 'parallax', title: 'Parallax' },
      { href: 'pickers', title: 'Pickers' },
      { href: 'progress', title: 'Progress' },
      { href: 'sliders', title: 'Sliders' },
      { href: 'snackbars', title: 'Snackbars' },
      { href: 'steppers', title: 'Steppers' },
      { href: 'subheaders', title: 'Subheaders' },
      { href: 'tabs', title: 'Tabs', badge: 'updated' },
      { href: 'toolbars', title: 'Toolbars', badge: 'updated' },
      { href: 'tooltips', title: 'Tooltips' }
    ]
  },
  {
    title: 'Directives',
    group: '/directives',
    icon: 'mdi-function',
    items: [
      { href: 'resizing', title: 'Resizing' },
      { href: 'ripples', title: 'Ripples' },
      { href: 'scrolling', title: 'Scrolling' },
      { href: 'touch-support', title: 'Touch support' }
    ]
  },
  { href: '/pre-made-themes', title: 'Pre-made themes', icon: 'mdi-theme-light-dark' },
  // { href: '/store', title: 'Store', icon: 'mdi-store', badge: 'coming soon' },
  { href: 'https://vuetify.threadless.com/', title: 'Store', icon: 'mdi-store', target: '_blank' },
  { divider: true },
  { header: 'Additional resources' },
  {
    title: 'Ecosystem',
    group: '/ecosystem',
    icon: 'mdi-earth',
    items: [
      { href: 'https://github.com/vuetifyjs/awesome-vuetify', title: 'Awesome Vuetify', target: '_blank', badge: 'new' }
    ]
  },
  {
    title: 'Community',
    group: '/community',
    icon: 'mdi-account-multiple',
    items: [
      { href: 'https://chat.vuetifyjs.com/', title: 'Chat and support', target: '_blank' },
      { href: 'https://github.com/vuetifyjs/vuetify/issues', title: 'Issue board', target: '_blank' },
      { href: 'https://stackoverflow.com/search?q=vuetify', title: 'Stack overflow', target: '_blank' },
    ]
  },
  {
    title: 'Advanced tutorials',
    group: '/guides',
    icon: 'mdi-television-guide',
    items: [
      { href: 'server-side-rendering', title: 'Server side rendering' },
      { href: 'a-la-carte', title: 'A la carte', badge: 'updated' }
    ]
  },
  {
    title: 'Theme generator',
    icon: 'mdi-format-paint',
    href: '/theme-generator',
    badge: 'new'
  }
]
