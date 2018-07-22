import VResponsive from './VResponsive'

/* istanbul ignore next */
VResponsive.install = function install (Vue) {
  Vue.component(VResponsive.options.name, VResponsive)
}

export { VResponsive }
export default VResponsive
