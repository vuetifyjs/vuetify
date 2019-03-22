// Components
import VInput from '../components/VInput';
// Mixins
import Rippleable from './rippleable';
import Comparable from './comparable';
/* @vue/component */
export default VInput.extend({
    name: 'selectable',
    mixins: [Rippleable, Comparable],
    model: {
        prop: 'inputValue',
        event: 'change'
    },
    props: {
        color: {
            type: String,
            default: 'accent'
        },
        id: String,
        inputValue: null,
        falseValue: null,
        trueValue: null,
        multiple: {
            type: Boolean,
            default: null
        },
        label: String
    },
    data: function (vm) {
        return ({
            lazyValue: vm.inputValue
        });
    },
    computed: {
        computedColor: function () {
            return this.isActive ? this.color : this.validationState;
        },
        isMultiple: function () {
            return this.multiple === true || (this.multiple === null && Array.isArray(this.internalValue));
        },
        isActive: function () {
            var _this = this;
            var value = this.value;
            var input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input))
                    return false;
                return input.some(function (item) { return _this.valueComparator(item, value); });
            }
            if (this.trueValue === undefined || this.falseValue === undefined) {
                return value
                    ? this.valueComparator(value, input)
                    : Boolean(input);
            }
            return this.valueComparator(input, this.trueValue);
        },
        isDirty: function () {
            return this.isActive;
        }
    },
    watch: {
        inputValue: function (val) {
            this.lazyValue = val;
        }
    },
    methods: {
        genLabel: function () {
            if (!this.hasLabel)
                return null;
            var label = VInput.options.methods.genLabel.call(this);
            label.data.on = { click: this.onChange };
            return label;
        },
        genInput: function (type, attrs) {
            return this.$createElement('input', {
                attrs: Object.assign({
                    'aria-label': this.label,
                    'aria-checked': this.isActive.toString(),
                    disabled: this.isDisabled,
                    id: this.id,
                    role: type,
                    type: type
                }, attrs),
                domProps: {
                    value: this.value,
                    checked: this.isActive
                },
                on: {
                    blur: this.onBlur,
                    change: this.onChange,
                    focus: this.onFocus,
                    keydown: this.onKeydown
                },
                ref: 'input'
            });
        },
        onBlur: function () {
            this.isFocused = false;
        },
        onChange: function () {
            var _this = this;
            if (this.isDisabled)
                return;
            var value = this.value;
            var input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) {
                    input = [];
                }
                var length_1 = input.length;
                input = input.filter(function (item) { return !_this.valueComparator(item, value); });
                if (input.length === length_1) {
                    input.push(value);
                }
            }
            else if (this.trueValue !== undefined && this.falseValue !== undefined) {
                input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue;
            }
            else if (value) {
                input = this.valueComparator(input, value) ? null : value;
            }
            else {
                input = !input;
            }
            this.validate(true, input);
            this.internalValue = input;
        },
        onFocus: function () {
            this.isFocused = true;
        },
        /** @abstract */
        onKeydown: function (e) { }
    }
});
//# sourceMappingURL=selectable.js.map
//# sourceMappingURL=selectable.js.map
//# sourceMappingURL=selectable.js.map
//# sourceMappingURL=selectable.js.map
//# sourceMappingURL=selectable.js.map