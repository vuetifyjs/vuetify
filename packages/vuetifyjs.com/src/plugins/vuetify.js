// Packages
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  theme: {
    primary: '#094A7F',
    secondary: '#5CBBF6',
    tertiary: '#E57373',
    accent: '#005CAF'
  },
  options: {
    minifyTheme: css => {
      return process.env.NODE_ENV === 'production'
        ? css.replace(/[\s|\r\n|\r|\n]/g, '')
        : css
    }
  }
})
