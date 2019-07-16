import './VGrid.sass'

import { createSimpleFunctional } from '../../util/helpers'
import VContainer from './VContainer'
import VCol from './VCol'
import VRow from './VRow'
import VLayout from './VLayout'
import VFlex from './VFlex'

const VSpacer = createSimpleFunctional('spacer', 'div', 'v-spacer')

export {
  VContainer,
  VCol,
  VRow,
  VSpacer,
  VLayout,
  VFlex,
}

export default {
  $_vuetify_subcomponents: {
    VContainer,
    VCol,
    VRow,
    VSpacer,
    VLayout,
    VFlex,
  },
}
