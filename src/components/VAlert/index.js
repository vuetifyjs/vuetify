import VAlert from './VAlert'

/* istanbul ignore next */
VAlert.install = function install (Vue) {
  Vue.component(VAlert.name, VAlert)
}

export default VAlert
