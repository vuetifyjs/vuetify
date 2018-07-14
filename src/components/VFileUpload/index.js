import VFileUpload from './VFileUpload'

/* istanbul ignore next */
VFileUpload.install = function install (Vue) {
  Vue.component(VFileUpload.name, VFileUpload)
}

export { VFileUpload }
export default VFileUpload
