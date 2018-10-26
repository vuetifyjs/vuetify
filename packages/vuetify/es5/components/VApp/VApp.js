'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Component level mixins

// Directives


require('../../../src/stylus/components/_app.styl');

var _appTheme = require('./mixins/app-theme');

var _appTheme2 = _interopRequireDefault(_appTheme);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _resize = require('../../directives/resize');

var _resize2 = _interopRequireDefault(_resize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-app',
    directives: {
        Resize: _resize2.default
    },
    mixins: [_appTheme2.default, _themeable2.default],
    props: {
        id: {
            type: String,
            default: 'app'
        },
        dark: Boolean
    },
    computed: {
        classes: function classes() {
            return _extends({
                'application--is-rtl': this.$vuetify.rtl
            }, this.themeClasses);
        }
    },
    watch: {
        dark: function dark() {
            this.$vuetify.dark = this.dark;
        }
    },
    mounted: function mounted() {
        this.$vuetify.dark = this.dark;
    },
    render: function render(h) {
        var data = {
            staticClass: 'application',
            'class': this.classes,
            attrs: { 'data-app': true },
            domProps: { id: this.id }
        };
        var wrapper = h('div', { staticClass: 'application--wrap' }, this.$slots.default);
        return h('div', data, [wrapper]);
    }
};
//# sourceMappingURL=VApp.js.map