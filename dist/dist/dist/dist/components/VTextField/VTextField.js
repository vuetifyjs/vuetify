var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
/* @vue/component */
export default VInput.extend({
    name: 'v-text-field',
    directives: { Ripple: Ripple },
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
        type: {
            type: String,
            default: 'text'
        }
    },
    data: function () {
        return ({
            badInput: false,
            initialValue: null,
            internalChange: false,
            isClearing: false
        });
    },
    computed: {
        classes: function () {
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
                'v-text-field--outline': this.hasOutline,
                'v-text-field--placeholder': this.placeholder
            };
        },
        counterValue: function () {
            return (this.internalValue || '').toString().length;
        },
        directivesInput: function () {
            return [];
        },
        // TODO: Deprecate
        hasOutline: function () {
            return this.outline || this.textarea;
        },
        internalValue: {
            get: function () {
                return this.lazyValue;
            },
            set: function (val) {
                if (this.mask && val !== this.lazyValue) {
                    this.lazyValue = this.unmaskText(this.maskText(this.unmaskText(val)));
                    this.setSelectionRange();
                }
                else {
                    this.lazyValue = val;
                    this.$emit('input', this.lazyValue);
                }
            }
        },
        isDirty: function () {
            return (this.lazyValue != null &&
                this.lazyValue.toString().length > 0) ||
                this.badInput;
        },
        isEnclosed: function () {
            return (this.box ||
                this.isSolo ||
                this.hasOutline ||
                this.fullWidth);
        },
        isLabelActive: function () {
            return this.isDirty || dirtyTypes.includes(this.type);
        },
        isSingle: function () {
            return this.isSolo || this.singleLine;
        },
        isSolo: function () {
            return this.solo || this.soloInverted;
        },
        labelPosition: function () {
            var offset = (this.prefix && !this.labelValue) ? this.prefixWidth : 0;
            return (!this.$vuetify.rtl !== !this.reverse) ? {
                left: 'auto',
                right: offset
            } : {
                left: offset,
                right: 'auto'
            };
        },
        showLabel: function () {
            return this.hasLabel && (!this.isSingle || (!this.isLabelActive && !this.placeholder && !this.prefixLabel));
        },
        labelValue: function () {
            return !this.isSingle &&
                Boolean(this.isFocused || this.isLabelActive || this.placeholder || this.prefixLabel);
        },
        prefixWidth: function () {
            if (!this.prefix && !this.$refs.prefix)
                return;
            return this.$refs.prefix.offsetWidth;
        },
        prefixLabel: function () {
            return (this.prefix && !this.value);
        }
    },
    watch: {
        isFocused: function (val) {
            // Sets validationState from validatable
            this.hasColor = val;
            if (val) {
                this.initialValue = this.lazyValue;
            }
            else if (this.initialValue !== this.lazyValue) {
                this.$emit('change', this.lazyValue);
            }
        },
        value: function (val) {
            var _this = this;
            if (this.mask && !this.internalChange) {
                var masked_1 = this.maskText(this.unmaskText(val));
                this.lazyValue = this.unmaskText(masked_1);
                // Emit when the externally set value was modified internally
                String(val) !== this.lazyValue && this.$nextTick(function () {
                    _this.$refs.input.value = masked_1;
                    _this.$emit('input', _this.lazyValue);
                });
            }
            else
                this.lazyValue = val;
        }
    },
    mounted: function () {
        this.autofocus && this.onFocus();
    },
    methods: {
        /** @public */
        focus: function () {
            this.onFocus();
        },
        /** @public */
        blur: function () {
            this.$refs.input ? this.$refs.input.blur() : this.onBlur();
        },
        clearableCallback: function () {
            var _this = this;
            this.internalValue = null;
            this.$nextTick(function () { return _this.$refs.input.focus(); });
        },
        genAppendSlot: function () {
            var slot = [];
            if (this.$slots['append-outer']) {
                slot.push(this.$slots['append-outer']);
            }
            else if (this.appendOuterIcon) {
                slot.push(this.genIcon('appendOuter'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        genPrependInnerSlot: function () {
            var slot = [];
            if (this.$slots['prepend-inner']) {
                slot.push(this.$slots['prepend-inner']);
            }
            else if (this.prependInnerIcon) {
                slot.push(this.genIcon('prependInner'));
            }
            return this.genSlot('prepend', 'inner', slot);
        },
        genIconSlot: function () {
            var slot = [];
            if (this.$slots['append']) {
                slot.push(this.$slots['append']);
            }
            else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'inner', slot);
        },
        genInputSlot: function () {
            var input = VInput.options.methods.genInputSlot.call(this);
            var prepend = this.genPrependInnerSlot();
            prepend && input.children.unshift(prepend);
            return input;
        },
        genClearIcon: function () {
            if (!this.clearable)
                return null;
            var icon = !this.isDirty
                ? false
                : 'clear';
            if (this.clearIconCb)
                deprecate(':clear-icon-cb', '@click:clear', this);
            return this.genSlot('append', 'inner', [
                this.genIcon(icon, (!this.$listeners['click:clear'] && this.clearIconCb) || this.clearableCallback, false)
            ]);
        },
        genCounter: function () {
            if (this.counter === false || this.counter == null)
                return null;
            var max = this.counter === true ? this.$attrs.maxlength : this.counter;
            return this.$createElement(VCounter, {
                props: {
                    dark: this.dark,
                    light: this.light,
                    max: max,
                    value: this.counterValue
                }
            });
        },
        genDefaultSlot: function () {
            return [
                this.genTextFieldSlot(),
                this.genClearIcon(),
                this.genIconSlot(),
                this.genProgress()
            ];
        },
        genLabel: function () {
            if (!this.showLabel)
                return null;
            var data = {
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
        genInput: function () {
            var listeners = Object.assign({}, this.$listeners);
            delete listeners['change']; // Change should not be bound externally
            var data = {
                style: {},
                domProps: {
                    value: this.maskText(this.lazyValue)
                },
                attrs: __assign({ 'aria-label': (!this.$attrs || !this.$attrs.id) && this.label }, this.$attrs, { autofocus: this.autofocus, disabled: this.disabled, readonly: this.readonly, type: this.type }),
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
        genMessages: function () {
            if (this.hideDetails)
                return null;
            return this.$createElement('div', {
                staticClass: 'v-text-field__details'
            }, [
                VInput.options.methods.genMessages.call(this),
                this.genCounter()
            ]);
        },
        genTextFieldSlot: function () {
            return this.$createElement('div', {
                staticClass: 'v-text-field__slot'
            }, [
                this.genLabel(),
                this.prefix ? this.genAffix('prefix') : null,
                this.genInput(),
                this.suffix ? this.genAffix('suffix') : null
            ]);
        },
        genAffix: function (type) {
            return this.$createElement('div', {
                'class': "v-text-field__" + type,
                ref: type
            }, this[type]);
        },
        onBlur: function (e) {
            this.isFocused = false;
            // Reset internalChange state
            // to allow external change
            // to persist
            this.internalChange = false;
            this.$emit('blur', e);
        },
        onClick: function () {
            if (this.isFocused || this.disabled)
                return;
            this.$refs.input.focus();
        },
        onFocus: function (e) {
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
        onInput: function (e) {
            this.internalChange = true;
            this.mask && this.resetSelections(e.target);
            this.internalValue = e.target.value;
            this.badInput = e.target.validity && e.target.validity.badInput;
        },
        onKeyDown: function (e) {
            this.internalChange = true;
            if (e.keyCode === keyCodes.enter)
                this.$emit('change', this.internalValue);
            this.$emit('keydown', e);
        },
        onMouseDown: function (e) {
            // Prevent input from being blurred
            if (e.target !== this.$refs.input) {
                e.preventDefault();
                e.stopPropagation();
            }
            VInput.options.methods.onMouseDown.call(this, e);
        },
        onMouseUp: function (e) {
            if (this.hasMouseDown)
                this.focus();
            VInput.options.methods.onMouseUp.call(this, e);
        }
    }
});
//# sourceMappingURL=VTextField.js.map
//# sourceMappingURL=VTextField.js.map
//# sourceMappingURL=VTextField.js.map
//# sourceMappingURL=VTextField.js.map