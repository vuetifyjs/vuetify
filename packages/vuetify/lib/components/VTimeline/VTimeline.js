var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles
import '../../../src/stylus/components/_timeline.styl';
import mixins from '../../util/mixins';
// Mixins
import Themeable from '../../mixins/themeable';
export default mixins(Themeable
/* @vue/component */
).extend({
    name: 'v-timeline',
    props: {
        alignTop: Boolean,
        dense: Boolean
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-timeline--align-top': this.alignTop,
                'v-timeline--dense': this.dense
            }, this.themeClasses);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-timeline',
            'class': this.classes
        }, this.$slots.default);
    }
});
//# sourceMappingURL=VTimeline.js.map