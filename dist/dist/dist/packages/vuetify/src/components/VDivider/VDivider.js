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
// Styles
import '../../stylus/components/_dividers.styl';
// Mixins
import Themeable from '../../mixins/themeable';
export default Themeable.extend({
    name: 'v-divider',
    props: {
        inset: Boolean,
        vertical: Boolean
    },
    render: function (h) {
        return h('hr', {
            class: __assign({ 'v-divider': true, 'v-divider--inset': this.inset, 'v-divider--vertical': this.vertical }, this.themeClasses),
            attrs: this.$attrs,
            on: this.$listeners
        });
    }
});
//# sourceMappingURL=VDivider.js.map
//# sourceMappingURL=VDivider.js.map
//# sourceMappingURL=VDivider.js.map