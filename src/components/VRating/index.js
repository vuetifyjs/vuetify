import VRating from './VRating'

export { VRating }

/* istanbul ignore next */
VRating.install = function install (Vue) {
  Vue.component(VRating.name, VRating)
}

export default VRating
