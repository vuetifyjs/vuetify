/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import Vuetify from 'vuetify/lib/framework'
import { icons } from './icons'
import minifyTheme from 'minify-css-string'

export function useVuetify (app) {
  app.use(Vuetify)
}

export function createVuetify () {
  return new Vuetify({
    icons,
    theme: {
      options: {
        themeCache: typeof window !== 'undefined' ? {
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
