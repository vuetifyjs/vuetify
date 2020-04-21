import Vue from 'vue'
import Vuetify from 'vuetify'
import minifyTheme from 'minify-css-string'
import goTo from 'vuetify/es5/services/goto'

Vue.use(Vuetify)

export function createVuetify () {
  const vuetify = new Vuetify({
    theme: {
      options: {
        themeCache: typeof document !== 'undefined' ? {
          get: key => localStorage.getItem(key),
          set: (key, value) => localStorage.setItem(key, value),
        } : undefined,
        minifyTheme,
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

  // Using goTo for scroll options means it
  // doesn't have access to framework.application
  // stub it oout here so that it continues to work
  // TODO: Figure out how to avoid this
  goTo.framework = vuetify.framework

  return vuetify
}
