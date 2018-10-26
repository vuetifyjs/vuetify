// Components
import VAvatar from '../VAvatar';
/* @vue/component */
export default {
    name: 'v-list-tile-avatar',
    functional: true,
    props: {
        color: String,
        size: {
            type: [Number, String],
            default: 40
        },
        tile: Boolean
    },
    render: function render(h, _ref) {
        var data = _ref.data,
            children = _ref.children,
            props = _ref.props;

        data.staticClass = ('v-list__tile__avatar ' + (data.staticClass || '')).trim();
        var avatar = h(VAvatar, {
            props: {
                color: props.color,
                size: props.size,
                tile: props.tile
            }
        }, [children]);
        return h('div', data, [avatar]);
    }
};
//# sourceMappingURL=VListTileAvatar.js.map