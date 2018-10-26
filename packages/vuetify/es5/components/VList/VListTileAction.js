'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* @vue/component */
exports.default = {
    name: 'v-list-tile-action',
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data,
            _ref$children = _ref.children,
            children = _ref$children === undefined ? [] : _ref$children;

        data.staticClass = data.staticClass ? 'v-list__tile__action ' + data.staticClass : 'v-list__tile__action';
        var filteredChild = children.filter(function (VNode) {
            return VNode.isComment === false && VNode.text !== ' ';
        });
        if (filteredChild.length > 1) data.staticClass += ' v-list__tile__action--stack';
        return h('div', data, children);
    }
};
//# sourceMappingURL=VListTileAction.js.map