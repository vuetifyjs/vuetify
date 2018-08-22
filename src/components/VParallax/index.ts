import VParallax from './VParallax'

/* istanbul ignore next */
VParallax.install = function install (Vue) {
  Vue.component(VParallax.options.name, VParallax)
}

export { VParallax }
export default VParallax
