// Styles
import '../../stylus/components/_item-group.styl';
import Proxyable from '../../mixins/proxyable';
import Themeable from '../../mixins/themeable';
// Utilities
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
export const BaseItemGroup = mixins(Proxyable, Themeable).extend({
    name: 'base-item-group',
    props: {
        activeClass: {
            type: String,
            default: 'v-item--active'
        },
        mandatory: Boolean,
        max: {
            type: [Number, String],
            default: null
        },
        multiple: Boolean
    },
    data() {
        return {
            // As long as a value is defined, show it
            // Otherwise, check if multiple
            // to determine which default to provide
            internalLazyValue: this.value !== undefined
                ? this.value
                : this.multiple ? [] : undefined,
            items: []
        };
    },
    computed: {
        classes() {
            return {
                ...this.themeClasses
            };
        },
        selectedItems() {
            return this.items.filter((item, index) => {
                return this.toggleMethod(this.getValue(item, index));
            });
        },
        selectedValues() {
            return Array.isArray(this.internalValue)
                ? this.internalValue
                : [this.internalValue];
        },
        toggleMethod() {
            if (!this.multiple) {
                return (v) => this.internalValue === v;
            }
            const internalValue = this.internalValue;
            if (Array.isArray(internalValue)) {
                return (v) => internalValue.includes(v);
            }
            return () => false;
        }
    },
    watch: {
        internalValue() {
            // https://github.com/vuetifyjs/vuetify/issues/5352
            this.$nextTick(this.updateItemsState);
        }
    },
    created() {
        if (this.multiple && !Array.isArray(this.internalValue)) {
            consoleWarn('Model must be bound to an array if the multiple property is true.', this);
        }
    },
    methods: {
        getValue(item, i) {
            return item.value == null || item.value === ''
                ? i
                : item.value;
        },
        onClick(item, index) {
            this.updateInternalValue(this.getValue(item, index));
        },
        register(item) {
            const index = this.items.push(item) - 1;
            item.$on('change', () => this.onClick(item, index));
            // If no value provided and mandatory,
            // assign first registered item
            if (this.mandatory && this.internalLazyValue == null) {
                this.updateMandatory();
            }
            this.updateItem(item, index);
        },
        unregister(item) {
            if (this._isDestroyed)
                return;
            const index = this.items.indexOf(item);
            const value = this.getValue(item, index);
            this.items.splice(index, 1);
            const valueIndex = this.selectedValues.indexOf(value);
            // Items is not selected, do nothing
            if (valueIndex < 0)
                return;
            // If not mandatory, use regular update process
            if (!this.mandatory) {
                return this.updateInternalValue(value);
            }
            // Remove the value
            if (this.multiple && Array.isArray(this.internalValue)) {
                this.internalValue = this.internalValue.filter(v => v !== value);
            }
            else {
                this.internalValue = undefined;
            }
            // If mandatory and we have no selection
            // add the last item as value
            /* istanbul ignore else */
            if (!this.selectedItems.length) {
                this.updateMandatory(true);
            }
        },
        updateItem(item, index) {
            const value = this.getValue(item, index);
            item.isActive = this.toggleMethod(value);
        },
        updateItemsState() {
            if (this.mandatory &&
                !this.selectedItems.length) {
                return this.updateMandatory();
            }
            // TODO: Make this smarter so it
            // doesn't have to iterate every
            // child in an update
            this.items.forEach(this.updateItem);
        },
        updateInternalValue(value) {
            this.multiple
                ? this.updateMultiple(value)
                : this.updateSingle(value);
        },
        updateMandatory(last) {
            if (!this.items.length)
                return;
            const index = last ? this.items.length - 1 : 0;
            this.updateInternalValue(this.getValue(this.items[index], index));
        },
        updateMultiple(value) {
            const defaultValue = Array.isArray(this.internalValue)
                ? this.internalValue
                : [];
            const internalValue = defaultValue.slice();
            const index = internalValue.findIndex(val => val === value);
            if (this.mandatory &&
                // Item already exists
                index > -1 &&
                // value would be reduced below min
                internalValue.length - 1 < 1)
                return;
            if (
            // Max is set
            this.max != null &&
                // Item doesn't exist
                index < 0 &&
                // value woudl be increased above max
                internalValue.length + 1 > this.max)
                return;
            index > -1
                ? internalValue.splice(index, 1)
                : internalValue.push(value);
            this.internalValue = internalValue;
        },
        updateSingle(value) {
            const isSame = value === this.internalValue;
            if (this.mandatory && isSame)
                return;
            this.internalValue = isSame ? undefined : value;
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-item-group',
            class: this.classes
        }, this.$slots.default);
    }
});
export default BaseItemGroup.extend({
    name: 'v-item-group',
    provide() {
        return {
            itemGroup: this
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkl0ZW1Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZJdGVtR3JvdXAvVkl0ZW1Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTywwQ0FBMEMsQ0FBQTtBQUlqRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxZQUFZO0FBQ1osT0FBTyxNQUFNLE1BQU0sbUJBQW1CLENBQUE7QUFDdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBT2hELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQ2pDLFNBQVMsRUFDVCxTQUFTLENBQ1YsQ0FBQyxNQUFNLENBQUM7SUFDUCxJQUFJLEVBQUUsaUJBQWlCO0lBRXZCLEtBQUssRUFBRTtRQUNMLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGdCQUFnQjtTQUMxQjtRQUNELFNBQVMsRUFBRSxPQUFPO1FBQ2xCLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFFBQVEsRUFBRSxPQUFPO0tBQ2xCO0lBRUQsSUFBSTtRQUNGLE9BQU87WUFDTCx5Q0FBeUM7WUFDekMsK0JBQStCO1lBQy9CLHdDQUF3QztZQUN4QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFDWixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ2xDLEtBQUssRUFBRSxFQUF5QjtTQUNqQyxDQUFBO0lBQ0gsQ0FBQztJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87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QUVGLGVBQWUsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxJQUFJLEVBQUUsY0FBYztJQUVwQixPQUFPO1FBQ0wsT0FBTztZQUNMLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19pdGVtLWdyb3VwLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IEdyb3VwYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvZ3JvdXBhYmxlJ1xuaW1wb3J0IFByb3h5YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcHJveHlhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5pbXBvcnQgeyBjb25zb2xlV2FybiB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlIH0gZnJvbSAndnVlL3R5cGVzJ1xuXG50eXBlIEdyb3VwYWJsZUluc3RhbmNlID0gSW5zdGFuY2VUeXBlPHR5cGVvZiBHcm91cGFibGU+ICYgeyB2YWx1ZT86IGFueSB9XG5cbmV4cG9ydCBjb25zdCBCYXNlSXRlbUdyb3VwID0gbWl4aW5zKFxuICBQcm94eWFibGUsXG4gIFRoZW1lYWJsZVxuKS5leHRlbmQoe1xuICBuYW1lOiAnYmFzZS1pdGVtLWdyb3VwJyxcblxuICBwcm9wczoge1xuICAgIGFjdGl2ZUNsYXNzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndi1pdGVtLS1hY3RpdmUnXG4gICAgfSxcbiAgICBtYW5kYXRvcnk6IEJvb2xlYW4sXG4gICAgbWF4OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgbXVsdGlwbGU6IEJvb2xlYW5cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gQXMgbG9uZyBhcyBhIHZhbHVlIGlzIGRlZmluZWQsIHNob3cgaXRcbiAgICAgIC8vIE90aGVyd2lzZSwgY2hlY2sgaWYgbXVsdGlwbGVcbiAgICAgIC8vIHRvIGRldGVybWluZSB3aGljaCBkZWZhdWx0IHRvIHByb3ZpZGVcbiAgICAgIGludGVybmFsTGF6eVZhbHVlOiB0aGlzLnZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyB0aGlzLnZhbHVlXG4gICAgICAgIDogdGhpcy5tdWx0aXBsZSA/IFtdIDogdW5kZWZpbmVkLFxuICAgICAgaXRlbXM6IFtdIGFzIEdyb3VwYWJsZUluc3RhbmNlW11cbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpOiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0ZWRJdGVtcyAoKTogR3JvdXBhYmxlSW5zdGFuY2VbXSB7XG4gICAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvZ2dsZU1ldGhvZCh0aGlzLmdldFZhbHVlKGl0ZW0sIGluZGV4KSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzZWxlY3RlZFZhbHVlcyAoKTogYW55W10ge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5pbnRlcm5hbFZhbHVlKVxuICAgICAgICA/IHRoaXMuaW50ZXJuYWxWYWx1ZVxuICAgICAgICA6IFt0aGlzLmludGVybmFsVmFsdWVdXG4gICAgfSxcbiAgICB0b2dnbGVNZXRob2QgKCk6ICh2OiBhbnkpID0+IGJvb2xlYW4ge1xuICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHJldHVybiAodjogYW55KSA9PiB0aGlzLmludGVybmFsVmFsdWUgPT09IHZcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW50ZXJuYWxWYWx1ZSA9IHRoaXMuaW50ZXJuYWxWYWx1ZVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaW50ZXJuYWxWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICh2OiBhbnkpID0+IGludGVybmFsVmFsdWUuaW5jbHVkZXModilcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgpID0+IGZhbHNlXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaW50ZXJuYWxWYWx1ZSAoKSB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdnVldGlmeWpzL3Z1ZXRpZnkvaXNzdWVzLzUzNTJcbiAgICAgIHRoaXMuJG5leHRUaWNrKHRoaXMudXBkYXRlSXRlbXNTdGF0ZSlcbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZCAoKSB7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgIUFycmF5LmlzQXJyYXkodGhpcy5pbnRlcm5hbFZhbHVlKSkge1xuICAgICAgY29uc29sZVdhcm4oJ01vZGVsIG11c3QgYmUgYm91bmQgdG8gYW4gYXJyYXkgaWYgdGhlIG11bHRpcGxlIHByb3BlcnR5IGlzIHRydWUuJywgdGhpcylcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdldFZhbHVlIChpdGVtOiBHcm91cGFibGVJbnN0YW5jZSwgaTogbnVtYmVyKTogdW5rbm93biB7XG4gICAgICByZXR1cm4gaXRlbS52YWx1ZSA9PSBudWxsIHx8IGl0ZW0udmFsdWUgPT09ICcnXG4gICAgICAgID8gaVxuICAgICAgICA6IGl0ZW0udmFsdWVcbiAgICB9LFxuICAgIG9uQ2xpY2sgKGl0ZW06IEdyb3VwYWJsZUluc3RhbmNlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZUludGVybmFsVmFsdWUoXG4gICAgICAgIHRoaXMuZ2V0VmFsdWUoaXRlbSwgaW5kZXgpXG4gICAgICApXG4gICAgfSxcbiAgICByZWdpc3RlciAoaXRlbTogR3JvdXBhYmxlSW5zdGFuY2UpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtcy5wdXNoKGl0ZW0pIC0gMVxuXG4gICAgICBpdGVtLiRvbignY2hhbmdlJywgKCkgPT4gdGhpcy5vbkNsaWNrKGl0ZW0sIGluZGV4KSlcblxuICAgICAgLy8gSWYgbm8gdmFsdWUgcHJvdmlkZWQgYW5kIG1hbmRhdG9yeSxcbiAgICAgIC8vIGFzc2lnbiBmaXJzdCByZWdpc3RlcmVkIGl0ZW1cbiAgICAgIGlmICh0aGlzLm1hbmRhdG9yeSAmJiB0aGlzLmludGVybmFsTGF6eVZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVNYW5kYXRvcnkoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnVwZGF0ZUl0ZW0oaXRlbSwgaW5kZXgpXG4gICAgfSxcbiAgICB1bnJlZ2lzdGVyIChpdGVtOiBHcm91cGFibGVJbnN0YW5jZSkge1xuICAgICAgaWYgKHRoaXMuX2lzRGVzdHJveWVkKSByZXR1cm5cblxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSlcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZShpdGVtLCBpbmRleClcblxuICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICAgIGNvbnN0IHZhbHVlSW5kZXggPSB0aGlzLnNlbGVjdGVkVmFsdWVzLmluZGV4T2YodmFsdWUpXG5cbiAgICAgIC8vIEl0ZW1zIGlzIG5vdCBzZWxlY3RlZCwgZG8gbm90aGluZ1xuICAgICAgaWYgKHZhbHVlSW5kZXggPCAwKSByZXR1cm5cblxuICAgICAgLy8gSWYgbm90IG1hbmRhdG9yeSwgdXNlIHJlZ3VsYXIgdXBkYXRlIHByb2Nlc3NcbiAgICAgIGlmICghdGhpcy5tYW5kYXRvcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlSW50ZXJuYWxWYWx1ZSh2YWx1ZSlcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIHRoZSB2YWx1ZVxuICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmludGVybmFsVmFsdWUpKSB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHRoaXMuaW50ZXJuYWxWYWx1ZS5maWx0ZXIodiA9PiB2ICE9PSB2YWx1ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICAvLyBJZiBtYW5kYXRvcnkgYW5kIHdlIGhhdmUgbm8gc2VsZWN0aW9uXG4gICAgICAvLyBhZGQgdGhlIGxhc3QgaXRlbSBhcyB2YWx1ZVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmICghdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnVwZGF0ZU1hbmRhdG9yeSh0cnVlKVxuICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlSXRlbSAoaXRlbTogR3JvdXBhYmxlSW5zdGFuY2UsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZShpdGVtLCBpbmRleClcblxuICAgICAgaXRlbS5pc0FjdGl2ZSA9IHRoaXMudG9nZ2xlTWV0aG9kKHZhbHVlKVxuICAgIH0sXG4gICAgdXBkYXRlSXRlbXNTdGF0ZSAoKSB7XG4gICAgICBpZiAodGhpcy5tYW5kYXRvcnkgJiZcbiAgICAgICAgIXRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVNYW5kYXRvcnkoKVxuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiBNYWtlIHRoaXMgc21hcnRlciBzbyBpdFxuICAgICAgLy8gZG9lc24ndCBoYXZlIHRvIGl0ZXJhdGUgZXZlcnlcbiAgICAgIC8vIGNoaWxkIGluIGFuIHVwZGF0ZVxuICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKHRoaXMudXBkYXRlSXRlbSlcbiAgICB9LFxuICAgIHVwZGF0ZUludGVybmFsVmFsdWUgKHZhbHVlOiBhbnkpIHtcbiAgICAgIHRoaXMubXVsdGlwbGVcbiAgICAgICAgPyB0aGlzLnVwZGF0ZU11bHRpcGxlKHZhbHVlKVxuICAgICAgICA6IHRoaXMudXBkYXRlU2luZ2xlKHZhbHVlKVxuICAgIH0sXG4gICAgdXBkYXRlTWFuZGF0b3J5IChsYXN0PzogYm9vbGVhbikge1xuICAgICAgaWYgKCF0aGlzLml0ZW1zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGluZGV4ID0gbGFzdCA/IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSA6IDBcblxuICAgICAgdGhpcy51cGRhdGVJbnRlcm5hbFZhbHVlKFxuICAgICAgICB0aGlzLmdldFZhbHVlKHRoaXMuaXRlbXNbaW5kZXhdLCBpbmRleClcbiAgICAgIClcbiAgICB9LFxuICAgIHVwZGF0ZU11bHRpcGxlICh2YWx1ZTogYW55KSB7XG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBBcnJheS5pc0FycmF5KHRoaXMuaW50ZXJuYWxWYWx1ZSlcbiAgICAgICAgPyB0aGlzLmludGVybmFsVmFsdWVcbiAgICAgICAgOiBbXVxuICAgICAgY29uc3QgaW50ZXJuYWxWYWx1ZSA9IGRlZmF1bHRWYWx1ZS5zbGljZSgpXG4gICAgICBjb25zdCBpbmRleCA9IGludGVybmFsVmFsdWUuZmluZEluZGV4KHZhbCA9PiB2YWwgPT09IHZhbHVlKVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMubWFuZGF0b3J5ICYmXG4gICAgICAgIC8vIEl0ZW0gYWxyZWFkeSBleGlzdHNcbiAgICAgICAgaW5kZXggPiAtMSAmJlxuICAgICAgICAvLyB2YWx1ZSB3b3VsZCBiZSByZWR1Y2VkIGJlbG93IG1pblxuICAgICAgICBpbnRlcm5hbFZhbHVlLmxlbmd0aCAtIDEgPCAxXG4gICAgICApIHJldHVyblxuXG4gICAgICBpZiAoXG4gICAgICAgIC8vIE1heCBpcyBzZXRcbiAgICAgICAgdGhpcy5tYXggIT0gbnVsbCAmJlxuICAgICAgICAvLyBJdGVtIGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgaW5kZXggPCAwICYmXG4gICAgICAgIC8vIHZhbHVlIHdvdWRsIGJlIGluY3JlYXNlZCBhYm92ZSBtYXhcbiAgICAgICAgaW50ZXJuYWxWYWx1ZS5sZW5ndGggKyAxID4gdGhpcy5tYXhcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGluZGV4ID4gLTFcbiAgICAgICAgPyBpbnRlcm5hbFZhbHVlLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgOiBpbnRlcm5hbFZhbHVlLnB1c2godmFsdWUpXG5cbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IGludGVybmFsVmFsdWVcbiAgICB9LFxuICAgIHVwZGF0ZVNpbmdsZSAodmFsdWU6IGFueSkge1xuICAgICAgY29uc3QgaXNTYW1lID0gdmFsdWUgPT09IHRoaXMuaW50ZXJuYWxWYWx1ZVxuXG4gICAgICBpZiAodGhpcy5tYW5kYXRvcnkgJiYgaXNTYW1lKSByZXR1cm5cblxuICAgICAgdGhpcy5pbnRlcm5hbFZhbHVlID0gaXNTYW1lID8gdW5kZWZpbmVkIDogdmFsdWVcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKTogVk5vZGUge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtaXRlbS1ncm91cCcsXG4gICAgICBjbGFzczogdGhpcy5jbGFzc2VzXG4gICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQmFzZUl0ZW1Hcm91cC5leHRlbmQoe1xuICBuYW1lOiAndi1pdGVtLWdyb3VwJyxcblxuICBwcm92aWRlICgpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtR3JvdXA6IHRoaXNcbiAgICB9XG4gIH1cbn0pXG4iXX0=