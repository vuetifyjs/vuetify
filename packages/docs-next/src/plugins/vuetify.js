/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import {
  mdiBeaker,
  mdiContentCopy,
  mdiOpenInNew,
  mdiSpeedometer,
  mdiTranslate,
  mdiViewDashboard,
} from '@mdi/js'

Vue.use(Vuetify)

const icons = {
  iconfont: 'mdiSvg',
  values: {
    mdiBeaker,
    mdiSpeedometer,
    mdiContentCopy,
    mdiOpenInNew,
    mdiTranslate,
    mdiViewDashboard,
  },
}

export function createVuetify () {
  return new Vuetify({ icons })
}
