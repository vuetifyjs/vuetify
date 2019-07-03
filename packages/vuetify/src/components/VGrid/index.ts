import {
  createSimpleFunctional,
} from '../../util/helpers'
import VContainer from './VContainer'
import VFlex from './VFlex'
import VLayout from './VLayout'

const VSpacer = createSimpleFunctional('spacer', 'div', 'v-spacer')

export {
  VContainer,
  VFlex,
  VLayout,
  VSpacer,
}

export default {
  $_vuetify_subcomponents: {
    VContainer,
    VFlex,
    VLayout,
    VSpacer,
  },
}
