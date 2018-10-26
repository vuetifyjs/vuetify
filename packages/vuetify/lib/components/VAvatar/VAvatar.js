var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import '../../../src/stylus/components/_avatars.styl';
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
    render: function render(h, _ref) {
        var data = _ref.data,
            props = _ref.props,
            children = _ref.children;

        data.staticClass = ('v-avatar ' + (data.staticClass || '')).trim();
        if (props.tile) data.staticClass += ' v-avatar--tile';
        var size = convertToUnit(props.size);
        data.style = _extends({
            height: size,
            width: size
        }, data.style);
        return h('div', Colorable.options.methods.setBackgroundColor(props.color, data), children);
    }
});
//# sourceMappingURL=VAvatar.js.map