import VBreadcrumbs from './VBreadcrumbs'
import VBreadcrumbsItem from './VBreadcrumbsItem'
import { createSimpleFunctional } from '../../util/helpers'

const VBreadcrumbsDivider = createSimpleFunctional('v-breadcrumbs__divider', 'li')

export { VBreadcrumbs, VBreadcrumbsItem, VBreadcrumbsDivider }

/* istanbul ignore next */
VBreadcrumbs.install = function install (Vue) {
  Vue.component(VBreadcrumbs.options.name, VBreadcrumbs)
  Vue.component(VBreadcrumbsItem.options.name, VBreadcrumbsItem)
  Vue.component(VBreadcrumbsDivider.name!, VBreadcrumbsDivider)
}

export default VBreadcrumbs
