var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Vue from 'vue';
import Vuetify from 'vuetify/es5/components/Vuetify';
import VBtn from 'vuetify/es5/components/VBtn';
import * as VCard from 'vuetify/es5/components/VCard';
import { Ripple } from 'vuetify/es5/directives';
import * as directives from 'vuetify/es5/directives';
Vuetify.install(Vue, {
    components: __assign({ VBtn: VBtn }, VCard),
    directives: __assign({ Ripple: Ripple }, directives)
});
Vue.extend({
    components: __assign({ VBtn: VBtn }, VCard),
    directives: {
        Ripple: Ripple
    }
});
//# sourceMappingURL=alacarte.js.map
//# sourceMappingURL=alacarte.js.map
//# sourceMappingURL=alacarte.js.map