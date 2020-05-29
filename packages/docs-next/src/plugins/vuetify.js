/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import Vuetify from 'vuetify/lib/framework'

import {
  mdiBeaker,
  mdiCodepen,
  mdiCodeTags,
  mdiContentCopy,
  mdiGithub,
  mdiInvertColors,
  mdiOpenInNew,
  mdiSpeedometer,
  mdiTranslate,
  mdiViewDashboard,
} from '@mdi/js'

const icons = {
  iconfont: 'mdiSvg',
  values: {
    mdiBeaker,
    mdiCodepen,
    mdiCodeTags,
    mdiContentCopy,
    mdiGithub,
    mdiInvertColors,
    mdiOpenInNew,
    mdiSpeedometer,
    mdiTranslate,
    mdiViewDashboard,
  },
}

export function useVuetify (app) {
  app.use(Vuetify)
}

export function createVuetify () {
  return new Vuetify({ icons })
}
