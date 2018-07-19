import VResponsive from './VResponsive'

VResponsive.install = function install (Vue) {
  Vue.component(VResponsive.options.name, VResponsive)
}

export { VResponsive }
export default VResponsive
