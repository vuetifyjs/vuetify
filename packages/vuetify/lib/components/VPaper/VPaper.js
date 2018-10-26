var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles
import '../../../src/stylus/components/_paper.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Elevatable from '../../mixins/elevatable';
import Measurable from '../../mixins/measurable';
import Themeable from '../../mixins/themeable';
// Helpers
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Elevatable, Measurable, Themeable).extend({
    name: 'v-paper',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        tile: Boolean
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-paper': true,
                'v-paper--tile': this.tile
            }, this.themeClasses, this.elevationClasses);
        },
        styles: function styles() {
            return this.measurableStyles;
        }
    },
    render: function render(h) {
        var data = {
            class: this.classes,
            style: this.styles
        };
        return h(this.tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});
//# sourceMappingURL=VPaper.js.map