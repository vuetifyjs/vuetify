import VRadioGroup from './VRadioGroup'
import VRadio from './VRadio'

export { VRadioGroup, VRadio }

/* istanbul ignore next */
VRadioGroup.install = function install (Vue) {
  Vue.component(VRadioGroup.name, VRadioGroup)
  Vue.component(VRadio.name, VRadio)
}

export default VRadioGroup
