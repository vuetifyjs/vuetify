/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import { icons } from './icons'
import Vuetify from 'vuetify/lib/framework'

// Globals
import { IS_SERVER } from '@/util/globals'

export function useVuetify (app) {
  app.use(Vuetify)
}

export function createVuetify (store) {
  const vuetify = new Vuetify({
    breakpoint: { mobileBreakpoint: 'md' },
    icons,
    theme: {
      dark: store.state.user.theme.dark,
      options: {
        minifyTheme: IS_SERVER ? require('minify-css-string').default : undefined,
        variations: false,
      },
      themes: {
        light: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          tertiary: '#E57373',
          accent: '#005CAF',
        },
      },
    },
    rtl: store.state.user.rtl,
  })

  if (!IS_SERVER) {
    store.watch(state => state.user.theme.dark, val => {
      vuetify.framework.theme.dark = val
    })
  }

  return vuetify
}
