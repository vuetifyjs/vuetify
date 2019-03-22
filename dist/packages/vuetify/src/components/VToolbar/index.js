import { createSimpleFunctional } from '../../util/helpers';
import VToolbar from './VToolbar';
import VToolbarSideIcon from './VToolbarSideIcon';
var VToolbarTitle = createSimpleFunctional('v-toolbar__title');
var VToolbarItems = createSimpleFunctional('v-toolbar__items');
export { VToolbar, VToolbarSideIcon, VToolbarTitle, VToolbarItems };
export default {
    $_vuetify_subcomponents: {
        VToolbar: VToolbar,
        VToolbarItems: VToolbarItems,
        VToolbarTitle: VToolbarTitle,
        VToolbarSideIcon: VToolbarSideIcon
    }
};
//# sourceMappingURL=index.js.map