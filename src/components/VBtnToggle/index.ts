import VBtnToggle from './VBtnToggle'

/* istanbul ignore next */
VBtnToggle.install = function install (Vue) {
  Vue.component(VBtnToggle.options.name, VBtnToggle)
}

export { VBtnToggle }
export default VBtnToggle
