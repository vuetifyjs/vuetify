// Components
import VInput from '../components/VInput';
// Mixins
import Rippleable from './rippleable';
import Comparable from './comparable';
/* @vue/component */
export default {
    name: 'selectable',
    extends: VInput,
    mixins: [Rippleable, Comparable],
    model: {
        prop: 'inputValue',
        event: 'change'
    },
    props: {
        color: {
            type: String,
            default: 'accent'
        },
        id: String,
        inputValue: null,
        falseValue: null,
        trueValue: null,
        multiple: {
            type: Boolean,
            default: null
        },
        label: String
    },
    data: vm => ({
        lazyValue: vm.inputValue
    }),
    computed: {
        computedColor() {
            return this.isActive ? this.color : this.validationState;
        },
        isMultiple() {
            return this.multiple === true || (this.multiple === null && Array.isArray(this.internalValue));
        },
        isActive() {
            const value = this.value;
            const input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input))
                    return false;
                return input.some(item => this.valueComparator(item, value));
            }
            if (this.trueValue === undefined || this.falseValue === undefined) {
                return value
                    ? this.valueComparator(value, input)
                    : Boolean(input);
            }
            return this.valueComparator(input, this.trueValue);
        },
        isDirty() {
            return this.isActive;
        }
    },
    watch: {
        inputValue(val) {
            this.lazyValue = val;
        }
    },
    methods: {
        genLabel() {
            if (!this.hasLabel)
                return null;
            const label = VInput.methods.genLabel.call(this);
            label.data.on = { click: this.onChange };
            return label;
        },
        genInput(type, attrs) {
            return this.$createElement('input', {
                attrs: Object.assign({
                    'aria-label': this.label,
                    'aria-checked': this.isActive.toString(),
                    disabled: this.isDisabled,
                    id: this.id,
                    role: type,
                    type,
                    value: this.inputValue
                }, attrs),
                domProps: {
                    checked: this.isActive
                },
                on: {
                    blur: this.onBlur,
                    change: this.onChange,
                    focus: this.onFocus,
                    keydown: this.onKeydown
                },
                ref: 'input'
            });
        },
        onBlur() {
            this.isFocused = false;
        },
        onChange() {
            if (this.isDisabled)
                return;
            const value = this.value;
            let input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) {
                    input = [];
                }
                const length = input.length;
                input = input.filter(item => !this.valueComparator(item, value));
                if (input.length === length) {
                    input.push(value);
                }
            }
            else if (this.trueValue !== undefined && this.falseValue !== undefined) {
                input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue;
            }
            else if (value) {
                input = this.valueComparator(input, value) ? null : value;
            }
            else {
                input = !input;
            }
            this.validate(true, input);
            this.internalValue = input;
        },
        onFocus() {
            this.isFocused = true;
        },
        /** @abstract */
        onKeydown(e) { }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvc2VsZWN0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0sc0JBQXNCLENBQUE7QUFFekMsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQTtBQUNyQyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUE7QUFFckMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsWUFBWTtJQUVsQixPQUFPLEVBQUUsTUFBTTtJQUVmLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7SUFFaEMsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFlBQVk7UUFDbEIsS0FBSyxFQUFFLFFBQVE7S0FDaEI7SUFFRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsRUFBRSxFQUFFLE1BQU07UUFDVixVQUFVLEVBQUUsSUFBSTtRQUNoQixVQUFVLEVBQUUsSUFBSTtRQUNoQixTQUFTLEVBQUUsSUFBSTtRQUNmLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELEtBQUssRUFBRSxNQUFNO0tBQ2Q7SUFFRCxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsU0FBUyxFQUFFLEVBQUUsQ0FBQyxVQUFVO0tBQ3pCLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixhQUFhO1lBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFBO1FBQzFELENBQUM7UUFDRCxVQUFVO1lBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksSUFB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LFNBQVMsR0FBRyxJQUFJLENBQUE7UUFDdkIsQ0FBQztRQUNELGdCQUFnQjtRQUNoQixTQUFTLENBQUUsQ0FBQyxJQUFHLENBQUM7S0FDakI7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZJbnB1dCBmcm9tICcuLi9jb21wb25lbnRzL1ZJbnB1dCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgUmlwcGxlYWJsZSBmcm9tICcuL3JpcHBsZWFibGUnXG5pbXBvcnQgQ29tcGFyYWJsZSBmcm9tICcuL2NvbXBhcmFibGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzZWxlY3RhYmxlJyxcblxuICBleHRlbmRzOiBWSW5wdXQsXG5cbiAgbWl4aW5zOiBbUmlwcGxlYWJsZSwgQ29tcGFyYWJsZV0sXG5cbiAgbW9kZWw6IHtcbiAgICBwcm9wOiAnaW5wdXRWYWx1ZScsXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXG4gIH0sXG5cbiAgcHJvcHM6IHtcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2FjY2VudCdcbiAgICB9LFxuICAgIGlkOiBTdHJpbmcsXG4gICAgaW5wdXRWYWx1ZTogbnVsbCxcbiAgICBmYWxzZVZhbHVlOiBudWxsLFxuICAgIHRydWVWYWx1ZTogbnVsbCxcbiAgICBtdWx0aXBsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGxhYmVsOiBTdHJpbmdcbiAgfSxcblxuICBkYXRhOiB2bSA9PiAoe1xuICAgIGxhenlWYWx1ZTogdm0uaW5wdXRWYWx1ZVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkQ29sb3IgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUgPyB0aGlzLmNvbG9yIDogdGhpcy52YWxpZGF0aW9uU3RhdGVcbiAgICB9LFxuICAgIGlzTXVsdGlwbGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPT09IHRydWUgfHwgKHRoaXMubXVsdGlwbGUgPT09IG51bGwgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmludGVybmFsVmFsdWUpKVxuICAgIH0sXG4gICAgaXNBY3RpdmUgKCkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlXG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMuaW50ZXJuYWxWYWx1ZVxuXG4gICAgICBpZiAodGhpcy5pc011bHRpcGxlKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldHVybiBpbnB1dC5zb21lKGl0ZW0gPT4gdGhpcy52YWx1ZUNvbXBhcmF0b3IoaXRlbSwgdmFsdWUpKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50cnVlVmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmZhbHNlVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICA/IHRoaXMudmFsdWVDb21wYXJhdG9yKHZhbHVlLCBpbnB1dClcbiAgICAgICAgICA6IEJvb2xlYW4oaW5wdXQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlQ29tcGFyYXRvcihpbnB1dCwgdGhpcy50cnVlVmFsdWUpXG4gICAgfSxcbiAgICBpc0RpcnR5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaW5wdXRWYWx1ZSAodmFsKSB7XG4gICAgICB0aGlzLmxhenlWYWx1ZSA9IHZhbFxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuTGFiZWwgKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0xhYmVsKSByZXR1cm4gbnVsbFxuXG4gICAgICBjb25zdCBsYWJlbCA9IFZJbnB1dC5tZXRob2RzLmdlbkxhYmVsLmNhbGwodGhpcylcblxuICAgICAgbGFiZWwuZGF0YS5vbiA9IHsgY2xpY2s6IHRoaXMub25DaGFuZ2UgfVxuXG4gICAgICByZXR1cm4gbGFiZWxcbiAgICB9LFxuICAgIGdlbklucHV0ICh0eXBlLCBhdHRycykge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xuICAgICAgICBhdHRyczogT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLmxhYmVsLFxuICAgICAgICAgICdhcmlhLWNoZWNrZWQnOiB0aGlzLmlzQWN0aXZlLnRvU3RyaW5nKCksXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNEaXNhYmxlZCxcbiAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICByb2xlOiB0eXBlLFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgdmFsdWU6IHRoaXMuaW5wdXRWYWx1ZVxuICAgICAgICB9LCBhdHRycyksXG4gICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgY2hlY2tlZDogdGhpcy5pc0FjdGl2ZVxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGJsdXI6IHRoaXMub25CbHVyLFxuICAgICAgICAgIGNoYW5nZTogdGhpcy5vbkNoYW5nZSxcbiAgICAgICAgICBmb2N1czogdGhpcy5vbkZvY3VzLFxuICAgICAgICAgIGtleWRvd246IHRoaXMub25LZXlkb3duXG4gICAgICAgIH0sXG4gICAgICAgIHJlZjogJ2lucHV0J1xuICAgICAgfSlcbiAgICB9LFxuICAgIG9uQmx1ciAoKSB7XG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlXG4gICAgfSxcbiAgICBvbkNoYW5nZSAoKSB7XG4gICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSByZXR1cm5cblxuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlXG4gICAgICBsZXQgaW5wdXQgPSB0aGlzLmludGVybmFsVmFsdWVcblxuICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZSkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgICAgaW5wdXQgPSBbXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGVuZ3RoID0gaW5wdXQubGVuZ3RoXG5cbiAgICAgICAgaW5wdXQgPSBpbnB1dC5maWx0ZXIoaXRlbSA9PiAhdGhpcy52YWx1ZUNvbXBhcmF0b3IoaXRlbSwgdmFsdWUpKVxuXG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgIGlucHV0LnB1c2godmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy50cnVlVmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmZhbHNlVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbnB1dCA9IHRoaXMudmFsdWVDb21wYXJhdG9yKGlucHV0LCB0aGlzLnRydWVWYWx1ZSkgPyB0aGlzLmZhbHNlVmFsdWUgOiB0aGlzLnRydWVWYWx1ZVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICBpbnB1dCA9IHRoaXMudmFsdWVDb21wYXJhdG9yKGlucHV0LCB2YWx1ZSkgPyBudWxsIDogdmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0ID0gIWlucHV0XG4gICAgICB9XG5cbiAgICAgIHRoaXMudmFsaWRhdGUodHJ1ZSwgaW5wdXQpXG4gICAgICB0aGlzLmludGVybmFsVmFsdWUgPSBpbnB1dFxuICAgIH0sXG4gICAgb25Gb2N1cyAoKSB7XG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWVcbiAgICB9LFxuICAgIC8qKiBAYWJzdHJhY3QgKi9cbiAgICBvbktleWRvd24gKGUpIHt9XG4gIH1cbn1cbiJdfQ==