import VImage from './VImage'

/* istanbul ignore next */
VImage.install = function install (Vue) {
  Vue.component(VImage.options.name, VImage)
}

export { VImage }
export default VImage
