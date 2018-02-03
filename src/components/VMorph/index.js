import VMorph from './VMorph'
import VMorphToolbar from './VMorphToolbar'

/* istanbul ignore next */
VMorph.install = function install (Vue) {
  Vue.component(VMorph.name, VMorph)
  Vue.component(VMorphToolbar.name, VMorphToolbar)
}

export { VMorphToolbar }

export default VMorph
