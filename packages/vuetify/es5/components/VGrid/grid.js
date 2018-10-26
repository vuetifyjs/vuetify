'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Grid;
function Grid(name) {
    /* @vue/component */
    return {
        name: 'v-' + name,
        functional: true,
        props: {
            id: String,
            tag: {
                type: String,
                default: 'div'
            }
        },
        render: function render(h, _ref) {
            var props = _ref.props,
                data = _ref.data,
                children = _ref.children;

            data.staticClass = (name + ' ' + (data.staticClass || '')).trim();
            if (data.attrs) {
                var classes = Object.keys(data.attrs).filter(function (key) {
                    // TODO: Remove once resolved
                    // https://github.com/vuejs/vue/issues/7841
                    if (key === 'slot') return false;
                    var value = data.attrs[key];
                    return value || typeof value === 'string';
                });
                if (classes.length) data.staticClass += ' ' + classes.join(' ');
                delete data.attrs;
            }
            if (props.id) {
                data.domProps = data.domProps || {};
                data.domProps.id = props.id;
            }
            return h(props.tag, data, children);
        }
    };
}
//# sourceMappingURL=grid.js.map