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
            ], false, 'v-date-picker-title__year');
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
            return this.genPickerButton('selectingYear', false, this.genTitleText(title), false, 'v-date-picker-title__date');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRhdGVQaWNrZXJUaXRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRlUGlja2VyL1ZEYXRlUGlja2VyVGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxpREFBaUQsQ0FBQTtBQUV4RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBRTVCLFNBQVM7QUFDVCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQTtBQUVyRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxxQkFBcUI7SUFFM0IsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO0lBRXRCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELGFBQWEsRUFBRSxPQUFPO1FBQ3RCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtTQUNiO0tBQ0Y7SUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFdBQVcsRUFBRSxLQUFLO0tBQ25CLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixrQkFBa0I7WUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUE7UUFDN0UsQ0FBQztLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsS0FBSyxDQUFFLEdBQUcsRUFBRSxJQUFJO1lBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO1FBQy9CLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLFdBQVc7WUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLElBQUk7aUJBQ1g7YUFDRixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNuQixDQUFDO1FBQ0QsVUFBVTtZQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsSUFBSTtnQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7YUFDMUMsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLENBQUMsQ0FBQTtRQUN4QyxDQUFDO1FBQ0QsWUFBWTtZQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZDLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtpQkFDOUI7YUFDRixFQUFFO2dCQUNELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO29CQUN6QixRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUU7b0JBQzlDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDaEIsQ0FBQzthQUNILENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxZQUFZLENBQUUsS0FBSztZQUNqQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFBO1FBQ25ILENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ2QsV0FBVyxFQUFFLHFCQUFxQjtTQUNuQyxFQUFFO1lBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fZGF0ZS1waWNrZXItdGl0bGUuc3R5bCdcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZJY29uIGZyb20gJy4uL1ZJY29uJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBQaWNrZXJCdXR0b24gZnJvbSAnLi4vLi4vbWl4aW5zL3BpY2tlci1idXR0b24nXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWRhdGUtcGlja2VyLXRpdGxlJyxcblxuICBtaXhpbnM6IFtQaWNrZXJCdXR0b25dLFxuXG4gIHByb3BzOiB7XG4gICAgZGF0ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJydcbiAgICB9LFxuICAgIHNlbGVjdGluZ1llYXI6IEJvb2xlYW4sXG4gICAgeWVhcjoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICcnXG4gICAgfSxcbiAgICB5ZWFySWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaXNSZXZlcnNpbmc6IGZhbHNlXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29tcHV0ZWRUcmFuc2l0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzUmV2ZXJzaW5nID8gJ3BpY2tlci1yZXZlcnNlLXRyYW5zaXRpb24nIDogJ3BpY2tlci10cmFuc2l0aW9uJ1xuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIHZhbHVlICh2YWwsIHByZXYpIHtcbiAgICAgIHRoaXMuaXNSZXZlcnNpbmcgPSB2YWwgPCBwcmV2XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5ZZWFySWNvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGRhcms6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy55ZWFySWNvbilcbiAgICB9LFxuICAgIGdldFllYXJCdG4gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2VuUGlja2VyQnV0dG9uKCdzZWxlY3RpbmdZZWFyJywgdHJ1ZSwgW1xuICAgICAgICB0aGlzLnllYXIsXG4gICAgICAgIHRoaXMueWVhckljb24gPyB0aGlzLmdlblllYXJJY29uKCkgOiBudWxsXG4gICAgICBdLCBmYWxzZSwgJ3YtZGF0ZS1waWNrZXItdGl0bGVfX3llYXInKVxuICAgIH0sXG4gICAgZ2VuVGl0bGVUZXh0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMuY29tcHV0ZWRUcmFuc2l0aW9uXG4gICAgICAgIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogdGhpcy5kYXRlIHx8ICcmbmJzcDsnIH0sXG4gICAgICAgICAga2V5OiB0aGlzLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuVGl0bGVEYXRlICh0aXRsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2VuUGlja2VyQnV0dG9uKCdzZWxlY3RpbmdZZWFyJywgZmFsc2UsIHRoaXMuZ2VuVGl0bGVUZXh0KHRpdGxlKSwgZmFsc2UsICd2LWRhdGUtcGlja2VyLXRpdGxlX19kYXRlJylcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1kYXRlLXBpY2tlci10aXRsZSdcbiAgICB9LCBbXG4gICAgICB0aGlzLmdldFllYXJCdG4oKSxcbiAgICAgIHRoaXMuZ2VuVGl0bGVEYXRlKClcbiAgICBdKVxuICB9XG59XG4iXX0=