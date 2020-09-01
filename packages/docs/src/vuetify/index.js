/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import { icons } from './icons'
import Vuetify from 'vuetify/lib/framework'

// Globals
import { IN_BROWSER, IS_PROD, IS_SERVER } from '@/util/globals'

export function useVuetify (app) {
  app.use(Vuetify)
}

export function createVuetify (store) {
  return new Vuetify({
    breakpoint: { mobileBreakpoint: 'md' },
    icons,
    theme: {
      dark: store.state.user.theme.dark,
      options: {
        themeCache: IN_BROWSER && IS_PROD ? {
          get: key => localStorage.getItem(key),
          set: (key, value) => localStorage.setItem(key, value),
        } : undefined,
        minifyTheme: IS_SERVER ? require('minify-css-string') : undefined,
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
}
