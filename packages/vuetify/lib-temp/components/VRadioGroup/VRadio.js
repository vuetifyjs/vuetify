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
            type: String,
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
        computedData() {
            return this.setTextColor(!this.parentError && this.isActive && this.color, {
                staticClass: 'v-radio',
                'class': {
                    'v-radio--is-disabled': this.isDisabled,
                    'v-radio--is-focused': this.isFocused,
                    ...this.themeClasses
                }
            });
        },
        computedColor() {
            return this.isActive ? this.color : this.radio.validationState || false;
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
                !this.isDisabled && this.genRipple(this.setTextColor(this.computedColor)),
                this.$createElement(VIcon, this.setTextColor(this.computedColor, {
                    props: {
                        dark: this.dark,
                        light: this.light
                    }
                }), this.computedIcon)
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
        onKeydown() { }
    },
    render(h) {
        return h('div', this.computedData, [
            this.genRadio(),
            this.genLabel()
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJhZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlJhZGlvR3JvdXAvVlJhZGlvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFDVCxPQUFPLHNDQUFzQyxDQUFBO0FBRTdDLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUE7QUFDNUIsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBRTlCLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLEVBQ0wsTUFBTSxJQUFJLGlCQUFpQixFQUM1QixNQUFNLDBCQUEwQixDQUFBO0FBRWpDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFNBQVM7SUFFZixNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsVUFBVTtRQUNWLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDO1FBQ3RELFNBQVM7S0FDVjtJQUVELFlBQVksRUFBRSxLQUFLO0lBRW5CLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxRQUFRLEVBQUUsT0FBTztRQUNqQixLQUFLLEVBQUUsTUFBTTtRQUNiLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLHdCQUF3QjtTQUNsQztRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLHlCQUF5QjtTQUNuQztRQUNELFFBQVEsRUFBRSxPQUFPO1FBQ2pCLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFFRCxJQUFJLEVBQUUs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UUFDRCxTQUFTLEtBQUssQ0FBQztLQUNoQjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDaEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3JhZGlvcy5zdHlsJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vVkljb24nXG5pbXBvcnQgVkxhYmVsIGZyb20gJy4uL1ZMYWJlbCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgUmlwcGxlYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcmlwcGxlYWJsZSdcbmltcG9ydCBUaGVtZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcbmltcG9ydCBTZWxlY3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9zZWxlY3RhYmxlJ1xuaW1wb3J0IHtcbiAgaW5qZWN0IGFzIFJlZ2lzdHJhYmxlSW5qZWN0XG59IGZyb20gJy4uLy4uL21peGlucy9yZWdpc3RyYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtcmFkaW8nLFxuXG4gIG1peGluczogW1xuICAgIENvbG9yYWJsZSxcbiAgICBSaXBwbGVhYmxlLFxuICAgIFJlZ2lzdHJhYmxlSW5qZWN0KCdyYWRpbycsICd2LXJhZGlvJywgJ3YtcmFkaW8tZ3JvdXAnKSxcbiAgICBUaGVtZWFibGVcbiAgXSxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdhY2NlbnQnXG4gICAgfSxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIG9uSWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLnJhZGlvT24nXG4gICAgfSxcbiAgICBvZmZJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMucmFkaW9PZmYnXG4gICAgfSxcbiAgICByZWFkb25seTogQm9vbGVhbixcbiAgICB2YWx1ZTogbnVsbFxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgIGlzRm9jdXNlZDogZmFsc2UsXG4gICAgcGFyZW50RXJyb3I6IGZhbHNlXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29tcHV0ZWREYXRhICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFRleHRDb2xvcighdGhpcy5wYXJlbnRFcnJvciAmJiB0aGlzLmlzQWN0aXZlICYmIHRoaXMuY29sb3IsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXJhZGlvJyxcbiAgICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAgICd2LXJhZGlvLS1pcy1kaXNhYmxlZCc6IHRoaXMuaXNEaXNhYmxlZCxcbiAgICAgICAgICAndi1yYWRpby0taXMtZm9jdXNlZCc6IHRoaXMuaXNGb2N1c2VkLFxuICAgICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21wdXRlZENvbG9yICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlID8gdGhpcy5jb2xvciA6IHRoaXMucmFkaW8udmFsaWRhdGlvblN0YXRlIHx8IGZhbHNlXG4gICAgfSxcbiAgICBjb21wdXRlZEljb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmVcbiAgICAgICAgPyB0aGlzLm9uSWNvblxuICAgICAgICA6IHRoaXMub2ZmSWNvblxuICAgIH0sXG4gICAgaGFzU3RhdGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUgfHwgISF0aGlzLnJhZGlvLnZhbGlkYXRpb25TdGF0ZVxuICAgIH0sXG4gICAgaXNEaXNhYmxlZCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCAhIXRoaXMucmFkaW8uZGlzYWJsZWRcbiAgICB9LFxuICAgIGlzUmVhZG9ubHkgKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVhZG9ubHkgfHwgISF0aGlzLnJhZGlvLnJlYWRvbmx5XG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMucmFkaW8ucmVnaXN0ZXIodGhpcylcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLnJhZGlvLnVucmVnaXN0ZXIodGhpcylcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuSW5wdXQgKC4uLmFyZ3MpIHtcbiAgICAgIC8vIFdlIGNhbid0IGFjdHVhbGx5IHVzZSB0aGUgbWl4aW4gZGlyZWN0bHkgYmVjYXVzZVxuICAgICAgLy8gaXQncyBtYWRlIGZvciBzdGFuZGFsb25lIGNvbXBvbmVudHMsIGJ1dCBpdHNcbiAgICAgIC8vIGdlbklucHV0IG1ldGhvZCBpcyBleGFjdGx5IHdoYXQgd2UgbmVlZFxuICAgICAgcmV0dXJuIFNlbGVjdGFibGUubWV0aG9kcy5nZW5JbnB1dC5jYWxsKHRoaXMsIC4uLmFyZ3MpXG4gICAgfSxcbiAgICBnZW5MYWJlbCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWTGFiZWwsIHtcbiAgICAgICAgb246IHsgY2xpY2s6IHRoaXMub25DaGFuZ2UgfSxcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICBmb3I6IHRoaXMuaWRcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5yYWRpby52YWxpZGF0aW9uU3RhdGUgfHwgZmFsc2UsXG4gICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgIGZvY3VzZWQ6IHRoaXMuaGFzU3RhdGUsXG4gICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHRcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy4kc2xvdHMubGFiZWwgfHwgdGhpcy5sYWJlbClcbiAgICB9LFxuICAgIGdlblJhZGlvICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1pbnB1dC0tc2VsZWN0aW9uLWNvbnRyb2xzX19pbnB1dCdcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5JbnB1dCgncmFkaW8nLCB7XG4gICAgICAgICAgbmFtZTogdGhpcy5yYWRpby5uYW1lIHx8ICh0aGlzLnJhZGlvLl91aWQgPyAndi1yYWRpby0nICsgdGhpcy5yYWRpby5fdWlkIDogZmFsc2UpLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIC4uLnRoaXMuJGF0dHJzXG4gICAgICAgIH0pLFxuICAgICAgICAhdGhpcy5pc0Rpc2FibGVkICYmIHRoaXMuZ2VuUmlwcGxlKHRoaXMuc2V0VGV4dENvbG9yKHRoaXMuY29tcHV0ZWRDb2xvcikpLFxuICAgICAgICB0aGlzLiRjcmVhdGVFbGVtZW50KFZJY29uLCB0aGlzLnNldFRleHRDb2xvcih0aGlzLmNvbXB1dGVkQ29sb3IsIHtcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHRcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCB0aGlzLmNvbXB1dGVkSWNvbilcbiAgICAgIF0pXG4gICAgfSxcbiAgICBvbkZvY3VzICgpIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZVxuICAgIH0sXG4gICAgb25CbHVyIChlKSB7XG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlXG4gICAgICB0aGlzLiRlbWl0KCdibHVyJywgZSlcbiAgICB9LFxuICAgIG9uQ2hhbmdlICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQgfHwgdGhpcy5pc1JlYWRvbmx5KSByZXR1cm5cblxuICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQgJiYgKCF0aGlzLmlzQWN0aXZlIHx8ICF0aGlzLnJhZGlvLm1hbmRhdG9yeSkpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy52YWx1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uS2V5ZG93biAoKSB7fVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB0aGlzLmNvbXB1dGVkRGF0YSwgW1xuICAgICAgdGhpcy5nZW5SYWRpbygpLFxuICAgICAgdGhpcy5nZW5MYWJlbCgpXG4gICAgXSlcbiAgfVxufVxuIl19