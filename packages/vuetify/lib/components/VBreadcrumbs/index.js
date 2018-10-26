import VBreadcrumbs from './VBreadcrumbs';
import VBreadcrumbsItem from './VBreadcrumbsItem';
import { createSimpleFunctional } from '../../util/helpers';
var VBreadcrumbsDivider = createSimpleFunctional('v-breadcrumbs__divider', 'li');
export { VBreadcrumbs, VBreadcrumbsItem, VBreadcrumbsDivider };
export default {
    $_vuetify_subcomponents: {
        VBreadcrumbs: VBreadcrumbs,
        VBreadcrumbsItem: VBreadcrumbsItem,
        VBreadcrumbsDivider: VBreadcrumbsDivider
    }
};
//# sourceMappingURL=index.js.map