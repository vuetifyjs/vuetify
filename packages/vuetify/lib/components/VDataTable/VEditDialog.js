import '../../../src/stylus/components/_small-dialog.styl';
// Mixins
import Returnable from '../../mixins/returnable';
import Themeable from '../../mixins/themeable';
// Utils
import { keyCodes } from '../../util/helpers';
import VBtn from '../VBtn';
import VMenu from '../VMenu';
/* @vue/component */
export default {
    name: 'v-edit-dialog',
    mixins: [Returnable, Themeable],
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
            return this.$createElement(VBtn, {
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
                        e.keyCode === keyCodes.esc && _this2.cancel();
                        if (e.keyCode === keyCodes.enter && input) {
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

        return h(VMenu, {
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
//# sourceMappingURL=VEditDialog.js.map