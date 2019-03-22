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
import '../../stylus/components/_inputs.styl';
// Components
import VIcon from '../VIcon';
import VLabel from '../VLabel';
import VMessages from '../VMessages';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import Validatable from '../../mixins/validatable';
// Utilities
import { convertToUnit, kebabCase } from '../../util/helpers';
import { deprecate } from '../../util/console';
import mixins from '../../util/mixins';
export default mixins(Colorable, Themeable, Validatable
/* @vue/component */
).extend({
    name: 'v-input',
    props: {
        appendIcon: String,
        /** @deprecated */
        appendIconCb: Function,
        backgroundColor: {
            type: String,
            default: ''
        },
        height: [Number, String],
        hideDetails: Boolean,
        hint: String,
        label: String,
        loading: Boolean,
        persistentHint: Boolean,
        prependIcon: String,
        /** @deprecated */
        prependIconCb: Function,
        value: { required: false }
    },
    data: function () {
        return {
            attrsInput: {},
            lazyValue: this.value,
            hasMouseDown: false
        };
    },
    computed: {
        classes: function () { return ({}); },
        classesInput: function () {
            return __assign({}, this.classes, { 'v-input--has-state': this.hasState, 'v-input--hide-details': this.hideDetails, 'v-input--is-label-active': this.isLabelActive, 'v-input--is-dirty': this.isDirty, 'v-input--is-disabled': this.disabled, 'v-input--is-focused': this.isFocused, 'v-input--is-loading': this.loading !== false && this.loading !== undefined, 'v-input--is-readonly': this.readonly }, this.themeClasses);
        },
        directivesInput: function () {
            return [];
        },
        hasHint: function () {
            return !this.hasMessages &&
                this.hint &&
                (this.persistentHint || this.isFocused);
        },
        hasLabel: function () {
            return Boolean(this.$slots.label || this.label);
        },
        // Proxy for `lazyValue`
        // This allows an input
        // to function without
        // a provided model
        internalValue: {
            get: function () {
                return this.lazyValue;
            },
            set: function (val) {
                this.lazyValue = val;
                this.$emit(this.$_modelEvent, val);
            }
        },
        isDirty: function () {
            return !!this.lazyValue;
        },
        isDisabled: function () {
            return Boolean(this.disabled || this.readonly);
        },
        isLabelActive: function () {
            return this.isDirty;
        }
    },
    watch: {
        value: function (val) {
            this.lazyValue = val;
        }
    },
    beforeCreate: function () {
        // v-radio-group needs to emit a different event
        // https://github.com/vuetifyjs/vuetify/issues/4752
        this.$_modelEvent = (this.$options.model && this.$options.model.event) || 'input';
    },
    methods: {
        genContent: function () {
            return [
                this.genPrependSlot(),
                this.genControl(),
                this.genAppendSlot()
            ];
        },
        genControl: function () {
            return this.$createElement('div', {
                staticClass: 'v-input__control'
            }, [
                this.genInputSlot(),
                this.genMessages()
            ]);
        },
        genDefaultSlot: function () {
            return [
                this.genLabel(),
                this.$slots.default
            ];
        },
        // TODO: remove shouldDeprecate (2.0), used for clearIcon
        genIcon: function (type, cb, shouldDeprecate) {
            var _this = this;
            if (shouldDeprecate === void 0) {
                shouldDeprecate = true;
            }
            var icon = this[type + "Icon"];
            var eventName = "click:" + kebabCase(type);
            cb = cb || this[type + "IconCb"];
            if (shouldDeprecate && type && cb) {
                deprecate(":" + type + "-icon-cb", "@" + eventName, this);
            }
            var data = {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    disabled: this.disabled,
                    light: this.light
                },
                on: !(this.$listeners[eventName] || cb)
                    ? undefined
                    : {
                        click: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            _this.$emit(eventName, e);
                            cb && cb(e);
                        },
                        // Container has mouseup event that will
                        // trigger menu open if enclosed
                        mouseup: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
            };
            return this.$createElement('div', {
                staticClass: "v-input__icon v-input__icon--" + kebabCase(type),
                key: "" + type + icon
            }, [
                this.$createElement(VIcon, data, icon)
            ]);
        },
        genInputSlot: function () {
            return this.$createElement('div', this.setBackgroundColor(this.backgroundColor, {
                staticClass: 'v-input__slot',
                style: { height: convertToUnit(this.height) },
                directives: this.directivesInput,
                on: {
                    click: this.onClick,
                    mousedown: this.onMouseDown,
                    mouseup: this.onMouseUp
                },
                ref: 'input-slot'
            }), [this.genDefaultSlot()]);
        },
        genLabel: function () {
            if (!this.hasLabel)
                return null;
            return this.$createElement(VLabel, {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    focused: this.hasState,
                    for: this.$attrs.id,
                    light: this.light
                }
            }, this.$slots.label || this.label);
        },
        genMessages: function () {
            if (this.hideDetails)
                return null;
            var messages = this.hasHint
                ? [this.hint]
                : this.validations;
            return this.$createElement(VMessages, {
                props: {
                    color: this.hasHint ? '' : this.validationState,
                    dark: this.dark,
                    light: this.light,
                    value: (this.hasMessages || this.hasHint) ? messages : []
                }
            });
        },
        genSlot: function (type, location, slot) {
            if (!slot.length)
                return null;
            var ref = type + "-" + location;
            return this.$createElement('div', {
                staticClass: "v-input__" + ref,
                ref: ref
            }, slot);
        },
        genPrependSlot: function () {
            var slot = [];
            if (this.$slots.prepend) {
                slot.push(this.$slots.prepend);
            }
            else if (this.prependIcon) {
                slot.push(this.genIcon('prepend'));
            }
            return this.genSlot('prepend', 'outer', slot);
        },
        genAppendSlot: function () {
            var slot = [];
            // Append icon for text field was really
            // an appended inner icon, v-text-field
            // will overwrite this method in order to obtain
            // backwards compat
            if (this.$slots.append) {
                slot.push(this.$slots.append);
            }
            else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        onClick: function (e) {
            this.$emit('click', e);
        },
        onMouseDown: function (e) {
            this.hasMouseDown = true;
            this.$emit('mousedown', e);
        },
        onMouseUp: function (e) {
            this.hasMouseDown = false;
            this.$emit('mouseup', e);
        }
    },
    render: function (h) {
        return h('div', this.setTextColor(this.validationState, {
            staticClass: 'v-input',
            attrs: this.attrsInput,
            'class': this.classesInput
        }), this.genContent());
    }
});
//# sourceMappingURL=VInput.js.map
//# sourceMappingURL=VInput.js.map
//# sourceMappingURL=VInput.js.map
//# sourceMappingURL=VInput.js.map
//# sourceMappingURL=VInput.js.map