import VSystemBar from './VSystemBar'

/* istanbul ignore next */
VSystemBar.install = function install (Vue) {
  Vue.component(VSystemBar.name, VSystemBar)
}

export { VSystemBar }
export default VSystemBar
