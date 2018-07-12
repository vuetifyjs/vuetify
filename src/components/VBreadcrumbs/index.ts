import VBreadcrumbs from './VBreadcrumbs'
import VBreadcrumbsItem from './VBreadcrumbsItem'

export { VBreadcrumbs, VBreadcrumbsItem }

/* istanbul ignore next */
VBreadcrumbs.install = function install (Vue) {
  Vue.component(VBreadcrumbs.options.name, VBreadcrumbs)
  Vue.component(VBreadcrumbsItem.options.name, VBreadcrumbsItem)
}

export default VBreadcrumbs
