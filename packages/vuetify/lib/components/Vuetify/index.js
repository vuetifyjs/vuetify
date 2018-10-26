import OurVue from 'vue';
import application from './mixins/application';
import breakpoint from './mixins/breakpoint';
import theme from './mixins/theme';
import icons from './mixins/icons';
import options from './mixins/options';
import genLang from './mixins/lang';
import goTo from './util/goTo';
// Utils
import { consoleWarn, consoleError } from '../../util/console';
var Vuetify = {
    install: function install(Vue) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.installed) return;
        this.installed = true;
        if (OurVue !== Vue) {
            consoleError('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this');
        }
        checkVueVersion(Vue);
        var lang = genLang(opts.lang);
        Vue.prototype.$vuetify = new Vue({
            mixins: [breakpoint],
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
            for (var name in opts.directives) {
                Vue.directive(name, opts.directives[name]);
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

    version: '1.3.3'
};
export function checkVueVersion(Vue, requiredVue) {
    var vueDep = requiredVue || '^2.5.10';
    var required = vueDep.split('.', 3).map(function (v) {
        return v.replace(/\D/g, '');
    }).map(Number);
    var actual = Vue.version.split('.', 3).map(function (n) {
        return parseInt(n, 10);
    });
    // Simple semver caret range comparison
    var passes = actual[0] === required[0] && ( // major matches
    actual[1] > required[1] || // minor is greater
    actual[1] === required[1] && actual[2] >= required[2] // or minor is eq and patch is >=
    );
    if (!passes) {
        consoleWarn('Vuetify requires Vue version ' + vueDep);
    }
}
export default Vuetify;
//# sourceMappingURL=index.js.map