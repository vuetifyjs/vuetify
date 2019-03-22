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
        classes: function () {
            var _a;
            return _a = {
                'v-breadcrumbs__item': true
            },
                _a[this.activeClass] = this.disabled,
                _a;
        }
    },
    render: function (h) {
        var _a = this.generateRouteLink(this.classes), tag = _a.tag, data = _a.data;
        return h('li', [
            h(tag, data, this.$slots.default)
        ]);
    }
});
//# sourceMappingURL=VBreadcrumbsItem.js.map
//# sourceMappingURL=VBreadcrumbsItem.js.map
//# sourceMappingURL=VBreadcrumbsItem.js.map