import VBtn from './VBtn'

/* istanbul ignore next */
VBtn.install = function install (Vue) {
  Vue.component((VBtn as any).options.name, VBtn)
}

export default VBtn
