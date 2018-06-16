import VMenu from './VMenu'

/* istanbul ignore next */
VMenu.install = function install (Vue) {
  Vue.component(VMenu.name, VMenu)
}

export { VMenu }
export default VMenu
