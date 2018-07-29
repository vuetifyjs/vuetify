import VImg from './VImg'

/* istanbul ignore next */
VImg.install = function install (Vue) {
  Vue.component(VImg.options.name, VImg)
}

export { VImg }
export default VImg
