import VIcon from './VIcon'

/* istanbul ignore next */
VIcon.install = function install (Vue) {
  Vue.component((VIcon as any).options.name, VIcon)
}

export default VIcon
