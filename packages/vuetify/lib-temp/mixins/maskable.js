/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 * Example: mask="#### #### #### ####"
 */
import { isMaskDelimiter, maskText, unmaskText } from '../util/mask';
/* @vue/component */
export default {
    name: 'maskable',
    props: {
        dontFillMaskBlanks: Boolean,
        mask: {
            type: [Object, String],
            default: null
        },
        returnMaskedValue: Boolean
    },
    data: () => ({
        selection: 0,
        lazySelection: 0,
        preDefined: {
            'credit-card': '#### - #### - #### - ####',
            'date': '##/##/####',
            'date-with-time': '##/##/#### ##:##',
            'phone': '(###) ### - ####',
            'social': '###-##-####',
            'time': '##:##',
            'time-with-seconds': '##:##:##'
        }
    }),
    computed: {
        masked() {
            const preDefined = this.preDefined[this.mask];
            const mask = preDefined || this.mask || '';
            return mask.split('');
        }
    },
    watch: {
        /**
         * Make sure the cursor is in the correct
         * location when the mask changes
         */
        mask() {
            if (!this.$refs.input)
                return;
            const oldValue = this.$refs.input.value;
            const newValue = this.maskText(unmaskText(this.lazyValue));
            let position = 0;
            let selection = this.selection;
            for (let index = 0; index < selection; index++) {
                isMaskDelimiter(oldValue[index]) || position++;
            }
            selection = 0;
            if (newValue) {
                for (let index = 0; index < newValue.length; index++) {
                    isMaskDelimiter(newValue[index]) || position--;
                    selection++;
                    if (position <= 0)
                        break;
                }
            }
            this.$nextTick(() => {
                this.$refs.input.value = newValue;
                this.setCaretPosition(selection);
            });
        }
    },
    beforeMount() {
        if (!this.mask ||
            this.value == null ||
            !this.returnMaskedValue)
            return;
        const value = this.maskText(this.value);
        // See if masked value does not
        // match the user given value
        if (value === this.value)
            return;
        this.$emit('input', value);
    },
    methods: {
        setCaretPosition(selection) {
            this.selection = selection;
            window.setTimeout(() => {
                this.$refs.input && this.$refs.input.setSelectionRange(this.selection, this.selection);
            }, 0);
        },
        updateRange() {
            if (!this.$refs.input)
                return;
            const newValue = this.maskText(this.lazyValue);
            let selection = 0;
            this.$refs.input.value = newValue;
            if (newValue) {
                for (let index = 0; index < newValue.length; index++) {
                    if (this.lazySelection <= 0)
                        break;
                    isMaskDelimiter(newValue[index]) || this.lazySelection--;
                    selection++;
                }
            }
            this.setCaretPosition(selection);
            // this.$emit() must occur only when all internal values are correct
            this.$emit('input', this.returnMaskedValue ? this.$refs.input.value : this.lazyValue);
        },
        maskText(text) {
            return this.mask ? maskText(text, this.masked, this.dontFillMaskBlanks) : text;
        },
        unmaskText(text) {
            return this.mask && !this.returnMaskedValue ? unmaskText(text) : text;
        },
        // When the input changes and is
        // re-created, ensure that the
        // caret location is correct
        setSelectionRange() {
            this.$nextTick(this.updateRange);
        },
        resetSelections(input) {
            if (!input.selectionEnd)
                return;
            this.selection = input.selectionEnd;
            this.lazySelection = 0;
            for (let index = 0; index < this.selection; index++) {
                isMaskDelimiter(input.value[index]) || this.lazySelection++;
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza2FibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW5zL21hc2thYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7R0FTRztBQUVILE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFVBQVUsRUFDWCxNQUFNLGNBQWMsQ0FBQTtBQUVyQixvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxVQUFVO0lBRWhCLEtBQUssRUFBRTtRQUNMLGtCQUFrQixFQUFFLE9BQU87UUFDM0IsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsaUJBQWlCLEVBQUUsT0FBTztLQUMzQjtJQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsU0FBUyxFQUFFLENBQUM7UUFDWixhQUFhLEVBQUUsQ0FBQztRQUNoQixVQUFVLEVBQUU7WUFDVixhQUFhLEVBQUUsMkJBQTJCO1lBQzFDLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLGdCQUFnQixFQUFFLGtCQUFrQjtZQUNwQyxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsbUJBQW1CLEVBQUUsVUFBVTtTQUNoQztLQUNGLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixNQUFNO1lBQ0osTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDN0MsTUFBTSxJQUFJLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFBO1lBRTFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QixDQUFDO0tBQ0Y7SUFFRCxLQUFLLEVBQUU7UUFDTDs7O1dBR0c7UUFDSCxJQUFJO1lB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LENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNuRCxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTthQUM1RDtRQUNILENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1hc2thYmxlXG4gKlxuICogQG1peGluXG4gKlxuICogQ3JlYXRlcyBhbiBpbnB1dCBtYXNrIHRoYXQgaXNcbiAqIGdlbmVyYXRlZCBmcm9tIGEgbWFza2VkIHN0clxuICpcbiAqIEV4YW1wbGU6IG1hc2s9XCIjIyMjICMjIyMgIyMjIyAjIyMjXCJcbiAqL1xuXG5pbXBvcnQge1xuICBpc01hc2tEZWxpbWl0ZXIsXG4gIG1hc2tUZXh0LFxuICB1bm1hc2tUZXh0XG59IGZyb20gJy4uL3V0aWwvbWFzaydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21hc2thYmxlJyxcblxuICBwcm9wczoge1xuICAgIGRvbnRGaWxsTWFza0JsYW5rczogQm9vbGVhbixcbiAgICBtYXNrOiB7XG4gICAgICB0eXBlOiBbT2JqZWN0LCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgcmV0dXJuTWFza2VkVmFsdWU6IEJvb2xlYW5cbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIHNlbGVjdGlvbjogMCxcbiAgICBsYXp5U2VsZWN0aW9uOiAwLFxuICAgIHByZURlZmluZWQ6IHtcbiAgICAgICdjcmVkaXQtY2FyZCc6ICcjIyMjIC0gIyMjIyAtICMjIyMgLSAjIyMjJyxcbiAgICAgICdkYXRlJzogJyMjLyMjLyMjIyMnLFxuICAgICAgJ2RhdGUtd2l0aC10aW1lJzogJyMjLyMjLyMjIyMgIyM6IyMnLFxuICAgICAgJ3Bob25lJzogJygjIyMpICMjIyAtICMjIyMnLFxuICAgICAgJ3NvY2lhbCc6ICcjIyMtIyMtIyMjIycsXG4gICAgICAndGltZSc6ICcjIzojIycsXG4gICAgICAndGltZS13aXRoLXNlY29uZHMnOiAnIyM6IyM6IyMnXG4gICAgfVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIG1hc2tlZCAoKSB7XG4gICAgICBjb25zdCBwcmVEZWZpbmVkID0gdGhpcy5wcmVEZWZpbmVkW3RoaXMubWFza11cbiAgICAgIGNvbnN0IG1hc2sgPSBwcmVEZWZpbmVkIHx8IHRoaXMubWFzayB8fCAnJ1xuXG4gICAgICByZXR1cm4gbWFzay5zcGxpdCgnJylcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgdGhlIGN1cnNvciBpcyBpbiB0aGUgY29ycmVjdFxuICAgICAqIGxvY2F0aW9uIHdoZW4gdGhlIG1hc2sgY2hhbmdlc1xuICAgICAqL1xuICAgIG1hc2sgKCkge1xuICAgICAgaWYgKCF0aGlzLiRyZWZzLmlucHV0KSByZXR1cm5cblxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLiRyZWZzLmlucHV0LnZhbHVlXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMubWFza1RleHQodW5tYXNrVGV4dCh0aGlzLmxhenlWYWx1ZSkpXG4gICAgICBsZXQgcG9zaXRpb24gPSAwXG4gICAgICBsZXQgc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNlbGVjdGlvbjsgaW5kZXgrKykge1xuICAgICAgICBpc01hc2tEZWxpbWl0ZXIob2xkVmFsdWVbaW5kZXhdKSB8fCBwb3NpdGlvbisrXG4gICAgICB9XG5cbiAgICAgIHNlbGVjdGlvbiA9IDBcbiAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbmV3VmFsdWUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgaXNNYXNrRGVsaW1pdGVyKG5ld1ZhbHVlW2luZGV4XSkgfHwgcG9zaXRpb24tLVxuICAgICAgICAgIHNlbGVjdGlvbisrXG4gICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IDApIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmlucHV0LnZhbHVlID0gbmV3VmFsdWVcbiAgICAgICAgdGhpcy5zZXRDYXJldFBvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIGJlZm9yZU1vdW50ICgpIHtcbiAgICBpZiAoIXRoaXMubWFzayB8fFxuICAgICAgdGhpcy52YWx1ZSA9PSBudWxsIHx8XG4gICAgICAhdGhpcy5yZXR1cm5NYXNrZWRWYWx1ZVxuICAgICkgcmV0dXJuXG5cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMubWFza1RleHQodGhpcy52YWx1ZSlcblxuICAgIC8vIFNlZSBpZiBtYXNrZWQgdmFsdWUgZG9lcyBub3RcbiAgICAvLyBtYXRjaCB0aGUgdXNlciBnaXZlbiB2YWx1ZVxuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy52YWx1ZSkgcmV0dXJuXG5cbiAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHZhbHVlKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBzZXRDYXJldFBvc2l0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0aW9uXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuaW5wdXQgJiYgdGhpcy4kcmVmcy5pbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLnNlbGVjdGlvbiwgdGhpcy5zZWxlY3Rpb24pXG4gICAgICB9LCAwKVxuICAgIH0sXG4gICAgdXBkYXRlUmFuZ2UgKCkge1xuICAgICAgaWYgKCF0aGlzLiRyZWZzLmlucHV0KSByZXR1cm5cblxuICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLm1hc2tUZXh0KHRoaXMubGF6eVZhbHVlKVxuICAgICAgbGV0IHNlbGVjdGlvbiA9IDBcblxuICAgICAgdGhpcy4kcmVmcy5pbnB1dC52YWx1ZSA9IG5ld1ZhbHVlXG4gICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG5ld1ZhbHVlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGlmICh0aGlzLmxhenlTZWxlY3Rpb24gPD0gMCkgYnJlYWtcbiAgICAgICAgICBpc01hc2tEZWxpbWl0ZXIobmV3VmFsdWVbaW5kZXhdKSB8fCB0aGlzLmxhenlTZWxlY3Rpb24tLVxuICAgICAgICAgIHNlbGVjdGlvbisrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRDYXJldFBvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgIC8vIHRoaXMuJGVtaXQoKSBtdXN0IG9jY3VyIG9ubHkgd2hlbiBhbGwgaW50ZXJuYWwgdmFsdWVzIGFyZSBjb3JyZWN0XG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHRoaXMucmV0dXJuTWFza2VkVmFsdWUgPyB0aGlzLiRyZWZzLmlucHV0LnZhbHVlIDogdGhpcy5sYXp5VmFsdWUpXG4gICAgfSxcbiAgICBtYXNrVGV4dCAodGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFzayA/IG1hc2tUZXh0KHRleHQsIHRoaXMubWFza2VkLCB0aGlzLmRvbnRGaWxsTWFza0JsYW5rcykgOiB0ZXh0XG4gICAgfSxcbiAgICB1bm1hc2tUZXh0ICh0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXNrICYmICF0aGlzLnJldHVybk1hc2tlZFZhbHVlID8gdW5tYXNrVGV4dCh0ZXh0KSA6IHRleHRcbiAgICB9LFxuICAgIC8vIFdoZW4gdGhlIGlucHV0IGNoYW5nZXMgYW5kIGlzXG4gICAgLy8gcmUtY3JlYXRlZCwgZW5zdXJlIHRoYXQgdGhlXG4gICAgLy8gY2FyZXQgbG9jYXRpb24gaXMgY29ycmVjdFxuICAgIHNldFNlbGVjdGlvblJhbmdlICgpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKHRoaXMudXBkYXRlUmFuZ2UpXG4gICAgfSxcbiAgICByZXNldFNlbGVjdGlvbnMgKGlucHV0KSB7XG4gICAgICBpZiAoIWlucHV0LnNlbGVjdGlvbkVuZCkgcmV0dXJuXG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IGlucHV0LnNlbGVjdGlvbkVuZFxuICAgICAgdGhpcy5sYXp5U2VsZWN0aW9uID0gMFxuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5zZWxlY3Rpb247IGluZGV4KyspIHtcbiAgICAgICAgaXNNYXNrRGVsaW1pdGVyKGlucHV0LnZhbHVlW2luZGV4XSkgfHwgdGhpcy5sYXp5U2VsZWN0aW9uKytcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==