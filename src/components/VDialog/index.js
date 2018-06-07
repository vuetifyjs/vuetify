import VDialog from './VDialog'

/* istanbul ignore next */
VDialog.install = function install (Vue) {
  Vue.component(VDialog.name, VDialog)
}

export { VDialog }
export default VDialog
