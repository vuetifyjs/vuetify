var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import '../../../src/stylus/components/_app.styl';
// Component level mixins
import AppTheme from './mixins/app-theme';
import Themeable from '../../mixins/themeable';
// Directives
import Resize from '../../directives/resize';
/* @vue/component */
export default {
    name: 'v-app',
    directives: {
        Resize: Resize
    },
    mixins: [AppTheme, Themeable],
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