/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import {
  mdiContentCopy,
  mdiOpenInNew,
} from '@mdi/js'

Vue.use(Vuetify)

const icons = {
  iconfont: 'mdiSvg',
  values: {
    copy: mdiContentCopy,
    open: mdiOpenInNew,
  },
}

export function createVuetify () {
  return new Vuetify({ icons })
}
