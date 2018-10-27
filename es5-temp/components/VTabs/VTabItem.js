import Bootable from '../../mixins/bootable';
import { VTabTransition, VTabReverseTransition } from '../transitions';
import { inject as RegistrableInject } from '../../mixins/registrable';
import Touch from '../../directives/touch';
/* @vue/component */
export default {
    name: 'v-tab-item',
    components: {
        VTabTransition,
        VTabReverseTransition
    },
    directives: {
        Touch
    },
    mixins: [
        Bootable,
        RegistrableInject('tabs', 'v-tab-item', 'v-tabs-items')
    ],
    props: {
        id: String,
        transition: {
            type: [Boolean, String],
            default: 'tab-transition'
        },
        reverseTransition: {
            type: [Boolean, String],
            default: 'tab-reverse-transition'
        }
    },
    data() {
        return {
            isActive: false,
            reverse: false
        };
    },
    computed: {
        computedTransition() {
            return this.reverse ? this.reverseTransition : this.transition;
        }
    },
    mounted() {
        this.tabs.register(this);
    },
    beforeDestroy() {
        this.tabs.unregister(this);
    },
    methods: {
        toggle(isActive, reverse, showTransition) {
            this.$el.style.transition = !showTransition ? 'none' : null;
            this.reverse = reverse;
            this.isActive = isActive;
        }
    },
    render(h) {
        const data = {
            staticClass: 'v-tabs__content',
            directives: [{
                    name: 'show',
                    value: this.isActive
                }],
            domProps: { id: this.id },
            on: this.$listeners
        };
        const div = h('div', data, this.showLazyContent(this.$slots.default));
        if (!this.computedTransition)
            return div;
        return h('transition', {
            props: { name: this.computedTransition }
        }, [div]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRhYkl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVGFicy9WVGFiSXRlbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUU1QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLHFCQUFxQixFQUN0QixNQUFNLGdCQUFnQixDQUFBO0FBRXZCLE9BQU8sRUFDTCxNQUFNLElBQUksaUJBQWlCLEVBQzVCLE1BQU0sMEJBQTBCLENBQUE7QUFFakMsT0FBTyxLQUFLLE1BQU0sd0JBQXdCLENBQUE7QUFFMUMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsWUFBWTtJQUVsQixVQUFVLEVBQUU7UUFDVixjQUFjO1FBQ2QscUJBQXFCO0tBQ3RCO0lBRUQsVUFBVSxFQUFFO1FBQ1YsS0FBSztLQUNOO0lBRUQsTUFBTSxFQUFFO1FBQ04sUUFBUTtRQUNSLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDO0tBQ3hEO0lBRUQsS0FBSyxFQUFFO1FBQ0wsRUFBRSxFQUFFLE1BQU07UUFDVixVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0I7U0FDMUI7UUFDRCxpQkFBaUIsRUFBRTtZQUNqQixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSx3QkFBd0I7U0FDbEM7S0FDRjtJQUVELElBQUk7UUFDRixPQUFPO1lBQ0wsUUFBUSxFQUFFLEtBQUs7WUFDZixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxFQUFFO1FBQ1Isa0JBQWtCO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBQ2hFLENBQUM7S0FDRjtJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxNQUFNLENBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxjQUFjO1lBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDMUIsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLElBQUksR0FBRztZQUNYLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsVUFBVSxFQUFFLENBQUM7b0JBQ1gsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO2lCQUNyQixDQUFDO1lBQ0YsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDekIsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3BCLENBQUE7UUFFRCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUVyRSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtZQUFFLE9BQU8sR0FBRyxDQUFBO1FBRXhDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUNyQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1NBQ3pDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ1gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9vdGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2Jvb3RhYmxlJ1xuXG5pbXBvcnQge1xuICBWVGFiVHJhbnNpdGlvbixcbiAgVlRhYlJldmVyc2VUcmFuc2l0aW9uXG59IGZyb20gJy4uL3RyYW5zaXRpb25zJ1xuXG5pbXBvcnQge1xuICBpbmplY3QgYXMgUmVnaXN0cmFibGVJbmplY3Rcbn0gZnJvbSAnLi4vLi4vbWl4aW5zL3JlZ2lzdHJhYmxlJ1xuXG5pbXBvcnQgVG91Y2ggZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaCdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtdGFiLWl0ZW0nLFxuXG4gIGNvbXBvbmVudHM6IHtcbiAgICBWVGFiVHJhbnNpdGlvbixcbiAgICBWVGFiUmV2ZXJzZVRyYW5zaXRpb25cbiAgfSxcblxuICBkaXJlY3RpdmVzOiB7XG4gICAgVG91Y2hcbiAgfSxcblxuICBtaXhpbnM6IFtcbiAgICBCb290YWJsZSxcbiAgICBSZWdpc3RyYWJsZUluamVjdCgndGFicycsICd2LXRhYi1pdGVtJywgJ3YtdGFicy1pdGVtcycpXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBpZDogU3RyaW5nLFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJ3RhYi10cmFuc2l0aW9uJ1xuICAgIH0sXG4gICAgcmV2ZXJzZVRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJ3RhYi1yZXZlcnNlLXRyYW5zaXRpb24nXG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICByZXZlcnNlOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkVHJhbnNpdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXZlcnNlID8gdGhpcy5yZXZlcnNlVHJhbnNpdGlvbiA6IHRoaXMudHJhbnNpdGlvblxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnRhYnMucmVnaXN0ZXIodGhpcylcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLnRhYnMudW5yZWdpc3Rlcih0aGlzKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICB0b2dnbGUgKGlzQWN0aXZlLCByZXZlcnNlLCBzaG93VHJhbnNpdGlvbikge1xuICAgICAgdGhpcy4kZWwuc3R5bGUudHJhbnNpdGlvbiA9ICFzaG93VHJhbnNpdGlvbiA/ICdub25lJyA6IG51bGxcbiAgICAgIHRoaXMucmV2ZXJzZSA9IHJldmVyc2VcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBpc0FjdGl2ZVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXRhYnNfX2NvbnRlbnQnLFxuICAgICAgZGlyZWN0aXZlczogW3tcbiAgICAgICAgbmFtZTogJ3Nob3cnLFxuICAgICAgICB2YWx1ZTogdGhpcy5pc0FjdGl2ZVxuICAgICAgfV0sXG4gICAgICBkb21Qcm9wczogeyBpZDogdGhpcy5pZCB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH1cblxuICAgIGNvbnN0IGRpdiA9IGgoJ2RpdicsIGRhdGEsIHRoaXMuc2hvd0xhenlDb250ZW50KHRoaXMuJHNsb3RzLmRlZmF1bHQpKVxuXG4gICAgaWYgKCF0aGlzLmNvbXB1dGVkVHJhbnNpdGlvbikgcmV0dXJuIGRpdlxuXG4gICAgcmV0dXJuIGgoJ3RyYW5zaXRpb24nLCB7XG4gICAgICBwcm9wczogeyBuYW1lOiB0aGlzLmNvbXB1dGVkVHJhbnNpdGlvbiB9XG4gICAgfSwgW2Rpdl0pXG4gIH1cbn1cbiJdfQ==