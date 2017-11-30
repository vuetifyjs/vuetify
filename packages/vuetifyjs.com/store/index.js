import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  const api = require('@/api/api.js')
  const releases = require('../router/releases.json')

  return new Vuex.Store({
    state: {
      api,
      appDrawer: null,
      appDrawerItems: [
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
            { href: 'alignment', title: 'Alignment' },
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
            { href: 'data-tables', title: 'Data tables' },
            { href: 'dialogs', title: 'Dialogs' },
            { href: 'dividers', title: 'Dividers' },
            { href: 'expansion-panels', title: 'Expansion panels' },
            { href: 'footer', title: 'Footer' },
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
            {
              title: 'Grid & breakpoints',
              group: '/grid',
              namespace: '/components',
              items: [
                { href: 'grid', title: 'Grid' },
                { href: 'grid-lists', title: 'Grid lists' },
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
            { href: 'tabs', title: 'Tabs' },
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
        { href: 'https://vuetify.threadless.com/', title: 'Shop', target: '_blank', icon: 'mdi-store' },
        { divider: true },
        { header: 'Additional resources' },
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
        }
      ],
      appFooter: true,
      currentVersion: null,
      releases,
      stateless: false,
      supporters: {
        diamond: [
          { 
            title: 'LMAX Exchange',
            size: 80,
            href: 'https://careers.lmax.com/?utm_source=vuetify&utm_medium=logo-link&utm_campaign=lmax-careers',
            src: 'backers/lmax-exchange.png'
          },
          {
            title: 'Intygrate',
            size: 80,
            href: 'http://intygrate.com/',
            src: 'backers/intygrate.png'
          }
        ],
        palladium: [
          { title: 'Eikos Partners', size: 50, href: 'http://www.eikospartners.com/', src: 'backers/eikos-partners.webp' },
          { title: 'rateGenius', size: 50, href: 'https://application.rategenius.com/', src: 'backers/rate-genius.png' }
        ],
        gold: [
          { title: 'Deister Software', href: 'http://www.deister.es/', src: 'backers/deister-logo-light.png' },
          { title: 'Cocoatech', href: 'https://cocoatech.com/', src: 'backers/cocoatechlogo.png' },
          { title: 'Cycloid', href: 'https://www.cycloid.io/', src: 'backers/cycloid.png' },
          { title: 'Live Casino', href: 'https://livecasino.com/', src: 'backers/casino.webp', dark: true },
          { title: 'Nate Controls', href: 'http://www.natecontrols.com/', src: 'backers/n8controls.png' },
          { title: 'Trek10', href: 'https://www.trek10.com/', src: 'backers/trek10.svg' }
        ],
        affiliates: [
          {
            title: 'VueJobs',
            href: 'https://vuejobs.com/?utm_source=vuejobs&utm_medium=affiliates&utm_campaign=linking',
            noref: true,
            src: 'affiliates/vuejobs-logo.svg'
          },
          { title: 'Made with Vue.js', href: 'https://madewithvuejs.com', src: 'affiliates/madewithvuejs.png' },
          { title: 'Vue.js Radar', href: 'https://vuejsradar.com', src: 'affiliates/vueradar2.png' }
        ],
        sponsors: [
          { title: 'BrowserStack', size: 35, href: 'https://www.browserstack.com/', src: 'browser-stack.png' },
          { title: 'Cloudflare', size: 35, href: 'https://www.cloudflare.com/', src: 'cloudflare.svg' }
        ]
      }
    },

    actions: {},

    mutations: {
      ['app/STATELESS'] (state, payload) {
        state.stateless = payload
      },
      ['app/DRAWER'] (state, payload) {
        state.appDrawer = payload
      },
      ['app/DRAWER_TOGGLE'] (state) {
        state.appDrawer = !state.appDrawer
      },
      ['app/FOOTER'] (state, payload) {
        state.appFooter = payload
      },
      ['app/PREVIOUS'] (state, payload) {
        state.previous = payload
      },
      ['app/NEXT'] (state, payload) {
        state.next = payload
      }
    },

    getters: {}
  })
}