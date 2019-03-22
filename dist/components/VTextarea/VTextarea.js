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
// Styles
import '../../stylus/components/_textarea.styl';
// Extensions
import VTextField from '../VTextField/VTextField';
import { consoleInfo } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-textarea',
    extends: VTextField,
    props: {
        autoGrow: Boolean,
        noResize: Boolean,
        outline: Boolean,
        rowHeight: {
            type: [Number, String],
            default: 24,
            validator: function (v) { return !isNaN(parseFloat(v)); }
        },
        rows: {
            type: [Number, String],
            default: 5,
            validator: function (v) { return !isNaN(parseInt(v, 10)); }
        }
    },
    computed: {
        classes: function () {
            return __assign({ 'v-textarea': true, 'v-textarea--auto-grow': this.autoGrow, 'v-textarea--no-resize': this.noResizeHandle }, VTextField.options.computed.classes.call(this, null));
        },
        dynamicHeight: function () {
            return this.autoGrow
                ? this.inputHeight
                : 'auto';
        },
        isEnclosed: function () {
            return this.textarea ||
                VTextField.options.computed.isEnclosed.call(this);
        },
        noResizeHandle: function () {
            return this.noResize || this.autoGrow;
        }
    },
    watch: {
        lazyValue: function () {
            !this.internalChange && this.autoGrow && this.$nextTick(this.calculateInputHeight);
        }
    },
    mounted: function () {
        var _this = this;
        setTimeout(function () {
            _this.autoGrow && _this.calculateInputHeight();
        }, 0);
        // TODO: remove (2.0)
        if (this.autoGrow && this.noResize) {
            consoleInfo('"no-resize" is now implied when using "auto-grow", and can be removed', this);
        }
    },
    methods: {
        calculateInputHeight: function () {
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
        genInput: function () {
            var input = VTextField.options.methods.genInput.call(this);
            input.tag = 'textarea';
            delete input.data.attrs.type;
            input.data.attrs.rows = this.rows;
            return input;
        },
        onInput: function (e) {
            VTextField.options.methods.onInput.call(this, e);
            this.autoGrow && this.calculateInputHeight();
        },
        onKeyDown: function (e) {
            // Prevents closing of a
            // dialog when pressing
            // enter
            if (this.isFocused &&
                e.keyCode === 13) {
                e.stopPropagation();
            }
            this.internalChange = true;
            this.$emit('keydown', e);
        }
    }
};
//# sourceMappingURL=VTextarea.js.map