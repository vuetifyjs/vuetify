export default function Grid(name) {
    /* @vue/component */
    return {
        name: "v-" + name,
        functional: true,
        props: {
            id: String,
            tag: {
                type: String,
                default: 'div'
            }
        },
        render: function (h, _a) {
            var props = _a.props, data = _a.data, children = _a.children;
            data.staticClass = (name + " " + (data.staticClass || '')).trim();
            var attrs = data.attrs;
            if (attrs) {
                // reset attrs to extract utility clases like pa-3
                data.attrs = {};
                var classes = Object.keys(attrs).filter(function (key) {
                    // TODO: Remove once resolved
                    // https://github.com/vuejs/vue/issues/7841
                    if (key === 'slot')
                        return false;
                    var value = attrs[key];
                    // add back data attributes like data-test="foo" but do not
                    // add them as classes
                    if (key.startsWith('data-')) {
                        data.attrs[key] = value;
                        return false;
                    }
                    return value || typeof value === 'string';
                });
                if (classes.length)
                    data.staticClass += " " + classes.join(' ');
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