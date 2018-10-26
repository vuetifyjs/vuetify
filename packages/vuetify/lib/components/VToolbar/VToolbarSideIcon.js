import VBtn from '../../components/VBtn';
import VIcon from '../../components/VIcon';
/* @vue/component */
export default {
    name: 'v-toolbar-side-icon',
    functional: true,
    render: function render(h, _ref) {
        var slots = _ref.slots,
            listeners = _ref.listeners,
            props = _ref.props,
            data = _ref.data;

        var classes = data.staticClass ? data.staticClass + ' v-toolbar__side-icon' : 'v-toolbar__side-icon';
        var d = Object.assign(data, {
            staticClass: classes,
            props: Object.assign(props, {
                icon: true
            }),
            on: listeners
        });
        var defaultSlot = slots().default;
        return h(VBtn, d, defaultSlot || [h(VIcon, '$vuetify.icons.menu')]);
    }
};
//# sourceMappingURL=VToolbarSideIcon.js.map