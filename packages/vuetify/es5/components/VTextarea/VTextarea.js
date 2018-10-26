'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Extensions


require('../../../src/stylus/components/_textarea.styl');

var _VTextField = require('../VTextField/VTextField');

var _VTextField2 = _interopRequireDefault(_VTextField);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-textarea',
    extends: _VTextField2.default,
    props: {
        autoGrow: Boolean,
        noResize: Boolean,
        outline: Boolean,
        rowHeight: {
            type: [Number, String],
            default: 24,
            validator: function validator(v) {
                return !isNaN(parseFloat(v));
            }
        },
        rows: {
            type: [Number, String],
            default: 5,
            validator: function validator(v) {
                return !isNaN(parseInt(v, 10));
            }
        }
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-textarea': true,
                'v-textarea--auto-grow': this.autoGrow,
                'v-textarea--no-resize': this.noResizeHandle
            }, _VTextField2.default.computed.classes.call(this, null));
        },
        dynamicHeight: function dynamicHeight() {
            return this.autoGrow ? this.inputHeight : 'auto';
        },
        isEnclosed: function isEnclosed() {
            return this.textarea || _VTextField2.default.computed.isEnclosed.call(this);
        },
        noResizeHandle: function noResizeHandle() {
            return this.noResize || this.autoGrow;
        }
    },
    watch: {
        lazyValue: function lazyValue() {
            !this.internalChange && this.autoGrow && this.$nextTick(this.calculateInputHeight);
        }
    },
    mounted: function mounted() {
        var _this = this;

        setTimeout(function () {
            _this.autoGrow && _this.calculateInputHeight();
        }, 0);
        // TODO: remove (2.0)
        if (this.autoGrow && this.noResize) {
            (0, _console.consoleInfo)('"no-resize" is now implied when using "auto-grow", and can be removed', this);
        }
    },

    methods: {
        calculateInputHeight: function calculateInputHeight() {
            var input = this.$refs.input;
            if (input) {
                input.style.height = 0;
                var height = input.scrollHeight;
                var minHeight = parseInt(this.rows, 10) * parseFloat(this.rowHeight);
                // This has to be done ASAP, waiting for Vue
                // to update the DOM causes ugly layout jumping
                input.style.height = Math.max(minHeight, height) + 'px';
            }
        },
        genInput: function genInput() {
            var input = _VTextField2.default.methods.genInput.call(this);
            input.tag = 'textarea';
            delete input.data.attrs.type;
            input.data.attrs.rows = this.rows;
            return input;
        },
        onInput: function onInput(e) {
            _VTextField2.default.methods.onInput.call(this, e);
            this.autoGrow && this.calculateInputHeight();
        },
        onKeyDown: function onKeyDown(e) {
            // Prevents closing of a
            // dialog when pressing
            // enter
            if (this.isFocused && e.keyCode === 13) {
                e.stopPropagation();
            }
            this.internalChange = true;
            this.$emit('keydown', e);
        }
    }
};
//# sourceMappingURL=VTextarea.js.map