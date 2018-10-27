// Styles
import '../../stylus/components/_radios.styl';
// Components
import VIcon from '../VIcon';
import VLabel from '../VLabel';
// Mixins
import Colorable from '../../mixins/colorable';
import Rippleable from '../../mixins/rippleable';
import Themeable from '../../mixins/themeable';
import Selectable from '../../mixins/selectable';
import { inject as RegistrableInject } from '../../mixins/registrable';
// Utils
import { keyCodes } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-radio',
    mixins: [
        Colorable,
        Rippleable,
        RegistrableInject('radio', 'v-radio', 'v-radio-group'),
        Themeable
    ],
    inheritAttrs: false,
    props: {
        color: {
            type: [Boolean, String],
            default: 'accent'
        },
        disabled: Boolean,
        label: String,
        onIcon: {
            type: String,
            default: '$vuetify.icons.radioOn'
        },
        offIcon: {
            type: String,
            default: '$vuetify.icons.radioOff'
        },
        readonly: Boolean,
        value: null
    },
    data: () => ({
        isActive: false,
        isFocused: false,
        parentError: false
    }),
    computed: {
        classes() {
            const classes = {
                'v-radio--is-disabled': this.isDisabled,
                'v-radio--is-focused': this.isFocused,
                ...this.themeClasses
            };
            if (!this.parentError && this.isActive) {
                return this.addTextColorClassChecks(classes);
            }
            return classes;
        },
        classesSelectable() {
            return this.addTextColorClassChecks({}, this.isActive ? this.color : this.radio.validationState || false);
        },
        computedIcon() {
            return this.isActive
                ? this.onIcon
                : this.offIcon;
        },
        hasState() {
            return this.isActive || !!this.radio.validationState;
        },
        isDisabled() {
            return this.disabled || !!this.radio.disabled;
        },
        isReadonly() {
            return this.readonly || !!this.radio.readonly;
        }
    },
    mounted() {
        this.radio.register(this);
    },
    beforeDestroy() {
        this.radio.unregister(this);
    },
    methods: {
        genInput(...args) {
            // We can't actually use the mixin directly because
            // it's made for standalone components, but its
            // genInput method is exactly what we need
            return Selectable.methods.genInput.call(this, ...args);
        },
        genLabel() {
            return this.$createElement(VLabel, {
                on: { click: this.onChange },
                attrs: {
                    for: this.id
                },
                props: {
                    color: this.radio.validationState || false,
                    dark: this.dark,
                    focused: this.hasState,
                    light: this.light
                }
            }, this.$slots.label || this.label);
        },
        genRadio() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [
                this.genInput('radio', {
                    name: this.radio.name || (this.radio._uid ? 'v-radio-' + this.radio._uid : false),
                    value: this.value,
                    ...this.$attrs
                }),
                !this.isDisabled && this.genRipple({
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
        onFocus() {
            this.isFocused = true;
        },
        onBlur(e) {
            this.isFocused = false;
            this.$emit('blur', e);
        },
        onChange() {
            if (this.isDisabled || this.isReadonly)
                return;
            if (!this.isDisabled && (!this.isActive || !this.radio.mandatory)) {
                this.$emit('change', this.value);
            }
        },
        onKeydown(e) {
            if ([keyCodes.enter, keyCodes.space].includes(e.keyCode)) {
                e.preventDefault();
                this.onChange();
            }
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-radio',
            class: this.classes
        }, [
            this.genRadio(),
            this.genLabel()
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJhZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlJhZGlvR3JvdXAvVlJhZGlvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFDVCxPQUFPLHNDQUFzQyxDQUFBO0FBRTdDLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUE7QUFDNUIsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBRTlCLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLEVBQ0wsTUFBTSxJQUFJLGlCQUFpQixFQUM1QixNQUFNLDBCQUEwQixDQUFBO0FBRWpDLFFBQVE7QUFDUixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFN0Msb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsU0FBUztJQUVmLE1BQU0sRUFBRTtRQUNOLFNBQVM7UUFDVCxVQUFVO1FBQ1YsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUM7UUFDdEQsU0FBUztLQUNWO0lBRUQsWUFBWSxFQUFFLEtBQUs7SUFFbkIsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN2QixPQUFPLEVBQUUsUUFBUTtTQUNsQjtRQUNELFFBQVEsRUFBRSxPQUFPO1FBQ2pCLEtBQUssRUFBRSxNQUFNO1FBQ2IsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsd0JBQXdCO1NBQ2xDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUs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LENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDakM7UUFDSCxDQUFDO1FBQ0QsU0FBUyxDQUFFLENBQUM7WUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDeEQsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFBO2dCQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7YUFDaEI7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTztTQUNwQixFQUFFO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDaEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3JhZGlvcy5zdHlsJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vVkljb24nXG5pbXBvcnQgVkxhYmVsIGZyb20gJy4uL1ZMYWJlbCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgUmlwcGxlYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcmlwcGxlYWJsZSdcbmltcG9ydCBUaGVtZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcbmltcG9ydCBTZWxlY3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9zZWxlY3RhYmxlJ1xuaW1wb3J0IHtcbiAgaW5qZWN0IGFzIFJlZ2lzdHJhYmxlSW5qZWN0XG59IGZyb20gJy4uLy4uL21peGlucy9yZWdpc3RyYWJsZSdcblxuLy8gVXRpbHNcbmltcG9ydCB7IGtleUNvZGVzIH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1yYWRpbycsXG5cbiAgbWl4aW5zOiBbXG4gICAgQ29sb3JhYmxlLFxuICAgIFJpcHBsZWFibGUsXG4gICAgUmVnaXN0cmFibGVJbmplY3QoJ3JhZGlvJywgJ3YtcmFkaW8nLCAndi1yYWRpby1ncm91cCcpLFxuICAgIFRoZW1lYWJsZVxuICBdLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAnYWNjZW50J1xuICAgIH0sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBvbkljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5yYWRpb09uJ1xuICAgIH0sXG4gICAgb2ZmSWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLnJhZGlvT2ZmJ1xuICAgIH0sXG4gICAgcmVhZG9ubHk6IEJvb2xlYW4sXG4gICAgdmFsdWU6IG51bGxcbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlzQWN0aXZlOiBmYWxzZSxcbiAgICBpc0ZvY3VzZWQ6IGZhbHNlLFxuICAgIHBhcmVudEVycm9yOiBmYWxzZVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCkge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHtcbiAgICAgICAgJ3YtcmFkaW8tLWlzLWRpc2FibGVkJzogdGhpcy5pc0Rpc2FibGVkLFxuICAgICAgICAndi1yYWRpby0taXMtZm9jdXNlZCc6IHRoaXMuaXNGb2N1c2VkLFxuICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMucGFyZW50RXJyb3IgJiYgdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcyhjbGFzc2VzKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2xhc3Nlc1xuICAgIH0sXG4gICAgY2xhc3Nlc1NlbGVjdGFibGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVGV4dENvbG9yQ2xhc3NDaGVja3MoXG4gICAgICAgIHt9LFxuICAgICAgICB0aGlzLmlzQWN0aXZlID8gdGhpcy5jb2xvciA6IHRoaXMucmFkaW8udmFsaWRhdGlvblN0YXRlIHx8IGZhbHNlXG4gICAgICApXG4gICAgfSxcbiAgICBjb21wdXRlZEljb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmVcbiAgICAgICAgPyB0aGlzLm9uSWNvblxuICAgICAgICA6IHRoaXMub2ZmSWNvblxuICAgIH0sXG4gICAgaGFzU3RhdGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUgfHwgISF0aGlzLnJhZGlvLnZhbGlkYXRpb25TdGF0ZVxuICAgIH0sXG4gICAgaXNEaXNhYmxlZCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCAhIXRoaXMucmFkaW8uZGlzYWJsZWRcbiAgICB9LFxuICAgIGlzUmVhZG9ubHkgKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVhZG9ubHkgfHwgISF0aGlzLnJhZGlvLnJlYWRvbmx5XG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMucmFkaW8ucmVnaXN0ZXIodGhpcylcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLnJhZGlvLnVucmVnaXN0ZXIodGhpcylcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuSW5wdXQgKC4uLmFyZ3MpIHtcbiAgICAgIC8vIFdlIGNhbid0IGFjdHVhbGx5IHVzZSB0aGUgbWl4aW4gZGlyZWN0bHkgYmVjYXVzZVxuICAgICAgLy8gaXQncyBtYWRlIGZvciBzdGFuZGFsb25lIGNvbXBvbmVudHMsIGJ1dCBpdHNcbiAgICAgIC8vIGdlbklucHV0IG1ldGhvZCBpcyBleGFjdGx5IHdoYXQgd2UgbmVlZFxuICAgICAgcmV0dXJuIFNlbGVjdGFibGUubWV0aG9kcy5nZW5JbnB1dC5jYWxsKHRoaXMsIC4uLmFyZ3MpXG4gICAgfSxcbiAgICBnZW5MYWJlbCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWTGFiZWwsIHtcbiAgICAgICAgb246IHsgY2xpY2s6IHRoaXMub25DaGFuZ2UgfSxcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICBmb3I6IHRoaXMuaWRcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5yYWRpby52YWxpZGF0aW9uU3RhdGUgfHwgZmFsc2UsXG4gICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgIGZvY3VzZWQ6IHRoaXMuaGFzU3RhdGUsXG4gICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHRcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy4kc2xvdHMubGFiZWwgfHwgdGhpcy5sYWJlbClcbiAgICB9LFxuICAgIGdlblJhZGlvICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1pbnB1dC0tc2VsZWN0aW9uLWNvbnRyb2xzX19pbnB1dCdcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5JbnB1dCgncmFkaW8nLCB7XG4gICAgICAgICAgbmFtZTogdGhpcy5yYWRpby5uYW1lIHx8ICh0aGlzLnJhZGlvLl91aWQgPyAndi1yYWRpby0nICsgdGhpcy5yYWRpby5fdWlkIDogZmFsc2UpLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIC4uLnRoaXMuJGF0dHJzXG4gICAgICAgIH0pLFxuICAgICAgICAhdGhpcy5pc0Rpc2FibGVkICYmIHRoaXMuZ2VuUmlwcGxlKHtcbiAgICAgICAgICAnY2xhc3MnOiB0aGlzLmNsYXNzZXNTZWxlY3RhYmxlXG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLiRjcmVhdGVFbGVtZW50KFZJY29uLCB7XG4gICAgICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzU2VsZWN0YWJsZSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHRcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMuY29tcHV0ZWRJY29uKVxuICAgICAgXSlcbiAgICB9LFxuICAgIG9uRm9jdXMgKCkge1xuICAgICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlXG4gICAgfSxcbiAgICBvbkJsdXIgKGUpIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoJ2JsdXInLCBlKVxuICAgIH0sXG4gICAgb25DaGFuZ2UgKCkge1xuICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCB8fCB0aGlzLmlzUmVhZG9ubHkpIHJldHVyblxuXG4gICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCAmJiAoIXRoaXMuaXNBY3RpdmUgfHwgIXRoaXMucmFkaW8ubWFuZGF0b3J5KSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLnZhbHVlKVxuICAgICAgfVxuICAgIH0sXG4gICAgb25LZXlkb3duIChlKSB7XG4gICAgICBpZiAoW2tleUNvZGVzLmVudGVyLCBrZXlDb2Rlcy5zcGFjZV0uaW5jbHVkZXMoZS5rZXlDb2RlKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtcmFkaW8nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3Nlc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuZ2VuUmFkaW8oKSxcbiAgICAgIHRoaXMuZ2VuTGFiZWwoKVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==