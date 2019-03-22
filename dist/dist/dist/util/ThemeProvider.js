import Themeable from '../mixins/themeable';
import mixins from './mixins';
/* @vue/component */
export default mixins(Themeable).extend({
    name: 'theme-provider',
    props: {
        root: Boolean
    },
    computed: {
        isDark: function () {
            return this.root ? this.rootIsDark : Themeable.options.computed.isDark.call(this);
        }
    },
    render: function () {
        return this.$slots.default && this.$slots.default.find(function (node) { return !node.isComment && node.text !== ' '; });
    }
});
//# sourceMappingURL=ThemeProvider.js.map
//# sourceMappingURL=ThemeProvider.js.map
//# sourceMappingURL=ThemeProvider.js.map