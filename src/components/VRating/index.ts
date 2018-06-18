import VRating from './VRating'

/* istanbul ignore next */
VRating.install = function install (Vue) {
  Vue.component(VRating.options.name, VRating)
}

export { VRating }
export default VRating
