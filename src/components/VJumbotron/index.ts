import VJumbotron from './VJumbotron'

/* istanbul ignore next */
VJumbotron.install = function install (Vue) {
  Vue.component(VJumbotron.options.name, VJumbotron)
}

export { VJumbotron }
export default VJumbotron
