import VProgressLinear from './VProgressLinear'

/* istanbul ignore next */
VProgressLinear.install = function install (Vue) {
  Vue.component(VProgressLinear.options.name, VProgressLinear)
}

export { VProgressLinear }
export default VProgressLinear
