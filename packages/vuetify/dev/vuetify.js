import Vue from 'vue'
import Vuetify from 'vuetify'
import * as locales from '../src/locale'
import '@mdi/font/css/materialdesignicons.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faTimesCircle)

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales,
  },
  icons: {
    iconfont: 'mdi',
    // iconfont: 'faSvg',
  },
})
