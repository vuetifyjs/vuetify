/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import Vuetify from 'vuetify/lib/framework'

import {
  mdiAccount,
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
  mdiVuetify,
} from '@mdi/js'

const icons = {
  iconfont: 'mdiSvg',
  values: {
    mdiAccount,
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
    mdiVuetify,
  },
}

export function useVuetify (app) {
  app.use(Vuetify)
}

export function createVuetify () {
  return new Vuetify({ icons })
}
