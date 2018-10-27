// Styles
import '../../stylus/components/_text-fields.styl';
// Extensions
import VInput from '../VInput';
// Components
import VCounter from '../VCounter';
import VLabel from '../VLabel';
// Mixins
import Maskable from '../../mixins/maskable';
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
    mixins: [Maskable],
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
            this.onBlur();
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
                this.genIconSlot()
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
            // Default click handler is on slot,
            // Mouse events are to enable specific
            // input types when clicked
            if ((this.isSolo || this.hasOutline) &&
                document.activeElement !== this.$refs.input) {
                this.$refs.input.focus();
            }
            VInput.methods.onMouseUp.call(this, e);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRleHRGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUZXh0RmllbGQvVlRleHRGaWVsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTywyQ0FBMkMsQ0FBQTtBQUVsRCxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBRTlCLGFBQWE7QUFDYixPQUFPLFFBQVEsTUFBTSxhQUFhLENBQUE7QUFDbEMsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBRTlCLFNBQVM7QUFDVCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUU1QyxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0seUJBQXlCLENBQUE7QUFFNUMsWUFBWTtBQUNaLE9BQU8sRUFDTCxRQUFRLEVBQ1QsTUFBTSxvQkFBb0IsQ0FBQTtBQUMzQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFOUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBRXZGLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGNBQWM7SUFFcEIsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFO0lBRXRCLE9BQU8sRUFBRSxNQUFNO0lBRWYsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO0lBRWxCLFlBQVksRUFBRSxLQUFLO0lBRW5CLEtBQUssRUFBRTtRQUNMLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLGtCQUFrQjtRQUNsQixpQkFBaUIsRUFBRSxRQUFRO1FBQzNCLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLEdBQUcsRUFBRSxPQUFPO1FBQ1osbUJBQW1CLEVBQUUsTUFBTTtRQUMzQixTQUFTLEVBQUUsT0FBTztRQUNsQixTQUFTLEVBQUU7WUFDVCxJQUFJLEVB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V0FBVyxDQUFFLENBQUM7WUFDWixtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNqQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7Z0JBQ2xCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTthQUNwQjtZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDMUMsQ0FBQztRQUNELFNBQVMsQ0FBRSxDQUFDO1lBQ1Ysb0NBQW9DO1lBQ3BDLHNDQUFzQztZQUN0QywyQkFBMkI7WUFDM0IsSUFDRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDaEMsUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDM0M7Z0JBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUE7YUFDekI7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3RleHQtZmllbGRzLnN0eWwnXG5cbi8vIEV4dGVuc2lvbnNcbmltcG9ydCBWSW5wdXQgZnJvbSAnLi4vVklucHV0J1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVkNvdW50ZXIgZnJvbSAnLi4vVkNvdW50ZXInXG5pbXBvcnQgVkxhYmVsIGZyb20gJy4uL1ZMYWJlbCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgTWFza2FibGUgZnJvbSAnLi4vLi4vbWl4aW5zL21hc2thYmxlJ1xuXG4vLyBEaXJlY3RpdmVzXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlJ1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7XG4gIGtleUNvZGVzXG59IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcbmltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuY29uc3QgZGlydHlUeXBlcyA9IFsnY29sb3InLCAnZmlsZScsICd0aW1lJywgJ2RhdGUnLCAnZGF0ZXRpbWUtbG9jYWwnLCAnd2VlaycsICdtb250aCddXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LXRleHQtZmllbGQnLFxuXG4gIGRpcmVjdGl2ZXM6IHsgUmlwcGxlIH0sXG5cbiAgZXh0ZW5kczogVklucHV0LFxuXG4gIG1peGluczogW01hc2thYmxlXSxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgYXBwZW5kT3V0ZXJJY29uOiBTdHJpbmcsXG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgYXBwZW5kT3V0ZXJJY29uQ2I6IEZ1bmN0aW9uLFxuICAgIGF1dG9mb2N1czogQm9vbGVhbixcbiAgICBib3g6IEJvb2xlYW4sXG4gICAgYnJvd3NlckF1dG9jb21wbGV0ZTogU3RyaW5nLFxuICAgIGNsZWFyYWJsZTogQm9vbGVhbixcbiAgICBjbGVhckljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5jbGVhcidcbiAgICB9LFxuICAgIGNsZWFySWNvbkNiOiBGdW5jdGlvbixcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICBjb3VudGVyOiBbQm9vbGVhbiwgTnVtYmVyLCBTdHJpbmddLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgb3V0bGluZTogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIHByZWZpeDogU3RyaW5nLFxuICAgIHByZXBlbmRJbm5lckljb246IFN0cmluZyxcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICBwcmVwZW5kSW5uZXJJY29uQ2I6IEZ1bmN0aW9uLFxuICAgIHJldmVyc2U6IEJvb2xlYW4sXG4gICAgc2luZ2xlTGluZTogQm9vbGVhbixcbiAgICBzb2xvOiBCb29sZWFuLFxuICAgIHNvbG9JbnZlcnRlZDogQm9vbGVhbixcbiAgICBzdWZmaXg6IFN0cmluZyxcbiAgICB0ZXh0YXJlYTogQm9vbGVhbiwgLy8gVE9ETzogRGVwcmVjYXRlXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgYmFkSW5wdXQ6IGZhbHNlLFxuICAgIGluaXRpYWxWYWx1ZTogbnVsbCxcbiAgICBpbnRlcm5hbENoYW5nZTogZmFsc2UsXG4gICAgaXNDbGVhcmluZzogZmFsc2VcbiAgfSksXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LXRleHQtZmllbGQnOiB0cnVlLFxuICAgICAgICAndi10ZXh0LWZpZWxkLS1mdWxsLXdpZHRoJzogdGhpcy5mdWxsV2lkdGgsXG4gICAgICAgICd2LXRleHQtZmllbGQtLXByZWZpeCc6IHRoaXMucHJlZml4LFxuICAgICAgICAndi10ZXh0LWZpZWxkLS1zaW5nbGUtbGluZSc6IHRoaXMuaXNTaW5nbGUsXG4gICAgICAgICd2LXRleHQtZmllbGQtLXNvbG8nOiB0aGlzLmlzU29sbyxcbiAgICAgICAgJ3YtdGV4dC1maWVsZC0tc29sby1pbnZlcnRlZCc6IHRoaXMuc29sb0ludmVydGVkLFxuICAgICAgICAndi10ZXh0LWZpZWxkLS1zb2xvLWZsYXQnOiB0aGlzLmZsYXQsXG4gICAgICAgICd2LXRleHQtZmllbGQtLWJveCc6IHRoaXMuYm94LFxuICAgICAgICAndi10ZXh0LWZpZWxkLS1lbmNsb3NlZCc6IHRoaXMuaXNFbmNsb3NlZCxcbiAgICAgICAgJ3YtdGV4dC1maWVsZC0tcmV2ZXJzZSc6IHRoaXMucmV2ZXJzZSxcbiAgICAgICAgJ3YtdGV4dC1maWVsZC0tb3V0bGluZSc6IHRoaXMuaGFzT3V0bGluZVxuICAgICAgfVxuICAgIH0sXG4gICAgY291bnRlclZhbHVlICgpIHtcbiAgICAgIHJldHVybiAodGhpcy5pbnRlcm5hbFZhbHVlIHx8ICcnKS50b1N0cmluZygpLmxlbmd0aFxuICAgIH0sXG4gICAgZGlyZWN0aXZlc0lucHV0ICgpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH0sXG4gICAgLy8gVE9ETzogRGVwcmVjYXRlXG4gICAgaGFzT3V0bGluZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRsaW5lIHx8IHRoaXMudGV4dGFyZWFcbiAgICB9LFxuICAgIGludGVybmFsVmFsdWU6IHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhenlWYWx1ZVxuICAgICAgfSxcbiAgICAgIHNldCAodmFsKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICB0aGlzLmxhenlWYWx1ZSA9IHRoaXMudW5tYXNrVGV4dCh0aGlzLm1hc2tUZXh0KHRoaXMudW5tYXNrVGV4dCh2YWwpKSlcbiAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvblJhbmdlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxhenlWYWx1ZSA9IHZhbFxuICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgdGhpcy5sYXp5VmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGlzRGlydHkgKCkge1xuICAgICAgcmV0dXJuICh0aGlzLmxhenlWYWx1ZSAhPSBudWxsICYmXG4gICAgICAgIHRoaXMubGF6eVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCkgfHxcbiAgICAgICAgdGhpcy5iYWRJbnB1dFxuICAgIH0sXG4gICAgaXNFbmNsb3NlZCAoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLmJveCB8fFxuICAgICAgICB0aGlzLmlzU29sbyB8fFxuICAgICAgICB0aGlzLmhhc091dGxpbmUgfHxcbiAgICAgICAgdGhpcy5mdWxsV2lkdGhcbiAgICAgIClcbiAgICB9LFxuICAgIGlzTGFiZWxBY3RpdmUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNEaXJ0eSB8fCBkaXJ0eVR5cGVzLmluY2x1ZGVzKHRoaXMudHlwZSlcbiAgICB9LFxuICAgIGlzU2luZ2xlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzU29sbyB8fCB0aGlzLnNpbmdsZUxpbmVcbiAgICB9LFxuICAgIGlzU29sbyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zb2xvIHx8IHRoaXMuc29sb0ludmVydGVkXG4gICAgfSxcbiAgICBsYWJlbFBvc2l0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9ICh0aGlzLnByZWZpeCAmJiAhdGhpcy5sYWJlbFZhbHVlKSA/IDE2IDogMFxuXG4gICAgICByZXR1cm4gKCF0aGlzLiR2dWV0aWZ5LnJ0bCAhPT0gIXRoaXMucmV2ZXJzZSkgPyB7XG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6IG9mZnNldFxuICAgICAgfSA6IHtcbiAgICAgICAgbGVmdDogb2Zmc2V0LFxuICAgICAgICByaWdodDogJ2F1dG8nXG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93TGFiZWwgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzTGFiZWwgJiYgKCF0aGlzLmlzU2luZ2xlIHx8ICghdGhpcy5pc0xhYmVsQWN0aXZlICYmICF0aGlzLnBsYWNlaG9sZGVyKSlcbiAgICB9LFxuICAgIGxhYmVsVmFsdWUgKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmlzU2luZ2xlICYmXG4gICAgICAgIEJvb2xlYW4odGhpcy5pc0ZvY3VzZWQgfHwgdGhpcy5pc0xhYmVsQWN0aXZlIHx8IHRoaXMucGxhY2Vob2xkZXIpXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaXNGb2N1c2VkICh2YWwpIHtcbiAgICAgIC8vIFNldHMgdmFsaWRhdGlvblN0YXRlIGZyb20gdmFsaWRhdGFibGVcbiAgICAgIHRoaXMuaGFzQ29sb3IgPSB2YWxcblxuICAgICAgaWYgKHZhbCkge1xuICAgICAgICB0aGlzLmluaXRpYWxWYWx1ZSA9IHRoaXMubGF6eVZhbHVlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdGlhbFZhbHVlICE9PSB0aGlzLmxhenlWYWx1ZSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmxhenlWYWx1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbHVlICh2YWwpIHtcbiAgICAgIGlmICh0aGlzLm1hc2sgJiYgIXRoaXMuaW50ZXJuYWxDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgbWFza2VkID0gdGhpcy5tYXNrVGV4dCh0aGlzLnVubWFza1RleHQodmFsKSlcbiAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSB0aGlzLnVubWFza1RleHQobWFza2VkKVxuXG4gICAgICAgIC8vIEVtaXQgd2hlbiB0aGUgZXh0ZXJuYWxseSBzZXQgdmFsdWUgd2FzIG1vZGlmaWVkIGludGVybmFsbHlcbiAgICAgICAgU3RyaW5nKHZhbCkgIT09IHRoaXMubGF6eVZhbHVlICYmIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICB0aGlzLiRyZWZzLmlucHV0LnZhbHVlID0gbWFza2VkXG4gICAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB0aGlzLmxhenlWYWx1ZSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB0aGlzLmxhenlWYWx1ZSA9IHZhbFxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLmF1dG9mb2N1cyAmJiB0aGlzLm9uRm9jdXMoKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICAvKiogQHB1YmxpYyAqL1xuICAgIGZvY3VzICgpIHtcbiAgICAgIHRoaXMub25Gb2N1cygpXG4gICAgfSxcbiAgICAvKiogQHB1YmxpYyAqL1xuICAgIGJsdXIgKCkge1xuICAgICAgdGhpcy5vbkJsdXIoKVxuICAgIH0sXG4gICAgY2xlYXJhYmxlQ2FsbGJhY2sgKCkge1xuICAgICAgdGhpcy5pbnRlcm5hbFZhbHVlID0gbnVsbFxuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4gdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpKVxuICAgIH0sXG4gICAgZ2VuQXBwZW5kU2xvdCAoKSB7XG4gICAgICBjb25zdCBzbG90ID0gW11cblxuICAgICAgaWYgKHRoaXMuJHNsb3RzWydhcHBlbmQtb3V0ZXInXSkge1xuICAgICAgICBzbG90LnB1c2godGhpcy4kc2xvdHNbJ2FwcGVuZC1vdXRlciddKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFwcGVuZE91dGVySWNvbikge1xuICAgICAgICBzbG90LnB1c2godGhpcy5nZW5JY29uKCdhcHBlbmRPdXRlcicpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZW5TbG90KCdhcHBlbmQnLCAnb3V0ZXInLCBzbG90KVxuICAgIH0sXG4gICAgZ2VuUHJlcGVuZElubmVyU2xvdCAoKSB7XG4gICAgICBjb25zdCBzbG90ID0gW11cblxuICAgICAgaWYgKHRoaXMuJHNsb3RzWydwcmVwZW5kLWlubmVyJ10pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuJHNsb3RzWydwcmVwZW5kLWlubmVyJ10pXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJlcGVuZElubmVySWNvbikge1xuICAgICAgICBzbG90LnB1c2godGhpcy5nZW5JY29uKCdwcmVwZW5kSW5uZXInKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZ2VuU2xvdCgncHJlcGVuZCcsICdpbm5lcicsIHNsb3QpXG4gICAgfSxcbiAgICBnZW5JY29uU2xvdCAoKSB7XG4gICAgICBjb25zdCBzbG90ID0gW11cblxuICAgICAgaWYgKHRoaXMuJHNsb3RzWydhcHBlbmQnXSkge1xuICAgICAgICBzbG90LnB1c2godGhpcy4kc2xvdHNbJ2FwcGVuZCddKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFwcGVuZEljb24pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuZ2VuSWNvbignYXBwZW5kJykpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdlblNsb3QoJ2FwcGVuZCcsICdpbm5lcicsIHNsb3QpXG4gICAgfSxcbiAgICBnZW5JbnB1dFNsb3QgKCkge1xuICAgICAgY29uc3QgaW5wdXQgPSBWSW5wdXQubWV0aG9kcy5nZW5JbnB1dFNsb3QuY2FsbCh0aGlzKVxuXG4gICAgICBjb25zdCBwcmVwZW5kID0gdGhpcy5nZW5QcmVwZW5kSW5uZXJTbG90KClcbiAgICAgIHByZXBlbmQgJiYgaW5wdXQuY2hpbGRyZW4udW5zaGlmdChwcmVwZW5kKVxuXG4gICAgICByZXR1cm4gaW5wdXRcbiAgICB9LFxuICAgIGdlbkNsZWFySWNvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuY2xlYXJhYmxlKSByZXR1cm4gbnVsbFxuXG4gICAgICBjb25zdCBpY29uID0gIXRoaXMuaXNEaXJ0eVxuICAgICAgICA/IGZhbHNlXG4gICAgICAgIDogJ2NsZWFyJ1xuXG4gICAgICBpZiAodGhpcy5jbGVhckljb25DYikgZGVwcmVjYXRlKCc6Y2xlYXItaWNvbi1jYicsICdAY2xpY2s6Y2xlYXInLCB0aGlzKVxuXG4gICAgICByZXR1cm4gdGhpcy5nZW5TbG90KCdhcHBlbmQnLCAnaW5uZXInLCBbXG4gICAgICAgIHRoaXMuZ2VuSWNvbihcbiAgICAgICAgICBpY29uLFxuICAgICAgICAgICghdGhpcy4kbGlzdGVuZXJzWydjbGljazpjbGVhciddICYmIHRoaXMuY2xlYXJJY29uQ2IpIHx8IHRoaXMuY2xlYXJhYmxlQ2FsbGJhY2ssXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlbkNvdW50ZXIgKCkge1xuICAgICAgaWYgKHRoaXMuY291bnRlciA9PT0gZmFsc2UgfHwgdGhpcy5jb3VudGVyID09IG51bGwpIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IG1heCA9IHRoaXMuY291bnRlciA9PT0gdHJ1ZSA/IHRoaXMuJGF0dHJzLm1heGxlbmd0aCA6IHRoaXMuY291bnRlclxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWQ291bnRlciwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGRhcms6IHRoaXMuZGFyayxcbiAgICAgICAgICBsaWdodDogdGhpcy5saWdodCxcbiAgICAgICAgICBtYXgsXG4gICAgICAgICAgdmFsdWU6IHRoaXMuY291bnRlclZhbHVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZW5EZWZhdWx0U2xvdCAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLmdlblRleHRGaWVsZFNsb3QoKSxcbiAgICAgICAgdGhpcy5nZW5DbGVhckljb24oKSxcbiAgICAgICAgdGhpcy5nZW5JY29uU2xvdCgpXG4gICAgICBdXG4gICAgfSxcbiAgICBnZW5MYWJlbCAoKSB7XG4gICAgICBpZiAoIXRoaXMuc2hvd0xhYmVsKSByZXR1cm4gbnVsbFxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGFic29sdXRlOiB0cnVlLFxuICAgICAgICAgIGNvbG9yOiB0aGlzLnZhbGlkYXRpb25TdGF0ZSxcbiAgICAgICAgICBkYXJrOiB0aGlzLmRhcmssXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgZm9jdXNlZDogIXRoaXMuaXNTaW5nbGUgJiYgKHRoaXMuaXNGb2N1c2VkIHx8ICEhdGhpcy52YWxpZGF0aW9uU3RhdGUpLFxuICAgICAgICAgIGxlZnQ6IHRoaXMubGFiZWxQb3NpdGlvbi5sZWZ0LFxuICAgICAgICAgIGxpZ2h0OiB0aGlzLmxpZ2h0LFxuICAgICAgICAgIHJpZ2h0OiB0aGlzLmxhYmVsUG9zaXRpb24ucmlnaHQsXG4gICAgICAgICAgdmFsdWU6IHRoaXMubGFiZWxWYWx1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiRhdHRycy5pZCkgZGF0YS5wcm9wcy5mb3IgPSB0aGlzLiRhdHRycy5pZFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWTGFiZWwsIGRhdGEsIHRoaXMuJHNsb3RzLmxhYmVsIHx8IHRoaXMubGFiZWwpXG4gICAgfSxcbiAgICBnZW5JbnB1dCAoKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLiRsaXN0ZW5lcnMpXG4gICAgICBkZWxldGUgbGlzdGVuZXJzWydjaGFuZ2UnXSAvLyBDaGFuZ2Ugc2hvdWxkIG5vdCBiZSBib3VuZCBleHRlcm5hbGx5XG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy5tYXNrVGV4dCh0aGlzLmxhenlWYWx1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6ICghdGhpcy4kYXR0cnMgfHwgIXRoaXMuJGF0dHJzLmlkKSAmJiB0aGlzLmxhYmVsLCAvLyBMYWJlbCBgZm9yYCB3aWxsIGJlIHNldCBpZiB3ZSBoYXZlIGFuIGlkXG4gICAgICAgICAgLi4udGhpcy4kYXR0cnMsXG4gICAgICAgICAgYXV0b2ZvY3VzOiB0aGlzLmF1dG9mb2N1cyxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICByZWFkb25seTogdGhpcy5yZWFkb25seSxcbiAgICAgICAgICB0eXBlOiB0aGlzLnR5cGVcbiAgICAgICAgfSxcbiAgICAgICAgb246IE9iamVjdC5hc3NpZ24obGlzdGVuZXJzLCB7XG4gICAgICAgICAgYmx1cjogdGhpcy5vbkJsdXIsXG4gICAgICAgICAgaW5wdXQ6IHRoaXMub25JbnB1dCxcbiAgICAgICAgICBmb2N1czogdGhpcy5vbkZvY3VzLFxuICAgICAgICAgIGtleWRvd246IHRoaXMub25LZXlEb3duXG4gICAgICAgIH0pLFxuICAgICAgICByZWY6ICdpbnB1dCdcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXIpIGRhdGEuYXR0cnMucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyXG4gICAgICBpZiAodGhpcy5tYXNrKSBkYXRhLmF0dHJzLm1heGxlbmd0aCA9IHRoaXMubWFza2VkLmxlbmd0aFxuICAgICAgaWYgKHRoaXMuYnJvd3NlckF1dG9jb21wbGV0ZSkgZGF0YS5hdHRycy5hdXRvY29tcGxldGUgPSB0aGlzLmJyb3dzZXJBdXRvY29tcGxldGVcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgZGF0YSlcbiAgICB9LFxuICAgIGdlbk1lc3NhZ2VzICgpIHtcbiAgICAgIGlmICh0aGlzLmhpZGVEZXRhaWxzKSByZXR1cm4gbnVsbFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtdGV4dC1maWVsZF9fZGV0YWlscydcbiAgICAgIH0sIFtcbiAgICAgICAgVklucHV0Lm1ldGhvZHMuZ2VuTWVzc2FnZXMuY2FsbCh0aGlzKSxcbiAgICAgICAgdGhpcy5nZW5Db3VudGVyKClcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5UZXh0RmllbGRTbG90ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10ZXh0LWZpZWxkX19zbG90J1xuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlbkxhYmVsKCksXG4gICAgICAgIHRoaXMucHJlZml4ID8gdGhpcy5nZW5BZmZpeCgncHJlZml4JykgOiBudWxsLFxuICAgICAgICB0aGlzLmdlbklucHV0KCksXG4gICAgICAgIHRoaXMuc3VmZml4ID8gdGhpcy5nZW5BZmZpeCgnc3VmZml4JykgOiBudWxsXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuQWZmaXggKHR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdjbGFzcyc6IGB2LXRleHQtZmllbGRfXyR7dHlwZX1gLFxuICAgICAgICByZWY6IHR5cGVcbiAgICAgIH0sIHRoaXNbdHlwZV0pXG4gICAgfSxcbiAgICBvbkJsdXIgKGUpIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2VcbiAgICAgIC8vIFJlc2V0IGludGVybmFsQ2hhbmdlIHN0YXRlXG4gICAgICAvLyB0byBhbGxvdyBleHRlcm5hbCBjaGFuZ2VcbiAgICAgIC8vIHRvIHBlcnNpc3RcbiAgICAgIHRoaXMuaW50ZXJuYWxDaGFuZ2UgPSBmYWxzZVxuXG4gICAgICB0aGlzLiRlbWl0KCdibHVyJywgZSlcbiAgICB9LFxuICAgIG9uQ2xpY2sgKCkge1xuICAgICAgaWYgKHRoaXMuaXNGb2N1c2VkIHx8IHRoaXMuZGlzYWJsZWQpIHJldHVyblxuXG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIG9uRm9jdXMgKGUpIHtcbiAgICAgIGlmICghdGhpcy4kcmVmcy5pbnB1dCkgcmV0dXJuXG5cbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLiRyZWZzLmlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWVcbiAgICAgICAgdGhpcy4kZW1pdCgnZm9jdXMnLCBlKVxuICAgICAgfVxuICAgIH0sXG4gICAgb25JbnB1dCAoZSkge1xuICAgICAgdGhpcy5pbnRlcm5hbENoYW5nZSA9IHRydWVcbiAgICAgIHRoaXMubWFzayAmJiB0aGlzLnJlc2V0U2VsZWN0aW9ucyhlLnRhcmdldClcbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICB0aGlzLmJhZElucHV0ID0gZS50YXJnZXQudmFsaWRpdHkgJiYgZS50YXJnZXQudmFsaWRpdHkuYmFkSW5wdXRcbiAgICB9LFxuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgdGhpcy5pbnRlcm5hbENoYW5nZSA9IHRydWVcblxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0ga2V5Q29kZXMuZW50ZXIpIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuaW50ZXJuYWxWYWx1ZSlcblxuICAgICAgdGhpcy4kZW1pdCgna2V5ZG93bicsIGUpXG4gICAgfSxcbiAgICBvbk1vdXNlRG93biAoZSkge1xuICAgICAgLy8gUHJldmVudCBpbnB1dCBmcm9tIGJlaW5nIGJsdXJyZWRcbiAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcy4kcmVmcy5pbnB1dCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgfVxuXG4gICAgICBWSW5wdXQubWV0aG9kcy5vbk1vdXNlRG93bi5jYWxsKHRoaXMsIGUpXG4gICAgfSxcbiAgICBvbk1vdXNlVXAgKGUpIHtcbiAgICAgIC8vIERlZmF1bHQgY2xpY2sgaGFuZGxlciBpcyBvbiBzbG90LFxuICAgICAgLy8gTW91c2UgZXZlbnRzIGFyZSB0byBlbmFibGUgc3BlY2lmaWNcbiAgICAgIC8vIGlucHV0IHR5cGVzIHdoZW4gY2xpY2tlZFxuICAgICAgaWYgKFxuICAgICAgICAodGhpcy5pc1NvbG8gfHwgdGhpcy5oYXNPdXRsaW5lKSAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLiRyZWZzLmlucHV0XG4gICAgICApIHtcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIFZJbnB1dC5tZXRob2RzLm9uTW91c2VVcC5jYWxsKHRoaXMsIGUpXG4gICAgfVxuICB9XG59XG4iXX0=