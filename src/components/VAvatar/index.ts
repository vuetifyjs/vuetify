import VAvatar from './VAvatar'

/* istanbul ignore next */
VAvatar.install = function install (Vue) {
  Vue.component(VAvatar.options.name, VAvatar)
}

export { VAvatar }
export default VAvatar
