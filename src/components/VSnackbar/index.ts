import VSnackbar from './VSnackbar'

/* istanbul ignore next */
VSnackbar.install = function install (Vue) {
  Vue.component(VSnackbar.options.name, VSnackbar)
}

export { VSnackbar }
export default VSnackbar
