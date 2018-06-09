import VTextarea from './VTextarea'

/* istanbul ignore next */
VTextarea.install = function install (Vue) {
  Vue.component(VTextarea.name, VTextarea)
}

export { VTextarea }
export default VTextarea
