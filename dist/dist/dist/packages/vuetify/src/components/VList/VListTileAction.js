// Types
import Vue from 'vue';
/* @vue/component */
export default Vue.extend({
    name: 'v-list-tile-action',
    functional: true,
    render: function (h, _a) {
        var data = _a.data, _b = _a.children, children = _b === void 0 ? [] : _b;
        data.staticClass = data.staticClass ? "v-list__tile__action " + data.staticClass : 'v-list__tile__action';
        var filteredChild = children.filter(function (VNode) {
            return VNode.isComment === false && VNode.text !== ' ';
        });
        if (filteredChild.length > 1)
            data.staticClass += ' v-list__tile__action--stack';
        return h('div', data, children);
    }
});
//# sourceMappingURL=VListTileAction.js.map
//# sourceMappingURL=VListTileAction.js.map
//# sourceMappingURL=VListTileAction.js.map