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
            return this.hasSuccess || (this.shouldValidate && this.hasError);
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
            if (this.hasSuccess)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW5zL3ZhbGlkYXRhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUU5QyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFBO0FBRW5DLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGFBQWE7SUFFbkIsTUFBTSxFQUFFO1FBQ04sU0FBUztRQUNULGlCQUFpQixDQUFDLE1BQU0sQ0FBQztLQUMxQjtJQUVELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNyQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtTQUNsQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDckIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7U0FDbEI7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsS0FBSztZQUNYLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFLE9BQU87UUFDaEIsZUFBZSxFQUFFO1lBQ2YsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNyQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFB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QUssS0FBSyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUNoRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUN4QjtxQkFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ3pCLFlBQVksQ0FBQyxzREFBc0QsT0FBTyxLQUFLLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQTtpQkFDbEc7YUFDRjtZQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUE7WUFFckMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ25CLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWVwRXF1YWwgfSBmcm9tICcuLi91dGlsL2hlbHBlcnMnXG5pbXBvcnQgeyBpbmplY3QgYXMgUmVnaXN0cmFibGVJbmplY3QgfSBmcm9tICcuL3JlZ2lzdHJhYmxlJ1xuaW1wb3J0IHsgY29uc29sZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9jb25zb2xlJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi9jb2xvcmFibGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2YWxpZGF0YWJsZScsXG5cbiAgbWl4aW5zOiBbXG4gICAgQ29sb3JhYmxlLFxuICAgIFJlZ2lzdHJhYmxlSW5qZWN0KCdmb3JtJylcbiAgXSxcblxuICBwcm9wczoge1xuICAgIGVycm9yOiBCb29sZWFuLFxuICAgIGVycm9yQ291bnQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAxXG4gICAgfSxcbiAgICBlcnJvck1lc3NhZ2VzOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICAgIH0sXG4gICAgbWVzc2FnZXM6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEFycmF5XSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICAgIH0sXG4gICAgc3VjY2VzczogQm9vbGVhbixcbiAgICBzdWNjZXNzTWVzc2FnZXM6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEFycmF5XSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcbiAgICB2YWxpZGF0ZU9uQmx1cjogQm9vbGVhblxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgZXJyb3JCdWNrZXQ6IFtdLFxuICAgIGhhc0NvbG9yOiBmYWxzZSxcbiAgICBoYXNGb2N1c2VkOiBmYWxzZSxcbiAgICBoYXNJbnB1dDogZmFsc2UsXG4gICAgaXNSZXNldHRpbmc6IGZhbHNlLFxuICAgIHZhbGlkOiBmYWxzZVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGhhc0Vycm9yICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVybmFsRXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwIHx8XG4gICAgICAgIHRoaXMuZXJyb3JCdWNrZXQubGVuZ3RoID4gMCB8fFxuICAgICAgICB0aGlzLmVycm9yXG4gICAgfSxcbiAgICBleHRlcm5hbEVycm9yICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVybmFsRXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwIHx8IHRoaXMuZXJyb3JcbiAgICB9LFxuICAgIC8vIFRPRE86IEFkZCBsb2dpYyB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBlbmFibGUgYmFzZWRcbiAgICAvLyB1cG9uIGEgZ29vZCB2YWxpZGF0aW9uXG4gICAgaGFzU3VjY2VzcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdWNjZXNzTWVzc2FnZXMubGVuZ3RoID4gMCB8fFxuICAgICAgICB0aGlzLnN1Y2Nlc3NcbiAgICB9LFxuICAgIGhhc01lc3NhZ2VzICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25zLmxlbmd0aCA+IDBcbiAgICB9LFxuICAgIGhhc1N0YXRlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc1N1Y2Nlc3MgfHwgKHRoaXMuc2hvdWxkVmFsaWRhdGUgJiYgdGhpcy5oYXNFcnJvcilcbiAgICB9LFxuICAgIGludGVybmFsRXJyb3JNZXNzYWdlcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvck1lc3NhZ2VzIHx8ICcnXG4gICAgfSxcbiAgICBzaG91bGRWYWxpZGF0ZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5leHRlcm5hbEVycm9yIHx8ICghdGhpcy5pc1Jlc2V0dGluZyAmJiAoXG4gICAgICAgIHRoaXMudmFsaWRhdGVPbkJsdXJcbiAgICAgICAgICA/IHRoaXMuaGFzRm9jdXNlZCAmJiAhdGhpcy5pc0ZvY3VzZWRcbiAgICAgICAgICA6ICh0aGlzLmhhc0lucHV0IHx8IHRoaXMuaGFzRm9jdXNlZClcbiAgICAgICkpXG4gICAgfSxcbiAgICB2YWxpZGF0aW9ucyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uVGFyZ2V0LnNsaWNlKDAsIHRoaXMuZXJyb3JDb3VudClcbiAgICB9LFxuICAgIHZhbGlkYXRpb25TdGF0ZSAoKSB7XG4gICAgICBpZiAodGhpcy5oYXNFcnJvciAmJiB0aGlzLnNob3VsZFZhbGlkYXRlKSByZXR1cm4gJ2Vycm9yJ1xuICAgICAgaWYgKHRoaXMuaGFzU3VjY2VzcykgcmV0dXJuICdzdWNjZXNzJ1xuICAgICAgaWYgKHRoaXMuaGFzQ29sb3IpIHJldHVybiB0aGlzLmNvbG9yXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0sXG4gICAgdmFsaWRhdGlvblRhcmdldCAoKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmludGVybmFsRXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwXG4gICAgICAgID8gdGhpcy5lcnJvck1lc3NhZ2VzXG4gICAgICAgIDogdGhpcy5zdWNjZXNzTWVzc2FnZXMubGVuZ3RoID4gMFxuICAgICAgICAgID8gdGhpcy5zdWNjZXNzTWVzc2FnZXNcbiAgICAgICAgICA6IHRoaXMubWVzc2FnZXNcblxuICAgICAgLy8gU3RyaW5nXG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gW3RhcmdldF1cbiAgICAgIC8vIEFycmF5IHdpdGggaXRlbXNcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldFxuICAgICAgLy8gQ3VycmVudGx5IGhhcyB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvdWxkVmFsaWRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JCdWNrZXRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIHJ1bGVzOiB7XG4gICAgICBoYW5kbGVyIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICBpZiAoZGVlcEVxdWFsKG5ld1ZhbCwgb2xkVmFsKSkgcmV0dXJuXG4gICAgICAgIHRoaXMudmFsaWRhdGUoKVxuICAgICAgfSxcbiAgICAgIGRlZXA6IHRydWVcbiAgICB9LFxuICAgIGludGVybmFsVmFsdWUgKCkge1xuICAgICAgLy8gSWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBzZXR0aW5nIGlucHV0LFxuICAgICAgLy8gbWFyayBpdCB3aXRoIGhhc0lucHV0XG4gICAgICB0aGlzLmhhc0lucHV0ID0gdHJ1ZVxuICAgICAgdGhpcy52YWxpZGF0ZU9uQmx1ciB8fCB0aGlzLiRuZXh0VGljayh0aGlzLnZhbGlkYXRlKVxuICAgIH0sXG4gICAgaXNGb2N1c2VkICh2YWwpIHtcbiAgICAgIGlmICghdmFsKSB7XG4gICAgICAgIHRoaXMuaGFzRm9jdXNlZCA9IHRydWVcbiAgICAgICAgdGhpcy52YWxpZGF0ZU9uQmx1ciAmJiB0aGlzLnZhbGlkYXRlKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzUmVzZXR0aW5nICgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmhhc0lucHV0ID0gZmFsc2VcbiAgICAgICAgdGhpcy5oYXNGb2N1c2VkID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc1Jlc2V0dGluZyA9IGZhbHNlXG4gICAgICB9LCAwKVxuICAgIH0sXG4gICAgaGFzRXJyb3IgKHZhbCkge1xuICAgICAgaWYgKHRoaXMuc2hvdWxkVmFsaWRhdGUpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmVycm9yJywgdmFsKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBiZWZvcmVNb3VudCAoKSB7XG4gICAgdGhpcy52YWxpZGF0ZSgpXG4gIH0sXG5cbiAgY3JlYXRlZCAoKSB7XG4gICAgdGhpcy5mb3JtICYmIHRoaXMuZm9ybS5yZWdpc3Rlcih0aGlzKVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIHRoaXMuZm9ybSAmJiB0aGlzLmZvcm0udW5yZWdpc3Rlcih0aGlzKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICAvKiogQHB1YmxpYyAqL1xuICAgIHJlc2V0ICgpIHtcbiAgICAgIHRoaXMuaXNSZXNldHRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmludGVybmFsVmFsdWUgPSBBcnJheS5pc0FycmF5KHRoaXMuaW50ZXJuYWxWYWx1ZSlcbiAgICAgICAgPyBbXVxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgLyoqIEBwdWJsaWMgKi9cbiAgICByZXNldFZhbGlkYXRpb24gKCkge1xuICAgICAgdGhpcy5pc1Jlc2V0dGluZyA9IHRydWVcbiAgICB9LFxuICAgIC8qKiBAcHVibGljICovXG4gICAgdmFsaWRhdGUgKGZvcmNlID0gZmFsc2UsIHZhbHVlID0gdGhpcy5pbnRlcm5hbFZhbHVlKSB7XG4gICAgICBjb25zdCBlcnJvckJ1Y2tldCA9IFtdXG5cbiAgICAgIGlmIChmb3JjZSkgdGhpcy5oYXNJbnB1dCA9IHRoaXMuaGFzRm9jdXNlZCA9IHRydWVcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucnVsZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHJ1bGUgPSB0aGlzLnJ1bGVzW2luZGV4XVxuICAgICAgICBjb25zdCB2YWxpZCA9IHR5cGVvZiBydWxlID09PSAnZnVuY3Rpb24nID8gcnVsZSh2YWx1ZSkgOiBydWxlXG5cbiAgICAgICAgaWYgKHZhbGlkID09PSBmYWxzZSB8fCB0eXBlb2YgdmFsaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZXJyb3JCdWNrZXQucHVzaCh2YWxpZClcbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGVFcnJvcihgUnVsZXMgc2hvdWxkIHJldHVybiBhIHN0cmluZyBvciBib29sZWFuLCByZWNlaXZlZCAnJHt0eXBlb2YgdmFsaWR9JyBpbnN0ZWFkYCwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmVycm9yQnVja2V0ID0gZXJyb3JCdWNrZXRcbiAgICAgIHRoaXMudmFsaWQgPSBlcnJvckJ1Y2tldC5sZW5ndGggPT09IDBcblxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRcbiAgICB9XG4gIH1cbn1cbiJdfQ==