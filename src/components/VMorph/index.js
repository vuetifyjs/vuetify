import VMorph from './VMorph'

/* istanbul ignore next */
VMorph.install = function install (Vue) {
  Vue.component(VMorph.name, VMorph)
}

export default VMorph
