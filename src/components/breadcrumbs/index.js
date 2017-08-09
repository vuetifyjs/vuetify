import VBreadcrumbs from './VBreadcrumbs'
import VBreadcrumbsItem from './VBreadcrumbsItem'

export default function install (Vue) {
  Vue.component('v-breadcrumbs', VBreadcrumbs)
  Vue.component('v-breadcrumbs-item', VBreadcrumbsItem)
}
