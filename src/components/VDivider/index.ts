import VDivider from './VDivider'

/* istanbul ignore next */
VDivider.install = function install (Vue) {
  Vue.component(VDivider.options.name, VDivider)
}

export { VDivider }
export default VDivider
