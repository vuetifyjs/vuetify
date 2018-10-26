function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Routable from '../../mixins/routable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Routable).extend({
    name: 'v-breadcrumbs-item',
    props: {
        // In a breadcrumb, the currently
        // active item should be dimmed
        activeClass: {
            type: String,
            default: 'v-breadcrumbs__item--disabled'
        }
    },
    computed: {
        classes: function classes() {
            return _defineProperty({
                'v-breadcrumbs__item': true
            }, this.activeClass, this.disabled);
        }
    },
    render: function render(h) {
        var _generateRouteLink = this.generateRouteLink(this.classes),
            tag = _generateRouteLink.tag,
            data = _generateRouteLink.data;

        return h('li', [h(tag, data, this.$slots.default)]);
    }
});
//# sourceMappingURL=VBreadcrumbsItem.js.map