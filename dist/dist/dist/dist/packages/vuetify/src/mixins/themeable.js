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
export function functionalThemeClasses(context) {
    var vm = __assign({}, context.props, context.injections);
    var isDark = Themeable.options.computed.isDark.call(vm);
    return Themeable.options.computed.themeClasses.call({ isDark: isDark });
}
/* @vue/component */
var Themeable = Vue.extend().extend({
    name: 'themeable',
    provide: function () {
        return {
            theme: this.themeableProvide
        };
    },
    inject: {
        theme: {
            default: {
                isDark: false
            }
        }
    },
    props: {
        dark: {
            type: Boolean,
            default: null
        },
        light: {
            type: Boolean,
            default: null
        }
    },
    data: function () {
        return {
            themeableProvide: {
                isDark: false
            }
        };
    },
    computed: {
        isDark: function () {
            if (this.dark === true) {
                // explicitly dark
                return true;
            }
            else if (this.light === true) {
                // explicitly light
                return false;
            }
            else {
                // inherit from parent, or default false if there is none
                return this.theme.isDark;
            }
        },
        themeClasses: function () {
            return {
                'theme--dark': this.isDark,
                'theme--light': !this.isDark
            };
        },
        /** Used by menus and dialogs, inherits from v-app instead of the parent */
        rootIsDark: function () {
            if (this.dark === true) {
                // explicitly dark
                return true;
            }
            else if (this.light === true) {
                // explicitly light
                return false;
            }
            else {
                // inherit from v-app
                return this.$vuetify.dark;
            }
        },
        rootThemeClasses: function () {
            return {
                'theme--dark': this.rootIsDark,
                'theme--light': !this.rootIsDark
            };
        }
    },
    watch: {
        isDark: {
            handler: function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.themeableProvide.isDark = this.isDark;
                }
            },
            immediate: true
        }
    }
});
export default Themeable;
//# sourceMappingURL=themeable.js.map
//# sourceMappingURL=themeable.js.map
//# sourceMappingURL=themeable.js.map
//# sourceMappingURL=themeable.js.map