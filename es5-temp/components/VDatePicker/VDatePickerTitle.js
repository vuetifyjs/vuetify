import '../../stylus/components/_date-picker-title.styl';
// Components
import VIcon from '../VIcon';
// Mixins
import PickerButton from '../../mixins/picker-button';
/* @vue/component */
export default {
    name: 'v-date-picker-title',
    mixins: [PickerButton],
    props: {
        date: {
            type: String,
            default: ''
        },
        selectingYear: Boolean,
        year: {
            type: [Number, String],
            default: ''
        },
        yearIcon: {
            type: String
        },
        value: {
            type: String
        }
    },
    data: () => ({
        isReversing: false
    }),
    computed: {
        computedTransition() {
            return this.isReversing ? 'picker-reverse-transition' : 'picker-transition';
        }
    },
    watch: {
        value(val, prev) {
            this.isReversing = val < prev;
        }
    },
    methods: {
        genYearIcon() {
            return this.$createElement(VIcon, {
                props: {
                    dark: true
                }
            }, this.yearIcon);
        },
        getYearBtn() {
            return this.genPickerButton('selectingYear', true, [
                this.year,
                this.yearIcon ? this.genYearIcon() : null
            ], 'v-date-picker-title__year');
        },
        genTitleText() {
            return this.$createElement('transition', {
                props: {
                    name: this.computedTransition
                }
            }, [
                this.$createElement('div', {
                    domProps: { innerHTML: this.date || '&nbsp;' },
                    key: this.value
                })
            ]);
        },
        genTitleDate(title) {
            return this.genPickerButton('selectingYear', false, this.genTitleText(title), 'v-date-picker-title__date');
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-date-picker-title'
        }, [
            this.getYearBtn(),
            this.genTitleDate()
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRhdGVQaWNrZXJUaXRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRlUGlja2VyL1ZEYXRlUGlja2VyVGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxpREFBaUQsQ0FBQTtBQUV4RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBRTVCLFNBQVM7QUFDVCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQTtBQUVyRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxxQkFBcUI7SUFFM0IsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO0lBRXRCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELGFBQWEsRUFBRSxPQUFPO1FBQ3RCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtTQUNiO0tBQ0Y7SUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFdBQVcsRUFBRSxLQUFLO0tBQ25CLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixrQkFBa0I7WUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUE7UUFDN0UsQ0FBQztLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsS0FBSyxDQUFFLEdBQUcsRUFBRSxJQUFJO1lBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO1FBQy9CLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLFdBQVc7WUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLElBQUk7aUJBQ1g7YUFDRixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNuQixDQUFDO1FBQ0QsVUFBVTtZQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsSUFBSTtnQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7YUFDMUMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFDRCxZQUFZO1lBQ1YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFDdkMsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCO2lCQUM5QjthQUNGLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7b0JBQ3pCLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRTtvQkFDOUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNoQixDQUFDO2FBQ0gsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFlBQVksQ0FBRSxLQUFLO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQTtRQUM1RyxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxxQkFBcUI7U0FDbkMsRUFBRTtZQUNELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRTtTQUNwQixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2RhdGUtcGlja2VyLXRpdGxlLnN0eWwnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWSWNvbiBmcm9tICcuLi9WSWNvbidcblxuLy8gTWl4aW5zXG5pbXBvcnQgUGlja2VyQnV0dG9uIGZyb20gJy4uLy4uL21peGlucy9waWNrZXItYnV0dG9uJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1kYXRlLXBpY2tlci10aXRsZScsXG5cbiAgbWl4aW5zOiBbUGlja2VyQnV0dG9uXSxcblxuICBwcm9wczoge1xuICAgIGRhdGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcnXG4gICAgfSxcbiAgICBzZWxlY3RpbmdZZWFyOiBCb29sZWFuLFxuICAgIHllYXI6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0sXG4gICAgeWVhckljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH1cbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlzUmV2ZXJzaW5nOiBmYWxzZVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkVHJhbnNpdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1JldmVyc2luZyA/ICdwaWNrZXItcmV2ZXJzZS10cmFuc2l0aW9uJyA6ICdwaWNrZXItdHJhbnNpdGlvbidcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZSAodmFsLCBwcmV2KSB7XG4gICAgICB0aGlzLmlzUmV2ZXJzaW5nID0gdmFsIDwgcHJldlxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuWWVhckljb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkljb24sIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBkYXJrOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMueWVhckljb24pXG4gICAgfSxcbiAgICBnZXRZZWFyQnRuICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdlblBpY2tlckJ1dHRvbignc2VsZWN0aW5nWWVhcicsIHRydWUsIFtcbiAgICAgICAgdGhpcy55ZWFyLFxuICAgICAgICB0aGlzLnllYXJJY29uID8gdGhpcy5nZW5ZZWFySWNvbigpIDogbnVsbFxuICAgICAgXSwgJ3YtZGF0ZS1waWNrZXItdGl0bGVfX3llYXInKVxuICAgIH0sXG4gICAgZ2VuVGl0bGVUZXh0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMuY29tcHV0ZWRUcmFuc2l0aW9uXG4gICAgICAgIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogdGhpcy5kYXRlIHx8ICcmbmJzcDsnIH0sXG4gICAgICAgICAga2V5OiB0aGlzLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuVGl0bGVEYXRlICh0aXRsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2VuUGlja2VyQnV0dG9uKCdzZWxlY3RpbmdZZWFyJywgZmFsc2UsIHRoaXMuZ2VuVGl0bGVUZXh0KHRpdGxlKSwgJ3YtZGF0ZS1waWNrZXItdGl0bGVfX2RhdGUnKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWRhdGUtcGlja2VyLXRpdGxlJ1xuICAgIH0sIFtcbiAgICAgIHRoaXMuZ2V0WWVhckJ0bigpLFxuICAgICAgdGhpcy5nZW5UaXRsZURhdGUoKVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==