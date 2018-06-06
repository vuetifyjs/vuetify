import VSwitch from './VSwitch'

/* istanbul ignore next */
VSwitch.install = function install (Vue) {
  Vue.component(VSwitch.name, VSwitch)
}

export { VSwitch }
export default VSwitch
