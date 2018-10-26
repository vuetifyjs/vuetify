import { createSimpleFunctional } from '../../util/helpers';
import VCard from './VCard';
import VCardMedia from './VCardMedia';
import VCardTitle from './VCardTitle';
import Vue from 'vue';
var VCardActions = Vue.extend(createSimpleFunctional('v-card__actions'));
var VCardText = Vue.extend(createSimpleFunctional('v-card__text'));
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