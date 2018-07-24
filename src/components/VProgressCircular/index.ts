import VProgressCircular from './VProgressCircular'

/* istanbul ignore next */
VProgressCircular.install = function install (Vue) {
  Vue.component(VProgressCircular.options.name, VProgressCircular)
}

export { VProgressCircular }
export default VProgressCircular
