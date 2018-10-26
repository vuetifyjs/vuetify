var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Styles
import '../../../src/stylus/components/_radios.styl';
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
    mixins: [Colorable, Rippleable, RegistrableInject('radio', 'v-radio', 'v-radio-group'), Themeable],
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
            return (_Selectable$methods$g = Selectable.methods.genInput).call.apply(_Selectable$methods$g, [this].concat(_toConsumableArray(args)));
        },
        genLabel: function genLabel() {
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
        genRadio: function genRadio() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [this.genInput('radio', _extends({
                name: this.radio.name || (this.radio._uid ? 'v-radio-' + this.radio._uid : false),
                value: this.value
            }, this.$attrs)), !this.isDisabled && this.genRipple(this.setTextColor(this.computedColor)), this.$createElement(VIcon, this.setTextColor(this.computedColor, {
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