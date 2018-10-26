import '../../stylus/components/_pickers.styl';
import '../../stylus/components/_cards.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-picker',
    mixins: [Colorable, Themeable],
    props: {
        fullWidth: Boolean,
        landscape: Boolean,
        transition: {
            type: String,
            default: 'fade-transition'
        },
        width: {
            type: [Number, String],
            default: 290
        }
    },
    computed: {
        computedTitleColor() {
            const defaultTitleColor = this.isDark ? null : (this.color || 'primary');
            return this.color || defaultTitleColor;
        }
    },
    methods: {
        genTitle() {
            return this.$createElement('div', this.setBackgroundColor(this.computedTitleColor, {
                staticClass: 'v-picker__title',
                'class': {
                    'v-picker__title--landscape': this.landscape
                }
            }), this.$slots.title);
        },
        genBodyTransition() {
            return this.$createElement('transition', {
                props: {
                    name: this.transition
                }
            }, this.$slots.default);
        },
        genBody() {
            return this.$createElement('div', {
                staticClass: 'v-picker__body',
                'class': this.themeClasses,
                style: this.fullWidth ? undefined : {
                    width: convertToUnit(this.width)
                }
            }, [
                this.genBodyTransition()
            ]);
        },
        genActions() {
            return this.$createElement('div', {
                staticClass: 'v-picker__actions v-card__actions'
            }, this.$slots.actions);
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-picker v-card',
            'class': {
                'v-picker--landscape': this.landscape,
                'v-picker--full-width': this.fullWidth,
                ...this.themeClasses
            }
        }, [
            this.$slots.title ? this.genTitle() : null,
            this.genBody(),
            this.$slots.actions ? this.genActions() : null
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZQaWNrZXIvVlBpY2tlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHVDQUF1QyxDQUFBO0FBQzlDLE9BQU8scUNBQXFDLENBQUE7QUFFNUMsU0FBUztBQUNULE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBRTlDLFVBQVU7QUFDVixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFbEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBVTtJQUVoQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO0lBRTlCLEtBQUssRUFBRTtRQUNMLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGlCQUFpQjtTQUMzQjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEdBQUc7U0FDYjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1Isa0JBQWtCO1lBQ2hCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLENBQUE7WUFDeEUsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLGlCQUFpQixDQUFBO1FBQ3hDLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLFFBQVE7WUFDTixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ2pGLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLE9BQU8sRUFBRTtvQkFDUCw0QkFBNEIsRUFBRSxJQUFJLENBQUMsU0FBUztpQkFDN0M7YUFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN4QixDQUFDO1FBQ0QsaUJBQWlCO1lBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFDdkMsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDdEI7YUFDRixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekIsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUsZ0JBQWdCO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxLQUFLLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ2pDO2FBQ0YsRUFBRTtnQkFDRCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7YUFDekIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFVBQVU7WUFDUixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUsbUNBQW1DO2FBQ2pELEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN6QixDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsT0FBTyxFQUFFO2dCQUNQLHFCQUFxQixFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUNyQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDdEMsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNyQjtTQUNGLEVBQUU7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQy9DLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fcGlja2Vycy5zdHlsJ1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fY2FyZHMuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbi8vIEhlbHBlcnNcbmltcG9ydCB7IGNvbnZlcnRUb1VuaXQgfSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LXBpY2tlcicsXG5cbiAgbWl4aW5zOiBbQ29sb3JhYmxlLCBUaGVtZWFibGVdLFxuXG4gIHByb3BzOiB7XG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIGxhbmRzY2FwZTogQm9vbGVhbixcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZmFkZS10cmFuc2l0aW9uJ1xuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAyOTBcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjb21wdXRlZFRpdGxlQ29sb3IgKCkge1xuICAgICAgY29uc3QgZGVmYXVsdFRpdGxlQ29sb3IgPSB0aGlzLmlzRGFyayA/IG51bGwgOiAodGhpcy5jb2xvciB8fCAncHJpbWFyeScpXG4gICAgICByZXR1cm4gdGhpcy5jb2xvciB8fCBkZWZhdWx0VGl0bGVDb2xvclxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuVGl0bGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKHRoaXMuY29tcHV0ZWRUaXRsZUNvbG9yLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1waWNrZXJfX3RpdGxlJyxcbiAgICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAgICd2LXBpY2tlcl9fdGl0bGUtLWxhbmRzY2FwZSc6IHRoaXMubGFuZHNjYXBlXG4gICAgICAgIH1cbiAgICAgIH0pLCB0aGlzLiRzbG90cy50aXRsZSlcbiAgICB9LFxuICAgIGdlbkJvZHlUcmFuc2l0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMudHJhbnNpdGlvblxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLiRzbG90cy5kZWZhdWx0KVxuICAgIH0sXG4gICAgZ2VuQm9keSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtcGlja2VyX19ib2R5JyxcbiAgICAgICAgJ2NsYXNzJzogdGhpcy50aGVtZUNsYXNzZXMsXG4gICAgICAgIHN0eWxlOiB0aGlzLmZ1bGxXaWR0aCA/IHVuZGVmaW5lZCA6IHtcbiAgICAgICAgICB3aWR0aDogY29udmVydFRvVW5pdCh0aGlzLndpZHRoKVxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuQm9keVRyYW5zaXRpb24oKVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlbkFjdGlvbnMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXBpY2tlcl9fYWN0aW9ucyB2LWNhcmRfX2FjdGlvbnMnXG4gICAgICB9LCB0aGlzLiRzbG90cy5hY3Rpb25zKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXBpY2tlciB2LWNhcmQnLFxuICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAndi1waWNrZXItLWxhbmRzY2FwZSc6IHRoaXMubGFuZHNjYXBlLFxuICAgICAgICAndi1waWNrZXItLWZ1bGwtd2lkdGgnOiB0aGlzLmZ1bGxXaWR0aCxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICB0aGlzLiRzbG90cy50aXRsZSA/IHRoaXMuZ2VuVGl0bGUoKSA6IG51bGwsXG4gICAgICB0aGlzLmdlbkJvZHkoKSxcbiAgICAgIHRoaXMuJHNsb3RzLmFjdGlvbnMgPyB0aGlzLmdlbkFjdGlvbnMoKSA6IG51bGxcbiAgICBdKVxuICB9XG59XG4iXX0=