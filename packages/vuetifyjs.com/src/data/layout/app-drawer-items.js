export default [
  { header: 'Core documentation' },
  {
    title: 'Getting started',
    group: 'getting-started',
    icon: 'mdi-speedometer',
    items: [
      { name: 'QuickStart', title: 'Quick Start' },
      { name: 'WhyVuetify', title: 'Why Vuetify?' },
      { name: 'FrequentlyAskedQuestions', title: 'Frequently asked questions' },
      { name: 'SponsorsAndBackers', title: 'Sponsors and backers' },
      { name: 'Contributing', title: 'Contributing' },
      { name: 'Roadmap', title: 'Roadmap' },
      { name: 'Consulting', title: 'Consulting and support', badge: 'new' }
    ]
  },
  {
    title: 'Framework Options',
    group: 'framework',
    icon: 'mdi-buffer',
    items: [
      { name: 'Icons', title: 'Icons' },
      { name: 'Internationalization', title: 'Internationalization' }
    ]
  },
  {
    title: 'Application layout',
    group: 'layout',
    icon: 'mdi-page-layout-body',
    items: [
      { name: 'PreDefined', title: 'Pre-defined layouts' },
      { name: 'PreMadeThemes', title: 'Pre-made themes' },
      {
        title: 'Grid system',
        group: 'grid',
        namespace: 'layout',
        items: [
          { name: 'grid', title: 'Grid' },
          { name: 'grid-lists', title: 'Grid lists' }
        ]
      },
      { name: 'Breakpoints', title: 'Breakpoints' },
      { name: 'AspectRatios', title: 'Aspect ratios' },
      { name: 'Spacing', title: 'Spacing' },
      { name: 'Alignment', title: 'Text alignment' },
      { name: 'Display', title: 'Display' },
      { name: 'Elevation', title: 'Elevation' },
      { name: 'Sandbox', title: 'Sandbox' }
    ]
  },
  {
    title: 'Styles & themes',
    group: 'style',
    icon: 'mdi-format-color-fill',
    items: [
      { name: 'Colors', title: 'Colors' },
      { name: 'Theme', title: 'Theme' },
      { name: 'Typography', title: 'Typography' },
      { name: 'Content', title: 'Content' }
    ]
  },
  {
    title: 'Motion & transitions',
    group: 'motion',
    icon: 'mdi-clock-fast',
    items: [
      { name: 'Scrolling', title: 'Scrolling' },
      { name: 'Transitions', title: 'Transitions' }
    ]
  },
  {
    title: 'UI components',
    group: 'components',
    component: 'components/Doc',
    icon: 'mdi-view-dashboard',
    items: [
      { name: 'api-explorer', title: 'API explorer' },
      { name: 'alerts', title: 'Alerts' },
      { name: 'avatars', title: 'Avatars' },
      { name: 'badges', title: 'Badges' },
      { name: 'bottom-navigation', title: 'Bottom navigation' },
      { name: 'bottom-sheets', title: 'Bottom sheets' },
      { name: 'breadcrumbs', title: 'Breadcrumbs' },
      { name: 'buttons', title: 'Buttons' },
      { name: 'floating-action-buttons', title: 'Buttons: Floating Action Buttons' },
      { name: 'cards', title: 'Cards' },
      { name: 'carousels', title: 'Carousels' },
      { name: 'chips', title: 'Chips' },
      { name: 'data-iterator', title: 'Data iterator' },
      { name: 'data-tables', title: 'Data tables' },
      { name: 'dialogs', title: 'Dialogs' },
      { name: 'dividers', title: 'Dividers' },
      { name: 'expansion-panels', title: 'Expansion panels' },
      { name: 'footer', title: 'Footer' },
      {
        title: 'Inputs & controls',
        group: '(autocompletes|combobox|forms|inputs|overflow-btns|selects|selection|text-fields|sliders|textarea)',
        namespace: 'components',
        items: [
          { name: 'autocompletes', title: 'Autocompletes' },
          { name: 'combobox', title: 'Combobox' },
          { name: 'forms', title: 'Forms' },
          { name: 'inputs', title: 'Inputs' },
          { name: 'overflow-btns', title: 'Overflow Buttons' },
          { name: 'selects', title: 'Selects' },
          { name: 'selection-controls', title: 'Selection controls' },
          { name: 'sliders', title: 'Sliders' },
          { name: 'textarea', title: 'Textareas' },
          { name: 'text-fields', title: 'Text fields' }
        ]
      },
      { name: 'hover', title: 'Hover' },
      { name: 'icons', title: 'Icons' },
      { name: 'images', 'title': 'Images' },
      { name: 'jumbotrons', title: 'Jumbotrons', badge: 'deprecated', color: 'black' },
      { name: 'lists', title: 'Lists' },
      { name: 'menus', title: 'Menus' },
      { name: 'navigation-drawers', title: 'Navigation drawers' },
      { name: 'paginations', title: 'Paginations' },
      { name: 'parallax', title: 'Parallax' },
      {
        title: 'Pickers',
        group: '(date-pickers|time-pickers)',
        namespace: 'components',
        items: [
          { name: 'date-pickers', title: 'Date pickers' },
          { name: 'time-pickers', title: 'Time pickers' }
        ]
      },
      { name: 'progress', title: 'Progress' },
      { name: 'ratings', title: 'Ratings' },
      { name: 'snackbars', title: 'Snackbars' },
      { name: 'steppers', title: 'Steppers' },
      { name: 'subheaders', title: 'Subheaders' },
      { name: 'tabs', title: 'Tabs' },
      { name: 'timelines', title: 'Timelines', badge: 'new' },
      { name: 'toolbars', title: 'Toolbars' },
      { name: 'tooltips', title: 'Tooltips' },
      { name: 'windows', title: 'Windows', badge: 'new' }
    ]
  },
  {
    title: 'Directives',
    group: 'directives',
    component: 'components/Doc',
    icon: 'mdi-function',
    items: [
      { name: 'resizing', title: 'Resizing' },
      { name: 'ripples', title: 'Ripples' },
      { name: 'scrolling', title: 'Scrolling' },
      { name: 'touch-support', title: 'Touch support' }
    ]
  },
  { divider: true },
  { header: 'Additional resources' },
  {
    title: 'Advanced tutorials',
    group: 'guides',
    icon: 'mdi-television-guide',
    items: [
      { name: 'SSR', title: 'Server side rendering' },
      { name: 'ALaCarte', title: 'A la carte' }
    ]
  },
  {
    title: 'Theme generator',
    icon: 'mdi-format-paint',
    name: 'ThemeGenerator'
  }
]
