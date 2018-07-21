import VPaper from './VPaper'

/* istanbul ignore next */
VPaper.install = function install (Vue) {
  Vue.component(VPaper.options.name, VPaper)
}

export { VPaper }
export default VPaper
