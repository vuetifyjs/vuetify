import '../../stylus/components/_bottom-sheets.styl';
import VDialog from '../VDialog/VDialog';
/* @vue/component */
export default {
    name: 'v-bottom-sheet',
    props: {
        disabled: Boolean,
        fullWidth: Boolean,
        hideOverlay: Boolean,
        inset: Boolean,
        lazy: Boolean,
        maxWidth: {
            type: [String, Number],
            default: 'auto'
        },
        persistent: Boolean,
        value: null
    },
    render(h) {
        const activator = h('template', {
            slot: 'activator'
        }, this.$slots.activator);
        const contentClass = [
            'v-bottom-sheet',
            this.inset ? 'v-bottom-sheet--inset' : ''
        ].join(' ');
        return h(VDialog, {
            attrs: {
                ...this.$props
            },
            on: {
                ...this.$listeners
            },
            props: {
                contentClass,
                noClickAnimation: true,
                transition: 'bottom-sheet-transition',
                value: this.value
            }
        }, [activator, this.$slots.default]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJvdHRvbVNoZWV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkJvdHRvbVNoZWV0L1ZCb3R0b21TaGVldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDZDQUE2QyxDQUFBO0FBRXBELE9BQU8sT0FBTyxNQUFNLG9CQUFvQixDQUFBO0FBRXhDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGdCQUFnQjtJQUV0QixLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsT0FBTztRQUNqQixTQUFTLEVBQUUsT0FBTztRQUNsQixXQUFXLEVBQUUsT0FBTztRQUNwQixLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRSxPQUFPO1FBQ2IsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELFVBQVUsRUFBRSxPQUFPO1FBQ25CLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUU7WUFDOUIsSUFBSSxFQUFFLFdBQVc7U0FDbEIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXpCLE1BQU0sWUFBWSxHQUFHO1lBQ25CLGdCQUFnQjtZQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUMxQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUVYLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNoQixLQUFLLEVBQUU7Z0JBQ0wsR0FBRyxJQUFJLENBQUMsTUFBTTthQUNmO1lBQ0QsRUFBRSxFQUFFO2dCQUNGLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixVQUFVLEVBQUUseUJBQXlCO2dCQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDbEI7U0FDRixFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2JvdHRvbS1zaGVldHMuc3R5bCdcblxuaW1wb3J0IFZEaWFsb2cgZnJvbSAnLi4vVkRpYWxvZy9WRGlhbG9nJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1ib3R0b20tc2hlZXQnLFxuXG4gIHByb3BzOiB7XG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIGhpZGVPdmVybGF5OiBCb29sZWFuLFxuICAgIGluc2V0OiBCb29sZWFuLFxuICAgIGxhenk6IEJvb2xlYW4sXG4gICAgbWF4V2lkdGg6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAnYXV0bydcbiAgICB9LFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgdmFsdWU6IG51bGxcbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBhY3RpdmF0b3IgPSBoKCd0ZW1wbGF0ZScsIHtcbiAgICAgIHNsb3Q6ICdhY3RpdmF0b3InXG4gICAgfSwgdGhpcy4kc2xvdHMuYWN0aXZhdG9yKVxuXG4gICAgY29uc3QgY29udGVudENsYXNzID0gW1xuICAgICAgJ3YtYm90dG9tLXNoZWV0JyxcbiAgICAgIHRoaXMuaW5zZXQgPyAndi1ib3R0b20tc2hlZXQtLWluc2V0JyA6ICcnXG4gICAgXS5qb2luKCcgJylcblxuICAgIHJldHVybiBoKFZEaWFsb2csIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIC4uLnRoaXMuJHByb3BzXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzXG4gICAgICB9LFxuICAgICAgcHJvcHM6IHtcbiAgICAgICAgY29udGVudENsYXNzLFxuICAgICAgICBub0NsaWNrQW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICB0cmFuc2l0aW9uOiAnYm90dG9tLXNoZWV0LXRyYW5zaXRpb24nLFxuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgICAgfVxuICAgIH0sIFthY3RpdmF0b3IsIHRoaXMuJHNsb3RzLmRlZmF1bHRdKVxuICB9XG59XG4iXX0=