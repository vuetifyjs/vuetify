import VBottomNav from './VBottomNav'

/* istanbul ignore next */
VBottomNav.install = function install (Vue) {
  Vue.component(VBottomNav.options.name, VBottomNav)
}

export { VBottomNav }
export default VBottomNav
