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
import '../../stylus/components/_labels.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable, { functionalThemeClasses } from '../../mixins/themeable';
import mixins from '../../util/mixins';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default mixins(Themeable).extend({
    name: 'v-label',
    functional: true,
    props: {
        absolute: Boolean,
        color: {
            type: [Boolean, String],
            default: 'primary'
        },
        disabled: Boolean,
        focused: Boolean,
        for: String,
        left: {
            type: [Number, String],
            default: 0
        },
        right: {
            type: [Number, String],
            default: 'auto'
        },
        value: Boolean
    },
    render: function (h, ctx) {
        var children = ctx.children, listeners = ctx.listeners, props = ctx.props;
        var data = {
            staticClass: 'v-label',
            'class': __assign({ 'v-label--active': props.value, 'v-label--is-disabled': props.disabled }, functionalThemeClasses(ctx)),
            attrs: {
                for: props.for,
                'aria-hidden': !props.for
            },
            on: listeners,
            style: {
                left: convertToUnit(props.left),
                right: convertToUnit(props.right),
                position: props.absolute ? 'absolute' : 'relative'
            }
        };
        return h('label', Colorable.options.methods.setTextColor(props.focused && props.color, data), children);
    }
});
//# sourceMappingURL=VLabel.js.map
//# sourceMappingURL=VLabel.js.map
//# sourceMappingURL=VLabel.js.map
//# sourceMappingURL=VLabel.js.map