var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import './stylus/app.styl';
import VuetifyComponent from './components/Vuetify';
import * as components from './components';
import directives from './directives';
var Vuetify = {
    install: function (Vue, args) {
        Vue.use(VuetifyComponent, __assign({ components: components,
            directives: directives }, args));
    },
    version: __VUETIFY_VERSION__
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vuetify);
}
export default Vuetify;
//# sourceMappingURL=index.js.map