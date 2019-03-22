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
import '../../stylus/components/_subheaders.styl';
// Mixins
import Themeable from '../../mixins/themeable';
import mixins from '../../util/mixins';
export default mixins(Themeable
/* @vue/component */
).extend({
    name: 'v-subheader',
    props: {
        inset: Boolean
    },
    render: function (h) {
        return h('div', {
            staticClass: 'v-subheader',
            class: __assign({ 'v-subheader--inset': this.inset }, this.themeClasses),
            attrs: this.$attrs,
            on: this.$listeners
        }, this.$slots.default);
    }
});
//# sourceMappingURL=VSubheader.js.map
//# sourceMappingURL=VSubheader.js.map
//# sourceMappingURL=VSubheader.js.map
//# sourceMappingURL=VSubheader.js.map
//# sourceMappingURL=VSubheader.js.map