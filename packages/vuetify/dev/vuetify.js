import Vue from 'vue'
import Vuetify from 'vuetify'
import * as locales from '../src/locale'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales,
  },
})
