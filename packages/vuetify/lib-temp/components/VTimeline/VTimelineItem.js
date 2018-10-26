// Types
import mixins from '../../util/mixins';
// Components
import VIcon from '../VIcon';
// Mixins
import Themeable from '../../mixins/themeable';
import Colorable from '../../mixins/colorable';
export default mixins(Colorable, Themeable
/* @vue/component */
).extend({
    name: 'v-timeline-item',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        fillDot: Boolean,
        hideDot: Boolean,
        icon: String,
        iconColor: String,
        large: Boolean,
        left: Boolean,
        right: Boolean,
        small: Boolean
    },
    computed: {
        hasIcon() {
            return !!this.icon || !!this.$slots.icon;
        }
    },
    methods: {
        genBody() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__body'
            }, this.$slots.default);
        },
        genIcon() {
            if (this.$slots.icon) {
                return this.$slots.icon;
            }
            return this.$createElement(VIcon, {
                props: {
                    color: this.iconColor,
                    dark: !this.theme.isDark,
                    small: this.small
                }
            }, this.icon);
        },
        genInnerDot() {
            const children = [];
            this.hasIcon && children.push(this.genIcon());
            const data = this.setBackgroundColor(this.color);
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__inner-dot',
                ...data
            }, children);
        },
        genDot() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__dot',
                class: {
                    'v-timeline-item__dot--small': this.small,
                    'v-timeline-item__dot--large': this.large
                }
            }, [this.genInnerDot()]);
        },
        genOpposite() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__opposite'
            }, [this.$slots.opposite]);
        }
    },
    render(h) {
        const children = [this.genBody()];
        if (!this.hideDot)
            children.unshift(this.genDot());
        if (this.$slots.opposite)
            children.push(this.genOpposite());
        return h('div', {
            staticClass: 'v-timeline-item',
            class: {
                'v-timeline-item--fill-dot': this.fillDot,
                'v-timeline-item--left': this.left,
                'v-timeline-item--right': this.right,
                ...this.themeClasses
            }
        }, children);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRpbWVsaW5lSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUaW1lbGluZS9WVGltZWxpbmVJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVE7QUFDUixPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQTtBQUd0QyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBRTVCLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxlQUFlLE1BQU0sQ0FDbkIsU0FBUyxFQUNULFNBQVM7QUFDWCxvQkFBb0I7Q0FDbkIsQ0FBQyxNQUFNLENBQUM7SUFDUCxJQUFJLEVBQUUsaUJBQWlCO0lBRXZCLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsT0FBTztRQUNoQixJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxNQUFNO1FBQ2pCLEtBQUssRUFBRSxPQUFPO1FBQ2QsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsT0FBTztRQUNkLEtBQUssRUFBRSxPQUFPO0tBQ2Y7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDMUMsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsT0FBTztZQUNMLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSx1QkFBdUI7YUFDckMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3pCLENBQUM7UUFDRCxPQUFPO1lBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTthQUN4QjtZQUVELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3JCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtvQkFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNsQjthQUNGLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2YsQ0FBQztRQUNELFdBQVc7WUFDVCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7WUFFbkIsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBRTdDLE1BQU0sSUFBSSxHQUFjLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFFM0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsR0FBRyxJQUFJO2FBQ1IsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNkLENBQUM7UUFDRCxNQUFNO1lBQ0osT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLHNCQUFzQjtnQkFDbkMsS0FBSyxFQUFFO29CQUNMLDZCQUE2QixFQUFFLElBQUksQ0FBQyxLQUFLO29CQUN6Qyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDMUM7YUFDRixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMxQixDQUFDO1FBQ0QsV0FBVztZQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSwyQkFBMkI7YUFDekMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUM1QixDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUNsRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFFM0QsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ2QsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixLQUFLLEVBQUU7Z0JBQ0wsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3pDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNsQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDcEMsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNyQjtTQUNGLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDZCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVHlwZXNcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5pbXBvcnQgeyBWTm9kZSwgVk5vZGVEYXRhIH0gZnJvbSAndnVlJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vVkljb24nXG5cbi8vIE1peGluc1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuXG5leHBvcnQgZGVmYXVsdCBtaXhpbnMoXG4gIENvbG9yYWJsZSxcbiAgVGhlbWVhYmxlXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuKS5leHRlbmQoe1xuICBuYW1lOiAndi10aW1lbGluZS1pdGVtJyxcblxuICBwcm9wczoge1xuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeSdcbiAgICB9LFxuICAgIGZpbGxEb3Q6IEJvb2xlYW4sXG4gICAgaGlkZURvdDogQm9vbGVhbixcbiAgICBpY29uOiBTdHJpbmcsXG4gICAgaWNvbkNvbG9yOiBTdHJpbmcsXG4gICAgbGFyZ2U6IEJvb2xlYW4sXG4gICAgbGVmdDogQm9vbGVhbixcbiAgICByaWdodDogQm9vbGVhbixcbiAgICBzbWFsbDogQm9vbGVhblxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgaGFzSWNvbiAoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gISF0aGlzLmljb24gfHwgISF0aGlzLiRzbG90cy5pY29uXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5Cb2R5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10aW1lbGluZS1pdGVtX19ib2R5J1xuICAgICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgICB9LFxuICAgIGdlbkljb24gKCk6IFZOb2RlIHwgVk5vZGVbXSB7XG4gICAgICBpZiAodGhpcy4kc2xvdHMuaWNvbikge1xuICAgICAgICByZXR1cm4gdGhpcy4kc2xvdHMuaWNvblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbG9yOiB0aGlzLmljb25Db2xvcixcbiAgICAgICAgICBkYXJrOiAhdGhpcy50aGVtZS5pc0RhcmssXG4gICAgICAgICAgc21hbGw6IHRoaXMuc21hbGxcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5pY29uKVxuICAgIH0sXG4gICAgZ2VuSW5uZXJEb3QgKCkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXVxuXG4gICAgICB0aGlzLmhhc0ljb24gJiYgY2hpbGRyZW4ucHVzaCh0aGlzLmdlbkljb24oKSlcblxuICAgICAgY29uc3QgZGF0YTogVk5vZGVEYXRhID0gdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb2xvcilcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRpbWVsaW5lLWl0ZW1fX2lubmVyLWRvdCcsXG4gICAgICAgIC4uLmRhdGFcbiAgICAgIH0sIGNoaWxkcmVuKVxuICAgIH0sXG4gICAgZ2VuRG90ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10aW1lbGluZS1pdGVtX19kb3QnLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICd2LXRpbWVsaW5lLWl0ZW1fX2RvdC0tc21hbGwnOiB0aGlzLnNtYWxsLFxuICAgICAgICAgICd2LXRpbWVsaW5lLWl0ZW1fX2RvdC0tbGFyZ2UnOiB0aGlzLmxhcmdlXG4gICAgICAgIH1cbiAgICAgIH0sIFt0aGlzLmdlbklubmVyRG90KCldKVxuICAgIH0sXG4gICAgZ2VuT3Bwb3NpdGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRpbWVsaW5lLWl0ZW1fX29wcG9zaXRlJ1xuICAgICAgfSwgW3RoaXMuJHNsb3RzLm9wcG9zaXRlXSlcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKTogVk5vZGUge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW3RoaXMuZ2VuQm9keSgpXVxuXG4gICAgaWYgKCF0aGlzLmhpZGVEb3QpIGNoaWxkcmVuLnVuc2hpZnQodGhpcy5nZW5Eb3QoKSlcbiAgICBpZiAodGhpcy4kc2xvdHMub3Bwb3NpdGUpIGNoaWxkcmVuLnB1c2godGhpcy5nZW5PcHBvc2l0ZSgpKVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi10aW1lbGluZS1pdGVtJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICd2LXRpbWVsaW5lLWl0ZW0tLWZpbGwtZG90JzogdGhpcy5maWxsRG90LFxuICAgICAgICAndi10aW1lbGluZS1pdGVtLS1sZWZ0JzogdGhpcy5sZWZ0LFxuICAgICAgICAndi10aW1lbGluZS1pdGVtLS1yaWdodCc6IHRoaXMucmlnaHQsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG4gICAgfSwgY2hpbGRyZW4pXG4gIH1cbn0pXG4iXX0=