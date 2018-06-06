import VIcon from './VIcon'

/* istanbul ignore next */
VIcon.install = function install (Vue) {
  Vue.component(VIcon.options.name, VIcon)
}

export { VIcon }
export default VIcon
