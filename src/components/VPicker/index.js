import VPicker from './VPicker'

/* istanbul ignore next */
VPicker.install = function install (Vue) {
  Vue.component(VPicker.name, VPicker)
}

export { VPicker }
export default VPicker
