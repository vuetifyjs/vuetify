import VAlert from './VAlert'

/* istanbul ignore next */
VAlert.install = function install (Vue) {
  Vue.component(VAlert.options.name, VAlert)
}

export { VAlert }
export default VAlert
