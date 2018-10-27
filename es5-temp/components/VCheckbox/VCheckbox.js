// Styles
import '../../stylus/components/_selection-controls.styl';
// Components
import VIcon from '../VIcon';
// import { VFadeTransition } from '../transitions'
// Mixins
import Selectable from '../../mixins/selectable';
/* @vue/component */
export default {
    name: 'v-checkbox',
    mixins: [
        Selectable
    ],
    props: {
        indeterminate: Boolean,
        indeterminateIcon: {
            type: String,
            default: '$vuetify.icons.checkboxIndeterminate'
        },
        onIcon: {
            type: String,
            default: '$vuetify.icons.checkboxOn'
        },
        offIcon: {
            type: String,
            default: '$vuetify.icons.checkboxOff'
        }
    },
    data: vm => ({
        inputIndeterminate: vm.indeterminate
    }),
    computed: {
        classes() {
            return {
                'v-input--selection-controls': true,
                'v-input--checkbox': true
            };
        },
        computedIcon() {
            if (this.inputIndeterminate) {
                return this.indeterminateIcon;
            }
            else if (this.isActive) {
                return this.onIcon;
            }
            else {
                return this.offIcon;
            }
        }
    },
    watch: {
        indeterminate(val) {
            this.inputIndeterminate = val;
        }
    },
    methods: {
        genCheckbox() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [
                this.genInput('checkbox', {
                    ...this.$attrs,
                    'aria-checked': this.inputIndeterminate
                        ? 'mixed'
                        : this.isActive.toString()
                }),
                !this.disabled && this.genRipple({
                    'class': this.classesSelectable
                }),
                this.$createElement(VIcon, {
                    'class': this.classesSelectable,
                    props: {
                        dark: this.dark,
                        light: this.light
                    }
                }, this.computedIcon)
            ]);
        },
        genDefaultSlot() {
            return [
                this.genCheckbox(),
                this.genLabel()
            ];
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkNoZWNrYm94L1ZDaGVja2JveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxrREFBa0QsQ0FBQTtBQUV6RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBQzVCLG1EQUFtRDtBQUVuRCxTQUFTO0FBQ1QsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUE7QUFFaEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsWUFBWTtJQUVsQixNQUFNLEVBQUU7UUFDTixVQUFVO0tBQ1g7SUFFRCxLQUFLLEVBQUU7UUFDTCxhQUFhLEVBQUUsT0FBTztRQUN0QixpQkFBaUIsRUFBRTtZQUNqQixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxzQ0FBc0M7U0FDaEQ7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSwyQkFBMkI7U0FDckM7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSw0QkFBNEI7U0FDdEM7S0FDRjtJQUVELElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxrQkFBa0IsRUFBRSxFQUFFLENBQUMsYUFBYTtLQUNyQyxDQUFDO0lBRUYsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU87Z0JBQ0wsNkJBQTZCLEVBQUUsSUFBSTtnQkFDbkMsbUJBQW1CLEVBQUUsSUFBSTthQUMxQixDQUFBO1FBQ0gsQ0FBQztRQUNELFlBQVk7WUFDVixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDM0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUE7YUFDOUI7aUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7YUFDbkI7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQztLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsYUFBYSxDQUFFLEdBQUc7WUFDaEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQTtRQUMvQixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxXQUFXO1lBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLG9DQUFvQzthQUNsRCxFQUFFO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO29CQUN4QixHQUFHLElBQUksQ0FBQyxNQUFNO29CQUNkLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCO3dCQUNyQyxDQUFDLENBQUMsT0FBTzt3QkFDVCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7aUJBQzdCLENBQUM7Z0JBQ0YsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCO2lCQUNoQyxDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO29CQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtvQkFDL0IsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7cUJBQ2xCO2lCQUNGLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUN0QixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsY0FBYztZQUNaLE9BQU87Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRTthQUNoQixDQUFBO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc2VsZWN0aW9uLWNvbnRyb2xzLnN0eWwnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWSWNvbiBmcm9tICcuLi9WSWNvbidcbi8vIGltcG9ydCB7IFZGYWRlVHJhbnNpdGlvbiB9IGZyb20gJy4uL3RyYW5zaXRpb25zJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBTZWxlY3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9zZWxlY3RhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1jaGVja2JveCcsXG5cbiAgbWl4aW5zOiBbXG4gICAgU2VsZWN0YWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgaW5kZXRlcm1pbmF0ZTogQm9vbGVhbixcbiAgICBpbmRldGVybWluYXRlSWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLmNoZWNrYm94SW5kZXRlcm1pbmF0ZSdcbiAgICB9LFxuICAgIG9uSWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLmNoZWNrYm94T24nXG4gICAgfSxcbiAgICBvZmZJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMuY2hlY2tib3hPZmYnXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6IHZtID0+ICh7XG4gICAgaW5wdXRJbmRldGVybWluYXRlOiB2bS5pbmRldGVybWluYXRlXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1pbnB1dC0tc2VsZWN0aW9uLWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgJ3YtaW5wdXQtLWNoZWNrYm94JzogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWRJY29uICgpIHtcbiAgICAgIGlmICh0aGlzLmlucHV0SW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRldGVybWluYXRlSWNvblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uSWNvblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub2ZmSWNvblxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGluZGV0ZXJtaW5hdGUgKHZhbCkge1xuICAgICAgdGhpcy5pbnB1dEluZGV0ZXJtaW5hdGUgPSB2YWxcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkNoZWNrYm94ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1pbnB1dC0tc2VsZWN0aW9uLWNvbnRyb2xzX19pbnB1dCdcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5JbnB1dCgnY2hlY2tib3gnLCB7XG4gICAgICAgICAgLi4udGhpcy4kYXR0cnMsXG4gICAgICAgICAgJ2FyaWEtY2hlY2tlZCc6IHRoaXMuaW5wdXRJbmRldGVybWluYXRlXG4gICAgICAgICAgICA/ICdtaXhlZCdcbiAgICAgICAgICAgIDogdGhpcy5pc0FjdGl2ZS50b1N0cmluZygpXG4gICAgICAgIH0pLFxuICAgICAgICAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmdlblJpcHBsZSh7XG4gICAgICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzU2VsZWN0YWJsZVxuICAgICAgICB9KSxcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwge1xuICAgICAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3Nlc1NlbGVjdGFibGUsXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGRhcms6IHRoaXMuZGFyayxcbiAgICAgICAgICAgIGxpZ2h0OiB0aGlzLmxpZ2h0XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLmNvbXB1dGVkSWNvbilcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5EZWZhdWx0U2xvdCAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLmdlbkNoZWNrYm94KCksXG4gICAgICAgIHRoaXMuZ2VuTGFiZWwoKVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl19