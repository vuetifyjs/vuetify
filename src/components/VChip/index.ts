import VChip from './VChip'

/* istanbul ignore next */
VChip.install = function install (Vue) {
  Vue.component(VChip.options.name, VChip)
}

export { VChip }
export default VChip
