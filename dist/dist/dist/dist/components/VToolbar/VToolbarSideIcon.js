import VBtn from '../VBtn';
import VIcon from '../VIcon';
import Vue from 'vue';
/* @vue/component */
export default Vue.extend({
    name: 'v-toolbar-side-icon',
    functional: true,
    render: function (h, _a) {
        var slots = _a.slots, listeners = _a.listeners, props = _a.props, data = _a.data;
        var classes = data.staticClass
            ? data.staticClass + " v-toolbar__side-icon"
            : 'v-toolbar__side-icon';
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
});
//# sourceMappingURL=VToolbarSideIcon.js.map
//# sourceMappingURL=VToolbarSideIcon.js.map
//# sourceMappingURL=VToolbarSideIcon.js.map
//# sourceMappingURL=VToolbarSideIcon.js.map