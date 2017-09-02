import {
  createSimpleFunctional
} from '../../util/helpers'
import VContainer from './VContainer'
import VFlex from './VFlex'
import VLayout from './VLayout'

export const VSpacer = createSimpleFunctional('spacer')
export {
  VContainer,
  VFlex,
  VLayout
}

const VGrid = {}

VGrid.install = function install (Vue) {
  Vue.component(VContainer.name, VContainer)
  Vue.component(VFlex.name, VFlex)
  Vue.component(VLayout.name, VLayout)
  Vue.component(VSpacer.name, VSpacer)
}

export default VGrid
