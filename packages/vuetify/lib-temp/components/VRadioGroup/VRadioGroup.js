// Styles
import '../../stylus/components/_selection-controls.styl';
import '../../stylus/components/_radio-group.styl';
// Components
import VInput from '../VInput';
// Mixins
import Comparable from '../../mixins/comparable';
import { provide as RegistrableProvide } from '../../mixins/registrable';
/* @vue/component */
export default {
    name: 'v-radio-group',
    extends: VInput,
    mixins: [
        Comparable,
        RegistrableProvide('radio')
    ],
    model: {
        prop: 'value',
        event: 'change'
    },
    provide() {
        return {
            radio: this
        };
    },
    props: {
        column: {
            type: Boolean,
            default: true
        },
        height: {
            type: [Number, String],
            default: 'auto'
        },
        mandatory: {
            type: Boolean,
            default: true
        },
        name: String,
        row: Boolean,
        // If no value set on VRadio
        // will match valueComparator
        // force default to null
        value: {
            default: null
        }
    },
    data: () => ({
        internalTabIndex: -1,
        radios: []
    }),
    computed: {
        classes() {
            return {
                'v-input--selection-controls v-input--radio-group': true,
                'v-input--radio-group--column': this.column && !this.row,
                'v-input--radio-group--row': this.row
            };
        }
    },
    watch: {
        hasError: 'setErrorState',
        internalValue: 'setActiveRadio'
    },
    mounted() {
        this.setErrorState(this.hasError);
        this.setActiveRadio();
    },
    methods: {
        genDefaultSlot() {
            return this.$createElement('div', {
                staticClass: 'v-input--radio-group__input',
                attrs: {
                    role: 'radiogroup'
                }
            }, VInput.methods.genDefaultSlot.call(this));
        },
        onRadioChange(value) {
            if (this.disabled)
                return;
            this.hasInput = true;
            this.internalValue = value;
            this.setActiveRadio();
            this.$nextTick(this.validate);
        },
        onRadioBlur(e) {
            if (!e.relatedTarget || !e.relatedTarget.classList.contains('v-radio')) {
                this.hasInput = true;
                this.$emit('blur', e);
            }
        },
        register(radio) {
            radio.isActive = this.valueComparator(this.internalValue, radio.value);
            radio.$on('change', this.onRadioChange);
            radio.$on('blur', this.onRadioBlur);
            this.radios.push(radio);
        },
        setErrorState(val) {
            for (let index = this.radios.length; --index >= 0;) {
                this.radios[index].parentError = val;
            }
        },
        setActiveRadio() {
            for (let index = this.radios.length; --index >= 0;) {
                const radio = this.radios[index];
                radio.isActive = this.valueComparator(this.internalValue, radio.value);
            }
        },
        unregister(radio) {
            radio.$off('change', this.onRadioChange);
            radio.$off('blur', this.onRadioBlur);
            const index = this.radios.findIndex(r => r === radio);
            /* istanbul ignore else */
            if (index > -1)
                this.radios.splice(index, 1);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJhZGlvR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WUmFkaW9Hcm91cC9WUmFkaW9Hcm91cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxrREFBa0QsQ0FBQTtBQUN6RCxPQUFPLDJDQUEyQyxDQUFBO0FBRWxELGFBQWE7QUFDYixPQUFPLE1BQU0sTUFBTSxXQUFXLENBQUE7QUFFOUIsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sRUFDTCxPQUFPLElBQUksa0JBQWtCLEVBQzlCLE1BQU0sMEJBQTBCLENBQUE7QUFFakMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsZUFBZTtJQUVyQixPQUFPLEVBQUUsTUFBTTtJQUVmLE1BQU0sRUFBRTtRQUNOLFVBQVU7UUFDVixrQkFBa0IsQ0FBQyxPQUFPLENBQUM7S0FDNUI7SUFFRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsT0FBTztRQUNiLEtBQUssRUFBRSxRQUFRO0tBQ2hCO0lBRUQsT0FBTztRQUNMLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUE7SUFDSCxDQUFDO0lBRUQsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFFLE9BQU87UUFDWiw0QkFBNEI7UUFDNUIsNkJBQTZCO1FBQzdCLHdCQUF3QjtRQUN4QixLQUFLLEVBQUU7WUFDTCxPQUFP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LEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUN2RTtRQUNILENBQUM7UUFDRCxVQUFVLENBQUUsS0FBSztZQUNmLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7WUFFcEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUE7WUFFckQsMEJBQTBCO1lBQzFCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUMsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc2VsZWN0aW9uLWNvbnRyb2xzLnN0eWwnXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19yYWRpby1ncm91cC5zdHlsJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVklucHV0IGZyb20gJy4uL1ZJbnB1dCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29tcGFyYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29tcGFyYWJsZSdcbmltcG9ydCB7XG4gIHByb3ZpZGUgYXMgUmVnaXN0cmFibGVQcm92aWRlXG59IGZyb20gJy4uLy4uL21peGlucy9yZWdpc3RyYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtcmFkaW8tZ3JvdXAnLFxuXG4gIGV4dGVuZHM6IFZJbnB1dCxcblxuICBtaXhpbnM6IFtcbiAgICBDb21wYXJhYmxlLFxuICAgIFJlZ2lzdHJhYmxlUHJvdmlkZSgncmFkaW8nKVxuICBdLFxuXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ3ZhbHVlJyxcbiAgICBldmVudDogJ2NoYW5nZSdcbiAgfSxcblxuICBwcm92aWRlICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmFkaW86IHRoaXNcbiAgICB9XG4gIH0sXG5cbiAgcHJvcHM6IHtcbiAgICBjb2x1bW46IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAnYXV0bydcbiAgICB9LFxuICAgIG1hbmRhdG9yeToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIG5hbWU6IFN0cmluZyxcbiAgICByb3c6IEJvb2xlYW4sXG4gICAgLy8gSWYgbm8gdmFsdWUgc2V0IG9uIFZSYWRpb1xuICAgIC8vIHdpbGwgbWF0Y2ggdmFsdWVDb21wYXJhdG9yXG4gICAgLy8gZm9yY2UgZGVmYXVsdCB0byBudWxsXG4gICAgdmFsdWU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbnRlcm5hbFRhYkluZGV4OiAtMSxcbiAgICByYWRpb3M6IFtdXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1pbnB1dC0tc2VsZWN0aW9uLWNvbnRyb2xzIHYtaW5wdXQtLXJhZGlvLWdyb3VwJzogdHJ1ZSxcbiAgICAgICAgJ3YtaW5wdXQtLXJhZGlvLWdyb3VwLS1jb2x1bW4nOiB0aGlzLmNvbHVtbiAmJiAhdGhpcy5yb3csXG4gICAgICAgICd2LWlucHV0LS1yYWRpby1ncm91cC0tcm93JzogdGhpcy5yb3dcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBoYXNFcnJvcjogJ3NldEVycm9yU3RhdGUnLFxuICAgIGludGVybmFsVmFsdWU6ICdzZXRBY3RpdmVSYWRpbydcbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnNldEVycm9yU3RhdGUodGhpcy5oYXNFcnJvcilcbiAgICB0aGlzLnNldEFjdGl2ZVJhZGlvKClcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuRGVmYXVsdFNsb3QgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWlucHV0LS1yYWRpby1ncm91cF9faW5wdXQnLFxuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIHJvbGU6ICdyYWRpb2dyb3VwJ1xuICAgICAgICB9XG4gICAgICB9LCBWSW5wdXQubWV0aG9kcy5nZW5EZWZhdWx0U2xvdC5jYWxsKHRoaXMpKVxuICAgIH0sXG4gICAgb25SYWRpb0NoYW5nZSAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm5cblxuICAgICAgdGhpcy5oYXNJbnB1dCA9IHRydWVcbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzLnNldEFjdGl2ZVJhZGlvKClcbiAgICAgIHRoaXMuJG5leHRUaWNrKHRoaXMudmFsaWRhdGUpXG4gICAgfSxcbiAgICBvblJhZGlvQmx1ciAoZSkge1xuICAgICAgaWYgKCFlLnJlbGF0ZWRUYXJnZXQgfHwgIWUucmVsYXRlZFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3YtcmFkaW8nKSkge1xuICAgICAgICB0aGlzLmhhc0lucHV0ID0gdHJ1ZVxuICAgICAgICB0aGlzLiRlbWl0KCdibHVyJywgZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlZ2lzdGVyIChyYWRpbykge1xuICAgICAgcmFkaW8uaXNBY3RpdmUgPSB0aGlzLnZhbHVlQ29tcGFyYXRvcih0aGlzLmludGVybmFsVmFsdWUsIHJhZGlvLnZhbHVlKVxuICAgICAgcmFkaW8uJG9uKCdjaGFuZ2UnLCB0aGlzLm9uUmFkaW9DaGFuZ2UpXG4gICAgICByYWRpby4kb24oJ2JsdXInLCB0aGlzLm9uUmFkaW9CbHVyKVxuICAgICAgdGhpcy5yYWRpb3MucHVzaChyYWRpbylcbiAgICB9LFxuICAgIHNldEVycm9yU3RhdGUgKHZhbCkge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLnJhZGlvcy5sZW5ndGg7IC0taW5kZXggPj0gMDspIHtcbiAgICAgICAgdGhpcy5yYWRpb3NbaW5kZXhdLnBhcmVudEVycm9yID0gdmFsXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRBY3RpdmVSYWRpbyAoKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMucmFkaW9zLmxlbmd0aDsgLS1pbmRleCA+PSAwOykge1xuICAgICAgICBjb25zdCByYWRpbyA9IHRoaXMucmFkaW9zW2luZGV4XVxuICAgICAgICByYWRpby5pc0FjdGl2ZSA9IHRoaXMudmFsdWVDb21wYXJhdG9yKHRoaXMuaW50ZXJuYWxWYWx1ZSwgcmFkaW8udmFsdWUpXG4gICAgICB9XG4gICAgfSxcbiAgICB1bnJlZ2lzdGVyIChyYWRpbykge1xuICAgICAgcmFkaW8uJG9mZignY2hhbmdlJywgdGhpcy5vblJhZGlvQ2hhbmdlKVxuICAgICAgcmFkaW8uJG9mZignYmx1cicsIHRoaXMub25SYWRpb0JsdXIpXG5cbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yYWRpb3MuZmluZEluZGV4KHIgPT4gciA9PT0gcmFkaW8pXG5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5yYWRpb3Muc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgfVxufVxuIl19