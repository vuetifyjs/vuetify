import VBreadcrumbs from './VBreadcrumbs'
import VBreadcrumbsItem from './VBreadcrumbsItem'

export { VBreadcrumbs, VBreadcrumbsItem }

VBreadcrumbs.install = function install (Vue) {
  Vue.component(VBreadcrumbs.name, VBreadcrumbs)
  Vue.component(VBreadcrumbsItem.name, VBreadcrumbsItem)
}

export default VBreadcrumbs
