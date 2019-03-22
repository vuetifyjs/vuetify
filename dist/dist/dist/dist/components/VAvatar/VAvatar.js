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
import '../../stylus/components/_avatars.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import { convertToUnit } from '../../util/helpers';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable).extend({
    name: 'v-avatar',
    functional: true,
    props: {
        // TODO: inherit these
        color: String,
        size: {
            type: [Number, String],
            default: 48
        },
        tile: Boolean
    },
    render: function (h, _a) {
        var data = _a.data, props = _a.props, children = _a.children;
        data.staticClass = ("v-avatar " + (data.staticClass || '')).trim();
        if (props.tile)
            data.staticClass += ' v-avatar--tile';
        var size = convertToUnit(props.size);
        data.style = __assign({ height: size, width: size }, data.style);
        return h('div', Colorable.options.methods.setBackgroundColor(props.color, data), children);
    }
});
//# sourceMappingURL=VAvatar.js.map
//# sourceMappingURL=VAvatar.js.map
//# sourceMappingURL=VAvatar.js.map
//# sourceMappingURL=VAvatar.js.map