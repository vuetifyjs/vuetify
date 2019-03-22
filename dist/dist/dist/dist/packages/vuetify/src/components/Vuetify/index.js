import OurVue from 'vue';
import application from './mixins/application';
import breakpoint from './mixins/breakpoint';
import theme from './mixins/theme';
import icons from './mixins/icons';
import options from './mixins/options';
import genLang from './mixins/lang';
import goTo from './goTo';
// Utils
import { consoleWarn, consoleError } from '../../util/console';
var Vuetify = {
    install: function (Vue, opts) {
        if (opts === void 0) {
            opts = {};
        }
        if (this.installed)
            return;
        this.installed = true;
        if (OurVue !== Vue) {
            consoleError('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this');
        }
        checkVueVersion(Vue);
        var lang = genLang(opts.lang);
        Vue.prototype.$vuetify = new Vue({
            mixins: [
                breakpoint(opts.breakpoint)
            ],
            data: {
                application: application,
                dark: false,
                icons: icons(opts.iconfont, opts.icons),
                lang: lang,
                options: options(opts.options),
                rtl: opts.rtl,
                theme: theme(opts.theme)
            },
            methods: {
                goTo: goTo,
                t: lang.t.bind(lang)
            }
        });
        if (opts.directives) {
            for (var name_1 in opts.directives) {
                Vue.directive(name_1, opts.directives[name_1]);
            }
        }
        (function registerComponents(components) {
            if (components) {
                for (var key in components) {
                    var component = components[key];
                    if (component && !registerComponents(component.$_vuetify_subcomponents)) {
                        Vue.component(key, component);
                    }
                }
                return true;
            }
            return false;
        })(opts.components);
    },
    version: __VUETIFY_VERSION__
};
export function checkVueVersion(Vue, requiredVue) {
    var vueDep = requiredVue || __REQUIRED_VUE__;
    var required = vueDep.split('.', 3).map(function (v) { return v.replace(/\D/g, ''); }).map(Number);
    var actual = Vue.version.split('.', 3).map(function (n) { return parseInt(n, 10); });
    // Simple semver caret range comparison
    var passes = actual[0] === required[0] && // major matches
        (actual[1] > required[1] || // minor is greater
            (actual[1] === required[1] && actual[2] >= required[2]) // or minor is eq and patch is >=
        );
    if (!passes) {
        consoleWarn("Vuetify requires Vue version " + vueDep);
    }
}
export default Vuetify;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map