import VTooltip from './VTooltip'

/* istanbul ignore next */
VTooltip.install = function install (Vue) {
  Vue.component(VTooltip.name, VTooltip)
}

export { VTooltip }
export default VTooltip
