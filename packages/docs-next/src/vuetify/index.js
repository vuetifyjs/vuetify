/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import { icons } from './icons'
import minifyTheme from 'minify-css-string'
import Vuetify from 'vuetify/lib/framework'

// Globals
import { IN_BROWSER, IS_PROD } from '@/util/globals'

export function useVuetify (app) {
  app.use(Vuetify)
}

export function createVuetify () {
  return new Vuetify({
    breakpoint: { mobileBreakpoint: 'sm' },
    icons,
    theme: {
      options: {
        themeCache: IN_BROWSER && IS_PROD ? {
          get: key => localStorage.getItem(key),
          set: (key, value) => localStorage.setItem(key, value),
        } : undefined,
        minifyTheme,
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
  })
}
