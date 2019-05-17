import { VueConstructor } from 'vue'

import {
  createSimpleFunctional
} from 'vuetify/src/util/helpers'
import VContainer from './VContainer'
import VFlex from './VFlex'
import VLayout from './VLayout'

const VSpacer = createSimpleFunctional('spacer', 'div', 'v-spacer')

export {
  VContainer,
  VFlex,
  VLayout,
  VSpacer
}

declare const __VUETIFY_VERSION__: string

export default {
  install (Vue: VueConstructor) {
    Vue.component('VContainer', VContainer)
    Vue.component('VFlex', VFlex)
    Vue.component('VLayout', VLayout)
    Vue.component('VSpacer', VSpacer)
  },
  version: __VUETIFY_VERSION__
}
