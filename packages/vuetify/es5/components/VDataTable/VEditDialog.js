'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_small-dialog.styl');

var _returnable = require('../../mixins/returnable');

var _returnable2 = _interopRequireDefault(_returnable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _helpers = require('../../util/helpers');

var _VBtn = require('../VBtn');

var _VBtn2 = _interopRequireDefault(_VBtn);

var _VMenu = require('../VMenu');

var _VMenu2 = _interopRequireDefault(_VMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-edit-dialog',
    mixins: [_returnable2.default, _themeable2.default],
    props: {
        cancelText: {
            default: 'Cancel'
        },
        large: Boolean,
        lazy: Boolean,
        persistent: Boolean,
        saveText: {
            default: 'Save'
        },
        transition: {
            type: String,
            default: 'slide-x-reverse-transition'
        }
    },
    data: function data() {
        return {
            isActive: false
        };
    },

    watch: {
        isActive: function isActive(val) {
            if (val) {
                this.$emit('open');
                setTimeout(this.focus, 50); // Give DOM time to paint
            } else {
                this.$emit('close');
            }
        }
    },
    methods: {
        cancel: function cancel() {
            this.isActive = false;
            this.$emit('cancel');
        },
        focus: function focus() {
            var input = this.$refs.content.querySelector('input');
            input && input.focus();
        },
        genButton: function genButton(fn, text) {
            return this.$createElement(_VBtn2.default, {
                props: {
                    flat: true,
                    color: 'primary',
                    light: true
                },
                on: { click: fn }
            }, text);
        },
        genActions: function genActions() {
            var _this = this;

            return this.$createElement('div', {
                'class': 'v-small-dialog__actions'
            }, [this.genButton(this.cancel, this.cancelText), this.genButton(function () {
                _this.save(_this.returnValue);
                _this.$emit('save');
            }, this.saveText)]);
        },
        genContent: function genContent() {
            var _this2 = this;

            return this.$createElement('div', {
                on: {
                    keydown: function keydown(e) {
                        var input = _this2.$refs.content.querySelector('input');
                        e.keyCode === _helpers.keyCodes.esc && _this2.cancel();
                        if (e.keyCode === _helpers.keyCodes.enter && input) {
                            _this2.save(input.value);
                            _this2.$emit('save');
                        }
                    }
                },
                ref: 'content'
            }, [this.$slots.input]);
        }
    },
    render: function render(h) {
        var _this3 = this;

        return h(_VMenu2.default, {
            staticClass: 'v-small-dialog',
            class: this.themeClasses,
            props: {
                contentClass: 'v-small-dialog__content',
                transition: this.transition,
                origin: 'top right',
                right: true,
                value: this.isActive,
                closeOnClick: !this.persistent,
                closeOnContentClick: false,
                lazy: this.lazy,
                light: this.light,
                dark: this.dark
            },
            on: {
                input: function input(val) {
                    return _this3.isActive = val;
                }
            }
        }, [h('a', {
            slot: 'activator'
        }, this.$slots.default), this.genContent(), this.large ? this.genActions() : null]);
    }
};
// Utils

// Mixins
//# sourceMappingURL=VEditDialog.js.map