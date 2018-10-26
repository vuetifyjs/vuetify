import Vue from 'vue';
export function factory(prop = 'value', event = 'change') {
    return Vue.extend({
        name: 'proxyable',
        model: {
            prop,
            event
        },
        props: {
            [prop]: {
                required: false
            }
        },
        data() {
            return {
                internalLazyValue: this[prop]
            };
        },
        computed: {
            internalValue: {
                get() {
                    return this.internalLazyValue;
                },
                set(val) {
                    if (val === this.internalLazyValue)
                        return;
                    this.internalLazyValue = val;
                    this.$emit(event, val);
                }
            }
        },
        watch: {
            [prop](val) {
                this.internalLazyValue = val;
            }
        }
    });
}
/* eslint-disable-next-line no-redeclare */
const Proxyable = factory();
export default Proxyable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHlhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9wcm94eWFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUF1QixNQUFNLEtBQUssQ0FBQTtBQVN6QyxNQUFNLFVBQVUsT0FBTyxDQUNyQixJQUFJLEdBQUcsT0FBTyxFQUNkLEtBQUssR0FBRyxRQUFRO0lBRWhCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNoQixJQUFJLEVBQUUsV0FBVztRQUVqQixLQUFLLEVBQUU7WUFDTCxJQUFJO1lBQ0osS0FBSztTQUNOO1FBRUQsS0FBSyxFQUFFO1lBQ0wsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDTixRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGO1FBRUQsSUFBSTtZQUNGLE9BQU87Z0JBQ0wsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBWTthQUN6QyxDQUFBO1FBQ0gsQ0FBQztRQUVELFFBQVEsRUFBRTtZQUNSLGFBQWEsRUFBRTtnQkFDYixHQUFHO29CQUNELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFBO2dCQUMvQixDQUFDO2dCQUNELEdBQUcsQ0FBRSxHQUFRO29CQUNYLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxpQkFBaUI7d0JBQUUsT0FBTTtvQkFFMUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTtvQkFFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3hCLENBQUM7YUFDRjtTQUNGO1FBRUQsS0FBSyxFQUFFO1lBQ0wsQ0FBQyxJQUFJLENBQUMsQ0FBRSxHQUFHO2dCQUNULElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUE7WUFDOUIsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVELDJDQUEyQztBQUMzQyxNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQTtBQUUzQixlQUFlLFNBQVMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUsIHsgVnVlQ29uc3RydWN0b3IgfSBmcm9tICd2dWUnXG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuZXhwb3J0IHR5cGUgUHJveHlhYmxlPFQgZXh0ZW5kcyBzdHJpbmcgPSAndmFsdWUnPiA9IFZ1ZUNvbnN0cnVjdG9yPFZ1ZSAmIHtcbiAgaW50ZXJuYWxMYXp5VmFsdWU6IHVua25vd25cbiAgaW50ZXJuYWxWYWx1ZTogdW5rbm93blxufSAmIFJlY29yZDxULCBhbnk+PlxuXG5leHBvcnQgZnVuY3Rpb24gZmFjdG9yeTxUIGV4dGVuZHMgc3RyaW5nID0gJ3ZhbHVlJz4gKHByb3A/OiBULCBldmVudD86IHN0cmluZyk6IFByb3h5YWJsZTxUPlxuZXhwb3J0IGZ1bmN0aW9uIGZhY3RvcnkgKFxuICBwcm9wID0gJ3ZhbHVlJyxcbiAgZXZlbnQgPSAnY2hhbmdlJ1xuKSB7XG4gIHJldHVybiBWdWUuZXh0ZW5kKHtcbiAgICBuYW1lOiAncHJveHlhYmxlJyxcblxuICAgIG1vZGVsOiB7XG4gICAgICBwcm9wLFxuICAgICAgZXZlbnRcbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcbiAgICAgIFtwcm9wXToge1xuICAgICAgICByZXF1aXJlZDogZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZGF0YSAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbnRlcm5hbExhenlWYWx1ZTogdGhpc1twcm9wXSBhcyB1bmtub3duXG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBpbnRlcm5hbFZhbHVlOiB7XG4gICAgICAgIGdldCAoKTogdW5rbm93biB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxMYXp5VmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgc2V0ICh2YWw6IGFueSkge1xuICAgICAgICAgIGlmICh2YWwgPT09IHRoaXMuaW50ZXJuYWxMYXp5VmFsdWUpIHJldHVyblxuXG4gICAgICAgICAgdGhpcy5pbnRlcm5hbExhenlWYWx1ZSA9IHZhbFxuXG4gICAgICAgICAgdGhpcy4kZW1pdChldmVudCwgdmFsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG4gICAgICBbcHJvcF0gKHZhbCkge1xuICAgICAgICB0aGlzLmludGVybmFsTGF6eVZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlICovXG5jb25zdCBQcm94eWFibGUgPSBmYWN0b3J5KClcblxuZXhwb3J0IGRlZmF1bHQgUHJveHlhYmxlXG4iXX0=