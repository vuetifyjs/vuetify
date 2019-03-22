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
import '../../stylus/components/_app.styl';
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
    mixins: [
        AppTheme,
        Themeable
    ],
    props: {
        id: {
            type: String,
            default: 'app'
        },
        dark: Boolean
    },
    computed: {
        classes: function () {
            return __assign({ 'application--is-rtl': this.$vuetify.rtl }, this.themeClasses);
        }
    },
    watch: {
        dark: function () {
            this.$vuetify.dark = this.dark;
        }
    },
    mounted: function () {
        this.$vuetify.dark = this.dark;
    },
    render: function (h) {
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
//# sourceMappingURL=VApp.js.map