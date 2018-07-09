import VDataIterator from './VDataIterator'

/* istanbul ignore next */
VDataIterator.install = function install (Vue) {
  Vue.component(VDataIterator.name, VDataIterator)
}

export { VDataIterator }
export default VDataIterator
