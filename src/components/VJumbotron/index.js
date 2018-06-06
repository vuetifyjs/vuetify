import VJumbotron from './VJumbotron'

/* istanbul ignore next */
VJumbotron.install = function install (Vue) {
  Vue.component(VJumbotron.name, VJumbotron)
}

export { VJumbotron }
export default VJumbotron
