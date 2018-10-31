import VBreadcrumbs from './VBreadcrumbs'
import VBreadcrumbsItem from './VBreadcrumbsItem'
import { createSimpleFunctional } from '../../util/helpers'

const VBreadcrumbsDivider = createSimpleFunctional('v-breadcrumbs__divider', 'li')

export { VBreadcrumbs, VBreadcrumbsItem, VBreadcrumbsDivider }

export default {
  $_vuetify_subcomponents: {
    VBreadcrumbs,
    VBreadcrumbsItem,
    VBreadcrumbsDivider
  }
}
