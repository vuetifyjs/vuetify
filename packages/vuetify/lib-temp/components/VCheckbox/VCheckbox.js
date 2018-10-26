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
                !this.disabled && this.genRipple(this.setTextColor(this.computedColor)),
                this.$createElement(VIcon, this.setTextColor(this.computedColor, {
                    props: {
                        dark: this.dark,
                        light: this.light
                    }
                }), this.computedIcon)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkNoZWNrYm94L1ZDaGVja2JveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxrREFBa0QsQ0FBQTtBQUV6RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBQzVCLG1EQUFtRDtBQUVuRCxTQUFTO0FBQ1QsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUE7QUFFaEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsWUFBWTtJQUVsQixNQUFNLEVBQUU7UUFDTixVQUFVO0tBQ1g7SUFFRCxLQUFLLEVBQUU7UUFDTCxhQUFhLEVBQUUsT0FBTztRQUN0QixpQkFBaUIsRUFBRTtZQUNqQixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxzQ0FBc0M7U0FDaEQ7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSwyQkFBMkI7U0FDckM7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSw0QkFBNEI7U0FDdEM7S0FDRjtJQUVELElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxrQkFBa0IsRUFBRSxFQUFFLENBQUMsYUFBYTtLQUNyQyxDQUFDO0lBRUYsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU87Z0JBQ0wsNkJBQTZCLEVBQUUsSUFBSTtnQkFDbkMsbUJBQW1CLEVBQUUsSUFBSTthQUMxQixDQUFBO1FBQ0gsQ0FBQztRQUNELFlBQVk7WUFDVixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDM0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUE7YUFDOUI7aUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7YUFDbkI7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQztLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsYUFBYSxDQUFFLEdBQUc7WUFDaEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQTtRQUMvQixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxXQUFXO1lBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLG9DQUFvQzthQUNsRCxFQUFFO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO29CQUN4QixHQUFHLElBQUksQ0FBQyxNQUFNO29CQUNkLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCO3dCQUNyQyxDQUFDLENBQUMsT0FBTzt3QkFDVCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7aUJBQzdCLENBQUM7Z0JBQ0YsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDL0QsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7cUJBQ2xCO2lCQUNGLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3ZCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxjQUFjO1lBQ1osT0FBTztnQkFDTCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFO2FBQ2hCLENBQUE7UUFDSCxDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19zZWxlY3Rpb24tY29udHJvbHMuc3R5bCdcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZJY29uIGZyb20gJy4uL1ZJY29uJ1xuLy8gaW1wb3J0IHsgVkZhZGVUcmFuc2l0aW9uIH0gZnJvbSAnLi4vdHJhbnNpdGlvbnMnXG5cbi8vIE1peGluc1xuaW1wb3J0IFNlbGVjdGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3NlbGVjdGFibGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWNoZWNrYm94JyxcblxuICBtaXhpbnM6IFtcbiAgICBTZWxlY3RhYmxlXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBpbmRldGVybWluYXRlOiBCb29sZWFuLFxuICAgIGluZGV0ZXJtaW5hdGVJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMuY2hlY2tib3hJbmRldGVybWluYXRlJ1xuICAgIH0sXG4gICAgb25JY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMuY2hlY2tib3hPbidcbiAgICB9LFxuICAgIG9mZkljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5jaGVja2JveE9mZidcbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogdm0gPT4gKHtcbiAgICBpbnB1dEluZGV0ZXJtaW5hdGU6IHZtLmluZGV0ZXJtaW5hdGVcbiAgfSksXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWlucHV0LS1zZWxlY3Rpb24tY29udHJvbHMnOiB0cnVlLFxuICAgICAgICAndi1pbnB1dC0tY2hlY2tib3gnOiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wdXRlZEljb24gKCkge1xuICAgICAgaWYgKHRoaXMuaW5wdXRJbmRldGVybWluYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV0ZXJtaW5hdGVJY29uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25JY29uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5vZmZJY29uXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaW5kZXRlcm1pbmF0ZSAodmFsKSB7XG4gICAgICB0aGlzLmlucHV0SW5kZXRlcm1pbmF0ZSA9IHZhbFxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuQ2hlY2tib3ggKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWlucHV0LS1zZWxlY3Rpb24tY29udHJvbHNfX2lucHV0J1xuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlbklucHV0KCdjaGVja2JveCcsIHtcbiAgICAgICAgICAuLi50aGlzLiRhdHRycyxcbiAgICAgICAgICAnYXJpYS1jaGVja2VkJzogdGhpcy5pbnB1dEluZGV0ZXJtaW5hdGVcbiAgICAgICAgICAgID8gJ21peGVkJ1xuICAgICAgICAgICAgOiB0aGlzLmlzQWN0aXZlLnRvU3RyaW5nKClcbiAgICAgICAgfSksXG4gICAgICAgICF0aGlzLmRpc2FibGVkICYmIHRoaXMuZ2VuUmlwcGxlKHRoaXMuc2V0VGV4dENvbG9yKHRoaXMuY29tcHV0ZWRDb2xvcikpLFxuICAgICAgICB0aGlzLiRjcmVhdGVFbGVtZW50KFZJY29uLCB0aGlzLnNldFRleHRDb2xvcih0aGlzLmNvbXB1dGVkQ29sb3IsIHtcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHRcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCB0aGlzLmNvbXB1dGVkSWNvbilcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5EZWZhdWx0U2xvdCAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLmdlbkNoZWNrYm94KCksXG4gICAgICAgIHRoaXMuZ2VuTGFiZWwoKVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl19