// Mixins
import Colorable from './colorable';
import { inject as RegistrableInject } from './registrable';
// Utilities
import { deepEqual } from '../util/helpers';
import { consoleError } from '../util/console';
import mixins from '../util/mixins';
/* @vue/component */
export default mixins(Colorable, RegistrableInject('form')).extend({
    name: 'validatable',
    props: {
        disabled: Boolean,
        error: Boolean,
        errorCount: {
            type: [Number, String],
            default: 1
        },
        errorMessages: {
            type: [String, Array],
            default: function () { return []; }
        },
        messages: {
            type: [String, Array],
            default: function () { return []; }
        },
        readonly: Boolean,
        rules: {
            type: Array,
            default: function () { return []; }
        },
        success: Boolean,
        successMessages: {
            type: [String, Array],
            default: function () { return []; }
        },
        validateOnBlur: Boolean,
        value: { required: false }
    },
    data: function () {
        return {
            errorBucket: [],
            hasColor: false,
            hasFocused: false,
            hasInput: false,
            isFocused: false,
            isResetting: false,
            lazyValue: this.value,
            valid: false
        };
    },
    computed: {
        hasError: function () {
            return (this.internalErrorMessages.length > 0 ||
                this.errorBucket.length > 0 ||
                this.error);
        },
        // TODO: Add logic that allows the user to enable based
        // upon a good validation
        hasSuccess: function () {
            return (this.internalSuccessMessages.length > 0 ||
                this.success);
        },
        externalError: function () {
            return this.internalErrorMessages.length > 0 || this.error;
        },
        hasMessages: function () {
            return this.validationTarget.length > 0;
        },
        hasState: function () {
            return (this.hasSuccess ||
                (this.shouldValidate && this.hasError));
        },
        internalErrorMessages: function () {
            return this.genInternalMessages(this.errorMessages);
        },
        internalMessages: function () {
            return this.genInternalMessages(this.messages);
        },
        internalSuccessMessages: function () {
            return this.genInternalMessages(this.successMessages);
        },
        internalValue: {
            get: function () {
                return this.lazyValue;
            },
            set: function (val) {
                this.lazyValue = val;
                this.$emit('input', val);
            }
        },
        shouldValidate: function () {
            if (this.externalError)
                return true;
            if (this.isResetting)
                return false;
            return this.validateOnBlur
                ? this.hasFocused && !this.isFocused
                : (this.hasInput || this.hasFocused);
        },
        validations: function () {
            return this.validationTarget.slice(0, Number(this.errorCount));
        },
        validationState: function () {
            if (this.hasError && this.shouldValidate)
                return 'error';
            if (this.hasSuccess)
                return 'success';
            if (this.hasColor)
                return this.color;
            return undefined;
        },
        validationTarget: function () {
            if (this.internalErrorMessages.length > 0) {
                return this.internalErrorMessages;
            }
            else if (this.successMessages.length > 0) {
                return this.internalSuccessMessages;
            }
            else if (this.messages.length > 0) {
                return this.internalMessages;
            }
            else if (this.shouldValidate) {
                return this.errorBucket;
            }
            else
                return [];
        }
    },
    watch: {
        rules: {
            handler: function (newVal, oldVal) {
                if (deepEqual(newVal, oldVal))
                    return;
                this.validate();
            },
            deep: true
        },
        internalValue: function () {
            // If it's the first time we're setting input,
            // mark it with hasInput
            this.hasInput = true;
            this.validateOnBlur || this.$nextTick(this.validate);
        },
        isFocused: function (val) {
            // Should not check validation
            // if disabled or readonly
            if (!val &&
                !this.disabled &&
                !this.readonly) {
                this.hasFocused = true;
                this.validateOnBlur && this.validate();
            }
        },
        isResetting: function () {
            var _this = this;
            setTimeout(function () {
                _this.hasInput = false;
                _this.hasFocused = false;
                _this.isResetting = false;
                _this.validate();
            }, 0);
        },
        hasError: function (val) {
            if (this.shouldValidate) {
                this.$emit('update:error', val);
            }
        },
        value: function (val) {
            this.lazyValue = val;
        }
    },
    beforeMount: function () {
        this.validate();
    },
    created: function () {
        this.form && this.form.register(this);
    },
    beforeDestroy: function () {
        this.form && this.form.unregister(this);
    },
    methods: {
        genInternalMessages: function (messages) {
            if (!messages)
                return [];
            else if (Array.isArray(messages))
                return messages;
            else
                return [messages];
        },
        /** @public */
        reset: function () {
            this.isResetting = true;
            this.internalValue = Array.isArray(this.internalValue)
                ? []
                : undefined;
        },
        /** @public */
        resetValidation: function () {
            this.isResetting = true;
        },
        /** @public */
        validate: function (force, value) {
            if (force === void 0) { force = false; }
            var errorBucket = [];
            value = value || this.internalValue;
            if (force)
                this.hasInput = this.hasFocused = true;
            for (var index = 0; index < this.rules.length; index++) {
                var rule = this.rules[index];
                var valid = typeof rule === 'function' ? rule(value) : rule;
                if (typeof valid === 'string') {
                    errorBucket.push(valid);
                }
                else if (typeof valid !== 'boolean') {
                    consoleError("Rules should return a string or boolean, received '" + typeof valid + "' instead", this);
                }
            }
            this.errorBucket = errorBucket;
            this.valid = errorBucket.length === 0;
            return this.valid;
        }
    }
});
//# sourceMappingURL=validatable.js.map