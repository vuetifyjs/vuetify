import Routable from '../../mixins/routable';
/* @vue/component */
export default {
    name: 'v-breadcrumbs-item',
    mixins: [Routable],
    props: {
        // In a breadcrumb, the currently
        // active item should be dimmed
        activeClass: {
            type: String,
            default: 'v-breadcrumbs__item--disabled'
        }
    },
    computed: {
        classes() {
            return {
                'v-breadcrumbs__item': true,
                [this.activeClass]: this.disabled
            };
        }
    },
    render(h) {
        const { tag, data } = this.generateRouteLink();
        return h('li', [
            h(tag, data, this.$slots.default)
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJyZWFkY3J1bWJzSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZCcmVhZGNydW1icy9WQnJlYWRjcnVtYnNJdGVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFBO0FBRTVDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLG9CQUFvQjtJQUUxQixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFFbEIsS0FBSyxFQUFFO1FBQ0wsaUNBQWlDO1FBQ2pDLCtCQUErQjtRQUMvQixXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSwrQkFBK0I7U0FDekM7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxPQUFPO2dCQUNMLHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ2xDLENBQUE7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFFOUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ2IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDbEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3JvdXRhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1icmVhZGNydW1icy1pdGVtJyxcblxuICBtaXhpbnM6IFtSb3V0YWJsZV0sXG5cbiAgcHJvcHM6IHtcbiAgICAvLyBJbiBhIGJyZWFkY3J1bWIsIHRoZSBjdXJyZW50bHlcbiAgICAvLyBhY3RpdmUgaXRlbSBzaG91bGQgYmUgZGltbWVkXG4gICAgYWN0aXZlQ2xhc3M6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd2LWJyZWFkY3J1bWJzX19pdGVtLS1kaXNhYmxlZCdcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWJyZWFkY3J1bWJzX19pdGVtJzogdHJ1ZSxcbiAgICAgICAgW3RoaXMuYWN0aXZlQ2xhc3NdOiB0aGlzLmRpc2FibGVkXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IHsgdGFnLCBkYXRhIH0gPSB0aGlzLmdlbmVyYXRlUm91dGVMaW5rKClcblxuICAgIHJldHVybiBoKCdsaScsIFtcbiAgICAgIGgodGFnLCBkYXRhLCB0aGlzLiRzbG90cy5kZWZhdWx0KVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==