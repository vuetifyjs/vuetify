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
import '../../stylus/components/_counters.styl';
// Mixins
import Themeable, { functionalThemeClasses } from '../../mixins/themeable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Themeable).extend({
    name: 'v-counter',
    functional: true,
    props: {
        value: {
            type: [Number, String],
            default: ''
        },
        max: [Number, String]
    },
    render: function (h, ctx) {
        var props = ctx.props;
        var max = parseInt(props.max, 10);
        var value = parseInt(props.value, 10);
        var content = max ? value + " / " + max : props.value;
        var isGreater = max && (value > max);
        return h('div', {
            staticClass: 'v-counter',
            class: __assign({ 'error--text': isGreater }, functionalThemeClasses(ctx))
        }, content);
    }
});
//# sourceMappingURL=VCounter.js.map
//# sourceMappingURL=VCounter.js.map
//# sourceMappingURL=VCounter.js.map
//# sourceMappingURL=VCounter.js.map