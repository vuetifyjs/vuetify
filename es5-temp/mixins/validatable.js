import { deepEqual } from '../util/helpers';
import { inject as RegistrableInject } from './registrable';
import { consoleError } from '../util/console';
// Mixins
import Colorable from './colorable';
/* @vue/component */
export default {
    name: 'validatable',
    mixins: [
        Colorable,
        RegistrableInject('form')
    ],
    props: {
        error: Boolean,
        errorCount: {
            type: [Number, String],
            default: 1
        },
        errorMessages: {
            type: [String, Array],
            default: () => []
        },
        messages: {
            type: [String, Array],
            default: () => []
        },
        rules: {
            type: Array,
            default: () => []
        },
        success: Boolean,
        successMessages: {
            type: [String, Array],
            default: () => []
        },
        validateOnBlur: Boolean
    },
    data: () => ({
        errorBucket: [],
        hasColor: false,
        hasFocused: false,
        hasInput: false,
        isResetting: false,
        valid: false
    }),
    computed: {
        hasError() {
            return this.internalErrorMessages.length > 0 ||
                this.errorBucket.length > 0 ||
                this.error;
        },
        externalError() {
            return this.internalErrorMessages.length > 0 || this.error;
        },
        // TODO: Add logic that allows the user to enable based
        // upon a good validation
        hasSuccess() {
            return this.successMessages.length > 0 ||
                this.success;
        },
        hasMessages() {
            return this.validations.length > 0;
        },
        hasState() {
            return this.shouldValidate && (this.hasError || this.hasSuccess);
        },
        internalErrorMessages() {
            return this.errorMessages || '';
        },
        shouldValidate() {
            return this.externalError || (!this.isResetting && (this.validateOnBlur
                ? this.hasFocused && !this.isFocused
                : (this.hasInput || this.hasFocused)));
        },
        validations() {
            return this.validationTarget.slice(0, this.errorCount);
        },
        validationState() {
            if (this.hasError && this.shouldValidate)
                return 'error';
            if (this.hasSuccess && this.shouldValidate)
                return 'success';
            if (this.hasColor)
                return this.color;
            return null;
        },
        validationTarget() {
            const target = this.internalErrorMessages.length > 0
                ? this.errorMessages
                : this.successMessages.length > 0
                    ? this.successMessages
                    : this.messages;
            // String
            if (!Array.isArray(target)) {
                return [target];
                // Array with items
            }
            else if (target.length > 0) {
                return target;
                // Currently has validation
            }
            else if (this.shouldValidate) {
                return this.errorBucket;
            }
            else {
                return [];
            }
        }
    },
    watch: {
        rules: {
            handler(newVal, oldVal) {
                if (deepEqual(newVal, oldVal))
                    return;
                this.validate();
            },
            deep: true
        },
        internalValue() {
            // If it's the first time we're setting input,
            // mark it with hasInput
            this.hasInput = true;
            this.validateOnBlur || this.$nextTick(this.validate);
        },
        isFocused(val) {
            if (!val) {
                this.hasFocused = true;
                this.validateOnBlur && this.validate();
            }
        },
        isResetting() {
            setTimeout(() => {
                this.hasInput = false;
                this.hasFocused = false;
                this.isResetting = false;
            }, 0);
        },
        hasError(val) {
            if (this.shouldValidate) {
                this.$emit('update:error', val);
            }
        }
    },
    beforeMount() {
        this.validate();
    },
    created() {
        this.form && this.form.register(this);
    },
    beforeDestroy() {
        this.form && this.form.unregister(this);
    },
    methods: {
        /** @public */
        reset() {
            this.isResetting = true;
            this.internalValue = Array.isArray(this.internalValue)
                ? []
                : undefined;
        },
        /** @public */
        resetValidation() {
            this.isResetting = true;
        },
        /** @public */
        validate(force = false, value = this.internalValue) {
            const errorBucket = [];
            if (force)
                this.hasInput = this.hasFocused = true;
            for (let index = 0; index < this.rules.length; index++) {
                const rule = this.rules[index];
                const valid = typeof rule === 'function' ? rule(value) : rule;
                if (valid === false || typeof valid === 'string') {
                    errorBucket.push(valid);
                }
                else if (valid !== true) {
                    consoleError(`Rules should return a string or boolean, received '${typeof valid}' instead`, this);
                }
            }
            this.errorBucket = errorBucket;
            this.valid = errorBucket.length === 0;
            return this.valid;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW5zL3ZhbGlkYXRhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUU5QyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFBO0FBRW5DLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGFBQWE7SUFFbkIsTUFBTSxFQUFFO1FBQ04sU0FBUztRQUNULGlCQUFpQixDQUFDLE1BQU0sQ0FBQztLQUMxQjtJQUVELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNyQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtTQUNsQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDckIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7U0FDbEI7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsS0FBSztZQUNYLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFLE9BQU87UUFDaEIsZUFBZSxFQUFFO1lBQ2YsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNyQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFB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LENBQUE7Z0JBRTdELElBQUksS0FBSyxLQUFLLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQ2hELFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQ3hCO3FCQUFNLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDekIsWUFBWSxDQUFDLHNEQUFzRCxPQUFPLEtBQUssV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO2lCQUNsRzthQUNGO1lBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQTtZQUVyQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDbkIsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZXBFcXVhbCB9IGZyb20gJy4uL3V0aWwvaGVscGVycydcbmltcG9ydCB7IGluamVjdCBhcyBSZWdpc3RyYWJsZUluamVjdCB9IGZyb20gJy4vcmVnaXN0cmFibGUnXG5pbXBvcnQgeyBjb25zb2xlRXJyb3IgfSBmcm9tICcuLi91dGlsL2NvbnNvbGUnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuL2NvbG9yYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3ZhbGlkYXRhYmxlJyxcblxuICBtaXhpbnM6IFtcbiAgICBDb2xvcmFibGUsXG4gICAgUmVnaXN0cmFibGVJbmplY3QoJ2Zvcm0nKVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgZXJyb3I6IEJvb2xlYW4sXG4gICAgZXJyb3JDb3VudDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDFcbiAgICB9LFxuICAgIGVycm9yTWVzc2FnZXM6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEFycmF5XSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcbiAgICBtZXNzYWdlczoge1xuICAgICAgdHlwZTogW1N0cmluZywgQXJyYXldLFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcbiAgICBzdWNjZXNzOiBCb29sZWFuLFxuICAgIHN1Y2Nlc3NNZXNzYWdlczoge1xuICAgICAgdHlwZTogW1N0cmluZywgQXJyYXldLFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuICAgIHZhbGlkYXRlT25CbHVyOiBCb29sZWFuXG4gIH0sXG5cbiAgZGF0YTogKCkgPT4gKHtcbiAgICBlcnJvckJ1Y2tldDogW10sXG4gICAgaGFzQ29sb3I6IGZhbHNlLFxuICAgIGhhc0ZvY3VzZWQ6IGZhbHNlLFxuICAgIGhhc0lucHV0OiBmYWxzZSxcbiAgICBpc1Jlc2V0dGluZzogZmFsc2UsXG4gICAgdmFsaWQ6IGZhbHNlXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgaGFzRXJyb3IgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxFcnJvck1lc3NhZ2VzLmxlbmd0aCA+IDAgfHxcbiAgICAgICAgdGhpcy5lcnJvckJ1Y2tldC5sZW5ndGggPiAwIHx8XG4gICAgICAgIHRoaXMuZXJyb3JcbiAgICB9LFxuICAgIGV4dGVybmFsRXJyb3IgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxFcnJvck1lc3NhZ2VzLmxlbmd0aCA+IDAgfHwgdGhpcy5lcnJvclxuICAgIH0sXG4gICAgLy8gVE9ETzogQWRkIGxvZ2ljIHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIGVuYWJsZSBiYXNlZFxuICAgIC8vIHVwb24gYSBnb29kIHZhbGlkYXRpb25cbiAgICBoYXNTdWNjZXNzICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1Y2Nlc3NNZXNzYWdlcy5sZW5ndGggPiAwIHx8XG4gICAgICAgIHRoaXMuc3VjY2Vzc1xuICAgIH0sXG4gICAgaGFzTWVzc2FnZXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbnMubGVuZ3RoID4gMFxuICAgIH0sXG4gICAgaGFzU3RhdGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2hvdWxkVmFsaWRhdGUgJiYgKHRoaXMuaGFzRXJyb3IgfHwgdGhpcy5oYXNTdWNjZXNzKVxuICAgIH0sXG4gICAgaW50ZXJuYWxFcnJvck1lc3NhZ2VzICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yTWVzc2FnZXMgfHwgJydcbiAgICB9LFxuICAgIHNob3VsZFZhbGlkYXRlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmV4dGVybmFsRXJyb3IgfHwgKCF0aGlzLmlzUmVzZXR0aW5nICYmIChcbiAgICAgICAgdGhpcy52YWxpZGF0ZU9uQmx1clxuICAgICAgICAgID8gdGhpcy5oYXNGb2N1c2VkICYmICF0aGlzLmlzRm9jdXNlZFxuICAgICAgICAgIDogKHRoaXMuaGFzSW5wdXQgfHwgdGhpcy5oYXNGb2N1c2VkKVxuICAgICAgKSlcbiAgICB9LFxuICAgIHZhbGlkYXRpb25zICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25UYXJnZXQuc2xpY2UoMCwgdGhpcy5lcnJvckNvdW50KVxuICAgIH0sXG4gICAgdmFsaWRhdGlvblN0YXRlICgpIHtcbiAgICAgIGlmICh0aGlzLmhhc0Vycm9yICYmIHRoaXMuc2hvdWxkVmFsaWRhdGUpIHJldHVybiAnZXJyb3InXG4gICAgICBpZiAodGhpcy5oYXNTdWNjZXNzICYmIHRoaXMuc2hvdWxkVmFsaWRhdGUpIHJldHVybiAnc3VjY2VzcydcbiAgICAgIGlmICh0aGlzLmhhc0NvbG9yKSByZXR1cm4gdGhpcy5jb2xvclxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9LFxuICAgIHZhbGlkYXRpb25UYXJnZXQgKCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5pbnRlcm5hbEVycm9yTWVzc2FnZXMubGVuZ3RoID4gMFxuICAgICAgICA/IHRoaXMuZXJyb3JNZXNzYWdlc1xuICAgICAgICA6IHRoaXMuc3VjY2Vzc01lc3NhZ2VzLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IHRoaXMuc3VjY2Vzc01lc3NhZ2VzXG4gICAgICAgICAgOiB0aGlzLm1lc3NhZ2VzXG5cbiAgICAgIC8vIFN0cmluZ1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIFt0YXJnZXRdXG4gICAgICAvLyBBcnJheSB3aXRoIGl0ZW1zXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXRcbiAgICAgIC8vIEN1cnJlbnRseSBoYXMgdmFsaWRhdGlvblxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNob3VsZFZhbGlkYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yQnVja2V0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBydWxlczoge1xuICAgICAgaGFuZGxlciAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgaWYgKGRlZXBFcXVhbChuZXdWYWwsIG9sZFZhbCkpIHJldHVyblxuICAgICAgICB0aGlzLnZhbGlkYXRlKClcbiAgICAgIH0sXG4gICAgICBkZWVwOiB0cnVlXG4gICAgfSxcbiAgICBpbnRlcm5hbFZhbHVlICgpIHtcbiAgICAgIC8vIElmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgc2V0dGluZyBpbnB1dCxcbiAgICAgIC8vIG1hcmsgaXQgd2l0aCBoYXNJbnB1dFxuICAgICAgdGhpcy5oYXNJbnB1dCA9IHRydWVcbiAgICAgIHRoaXMudmFsaWRhdGVPbkJsdXIgfHwgdGhpcy4kbmV4dFRpY2sodGhpcy52YWxpZGF0ZSlcbiAgICB9LFxuICAgIGlzRm9jdXNlZCAodmFsKSB7XG4gICAgICBpZiAoIXZhbCkge1xuICAgICAgICB0aGlzLmhhc0ZvY3VzZWQgPSB0cnVlXG4gICAgICAgIHRoaXMudmFsaWRhdGVPbkJsdXIgJiYgdGhpcy52YWxpZGF0ZSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBpc1Jlc2V0dGluZyAoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oYXNJbnB1dCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaGFzRm9jdXNlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaXNSZXNldHRpbmcgPSBmYWxzZVxuICAgICAgfSwgMClcbiAgICB9LFxuICAgIGhhc0Vycm9yICh2YWwpIHtcbiAgICAgIGlmICh0aGlzLnNob3VsZFZhbGlkYXRlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTplcnJvcicsIHZhbClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYmVmb3JlTW91bnQgKCkge1xuICAgIHRoaXMudmFsaWRhdGUoKVxuICB9LFxuXG4gIGNyZWF0ZWQgKCkge1xuICAgIHRoaXMuZm9ybSAmJiB0aGlzLmZvcm0ucmVnaXN0ZXIodGhpcylcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLmZvcm0gJiYgdGhpcy5mb3JtLnVucmVnaXN0ZXIodGhpcylcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgLyoqIEBwdWJsaWMgKi9cbiAgICByZXNldCAoKSB7XG4gICAgICB0aGlzLmlzUmVzZXR0aW5nID0gdHJ1ZVxuICAgICAgdGhpcy5pbnRlcm5hbFZhbHVlID0gQXJyYXkuaXNBcnJheSh0aGlzLmludGVybmFsVmFsdWUpXG4gICAgICAgID8gW11cbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICB9LFxuICAgIC8qKiBAcHVibGljICovXG4gICAgcmVzZXRWYWxpZGF0aW9uICgpIHtcbiAgICAgIHRoaXMuaXNSZXNldHRpbmcgPSB0cnVlXG4gICAgfSxcbiAgICAvKiogQHB1YmxpYyAqL1xuICAgIHZhbGlkYXRlIChmb3JjZSA9IGZhbHNlLCB2YWx1ZSA9IHRoaXMuaW50ZXJuYWxWYWx1ZSkge1xuICAgICAgY29uc3QgZXJyb3JCdWNrZXQgPSBbXVxuXG4gICAgICBpZiAoZm9yY2UpIHRoaXMuaGFzSW5wdXQgPSB0aGlzLmhhc0ZvY3VzZWQgPSB0cnVlXG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnJ1bGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBydWxlID0gdGhpcy5ydWxlc1tpbmRleF1cbiAgICAgICAgY29uc3QgdmFsaWQgPSB0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJyA/IHJ1bGUodmFsdWUpIDogcnVsZVxuXG4gICAgICAgIGlmICh2YWxpZCA9PT0gZmFsc2UgfHwgdHlwZW9mIHZhbGlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGVycm9yQnVja2V0LnB1c2godmFsaWQpXG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWQgIT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlRXJyb3IoYFJ1bGVzIHNob3VsZCByZXR1cm4gYSBzdHJpbmcgb3IgYm9vbGVhbiwgcmVjZWl2ZWQgJyR7dHlwZW9mIHZhbGlkfScgaW5zdGVhZGAsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5lcnJvckJ1Y2tldCA9IGVycm9yQnVja2V0XG4gICAgICB0aGlzLnZhbGlkID0gZXJyb3JCdWNrZXQubGVuZ3RoID09PSAwXG5cbiAgICAgIHJldHVybiB0aGlzLnZhbGlkXG4gICAgfVxuICB9XG59XG4iXX0=