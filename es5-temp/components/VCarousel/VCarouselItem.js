// Components
import { VImg } from '../VImg';
// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable';
/* @vue/component */
export default {
    name: 'v-carousel-item',
    mixins: [RegistrableInject('carousel', 'v-carousel-item', 'v-carousel')],
    inheritAttrs: false,
    props: {
        transition: {
            type: String,
            default: 'tab-transition'
        },
        reverseTransition: {
            type: String,
            default: 'tab-reverse-transition'
        }
    },
    data() {
        return {
            active: false,
            reverse: false
        };
    },
    computed: {
        computedTransition() {
            return (this.reverse === !this.$vuetify.rtl) ? this.reverseTransition : this.transition;
        }
    },
    mounted() {
        this.carousel.register(this._uid, this.open);
    },
    beforeDestroy() {
        this.carousel.unregister(this._uid, this.open);
    },
    methods: {
        open(id, reverse) {
            this.active = this._uid === id;
            this.reverse = reverse;
        }
    },
    render(h) {
        const item = h(VImg, {
            staticClass: 'v-carousel__item',
            props: {
                ...this.$attrs,
                height: '100%'
            },
            on: this.$listeners,
            directives: [{
                    name: 'show',
                    value: this.active
                }]
        }, this.$slots.default);
        return h('transition', { props: { name: this.computedTransition } }, [item]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNhcm91c2VsSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZDYXJvdXNlbC9WQ2Fyb3VzZWxJdGVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGFBQWE7QUFDYixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRTlCLFNBQVM7QUFDVCxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFdEUsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsaUJBQWlCO0lBRXZCLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUV4RSxZQUFZLEVBQUUsS0FBSztJQUVuQixLQUFLLEVBQUU7UUFDTCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxnQkFBZ0I7U0FDMUI7UUFDRCxpQkFBaUIsRUFBRTtZQUNqQixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSx3QkFBd0I7U0FDbEM7S0FDRjtJQUVELElBQUk7UUFDRixPQUFPO1lBQ0wsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxFQUFFO1FBQ1Isa0JBQWtCO1lBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBQ3pGLENBQUM7S0FDRjtJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxJQUFJLENBQUUsRUFBRSxFQUFFLE9BQU87WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFBO1lBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3hCLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNuQixXQUFXLEVBQUUsa0JBQWtCO1lBQy9CLEtBQUssRUFBRTtnQkFDTCxHQUFHLElBQUksQ0FBQyxNQUFNO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2FBQ2Y7WUFDRCxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDbkIsVUFBVSxFQUFFLENBQUM7b0JBQ1gsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO2lCQUNuQixDQUFDO1NBQ0gsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXZCLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUM5RSxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvbXBvbmVudHNcbmltcG9ydCB7IFZJbWcgfSBmcm9tICcuLi9WSW1nJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCB7IGluamVjdCBhcyBSZWdpc3RyYWJsZUluamVjdCB9IGZyb20gJy4uLy4uL21peGlucy9yZWdpc3RyYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtY2Fyb3VzZWwtaXRlbScsXG5cbiAgbWl4aW5zOiBbUmVnaXN0cmFibGVJbmplY3QoJ2Nhcm91c2VsJywgJ3YtY2Fyb3VzZWwtaXRlbScsICd2LWNhcm91c2VsJyldLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndGFiLXRyYW5zaXRpb24nXG4gICAgfSxcbiAgICByZXZlcnNlVHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RhYi1yZXZlcnNlLXRyYW5zaXRpb24nXG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgcmV2ZXJzZTogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjb21wdXRlZFRyYW5zaXRpb24gKCkge1xuICAgICAgcmV0dXJuICh0aGlzLnJldmVyc2UgPT09ICF0aGlzLiR2dWV0aWZ5LnJ0bCkgPyB0aGlzLnJldmVyc2VUcmFuc2l0aW9uIDogdGhpcy50cmFuc2l0aW9uXG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMuY2Fyb3VzZWwucmVnaXN0ZXIodGhpcy5fdWlkLCB0aGlzLm9wZW4pXG4gIH0sXG5cbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5jYXJvdXNlbC51bnJlZ2lzdGVyKHRoaXMuX3VpZCwgdGhpcy5vcGVuKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBvcGVuIChpZCwgcmV2ZXJzZSkge1xuICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLl91aWQgPT09IGlkXG4gICAgICB0aGlzLnJldmVyc2UgPSByZXZlcnNlXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IGl0ZW0gPSBoKFZJbWcsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1jYXJvdXNlbF9faXRlbScsXG4gICAgICBwcm9wczoge1xuICAgICAgICAuLi50aGlzLiRhdHRycyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgIH0sXG4gICAgICBvbjogdGhpcy4kbGlzdGVuZXJzLFxuICAgICAgZGlyZWN0aXZlczogW3tcbiAgICAgICAgbmFtZTogJ3Nob3cnLFxuICAgICAgICB2YWx1ZTogdGhpcy5hY3RpdmVcbiAgICAgIH1dXG4gICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcblxuICAgIHJldHVybiBoKCd0cmFuc2l0aW9uJywgeyBwcm9wczogeyBuYW1lOiB0aGlzLmNvbXB1dGVkVHJhbnNpdGlvbiB9IH0sIFtpdGVtXSlcbiAgfVxufVxuIl19