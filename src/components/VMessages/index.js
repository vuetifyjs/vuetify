import VMessages from './VMessages'

/* istanbul ignore next */
VMessages.install = function install (Vue) {
  Vue.component(VMessages.name, VMessages)
}

export { VMessages }
export default VMessages
