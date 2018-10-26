'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VInput = require('../components/VInput');

var _VInput2 = _interopRequireDefault(_VInput);

var _rippleable = require('./rippleable');

var _rippleable2 = _interopRequireDefault(_rippleable);

var _comparable = require('./comparable');

var _comparable2 = _interopRequireDefault(_comparable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Mixins
exports.default = {
    name: 'selectable',
    extends: _VInput2.default,
    mixins: [_rippleable2.default, _comparable2.default],
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
    data: function data(vm) {
        return {
            lazyValue: vm.inputValue
        };
    },
    computed: {
        computedColor: function computedColor() {
            return this.isActive ? this.color : this.validationState;
        },
        isMultiple: function isMultiple() {
            return this.multiple === true || this.multiple === null && Array.isArray(this.internalValue);
        },
        isActive: function isActive() {
            var _this = this;

            var value = this.value;
            var input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) return false;
                return input.some(function (item) {
                    return _this.valueComparator(item, value);
                });
            }
            if (this.trueValue === undefined || this.falseValue === undefined) {
                return value ? this.valueComparator(value, input) : Boolean(input);
            }
            return this.valueComparator(input, this.trueValue);
        },
        isDirty: function isDirty() {
            return this.isActive;
        }
    },
    watch: {
        inputValue: function inputValue(val) {
            this.lazyValue = val;
        }
    },
    methods: {
        genLabel: function genLabel() {
            if (!this.hasLabel) return null;
            var label = _VInput2.default.methods.genLabel.call(this);
            label.data.on = { click: this.onChange };
            return label;
        },
        genInput: function genInput(type, attrs) {
            return this.$createElement('input', {
                attrs: Object.assign({
                    'aria-label': this.label,
                    'aria-checked': this.isActive.toString(),
                    disabled: this.isDisabled,
                    id: this.id,
                    role: type,
                    type: type,
                    value: this.inputValue
                }, attrs),
                domProps: {
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
        onBlur: function onBlur() {
            this.isFocused = false;
        },
        onChange: function onChange() {
            var _this2 = this;

            if (this.isDisabled) return;
            var value = this.value;
            var input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) {
                    input = [];
                }
                var length = input.length;
                input = input.filter(function (item) {
                    return !_this2.valueComparator(item, value);
                });
                if (input.length === length) {
                    input.push(value);
                }
            } else if (this.trueValue !== undefined && this.falseValue !== undefined) {
                input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue;
            } else if (value) {
                input = this.valueComparator(input, value) ? null : value;
            } else {
                input = !input;
            }
            this.validate(true, input);
            this.internalValue = input;
        },
        onFocus: function onFocus() {
            this.isFocused = true;
        },

        /** @abstract */
        onKeydown: function onKeydown(e) {}
    }
}; // Components
//# sourceMappingURL=selectable.js.map