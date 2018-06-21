import {
  createSimpleFunctional
} from '../../util/helpers'
import VContainer from './VContainer'
import VContent from './VContent'
import VFlex from './VFlex'
import VLayout from './VLayout'

const VSpacer = createSimpleFunctional('spacer', 'div', 'v-spacer')

export {
  VContainer,
  VContent,
  VFlex,
  VLayout,
  VSpacer
}

const VGrid = {}

VGrid.$_vuetify_subcomponents = {
  VContainer,
  VContent,
  VFlex,
  VLayout,
  VSpacer
}

export default VGrid
