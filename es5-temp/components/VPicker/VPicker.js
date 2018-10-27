import '../../stylus/components/_pickers.styl';
import '../../stylus/components/_cards.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
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
            default: 290,
            validator: value => parseInt(value, 10) > 0
        }
    },
    data() {
        return {
            defaultColor: 'primary'
        };
    },
    computed: {
        computedTitleColor() {
            const defaultTitleColor = this.isDark ? null : this.computedColor;
            return this.color || defaultTitleColor;
        }
    },
    methods: {
        genTitle() {
            return this.$createElement('div', {
                staticClass: 'v-picker__title',
                'class': this.addBackgroundColorClassChecks({
                    'v-picker__title--landscape': this.landscape
                }, this.computedTitleColor)
            }, this.$slots.title);
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
                    width: this.width + 'px'
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
                ...this.themeClasses
            }
        }, [
            this.$slots.title ? this.genTitle() : null,
            this.genBody(),
            this.$slots.actions ? this.genActions() : null
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZQaWNrZXIvVlBpY2tlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHVDQUF1QyxDQUFBO0FBQzlDLE9BQU8scUNBQXFDLENBQUE7QUFFNUMsU0FBUztBQUNULE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBRTlDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFVBQVU7SUFFaEIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztJQUU5QixLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUUsT0FBTztRQUNsQixTQUFTLEVBQUUsT0FBTztRQUNsQixVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxpQkFBaUI7U0FDM0I7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxHQUFHO1lBQ1osU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQzVDO0tBQ0Y7SUFFRCxJQUFJO1FBQ0YsT0FBTztZQUNMLFlBQVksRUFBRSxTQUFTO1NBQ3hCLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxFQUFFO1FBQ1Isa0JBQWtCO1lBQ2hCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBO1lBQ2pFLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxpQkFBaUIsQ0FBQTtRQUN4QyxDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsT0FBTyxFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztvQkFDMUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQzdDLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2FBQzVCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2QixDQUFDO1FBQ0QsaUJBQWlCO1lBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFDdkMsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDdEI7YUFDRixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekIsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUsZ0JBQWdCO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJO2lCQUN6QjthQUNGLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2FBQ3pCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxVQUFVO1lBQ1IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLG1DQUFtQzthQUNqRCxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekIsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDZCxXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLE9BQU8sRUFBRTtnQkFDUCxxQkFBcUIsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDckMsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNyQjtTQUNGLEVBQUU7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQy9DLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fcGlja2Vycy5zdHlsJ1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fY2FyZHMuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LXBpY2tlcicsXG5cbiAgbWl4aW5zOiBbQ29sb3JhYmxlLCBUaGVtZWFibGVdLFxuXG4gIHByb3BzOiB7XG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIGxhbmRzY2FwZTogQm9vbGVhbixcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZmFkZS10cmFuc2l0aW9uJ1xuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAyOTAsXG4gICAgICB2YWxpZGF0b3I6IHZhbHVlID0+IHBhcnNlSW50KHZhbHVlLCAxMCkgPiAwXG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZWZhdWx0Q29sb3I6ICdwcmltYXJ5J1xuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkVGl0bGVDb2xvciAoKSB7XG4gICAgICBjb25zdCBkZWZhdWx0VGl0bGVDb2xvciA9IHRoaXMuaXNEYXJrID8gbnVsbCA6IHRoaXMuY29tcHV0ZWRDb2xvclxuICAgICAgcmV0dXJuIHRoaXMuY29sb3IgfHwgZGVmYXVsdFRpdGxlQ29sb3JcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlblRpdGxlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1waWNrZXJfX3RpdGxlJyxcbiAgICAgICAgJ2NsYXNzJzogdGhpcy5hZGRCYWNrZ3JvdW5kQ29sb3JDbGFzc0NoZWNrcyh7XG4gICAgICAgICAgJ3YtcGlja2VyX190aXRsZS0tbGFuZHNjYXBlJzogdGhpcy5sYW5kc2NhcGVcbiAgICAgICAgfSwgdGhpcy5jb21wdXRlZFRpdGxlQ29sb3IpXG4gICAgICB9LCB0aGlzLiRzbG90cy50aXRsZSlcbiAgICB9LFxuICAgIGdlbkJvZHlUcmFuc2l0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMudHJhbnNpdGlvblxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLiRzbG90cy5kZWZhdWx0KVxuICAgIH0sXG4gICAgZ2VuQm9keSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtcGlja2VyX19ib2R5JyxcbiAgICAgICAgJ2NsYXNzJzogdGhpcy50aGVtZUNsYXNzZXMsXG4gICAgICAgIHN0eWxlOiB0aGlzLmZ1bGxXaWR0aCA/IHVuZGVmaW5lZCA6IHtcbiAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlbkJvZHlUcmFuc2l0aW9uKClcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5BY3Rpb25zICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1waWNrZXJfX2FjdGlvbnMgdi1jYXJkX19hY3Rpb25zJ1xuICAgICAgfSwgdGhpcy4kc2xvdHMuYWN0aW9ucylcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1waWNrZXIgdi1jYXJkJyxcbiAgICAgICdjbGFzcyc6IHtcbiAgICAgICAgJ3YtcGlja2VyLS1sYW5kc2NhcGUnOiB0aGlzLmxhbmRzY2FwZSxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICB0aGlzLiRzbG90cy50aXRsZSA/IHRoaXMuZ2VuVGl0bGUoKSA6IG51bGwsXG4gICAgICB0aGlzLmdlbkJvZHkoKSxcbiAgICAgIHRoaXMuJHNsb3RzLmFjdGlvbnMgPyB0aGlzLmdlbkFjdGlvbnMoKSA6IG51bGxcbiAgICBdKVxuICB9XG59XG4iXX0=