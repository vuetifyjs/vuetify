import { createSimpleFunctional } from '../../util/helpers';
import VCard from './VCard';
import VCardMedia from './VCardMedia';
import VCardTitle from './VCardTitle';
var VCardActions = createSimpleFunctional('v-card__actions');
var VCardText = createSimpleFunctional('v-card__text');
export { VCard, VCardMedia, VCardTitle, VCardActions, VCardText };
export default {
    $_vuetify_subcomponents: {
        VCard: VCard,
        VCardMedia: VCardMedia,
        VCardTitle: VCardTitle,
        VCardActions: VCardActions,
        VCardText: VCardText
    }
};
//# sourceMappingURL=index.js.map