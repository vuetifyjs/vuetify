var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
    data: function () { return ({
        isActive: false,
        isFocused: false,
        parentError: false
    }); },
    computed: {
        computedData: function () {
            return this.setTextColor(!this.parentError && this.isActive && this.color, {
                staticClass: 'v-radio',
                'class': __assign({ 'v-radio--is-disabled': this.isDisabled, 'v-radio--is-focused': this.isFocused }, this.themeClasses)
            });
        },
        computedColor: function () {
            return this.isActive ? this.color : this.radio.validationState || false;
        },
        computedIcon: function () {
            return this.isActive
                ? this.onIcon
                : this.offIcon;
        },
        hasState: function () {
            return this.isActive || !!this.radio.validationState;
        },
        isDisabled: function () {
            return this.disabled || !!this.radio.disabled;
        },
        isReadonly: function () {
            return this.readonly || !!this.radio.readonly;
        }
    },
    mounted: function () {
        this.radio.register(this);
    },
    beforeDestroy: function () {
        this.radio.unregister(this);
    },
    methods: {
        genInput: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            // We can't actually use the mixin directly because
            // it's made for standalone components, but its
            // genInput method is exactly what we need
            return (_a = Selectable.options.methods.genInput).call.apply(_a, __spread([this], args));
        },
        genLabel: function () {
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
        genRadio: function () {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [
                this.genInput('radio', __assign({ name: this.radio.name || (this.radio._uid ? 'v-radio-' + this.radio._uid : false), value: this.value }, this.$attrs)),
                this.genRipple(this.setTextColor(this.computedColor)),
                this.$createElement(VIcon, this.setTextColor(this.computedColor, {
                    props: {
                        dark: this.dark,
                        light: this.light
                    }
                }), this.computedIcon)
            ]);
        },
        onFocus: function (e) {
            this.isFocused = true;
            this.$emit('focus', e);
        },
        onBlur: function (e) {
            this.isFocused = false;
            this.$emit('blur', e);
        },
        onChange: function () {
            if (this.isDisabled || this.isReadonly)
                return;
            if (!this.isDisabled && (!this.isActive || !this.radio.mandatory)) {
                this.$emit('change', this.value);
            }
        },
        onKeydown: function () { }
    },
    render: function (h) {
        return h('div', this.computedData, [
            this.genRadio(),
            this.genLabel()
        ]);
    }
};
//# sourceMappingURL=VRadio.js.map