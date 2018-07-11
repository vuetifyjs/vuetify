import VBadge from './VBadge'

/* istanbul ignore next */
VBadge.install = function install (Vue) {
  Vue.component(VBadge.options.name, VBadge)
}

export { VBadge }
export default VBadge
