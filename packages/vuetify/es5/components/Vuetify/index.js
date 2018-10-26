'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkVueVersion = checkVueVersion;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _application = require('./mixins/application');

var _application2 = _interopRequireDefault(_application);

var _breakpoint = require('./mixins/breakpoint');

var _breakpoint2 = _interopRequireDefault(_breakpoint);

var _theme = require('./mixins/theme');

var _theme2 = _interopRequireDefault(_theme);

var _icons = require('./mixins/icons');

var _icons2 = _interopRequireDefault(_icons);

var _options = require('./mixins/options');

var _options2 = _interopRequireDefault(_options);

var _lang = require('./mixins/lang');

var _lang2 = _interopRequireDefault(_lang);

var _goTo = require('./util/goTo');

var _goTo2 = _interopRequireDefault(_goTo);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vuetify = {
    install: function install(Vue) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.installed) return;
        this.installed = true;
        if (_vue2.default !== Vue) {
            (0, _console.consoleError)('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this');
        }
        checkVueVersion(Vue);
        var lang = (0, _lang2.default)(opts.lang);
        Vue.prototype.$vuetify = new Vue({
            mixins: [_breakpoint2.default],
            data: {
                application: _application2.default,
                dark: false,
                icons: (0, _icons2.default)(opts.iconfont, opts.icons),
                lang: lang,
                options: (0, _options2.default)(opts.options),
                rtl: opts.rtl,
                theme: (0, _theme2.default)(opts.theme)
            },
            methods: {
                goTo: _goTo2.default,
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
// Utils
function checkVueVersion(Vue, requiredVue) {
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
        (0, _console.consoleWarn)('Vuetify requires Vue version ' + vueDep);
    }
}
exports.default = Vuetify;
//# sourceMappingURL=index.js.map