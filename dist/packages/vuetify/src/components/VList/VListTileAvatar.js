// Components
import VAvatar from '../VAvatar';
// Types
import Vue from 'vue';
/* @vue/component */
export default Vue.extend({
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
    render: function (h, _a) {
        var data = _a.data, children = _a.children, props = _a.props;
        data.staticClass = ("v-list__tile__avatar " + (data.staticClass || '')).trim();
        var avatar = h(VAvatar, {
            props: {
                color: props.color,
                size: props.size,
                tile: props.tile
            }
        }, [children]);
        return h('div', data, [avatar]);
    }
});
//# sourceMappingURL=VListTileAvatar.js.map