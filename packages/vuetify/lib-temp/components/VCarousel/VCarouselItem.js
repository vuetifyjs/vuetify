// Extensions
import VWindowItem from '../VWindow/VWindowItem';
// Components
import { VImg } from '../VImg';
/* @vue/component */
export default VWindowItem.extend({
    name: 'v-carousel-item',
    inheritAttrs: false,
    methods: {
        genDefaultSlot() {
            return [
                this.$createElement(VImg, {
                    staticClass: 'v-carousel__item',
                    props: {
                        ...this.$attrs,
                        height: this.windowGroup.internalHeight
                    },
                    on: this.$listeners
                }, this.$slots.default)
            ];
        },
        onBeforeEnter() { },
        onEnter() { },
        onAfterEnter() { },
        onBeforeLeave() { },
        onEnterCancelled() { }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNhcm91c2VsSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZDYXJvdXNlbC9WQ2Fyb3VzZWxJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGFBQWE7QUFDYixPQUFPLFdBQVcsTUFBTSx3QkFBd0IsQ0FBQTtBQUVoRCxhQUFhO0FBQ2IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUU5QixvQkFBb0I7QUFDcEIsZUFBZSxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2hDLElBQUksRUFBRSxpQkFBaUI7SUFFdkIsWUFBWSxFQUFFLEtBQUs7SUFFbkIsT0FBTyxFQUFFO1FBQ1AsY0FBYztZQUNaLE9BQU87Z0JBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7b0JBQ3hCLFdBQVcsRUFBRSxrQkFBa0I7b0JBQy9CLEtBQUssRUFBRTt3QkFDTCxHQUFHLElBQUksQ0FBQyxNQUFNO3dCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWM7cUJBQ3hDO29CQUNELEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDcEIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUN4QixDQUFBO1FBQ0gsQ0FBQztRQUNELGFBQWEsS0FBaUIsQ0FBQztRQUMvQixPQUFPLEtBQWlCLENBQUM7UUFDekIsWUFBWSxLQUFpQixDQUFDO1FBQzlCLGFBQWEsS0FBaUIsQ0FBQztRQUMvQixnQkFBZ0IsS0FBaUIsQ0FBQztLQUNuQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIEV4dGVuc2lvbnNcbmltcG9ydCBWV2luZG93SXRlbSBmcm9tICcuLi9WV2luZG93L1ZXaW5kb3dJdGVtJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgeyBWSW1nIH0gZnJvbSAnLi4vVkltZydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IFZXaW5kb3dJdGVtLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWNhcm91c2VsLWl0ZW0nLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkRlZmF1bHRTbG90ICgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkltZywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1jYXJvdXNlbF9faXRlbScsXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuJGF0dHJzLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLndpbmRvd0dyb3VwLmludGVybmFsSGVpZ2h0XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbjogdGhpcy4kbGlzdGVuZXJzXG4gICAgICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gICAgICBdXG4gICAgfSxcbiAgICBvbkJlZm9yZUVudGVyICgpIHsgLyogbm9vcCAqLyB9LFxuICAgIG9uRW50ZXIgKCkgeyAvKiBub29wICovIH0sXG4gICAgb25BZnRlckVudGVyICgpIHsgLyogbm9vcCAqLyB9LFxuICAgIG9uQmVmb3JlTGVhdmUgKCkgeyAvKiBub29wICovIH0sXG4gICAgb25FbnRlckNhbmNlbGxlZCAoKSB7IC8qIG5vb3AgKi8gfVxuICB9XG59KVxuIl19