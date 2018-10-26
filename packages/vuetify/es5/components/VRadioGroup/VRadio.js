'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Components

// Mixins


require('../../../src/stylus/components/_radios.styl');

var _VIcon = require('../VIcon');

var _VIcon2 = _interopRequireDefault(_VIcon);

var _VLabel = require('../VLabel');

var _VLabel2 = _interopRequireDefault(_VLabel);

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _rippleable = require('../../mixins/rippleable');

var _rippleable2 = _interopRequireDefault(_rippleable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _selectable = require('../../mixins/selectable');

var _selectable2 = _interopRequireDefault(_selectable);

var _registrable = require('../../mixins/registrable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* @vue/component */
exports.default = {
    name: 'v-radio',
    mixins: [_colorable2.default, _rippleable2.default, (0, _registrable.inject)('radio', 'v-radio', 'v-radio-group'), _themeable2.default],
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
    data: function data() {
        return {
            isActive: false,
            isFocused: false,
            parentError: false
        };
    },
    computed: {
        computedData: function computedData() {
            return this.setTextColor(!this.parentError && this.isActive && this.color, {
                staticClass: 'v-radio',
                'class': _extends({
                    'v-radio--is-disabled': this.isDisabled,
                    'v-radio--is-focused': this.isFocused
                }, this.themeClasses)
            });
        },
        computedColor: function computedColor() {
            return this.isActive ? this.color : this.radio.validationState || false;
        },
        computedIcon: function computedIcon() {
            return this.isActive ? this.onIcon : this.offIcon;
        },
        hasState: function hasState() {
            return this.isActive || !!this.radio.validationState;
        },
        isDisabled: function isDisabled() {
            return this.disabled || !!this.radio.disabled;
        },
        isReadonly: function isReadonly() {
            return this.readonly || !!this.radio.readonly;
        }
    },
    mounted: function mounted() {
        this.radio.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.radio.unregister(this);
    },

    methods: {
        genInput: function genInput() {
            var _Selectable$methods$g;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            // We can't actually use the mixin directly because
            // it's made for standalone components, but its
            // genInput method is exactly what we need
            return (_Selectable$methods$g = _selectable2.default.methods.genInput).call.apply(_Selectable$methods$g, [this].concat(_toConsumableArray(args)));
        },
        genLabel: function genLabel() {
            return this.$createElement(_VLabel2.default, {
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
        genRadio: function genRadio() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [this.genInput('radio', _extends({
                name: this.radio.name || (this.radio._uid ? 'v-radio-' + this.radio._uid : false),
                value: this.value
            }, this.$attrs)), !this.isDisabled && this.genRipple(this.setTextColor(this.computedColor)), this.$createElement(_VIcon2.default, this.setTextColor(this.computedColor, {
                props: {
                    dark: this.dark,
                    light: this.light
                }
            }), this.computedIcon)]);
        },
        onFocus: function onFocus() {
            this.isFocused = true;
        },
        onBlur: function onBlur(e) {
            this.isFocused = false;
            this.$emit('blur', e);
        },
        onChange: function onChange() {
            if (this.isDisabled || this.isReadonly) return;
            if (!this.isDisabled && (!this.isActive || !this.radio.mandatory)) {
                this.$emit('change', this.value);
            }
        },
        onKeydown: function onKeydown() {}
    },
    render: function render(h) {
        return h('div', this.computedData, [this.genRadio(), this.genLabel()]);
    }
};
//# sourceMappingURL=VRadio.js.map