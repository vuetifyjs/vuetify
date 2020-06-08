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
  mdiBookOpenPageVariant,
  mdiCodepen,
  mdiCodeTags,
  mdiContentCopy,
  mdiGithub,
  mdiInvertColors,
  mdiLinkVariant,
  mdiOpenInNew,
  mdiPlayCircle,
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
    mdiBookOpenPageVariant,
    mdiCodepen,
    mdiCodeTags,
    mdiContentCopy,
    mdiGithub,
    mdiInvertColors,
    mdiLinkVariant,
    mdiOpenInNew,
    mdiPlayCircle,
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
