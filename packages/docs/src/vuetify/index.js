import Vue from 'vue'
import Vuetify from 'vuetify'
import goTo from 'vuetify/es5/services/goto'

Vue.use(Vuetify)

export function createVuetify (ssrContext) {
  const vuetify = new Vuetify({
    ssr: Boolean(ssrContext),
    theme: {
      themes: {
        light: {
          primary: '#1867c0',
          secondary: '#5CBBF6',
          tertiary: '#E57373',
          accent: '#005CAF'
        }
      }
    },
    options: {
      minifyTheme: css => {
        return process.env.NODE_ENV === 'production'
          ? css.replace(/[\s|\r\n|\r|\n]/g, '')
          : css
      }
    }
  })

  // Using goTo for scroll options means it
  // doesn't have access to framework.application
  // stub it oout here so that it continues to work
  // TODO: Figure out how to avoid this
  goTo.framework = vuetify.framework

  return vuetify
}
