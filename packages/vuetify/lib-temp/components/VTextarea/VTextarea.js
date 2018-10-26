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
            validator: v => !isNaN(parseFloat(v))
        },
        rows: {
            type: [Number, String],
            default: 5,
            validator: v => !isNaN(parseInt(v, 10))
        }
    },
    computed: {
        classes() {
            return {
                'v-textarea': true,
                'v-textarea--auto-grow': this.autoGrow,
                'v-textarea--no-resize': this.noResizeHandle,
                ...VTextField.computed.classes.call(this, null)
            };
        },
        dynamicHeight() {
            return this.autoGrow
                ? this.inputHeight
                : 'auto';
        },
        isEnclosed() {
            return this.textarea ||
                VTextField.computed.isEnclosed.call(this);
        },
        noResizeHandle() {
            return this.noResize || this.autoGrow;
        }
    },
    watch: {
        lazyValue() {
            !this.internalChange && this.autoGrow && this.$nextTick(this.calculateInputHeight);
        }
    },
    mounted() {
        setTimeout(() => {
            this.autoGrow && this.calculateInputHeight();
        }, 0);
        // TODO: remove (2.0)
        if (this.autoGrow && this.noResize) {
            consoleInfo('"no-resize" is now implied when using "auto-grow", and can be removed', this);
        }
    },
    methods: {
        calculateInputHeight() {
            const input = this.$refs.input;
            if (input) {
                input.style.height = 0;
                const height = input.scrollHeight;
                const minHeight = parseInt(this.rows, 10) * parseFloat(this.rowHeight);
                // This has to be done ASAP, waiting for Vue
                // to update the DOM causes ugly layout jumping
                input.style.height = Math.max(minHeight, height) + 'px';
            }
        },
        genInput() {
            const input = VTextField.methods.genInput.call(this);
            input.tag = 'textarea';
            delete input.data.attrs.type;
            input.data.attrs.rows = this.rows;
            return input;
        },
        onInput(e) {
            VTextField.methods.onInput.call(this, e);
            this.autoGrow && this.calculateInputHeight();
        },
        onKeyDown(e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRleHRhcmVhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlRleHRhcmVhL1ZUZXh0YXJlYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx3Q0FBd0MsQ0FBQTtBQUUvQyxhQUFhO0FBQ2IsT0FBTyxVQUFVLE1BQU0sMEJBQTBCLENBQUE7QUFFakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRWhELG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFlBQVk7SUFFbEIsT0FBTyxFQUFFLFVBQVU7SUFFbkIsS0FBSyxFQUFFO1FBQ0wsUUFBUSxFQUFFLE9BQU87UUFDakIsUUFBUSxFQUFFLE9BQU87UUFDakIsT0FBTyxFQUFFLE9BQU87UUFDaEIsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3RDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUM1QyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FB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QUMxQixDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL190ZXh0YXJlYS5zdHlsJ1xuXG4vLyBFeHRlbnNpb25zXG5pbXBvcnQgVlRleHRGaWVsZCBmcm9tICcuLi9WVGV4dEZpZWxkL1ZUZXh0RmllbGQnXG5cbmltcG9ydCB7IGNvbnNvbGVJbmZvIH0gZnJvbSAnLi4vLi4vdXRpbC9jb25zb2xlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi10ZXh0YXJlYScsXG5cbiAgZXh0ZW5kczogVlRleHRGaWVsZCxcblxuICBwcm9wczoge1xuICAgIGF1dG9Hcm93OiBCb29sZWFuLFxuICAgIG5vUmVzaXplOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgcm93SGVpZ2h0OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMjQsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gIWlzTmFOKHBhcnNlRmxvYXQodikpXG4gICAgfSxcbiAgICByb3dzOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogNSxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiAhaXNOYU4ocGFyc2VJbnQodiwgMTApKVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3YtdGV4dGFyZWEnOiB0cnVlLFxuICAgICAgICAndi10ZXh0YXJlYS0tYXV0by1ncm93JzogdGhpcy5hdXRvR3JvdyxcbiAgICAgICAgJ3YtdGV4dGFyZWEtLW5vLXJlc2l6ZSc6IHRoaXMubm9SZXNpemVIYW5kbGUsXG4gICAgICAgIC4uLlZUZXh0RmllbGQuY29tcHV0ZWQuY2xhc3Nlcy5jYWxsKHRoaXMsIG51bGwpXG4gICAgICB9XG4gICAgfSxcbiAgICBkeW5hbWljSGVpZ2h0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmF1dG9Hcm93XG4gICAgICAgID8gdGhpcy5pbnB1dEhlaWdodFxuICAgICAgICA6ICdhdXRvJ1xuICAgIH0sXG4gICAgaXNFbmNsb3NlZCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0YXJlYSB8fFxuICAgICAgICBWVGV4dEZpZWxkLmNvbXB1dGVkLmlzRW5jbG9zZWQuY2FsbCh0aGlzKVxuICAgIH0sXG4gICAgbm9SZXNpemVIYW5kbGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9SZXNpemUgfHwgdGhpcy5hdXRvR3Jvd1xuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGxhenlWYWx1ZSAoKSB7XG4gICAgICAhdGhpcy5pbnRlcm5hbENoYW5nZSAmJiB0aGlzLmF1dG9Hcm93ICYmIHRoaXMuJG5leHRUaWNrKHRoaXMuY2FsY3VsYXRlSW5wdXRIZWlnaHQpXG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvR3JvdyAmJiB0aGlzLmNhbGN1bGF0ZUlucHV0SGVpZ2h0KClcbiAgICB9LCAwKVxuXG4gICAgLy8gVE9ETzogcmVtb3ZlICgyLjApXG4gICAgaWYgKHRoaXMuYXV0b0dyb3cgJiYgdGhpcy5ub1Jlc2l6ZSkge1xuICAgICAgY29uc29sZUluZm8oJ1wibm8tcmVzaXplXCIgaXMgbm93IGltcGxpZWQgd2hlbiB1c2luZyBcImF1dG8tZ3Jvd1wiLCBhbmQgY2FuIGJlIHJlbW92ZWQnLCB0aGlzKVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgY2FsY3VsYXRlSW5wdXRIZWlnaHQgKCkge1xuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLiRyZWZzLmlucHV0XG4gICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgaW5wdXQuc3R5bGUuaGVpZ2h0ID0gMFxuICAgICAgICBjb25zdCBoZWlnaHQgPSBpbnB1dC5zY3JvbGxIZWlnaHRcbiAgICAgICAgY29uc3QgbWluSGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5yb3dzLCAxMCkgKiBwYXJzZUZsb2F0KHRoaXMucm93SGVpZ2h0KVxuICAgICAgICAvLyBUaGlzIGhhcyB0byBiZSBkb25lIEFTQVAsIHdhaXRpbmcgZm9yIFZ1ZVxuICAgICAgICAvLyB0byB1cGRhdGUgdGhlIERPTSBjYXVzZXMgdWdseSBsYXlvdXQganVtcGluZ1xuICAgICAgICBpbnB1dC5zdHlsZS5oZWlnaHQgPSBNYXRoLm1heChtaW5IZWlnaHQsIGhlaWdodCkgKyAncHgnXG4gICAgICB9XG4gICAgfSxcbiAgICBnZW5JbnB1dCAoKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IFZUZXh0RmllbGQubWV0aG9kcy5nZW5JbnB1dC5jYWxsKHRoaXMpXG5cbiAgICAgIGlucHV0LnRhZyA9ICd0ZXh0YXJlYSdcbiAgICAgIGRlbGV0ZSBpbnB1dC5kYXRhLmF0dHJzLnR5cGVcbiAgICAgIGlucHV0LmRhdGEuYXR0cnMucm93cyA9IHRoaXMucm93c1xuXG4gICAgICByZXR1cm4gaW5wdXRcbiAgICB9LFxuICAgIG9uSW5wdXQgKGUpIHtcbiAgICAgIFZUZXh0RmllbGQubWV0aG9kcy5vbklucHV0LmNhbGwodGhpcywgZSlcbiAgICAgIHRoaXMuYXV0b0dyb3cgJiYgdGhpcy5jYWxjdWxhdGVJbnB1dEhlaWdodCgpXG4gICAgfSxcbiAgICBvbktleURvd24gKGUpIHtcbiAgICAgIC8vIFByZXZlbnRzIGNsb3Npbmcgb2YgYVxuICAgICAgLy8gZGlhbG9nIHdoZW4gcHJlc3NpbmdcbiAgICAgIC8vIGVudGVyXG4gICAgICBpZiAodGhpcy5pc0ZvY3VzZWQgJiZcbiAgICAgICAgZS5rZXlDb2RlID09PSAxM1xuICAgICAgKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbnRlcm5hbENoYW5nZSA9IHRydWVcbiAgICAgIHRoaXMuJGVtaXQoJ2tleWRvd24nLCBlKVxuICAgIH1cbiAgfVxufVxuIl19