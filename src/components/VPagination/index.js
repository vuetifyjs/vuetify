import VPagination from './VPagination'

/* istanbul ignore next */
VPagination.install = function install (Vue) {
  Vue.component(VPagination.name, VPagination)
}

export { VPagination }
export default VPagination
