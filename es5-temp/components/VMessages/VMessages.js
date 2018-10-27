// Styles
import '../../stylus/components/_messages.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
/* @vue/component */
export default {
    name: 'v-messages',
    mixins: [Colorable, Themeable],
    props: {
        value: {
            type: Array,
            default: () => ([])
        }
    },
    computed: {
        classes() {
            return this.addTextColorClassChecks(this.themeClasses);
        }
    },
    methods: {
        genChildren() {
            return this.$createElement('transition-group', {
                staticClass: 'v-messages__wrapper',
                attrs: {
                    name: 'message-transition',
                    tag: 'div'
                }
            }, this.value.map(m => this.genMessage(m)));
        },
        genMessage(key) {
            return this.$createElement('div', {
                staticClass: 'v-messages__message',
                key,
                domProps: {
                    innerHTML: key
                }
            });
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-messages',
            class: this.classes
        }, [this.genChildren()]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVk1lc3NhZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVk1lc3NhZ2VzL1ZNZXNzYWdlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx3Q0FBd0MsQ0FBQTtBQUUvQyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFFOUMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsWUFBWTtJQUVsQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO0lBRTlCLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxLQUFLO1lBQ1gsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3BCO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3hELENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLFdBQVc7WUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUU7Z0JBQzdDLFdBQVcsRUFBRSxxQkFBcUI7Z0JBQ2xDLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsb0JBQW9CO29CQUMxQixHQUFHLEVBQUUsS0FBSztpQkFDWDthQUNGLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM3QyxDQUFDO1FBQ0QsVUFBVSxDQUFFLEdBQUc7WUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUscUJBQXFCO2dCQUNsQyxHQUFHO2dCQUNILFFBQVEsRUFBRTtvQkFDUixTQUFTLEVBQUUsR0FBRztpQkFDZjthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ2QsV0FBVyxFQUFFLFlBQVk7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3BCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzFCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19tZXNzYWdlcy5zdHlsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcbmltcG9ydCBUaGVtZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtbWVzc2FnZXMnLFxuXG4gIG1peGluczogW0NvbG9yYWJsZSwgVGhlbWVhYmxlXSxcblxuICBwcm9wczoge1xuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IChbXSlcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFRleHRDb2xvckNsYXNzQ2hlY2tzKHRoaXMudGhlbWVDbGFzc2VzKVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuQ2hpbGRyZW4gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RyYW5zaXRpb24tZ3JvdXAnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1tZXNzYWdlc19fd3JhcHBlcicsXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgbmFtZTogJ21lc3NhZ2UtdHJhbnNpdGlvbicsXG4gICAgICAgICAgdGFnOiAnZGl2J1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLnZhbHVlLm1hcChtID0+IHRoaXMuZ2VuTWVzc2FnZShtKSkpXG4gICAgfSxcbiAgICBnZW5NZXNzYWdlIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1tZXNzYWdlc19fbWVzc2FnZScsXG4gICAgICAgIGtleSxcbiAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICBpbm5lckhUTUw6IGtleVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LW1lc3NhZ2VzJyxcbiAgICAgIGNsYXNzOiB0aGlzLmNsYXNzZXNcbiAgICB9LCBbdGhpcy5nZW5DaGlsZHJlbigpXSlcbiAgfVxufVxuIl19