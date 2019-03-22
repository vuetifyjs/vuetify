var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_sheet.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Elevatable from '../../mixins/elevatable';
import Measurable from '../../mixins/measurable';
import Themeable from '../../mixins/themeable';
// Helpers
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Elevatable, Measurable, Themeable).extend({
    name: 'v-sheet',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        tile: Boolean
    },
    computed: {
        classes: function () {
            return __assign({ 'v-sheet': true, 'v-sheet--tile': this.tile }, this.themeClasses, this.elevationClasses);
        },
        styles: function () {
            return this.measurableStyles;
        }
    },
    render: function (h) {
        var data = {
            class: this.classes,
            style: this.styles,
            on: this.$listeners
        };
        return h(this.tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});
//# sourceMappingURL=VSheet.js.map