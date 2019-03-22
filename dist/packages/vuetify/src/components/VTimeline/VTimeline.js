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
import '../../stylus/components/_timeline.styl';
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
        classes: function () {
            return __assign({ 'v-timeline--align-top': this.alignTop, 'v-timeline--dense': this.dense }, this.themeClasses);
        }
    },
    render: function (h) {
        return h('div', {
            staticClass: 'v-timeline',
            'class': this.classes
        }, this.$slots.default);
    }
});
//# sourceMappingURL=VTimeline.js.map