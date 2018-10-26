var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles
import '../../../src/stylus/components/_inputs.styl';
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
/* @vue/component */
export default {
    name: 'v-input',
    mixins: [Colorable, Themeable, Validatable],
    props: {
        appendIcon: String,
        /** @deprecated */
        appendIconCb: Function,
        backgroundColor: {
            type: String,
            default: ''
        },
        disabled: Boolean,
        height: [Number, String],
        hideDetails: Boolean,
        hint: String,
        label: String,
        persistentHint: Boolean,
        prependIcon: String,
        /** @deprecated */
        prependIconCb: Function,
        readonly: Boolean,
        value: { required: false }
    },
    data: function data(vm) {
        return {
            lazyValue: vm.value,
            hasMouseDown: false,
            isFocused: false
        };
    },
    computed: {
        classesInput: function classesInput() {
            return _extends({}, this.classes, {
                'v-input--has-state': this.hasState,
                'v-input--hide-details': this.hideDetails,
                'v-input--is-label-active': this.isLabelActive,
                'v-input--is-dirty': this.isDirty,
                'v-input--is-disabled': this.disabled,
                'v-input--is-focused': this.isFocused,
                'v-input--is-loading': this.loading !== false && this.loading !== undefined,
                'v-input--is-readonly': this.readonly
            }, this.themeClasses);
        },
        directivesInput: function directivesInput() {
            return [];
        },
        hasHint: function hasHint() {
            return !this.hasMessages && this.hint && (this.persistentHint || this.isFocused);
        },
        hasLabel: function hasLabel() {
            return Boolean(this.$slots.label || this.label);
        },

        // Proxy for `lazyValue`
        // This allows an input
        // to function without
        // a provided model
        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                this.lazyValue = val;
                this.$emit(this.$_modelEvent, val);
            }
        },
        isDirty: function isDirty() {
            return !!this.lazyValue;
        },
        isDisabled: function isDisabled() {
            return Boolean(this.disabled || this.readonly);
        },
        isLabelActive: function isLabelActive() {
            return this.isDirty;
        }
    },
    watch: {
        value: function value(val) {
            this.lazyValue = val;
        }
    },
    beforeCreate: function beforeCreate() {
        // v-radio-group needs to emit a different event
        // https://github.com/vuetifyjs/vuetify/issues/4752
        this.$_modelEvent = this.$options.model && this.$options.model.event || 'input';
    },

    methods: {
        genContent: function genContent() {
            return [this.genPrependSlot(), this.genControl(), this.genAppendSlot()];
        },
        genControl: function genControl() {
            return this.$createElement('div', {
                staticClass: 'v-input__control'
            }, [this.genInputSlot(), this.genMessages()]);
        },
        genDefaultSlot: function genDefaultSlot() {
            return [this.genLabel(), this.$slots.default];
        },

        // TODO: remove shouldDeprecate (2.0), used for clearIcon
        genIcon: function genIcon(type, cb) {
            var _this = this;

            var shouldDeprecate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var icon = this[type + 'Icon'];
            var eventName = 'click:' + kebabCase(type);
            cb = cb || this[type + 'IconCb'];
            if (shouldDeprecate && type && cb) {
                deprecate(':' + type + '-icon-cb', '@' + eventName, this);
            }
            var data = {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    disabled: this.disabled,
                    light: this.light
                },
                on: !(this.$listeners[eventName] || cb) ? null : {
                    click: function click(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.$emit(eventName, e);
                        cb && cb(e);
                    },
                    // Container has mouseup event that will
                    // trigger menu open if enclosed
                    mouseup: function mouseup(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            };
            return this.$createElement('div', {
                staticClass: 'v-input__icon v-input__icon--' + kebabCase(type),
                key: '' + type + icon
            }, [this.$createElement(VIcon, data, icon)]);
        },
        genInputSlot: function genInputSlot() {
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
        genLabel: function genLabel() {
            if (!this.hasLabel) return null;
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
        genMessages: function genMessages() {
            if (this.hideDetails) return null;
            var messages = this.hasHint ? [this.hint] : this.validations;
            return this.$createElement(VMessages, {
                props: {
                    color: this.hasHint ? '' : this.validationState,
                    dark: this.dark,
                    light: this.light,
                    value: this.hasMessages || this.hasHint ? messages : []
                }
            });
        },
        genSlot: function genSlot(type, location, slot) {
            if (!slot.length) return null;
            var ref = type + '-' + location;
            return this.$createElement('div', {
                staticClass: 'v-input__' + ref,
                ref: ref
            }, slot);
        },
        genPrependSlot: function genPrependSlot() {
            var slot = [];
            if (this.$slots['prepend']) {
                slot.push(this.$slots['prepend']);
            } else if (this.prependIcon) {
                slot.push(this.genIcon('prepend'));
            }
            return this.genSlot('prepend', 'outer', slot);
        },
        genAppendSlot: function genAppendSlot() {
            var slot = [];
            // Append icon for text field was really
            // an appended inner icon, v-text-field
            // will overwrite this method in order to obtain
            // backwards compat
            if (this.$slots['append']) {
                slot.push(this.$slots['append']);
            } else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        onClick: function onClick(e) {
            this.$emit('click', e);
        },
        onMouseDown: function onMouseDown(e) {
            this.hasMouseDown = true;
            this.$emit('mousedown', e);
        },
        onMouseUp: function onMouseUp(e) {
            this.hasMouseDown = false;
            this.$emit('mouseup', e);
        }
    },
    render: function render(h) {
        return h('div', this.setTextColor(this.validationState, {
            staticClass: 'v-input',
            attrs: this.attrsInput,
            'class': this.classesInput
        }), this.genContent());
    }
};
//# sourceMappingURL=VInput.js.map