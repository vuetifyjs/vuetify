// Styles
import '../../stylus/components/_text-fields.styl';
// Extensions
import VInput from '../VInput';
// Components
import VCounter from '../VCounter';
import VLabel from '../VLabel';
// Mixins
import Maskable from '../../mixins/maskable';
import Loadable from '../../mixins/loadable';
// Directives
import Ripple from '../../directives/ripple';
// Utilities
import { keyCodes } from '../../util/helpers';
import { deprecate } from '../../util/console';
const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
/* @vue/component */
export default {
    name: 'v-text-field',
    directives: { Ripple },
    extends: VInput,
    mixins: [Maskable, Loadable],
    inheritAttrs: false,
    props: {
        appendOuterIcon: String,
        /** @deprecated */
        appendOuterIconCb: Function,
        autofocus: Boolean,
        box: Boolean,
        browserAutocomplete: String,
        clearable: Boolean,
        clearIcon: {
            type: String,
            default: '$vuetify.icons.clear'
        },
        clearIconCb: Function,
        color: {
            type: String,
            default: 'primary'
        },
        counter: [Boolean, Number, String],
        flat: Boolean,
        fullWidth: Boolean,
        label: String,
        outline: Boolean,
        placeholder: String,
        prefix: String,
        prependInnerIcon: String,
        /** @deprecated */
        prependInnerIconCb: Function,
        reverse: Boolean,
        singleLine: Boolean,
        solo: Boolean,
        soloInverted: Boolean,
        suffix: String,
        textarea: Boolean,
        type: {
            type: String,
            default: 'text'
        }
    },
    data: () => ({
        badInput: false,
        initialValue: null,
        internalChange: false,
        isClearing: false
    }),
    computed: {
        classes() {
            return {
                'v-text-field': true,
                'v-text-field--full-width': this.fullWidth,
                'v-text-field--prefix': this.prefix,
                'v-text-field--single-line': this.isSingle,
                'v-text-field--solo': this.isSolo,
                'v-text-field--solo-inverted': this.soloInverted,
                'v-text-field--solo-flat': this.flat,
                'v-text-field--box': this.box,
                'v-text-field--enclosed': this.isEnclosed,
                'v-text-field--reverse': this.reverse,
                'v-text-field--outline': this.hasOutline
            };
        },
        counterValue() {
            return (this.internalValue || '').toString().length;
        },
        directivesInput() {
            return [];
        },
        // TODO: Deprecate
        hasOutline() {
            return this.outline || this.textarea;
        },
        internalValue: {
            get() {
                return this.lazyValue;
            },
            set(val) {
                if (this.mask) {
                    this.lazyValue = this.unmaskText(this.maskText(this.unmaskText(val)));
                    this.setSelectionRange();
                }
                else {
                    this.lazyValue = val;
                    this.$emit('input', this.lazyValue);
                }
            }
        },
        isDirty() {
            return (this.lazyValue != null &&
                this.lazyValue.toString().length > 0) ||
                this.badInput;
        },
        isEnclosed() {
            return (this.box ||
                this.isSolo ||
                this.hasOutline ||
                this.fullWidth);
        },
        isLabelActive() {
            return this.isDirty || dirtyTypes.includes(this.type);
        },
        isSingle() {
            return this.isSolo || this.singleLine;
        },
        isSolo() {
            return this.solo || this.soloInverted;
        },
        labelPosition() {
            const offset = (this.prefix && !this.labelValue) ? 16 : 0;
            return (!this.$vuetify.rtl !== !this.reverse) ? {
                left: 'auto',
                right: offset
            } : {
                left: offset,
                right: 'auto'
            };
        },
        showLabel() {
            return this.hasLabel && (!this.isSingle || (!this.isLabelActive && !this.placeholder));
        },
        labelValue() {
            return !this.isSingle &&
                Boolean(this.isFocused || this.isLabelActive || this.placeholder);
        }
    },
    watch: {
        isFocused(val) {
            // Sets validationState from validatable
            this.hasColor = val;
            if (val) {
                this.initialValue = this.lazyValue;
            }
            else if (this.initialValue !== this.lazyValue) {
                this.$emit('change', this.lazyValue);
            }
        },
        value(val) {
            if (this.mask && !this.internalChange) {
                const masked = this.maskText(this.unmaskText(val));
                this.lazyValue = this.unmaskText(masked);
                // Emit when the externally set value was modified internally
                String(val) !== this.lazyValue && this.$nextTick(() => {
                    this.$refs.input.value = masked;
                    this.$emit('input', this.lazyValue);
                });
            }
            else
                this.lazyValue = val;
        }
    },
    mounted() {
        this.autofocus && this.onFocus();
    },
    methods: {
        /** @public */
        focus() {
            this.onFocus();
        },
        /** @public */
        blur() {
            this.$refs.input ? this.$refs.input.blur() : this.onBlur();
        },
        clearableCallback() {
            this.internalValue = null;
            this.$nextTick(() => this.$refs.input.focus());
        },
        genAppendSlot() {
            const slot = [];
            if (this.$slots['append-outer']) {
                slot.push(this.$slots['append-outer']);
            }
            else if (this.appendOuterIcon) {
                slot.push(this.genIcon('appendOuter'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        genPrependInnerSlot() {
            const slot = [];
            if (this.$slots['prepend-inner']) {
                slot.push(this.$slots['prepend-inner']);
            }
            else if (this.prependInnerIcon) {
                slot.push(this.genIcon('prependInner'));
            }
            return this.genSlot('prepend', 'inner', slot);
        },
        genIconSlot() {
            const slot = [];
            if (this.$slots['append']) {
                slot.push(this.$slots['append']);
            }
            else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'inner', slot);
        },
        genInputSlot() {
            const input = VInput.methods.genInputSlot.call(this);
            const prepend = this.genPrependInnerSlot();
            prepend && input.children.unshift(prepend);
            return input;
        },
        genClearIcon() {
            if (!this.clearable)
                return null;
            const icon = !this.isDirty
                ? false
                : 'clear';
            if (this.clearIconCb)
                deprecate(':clear-icon-cb', '@click:clear', this);
            return this.genSlot('append', 'inner', [
                this.genIcon(icon, (!this.$listeners['click:clear'] && this.clearIconCb) || this.clearableCallback, false)
            ]);
        },
        genCounter() {
            if (this.counter === false || this.counter == null)
                return null;
            const max = this.counter === true ? this.$attrs.maxlength : this.counter;
            return this.$createElement(VCounter, {
                props: {
                    dark: this.dark,
                    light: this.light,
                    max,
                    value: this.counterValue
                }
            });
        },
        genDefaultSlot() {
            return [
                this.genTextFieldSlot(),
                this.genClearIcon(),
                this.genIconSlot(),
                this.genProgress()
            ];
        },
        genLabel() {
            if (!this.showLabel)
                return null;
            const data = {
                props: {
                    absolute: true,
                    color: this.validationState,
                    dark: this.dark,
                    disabled: this.disabled,
                    focused: !this.isSingle && (this.isFocused || !!this.validationState),
                    left: this.labelPosition.left,
                    light: this.light,
                    right: this.labelPosition.right,
                    value: this.labelValue
                }
            };
            if (this.$attrs.id)
                data.props.for = this.$attrs.id;
            return this.$createElement(VLabel, data, this.$slots.label || this.label);
        },
        genInput() {
            const listeners = Object.assign({}, this.$listeners);
            delete listeners['change']; // Change should not be bound externally
            const data = {
                style: {},
                domProps: {
                    value: this.maskText(this.lazyValue)
                },
                attrs: {
                    'aria-label': (!this.$attrs || !this.$attrs.id) && this.label,
                    ...this.$attrs,
                    autofocus: this.autofocus,
                    disabled: this.disabled,
                    readonly: this.readonly,
                    type: this.type
                },
                on: Object.assign(listeners, {
                    blur: this.onBlur,
                    input: this.onInput,
                    focus: this.onFocus,
                    keydown: this.onKeyDown
                }),
                ref: 'input'
            };
            if (this.placeholder)
                data.attrs.placeholder = this.placeholder;
            if (this.mask)
                data.attrs.maxlength = this.masked.length;
            if (this.browserAutocomplete)
                data.attrs.autocomplete = this.browserAutocomplete;
            return this.$createElement('input', data);
        },
        genMessages() {
            if (this.hideDetails)
                return null;
            return this.$createElement('div', {
                staticClass: 'v-text-field__details'
            }, [
                VInput.methods.genMessages.call(this),
                this.genCounter()
            ]);
        },
        genTextFieldSlot() {
            return this.$createElement('div', {
                staticClass: 'v-text-field__slot'
            }, [
                this.genLabel(),
                this.prefix ? this.genAffix('prefix') : null,
                this.genInput(),
                this.suffix ? this.genAffix('suffix') : null
            ]);
        },
        genAffix(type) {
            return this.$createElement('div', {
                'class': `v-text-field__${type}`,
                ref: type
            }, this[type]);
        },
        onBlur(e) {
            this.isFocused = false;
            // Reset internalChange state
            // to allow external change
            // to persist
            this.internalChange = false;
            this.$emit('blur', e);
        },
        onClick() {
            if (this.isFocused || this.disabled)
                return;
            this.$refs.input.focus();
        },
        onFocus(e) {
            if (!this.$refs.input)
                return;
            if (document.activeElement !== this.$refs.input) {
                return this.$refs.input.focus();
            }
            if (!this.isFocused) {
                this.isFocused = true;
                this.$emit('focus', e);
            }
        },
        onInput(e) {
            this.internalChange = true;
            this.mask && this.resetSelections(e.target);
            this.internalValue = e.target.value;
            this.badInput = e.target.validity && e.target.validity.badInput;
        },
        onKeyDown(e) {
            this.internalChange = true;
            if (e.keyCode === keyCodes.enter)
                this.$emit('change', this.internalValue);
            this.$emit('keydown', e);
        },
        onMouseDown(e) {
            // Prevent input from being blurred
            if (e.target !== this.$refs.input) {
                e.preventDefault();
                e.stopPropagation();
            }
            VInput.methods.onMouseDown.call(this, e);
        },
        onMouseUp(e) {
            if (this.hasMouseDown)
                this.focus();
            VInput.methods.onMouseUp.call(this, e);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRleHRGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUZXh0RmllbGQvVlRleHRGaWVsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTywyQ0FBMkMsQ0FBQTtBQUVsRCxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBRTlCLGFBQWE7QUFDYixPQUFPLFFBQVEsTUFBTSxhQUFhLENBQUE7QUFDbEMsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBRTlCLFNBQVM7QUFDVCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUU1QyxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0seUJBQXlCLENBQUE7QUFFNUMsWUFBWTtBQUNaLE9BQU8sRUFDTCxRQUFRLEVBQ1QsTUFBTSxvQkFBb0IsQ0FBQTtBQUMzQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFOUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBRXZGLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGNBQWM7SUFFcEIsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFO0lBRXRCLE9BQU8sRUFBRSxNQUFNO0lBRWYsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztJQUU1QixZQUFZLEVBQUUsS0FBSztJQUVuQixLQUFLLEVBQUU7UUFDTCxlQUFlLEVBQUUsTUFBTTtRQUN2QixrQkFBa0I7UUFDbEIsaUJBQWlCLEVBQUUsUUFBUTtRQUMzQixTQUFTLEVBQUUsT0FBTztRQUNsQixHQUFHLEVBQUUsT0FBTztRQUNaLG1CQUFtQixFQUFFLE1BQU07UUFDM0Is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QUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsS0FBSztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFFMUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDMUIsQ0FBQztRQUNELFdBQVcsQ0FBRSxDQUFDO1lBQ1osbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDakMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFBO2dCQUNsQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7YUFDcEI7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzFDLENBQUM7UUFDRCxTQUFTLENBQUUsQ0FBQztZQUNWLElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDeEMsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fdGV4dC1maWVsZHMuc3R5bCdcblxuLy8gRXh0ZW5zaW9uc1xuaW1wb3J0IFZJbnB1dCBmcm9tICcuLi9WSW5wdXQnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWQ291bnRlciBmcm9tICcuLi9WQ291bnRlcidcbmltcG9ydCBWTGFiZWwgZnJvbSAnLi4vVkxhYmVsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBNYXNrYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvbWFza2FibGUnXG5pbXBvcnQgTG9hZGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2xvYWRhYmxlJ1xuXG4vLyBEaXJlY3RpdmVzXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlJ1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7XG4gIGtleUNvZGVzXG59IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcbmltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuY29uc3QgZGlydHlUeXBlcyA9IFsnY29sb3InLCAnZmlsZScsICd0aW1lJywgJ2RhdGUnLCAnZGF0ZXRpbWUtbG9jYWwnLCAnd2VlaycsICdtb250aCddXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LXRleHQtZmllbGQnLFxuXG4gIGRpcmVjdGl2ZXM6IHsgUmlwcGxlIH0sXG5cbiAgZXh0ZW5kczogVklucHV0LFxuXG4gIG1peGluczogW01hc2thYmxlLCBMb2FkYWJsZV0sXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIGFwcGVuZE91dGVySWNvbjogU3RyaW5nLFxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGFwcGVuZE91dGVySWNvbkNiOiBGdW5jdGlvbixcbiAgICBhdXRvZm9jdXM6IEJvb2xlYW4sXG4gICAgYm94OiBCb29sZWFuLFxuICAgIGJyb3dzZXJBdXRvY29tcGxldGU6IFN0cmluZyxcbiAgICBjbGVhcmFibGU6IEJvb2xlYW4sXG4gICAgY2xlYXJJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMuY2xlYXInXG4gICAgfSxcbiAgICBjbGVhckljb25DYjogRnVuY3Rpb24sXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgY291bnRlcjogW0Jvb2xlYW4sIE51bWJlciwgU3RyaW5nXSxcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGZ1bGxXaWR0aDogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgcGxhY2Vob2xkZXI6IFN0cmluZyxcbiAgICBwcmVmaXg6IFN0cmluZyxcbiAgICBwcmVwZW5kSW5uZXJJY29uOiBTdHJpbmcsXG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgcHJlcGVuZElubmVySWNvbkNiOiBGdW5jdGlvbixcbiAgICByZXZlcnNlOiBCb29sZWFuLFxuICAgIHNpbmdsZUxpbmU6IEJvb2xlYW4sXG4gICAgc29sbzogQm9vbGVhbixcbiAgICBzb2xvSW52ZXJ0ZWQ6IEJvb2xlYW4sXG4gICAgc3VmZml4OiBTdHJpbmcsXG4gICAgdGV4dGFyZWE6IEJvb2xlYW4sIC8vIFRPRE86IERlcHJlY2F0ZVxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0ZXh0J1xuICAgIH1cbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGJhZElucHV0OiBmYWxzZSxcbiAgICBpbml0aWFsVmFsdWU6IG51bGwsXG4gICAgaW50ZXJuYWxDaGFuZ2U6IGZhbHNlLFxuICAgIGlzQ2xlYXJpbmc6IGZhbHNlXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi10ZXh0LWZpZWxkJzogdHJ1ZSxcbiAgICAgICAgJ3YtdGV4dC1maWVsZC0tZnVsbC13aWR0aCc6IHRoaXMuZnVsbFdpZHRoLFxuICAgICAgICAndi10ZXh0LWZpZWxkLS1wcmVmaXgnOiB0aGlzLnByZWZpeCxcbiAgICAgICAgJ3YtdGV4dC1maWVsZC0tc2luZ2xlLWxpbmUnOiB0aGlzLmlzU2luZ2xlLFxuICAgICAgICAndi10ZXh0LWZpZWxkLS1zb2xvJzogdGhpcy5pc1NvbG8sXG4gICAgICAgICd2LXRleHQtZmllbGQtLXNvbG8taW52ZXJ0ZWQnOiB0aGlzLnNvbG9JbnZlcnRlZCxcbiAgICAgICAgJ3YtdGV4dC1maWVsZC0tc29sby1mbGF0JzogdGhpcy5mbGF0LFxuICAgICAgICAndi10ZXh0LWZpZWxkLS1ib3gnOiB0aGlzLmJveCxcbiAgICAgICAgJ3YtdGV4dC1maWVsZC0tZW5jbG9zZWQnOiB0aGlzLmlzRW5jbG9zZWQsXG4gICAgICAgICd2LXRleHQtZmllbGQtLXJldmVyc2UnOiB0aGlzLnJldmVyc2UsXG4gICAgICAgICd2LXRleHQtZmllbGQtLW91dGxpbmUnOiB0aGlzLmhhc091dGxpbmVcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvdW50ZXJWYWx1ZSAoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuaW50ZXJuYWxWYWx1ZSB8fCAnJykudG9TdHJpbmcoKS5sZW5ndGhcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXNJbnB1dCAoKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9LFxuICAgIC8vIFRPRE86IERlcHJlY2F0ZVxuICAgIGhhc091dGxpbmUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMub3V0bGluZSB8fCB0aGlzLnRleHRhcmVhXG4gICAgfSxcbiAgICBpbnRlcm5hbFZhbHVlOiB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXp5VmFsdWVcbiAgICAgIH0sXG4gICAgICBzZXQgKHZhbCkge1xuICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSB0aGlzLnVubWFza1RleHQodGhpcy5tYXNrVGV4dCh0aGlzLnVubWFza1RleHQodmFsKSkpXG4gICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25SYW5nZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSB2YWxcbiAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHRoaXMubGF6eVZhbHVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBpc0RpcnR5ICgpIHtcbiAgICAgIHJldHVybiAodGhpcy5sYXp5VmFsdWUgIT0gbnVsbCAmJlxuICAgICAgICB0aGlzLmxhenlWYWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IDApIHx8XG4gICAgICAgIHRoaXMuYmFkSW5wdXRcbiAgICB9LFxuICAgIGlzRW5jbG9zZWQgKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5ib3ggfHxcbiAgICAgICAgdGhpcy5pc1NvbG8gfHxcbiAgICAgICAgdGhpcy5oYXNPdXRsaW5lIHx8XG4gICAgICAgIHRoaXMuZnVsbFdpZHRoXG4gICAgICApXG4gICAgfSxcbiAgICBpc0xhYmVsQWN0aXZlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzRGlydHkgfHwgZGlydHlUeXBlcy5pbmNsdWRlcyh0aGlzLnR5cGUpXG4gICAgfSxcbiAgICBpc1NpbmdsZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1NvbG8gfHwgdGhpcy5zaW5nbGVMaW5lXG4gICAgfSxcbiAgICBpc1NvbG8gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc29sbyB8fCB0aGlzLnNvbG9JbnZlcnRlZFxuICAgIH0sXG4gICAgbGFiZWxQb3NpdGlvbiAoKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSAodGhpcy5wcmVmaXggJiYgIXRoaXMubGFiZWxWYWx1ZSkgPyAxNiA6IDBcblxuICAgICAgcmV0dXJuICghdGhpcy4kdnVldGlmeS5ydGwgIT09ICF0aGlzLnJldmVyc2UpID8ge1xuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiBvZmZzZXRcbiAgICAgIH0gOiB7XG4gICAgICAgIGxlZnQ6IG9mZnNldCxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJ1xuICAgICAgfVxuICAgIH0sXG4gICAgc2hvd0xhYmVsICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc0xhYmVsICYmICghdGhpcy5pc1NpbmdsZSB8fCAoIXRoaXMuaXNMYWJlbEFjdGl2ZSAmJiAhdGhpcy5wbGFjZWhvbGRlcikpXG4gICAgfSxcbiAgICBsYWJlbFZhbHVlICgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5pc1NpbmdsZSAmJlxuICAgICAgICBCb29sZWFuKHRoaXMuaXNGb2N1c2VkIHx8IHRoaXMuaXNMYWJlbEFjdGl2ZSB8fCB0aGlzLnBsYWNlaG9sZGVyKVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGlzRm9jdXNlZCAodmFsKSB7XG4gICAgICAvLyBTZXRzIHZhbGlkYXRpb25TdGF0ZSBmcm9tIHZhbGlkYXRhYmxlXG4gICAgICB0aGlzLmhhc0NvbG9yID0gdmFsXG5cbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsVmFsdWUgPSB0aGlzLmxhenlWYWx1ZVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmluaXRpYWxWYWx1ZSAhPT0gdGhpcy5sYXp5VmFsdWUpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5sYXp5VmFsdWUpXG4gICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZSAodmFsKSB7XG4gICAgICBpZiAodGhpcy5tYXNrICYmICF0aGlzLmludGVybmFsQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IG1hc2tlZCA9IHRoaXMubWFza1RleHQodGhpcy51bm1hc2tUZXh0KHZhbCkpXG4gICAgICAgIHRoaXMubGF6eVZhbHVlID0gdGhpcy51bm1hc2tUZXh0KG1hc2tlZClcblxuICAgICAgICAvLyBFbWl0IHdoZW4gdGhlIGV4dGVybmFsbHkgc2V0IHZhbHVlIHdhcyBtb2RpZmllZCBpbnRlcm5hbGx5XG4gICAgICAgIFN0cmluZyh2YWwpICE9PSB0aGlzLmxhenlWYWx1ZSAmJiB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC52YWx1ZSA9IG1hc2tlZFxuICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgdGhpcy5sYXp5VmFsdWUpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgdGhpcy5sYXp5VmFsdWUgPSB2YWxcbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy5hdXRvZm9jdXMgJiYgdGhpcy5vbkZvY3VzKClcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgLyoqIEBwdWJsaWMgKi9cbiAgICBmb2N1cyAoKSB7XG4gICAgICB0aGlzLm9uRm9jdXMoKVxuICAgIH0sXG4gICAgLyoqIEBwdWJsaWMgKi9cbiAgICBibHVyICgpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQgPyB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKSA6IHRoaXMub25CbHVyKClcbiAgICB9LFxuICAgIGNsZWFyYWJsZUNhbGxiYWNrICgpIHtcbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IG51bGxcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHRoaXMuJHJlZnMuaW5wdXQuZm9jdXMoKSlcbiAgICB9LFxuICAgIGdlbkFwcGVuZFNsb3QgKCkge1xuICAgICAgY29uc3Qgc2xvdCA9IFtdXG5cbiAgICAgIGlmICh0aGlzLiRzbG90c1snYXBwZW5kLW91dGVyJ10pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuJHNsb3RzWydhcHBlbmQtb3V0ZXInXSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcHBlbmRPdXRlckljb24pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuZ2VuSWNvbignYXBwZW5kT3V0ZXInKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZ2VuU2xvdCgnYXBwZW5kJywgJ291dGVyJywgc2xvdClcbiAgICB9LFxuICAgIGdlblByZXBlbmRJbm5lclNsb3QgKCkge1xuICAgICAgY29uc3Qgc2xvdCA9IFtdXG5cbiAgICAgIGlmICh0aGlzLiRzbG90c1sncHJlcGVuZC1pbm5lciddKSB7XG4gICAgICAgIHNsb3QucHVzaCh0aGlzLiRzbG90c1sncHJlcGVuZC1pbm5lciddKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXBlbmRJbm5lckljb24pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuZ2VuSWNvbigncHJlcGVuZElubmVyJykpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdlblNsb3QoJ3ByZXBlbmQnLCAnaW5uZXInLCBzbG90KVxuICAgIH0sXG4gICAgZ2VuSWNvblNsb3QgKCkge1xuICAgICAgY29uc3Qgc2xvdCA9IFtdXG5cbiAgICAgIGlmICh0aGlzLiRzbG90c1snYXBwZW5kJ10pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuJHNsb3RzWydhcHBlbmQnXSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcHBlbmRJY29uKSB7XG4gICAgICAgIHNsb3QucHVzaCh0aGlzLmdlbkljb24oJ2FwcGVuZCcpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZW5TbG90KCdhcHBlbmQnLCAnaW5uZXInLCBzbG90KVxuICAgIH0sXG4gICAgZ2VuSW5wdXRTbG90ICgpIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gVklucHV0Lm1ldGhvZHMuZ2VuSW5wdXRTbG90LmNhbGwodGhpcylcblxuICAgICAgY29uc3QgcHJlcGVuZCA9IHRoaXMuZ2VuUHJlcGVuZElubmVyU2xvdCgpXG4gICAgICBwcmVwZW5kICYmIGlucHV0LmNoaWxkcmVuLnVuc2hpZnQocHJlcGVuZClcblxuICAgICAgcmV0dXJuIGlucHV0XG4gICAgfSxcbiAgICBnZW5DbGVhckljb24gKCkge1xuICAgICAgaWYgKCF0aGlzLmNsZWFyYWJsZSkgcmV0dXJuIG51bGxcblxuICAgICAgY29uc3QgaWNvbiA9ICF0aGlzLmlzRGlydHlcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6ICdjbGVhcidcblxuICAgICAgaWYgKHRoaXMuY2xlYXJJY29uQ2IpIGRlcHJlY2F0ZSgnOmNsZWFyLWljb24tY2InLCAnQGNsaWNrOmNsZWFyJywgdGhpcylcblxuICAgICAgcmV0dXJuIHRoaXMuZ2VuU2xvdCgnYXBwZW5kJywgJ2lubmVyJywgW1xuICAgICAgICB0aGlzLmdlbkljb24oXG4gICAgICAgICAgaWNvbixcbiAgICAgICAgICAoIXRoaXMuJGxpc3RlbmVyc1snY2xpY2s6Y2xlYXInXSAmJiB0aGlzLmNsZWFySWNvbkNiKSB8fCB0aGlzLmNsZWFyYWJsZUNhbGxiYWNrLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5Db3VudGVyICgpIHtcbiAgICAgIGlmICh0aGlzLmNvdW50ZXIgPT09IGZhbHNlIHx8IHRoaXMuY291bnRlciA9PSBudWxsKSByZXR1cm4gbnVsbFxuXG4gICAgICBjb25zdCBtYXggPSB0aGlzLmNvdW50ZXIgPT09IHRydWUgPyB0aGlzLiRhdHRycy5tYXhsZW5ndGggOiB0aGlzLmNvdW50ZXJcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkNvdW50ZXIsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBkYXJrOiB0aGlzLmRhcmssXG4gICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHQsXG4gICAgICAgICAgbWF4LFxuICAgICAgICAgIHZhbHVlOiB0aGlzLmNvdW50ZXJWYWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuRGVmYXVsdFNsb3QgKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdGhpcy5nZW5UZXh0RmllbGRTbG90KCksXG4gICAgICAgIHRoaXMuZ2VuQ2xlYXJJY29uKCksXG4gICAgICAgIHRoaXMuZ2VuSWNvblNsb3QoKSxcbiAgICAgICAgdGhpcy5nZW5Qcm9ncmVzcygpXG4gICAgICBdXG4gICAgfSxcbiAgICBnZW5MYWJlbCAoKSB7XG4gICAgICBpZiAoIXRoaXMuc2hvd0xhYmVsKSByZXR1cm4gbnVsbFxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGFic29sdXRlOiB0cnVlLFxuICAgICAgICAgIGNvbG9yOiB0aGlzLnZhbGlkYXRpb25TdGF0ZSxcbiAgICAgICAgICBkYXJrOiB0aGlzLmRhcmssXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgZm9jdXNlZDogIXRoaXMuaXNTaW5nbGUgJiYgKHRoaXMuaXNGb2N1c2VkIHx8ICEhdGhpcy52YWxpZGF0aW9uU3RhdGUpLFxuICAgICAgICAgIGxlZnQ6IHRoaXMubGFiZWxQb3NpdGlvbi5sZWZ0LFxuICAgICAgICAgIGxpZ2h0OiB0aGlzLmxpZ2h0LFxuICAgICAgICAgIHJpZ2h0OiB0aGlzLmxhYmVsUG9zaXRpb24ucmlnaHQsXG4gICAgICAgICAgdmFsdWU6IHRoaXMubGFiZWxWYWx1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiRhdHRycy5pZCkgZGF0YS5wcm9wcy5mb3IgPSB0aGlzLiRhdHRycy5pZFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWTGFiZWwsIGRhdGEsIHRoaXMuJHNsb3RzLmxhYmVsIHx8IHRoaXMubGFiZWwpXG4gICAgfSxcbiAgICBnZW5JbnB1dCAoKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLiRsaXN0ZW5lcnMpXG4gICAgICBkZWxldGUgbGlzdGVuZXJzWydjaGFuZ2UnXSAvLyBDaGFuZ2Ugc2hvdWxkIG5vdCBiZSBib3VuZCBleHRlcm5hbGx5XG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy5tYXNrVGV4dCh0aGlzLmxhenlWYWx1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6ICghdGhpcy4kYXR0cnMgfHwgIXRoaXMuJGF0dHJzLmlkKSAmJiB0aGlzLmxhYmVsLCAvLyBMYWJlbCBgZm9yYCB3aWxsIGJlIHNldCBpZiB3ZSBoYXZlIGFuIGlkXG4gICAgICAgICAgLi4udGhpcy4kYXR0cnMsXG4gICAgICAgICAgYXV0b2ZvY3VzOiB0aGlzLmF1dG9mb2N1cyxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICByZWFkb25seTogdGhpcy5yZWFkb25seSxcbiAgICAgICAgICB0eXBlOiB0aGlzLnR5cGVcbiAgICAgICAgfSxcbiAgICAgICAgb246IE9iamVjdC5hc3NpZ24obGlzdGVuZXJzLCB7XG4gICAgICAgICAgYmx1cjogdGhpcy5vbkJsdXIsXG4gICAgICAgICAgaW5wdXQ6IHRoaXMub25JbnB1dCxcbiAgICAgICAgICBmb2N1czogdGhpcy5vbkZvY3VzLFxuICAgICAgICAgIGtleWRvd246IHRoaXMub25LZXlEb3duXG4gICAgICAgIH0pLFxuICAgICAgICByZWY6ICdpbnB1dCdcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXIpIGRhdGEuYXR0cnMucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyXG4gICAgICBpZiAodGhpcy5tYXNrKSBkYXRhLmF0dHJzLm1heGxlbmd0aCA9IHRoaXMubWFza2VkLmxlbmd0aFxuICAgICAgaWYgKHRoaXMuYnJvd3NlckF1dG9jb21wbGV0ZSkgZGF0YS5hdHRycy5hdXRvY29tcGxldGUgPSB0aGlzLmJyb3dzZXJBdXRvY29tcGxldGVcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgZGF0YSlcbiAgICB9LFxuICAgIGdlbk1lc3NhZ2VzICgpIHtcbiAgICAgIGlmICh0aGlzLmhpZGVEZXRhaWxzKSByZXR1cm4gbnVsbFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtdGV4dC1maWVsZF9fZGV0YWlscydcbiAgICAgIH0sIFtcbiAgICAgICAgVklucHV0Lm1ldGhvZHMuZ2VuTWVzc2FnZXMuY2FsbCh0aGlzKSxcbiAgICAgICAgdGhpcy5nZW5Db3VudGVyKClcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5UZXh0RmllbGRTbG90ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10ZXh0LWZpZWxkX19zbG90J1xuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlbkxhYmVsKCksXG4gICAgICAgIHRoaXMucHJlZml4ID8gdGhpcy5nZW5BZmZpeCgncHJlZml4JykgOiBudWxsLFxuICAgICAgICB0aGlzLmdlbklucHV0KCksXG4gICAgICAgIHRoaXMuc3VmZml4ID8gdGhpcy5nZW5BZmZpeCgnc3VmZml4JykgOiBudWxsXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuQWZmaXggKHR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdjbGFzcyc6IGB2LXRleHQtZmllbGRfXyR7dHlwZX1gLFxuICAgICAgICByZWY6IHR5cGVcbiAgICAgIH0sIHRoaXNbdHlwZV0pXG4gICAgfSxcbiAgICBvbkJsdXIgKGUpIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2VcbiAgICAgIC8vIFJlc2V0IGludGVybmFsQ2hhbmdlIHN0YXRlXG4gICAgICAvLyB0byBhbGxvdyBleHRlcm5hbCBjaGFuZ2VcbiAgICAgIC8vIHRvIHBlcnNpc3RcbiAgICAgIHRoaXMuaW50ZXJuYWxDaGFuZ2UgPSBmYWxzZVxuXG4gICAgICB0aGlzLiRlbWl0KCdibHVyJywgZSlcbiAgICB9LFxuICAgIG9uQ2xpY2sgKCkge1xuICAgICAgaWYgKHRoaXMuaXNGb2N1c2VkIHx8IHRoaXMuZGlzYWJsZWQpIHJldHVyblxuXG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIG9uRm9jdXMgKGUpIHtcbiAgICAgIGlmICghdGhpcy4kcmVmcy5pbnB1dCkgcmV0dXJuXG5cbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLiRyZWZzLmlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWVcbiAgICAgICAgdGhpcy4kZW1pdCgnZm9jdXMnLCBlKVxuICAgICAgfVxuICAgIH0sXG4gICAgb25JbnB1dCAoZSkge1xuICAgICAgdGhpcy5pbnRlcm5hbENoYW5nZSA9IHRydWVcbiAgICAgIHRoaXMubWFzayAmJiB0aGlzLnJlc2V0U2VsZWN0aW9ucyhlLnRhcmdldClcbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICB0aGlzLmJhZElucHV0ID0gZS50YXJnZXQudmFsaWRpdHkgJiYgZS50YXJnZXQudmFsaWRpdHkuYmFkSW5wdXRcbiAgICB9LFxuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgdGhpcy5pbnRlcm5hbENoYW5nZSA9IHRydWVcblxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0ga2V5Q29kZXMuZW50ZXIpIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuaW50ZXJuYWxWYWx1ZSlcblxuICAgICAgdGhpcy4kZW1pdCgna2V5ZG93bicsIGUpXG4gICAgfSxcbiAgICBvbk1vdXNlRG93biAoZSkge1xuICAgICAgLy8gUHJldmVudCBpbnB1dCBmcm9tIGJlaW5nIGJsdXJyZWRcbiAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcy4kcmVmcy5pbnB1dCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgfVxuXG4gICAgICBWSW5wdXQubWV0aG9kcy5vbk1vdXNlRG93bi5jYWxsKHRoaXMsIGUpXG4gICAgfSxcbiAgICBvbk1vdXNlVXAgKGUpIHtcbiAgICAgIGlmICh0aGlzLmhhc01vdXNlRG93bikgdGhpcy5mb2N1cygpXG5cbiAgICAgIFZJbnB1dC5tZXRob2RzLm9uTW91c2VVcC5jYWxsKHRoaXMsIGUpXG4gICAgfVxuICB9XG59XG4iXX0=