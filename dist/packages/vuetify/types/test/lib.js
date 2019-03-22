import Vue from 'vue';
import Vuetify, { VBtn, VCard, VCardText, directives, colors } from 'vuetify/lib';
Vuetify.install(Vue, {
    components: {
        VBtn: VBtn,
        VCard: VCard,
        VCardText: VCardText
    },
    directives: directives,
    theme: {
        primary: colors.green,
        secondary: colors.blueGrey.base
    }
});
//# sourceMappingURL=lib.js.map