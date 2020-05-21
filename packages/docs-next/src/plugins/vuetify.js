/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import {
  mdiContentCopy,
} from '@mdi/js'

Vue.use(Vuetify)

const icons = {
  iconfont: 'mdiSvg',
  values: {
    copy: mdiContentCopy,
  },
}

export function createVuetify () {
  return new Vuetify({ icons })
}
