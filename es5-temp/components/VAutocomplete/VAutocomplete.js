// Styles
import '../../stylus/components/_autocompletes.styl';
// Extensions
import VSelect from '../VSelect/VSelect';
import VTextField from '../VTextField/VTextField';
// Utils
import { keyCodes } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-autocomplete',
    extends: VSelect,
    props: {
        allowOverflow: {
            type: Boolean,
            default: true
        },
        browserAutocomplete: {
            type: String,
            default: 'off'
        },
        filter: {
            type: Function,
            default: (item, queryText, itemText) => {
                const hasValue = val => val != null ? val : '';
                const text = hasValue(itemText);
                const query = hasValue(queryText);
                return text.toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase()) > -1;
            }
        },
        hideNoData: Boolean,
        noFilter: Boolean,
        offsetY: {
            type: Boolean,
            default: true
        },
        offsetOverflow: {
            type: Boolean,
            default: true
        },
        searchInput: {
            default: undefined
        },
        transition: {
            type: [Boolean, String],
            default: false
        }
    },
    data: vm => ({
        attrsInput: null,
        lazySearch: vm.searchInput
    }),
    computed: {
        classes() {
            return Object.assign({}, VSelect.computed.classes.call(this), {
                'v-autocomplete': true,
                'v-autocomplete--is-selecting-index': this.selectedIndex > -1
            });
        },
        computedItems() {
            return this.filteredItems;
        },
        displayedItemsCount() {
            return this.hideSelected
                ? this.filteredItems.length - this.selectedItems.length
                : this.filteredItems.length;
        },
        /**
         * The range of the current input text
         *
         * @return {Number}
         */
        currentRange() {
            if (this.selectedItem == null)
                return 0;
            return this.getText(this.selectedItem).toString().length;
        },
        filteredItems() {
            if (!this.isSearching || this.noFilter)
                return this.allItems;
            return this.allItems.filter(i => this.filter(i, this.internalSearch, this.getText(i)));
        },
        internalSearch: {
            get() {
                return this.lazySearch;
            },
            set(val) {
                this.lazySearch = val;
                this.$emit('update:searchInput', val);
            }
        },
        isAnyValueAllowed() {
            return false;
        },
        isDirty() {
            return this.searchIsDirty || this.selectedItems.length > 0;
        },
        isSearching() {
            if (this.multiple)
                return this.searchIsDirty;
            return (this.searchIsDirty &&
                this.internalSearch !== this.getText(this.selectedItem));
        },
        menuCanShow() {
            if (!this.isFocused)
                return false;
            return (this.displayedItemsCount > 0) || !this.hideNoData;
        },
        menuProps() {
            return Object.assign(VSelect.computed.menuProps.call(this), {
                contentClass: (`v-autocomplete__content ${this.contentClass || ''}`).trim(),
                value: this.menuCanShow && this.isMenuActive
            });
        },
        searchIsDirty() {
            return this.internalSearch != null &&
                this.internalSearch !== '';
        },
        selectedItem() {
            if (this.multiple)
                return null;
            return this.selectedItems.find(i => {
                return this.valueComparator(this.getValue(i), this.getValue(this.internalValue));
            });
        },
        listData() {
            const data = VSelect.computed.listData.call(this);
            Object.assign(data.props, {
                items: this.virtualizedItems,
                noFilter: (this.noFilter ||
                    !this.isSearching ||
                    !this.filteredItems.length),
                searchInput: this.internalSearch
            });
            return data;
        }
    },
    watch: {
        filteredItems(val) {
            this.onFilteredItemsChanged(val);
        },
        internalValue() {
            this.setSearch();
        },
        isFocused(val) {
            if (val) {
                this.$refs.input &&
                    this.$refs.input.select();
            }
            else {
                this.updateSelf();
            }
        },
        isMenuActive(val) {
            if (val || !this.hasSlot)
                return;
            this.lazySearch = null;
        },
        items(val) {
            // If we are focused, the menu
            // is not active and items change
            // User is probably async loading
            // items, try to activate the menu
            if (this.isFocused &&
                !this.isMenuActive &&
                val.length)
                this.activateMenu();
        },
        searchInput(val) {
            this.lazySearch = val;
        },
        internalSearch(val) {
            this.onInternalSearchChanged(val);
        }
    },
    created() {
        this.setSearch();
    },
    methods: {
        onFilteredItemsChanged(val) {
            this.setMenuIndex(-1);
            this.$nextTick(() => {
                this.setMenuIndex(val.length === 1 ? 0 : -1);
            });
        },
        onInternalSearchChanged(val) {
            this.updateMenuDimensions();
        },
        activateMenu() {
            if (this.menuCanShow) {
                this.isMenuActive = true;
            }
        },
        updateMenuDimensions() {
            if (this.isMenuActive &&
                this.$refs.menu) {
                this.$refs.menu.updateDimensions();
            }
        },
        changeSelectedIndex(keyCode) {
            // Do not allow changing of selectedIndex
            // when search is dirty
            if (this.searchIsDirty)
                return;
            if (![
                keyCodes.backspace,
                keyCodes.left,
                keyCodes.right,
                keyCodes.delete
            ].includes(keyCode))
                return;
            const indexes = this.selectedItems.length - 1;
            if (keyCode === keyCodes.left) {
                this.selectedIndex = this.selectedIndex === -1
                    ? indexes
                    : this.selectedIndex - 1;
            }
            else if (keyCode === keyCodes.right) {
                this.selectedIndex = this.selectedIndex >= indexes
                    ? -1
                    : this.selectedIndex + 1;
            }
            else if (this.selectedIndex === -1) {
                this.selectedIndex = indexes;
                return;
            }
            const currentItem = this.selectedItems[this.selectedIndex];
            if ([
                keyCodes.backspace,
                keyCodes.delete
            ].includes(keyCode) &&
                !this.getDisabled(currentItem)) {
                const newIndex = this.selectedIndex === indexes
                    ? this.selectedIndex - 1
                    : this.selectedItems[this.selectedIndex + 1]
                        ? this.selectedIndex
                        : -1;
                if (newIndex === -1) {
                    this.internalValue = this.multiple ? [] : undefined;
                }
                else {
                    this.selectItem(currentItem);
                }
                this.selectedIndex = newIndex;
            }
        },
        clearableCallback() {
            this.internalSearch = undefined;
            VSelect.methods.clearableCallback.call(this);
        },
        genInput() {
            const input = VTextField.methods.genInput.call(this);
            input.data.attrs.role = 'combobox';
            input.data.domProps.value = this.internalSearch;
            return input;
        },
        genSelections() {
            return this.hasSlot || this.multiple
                ? VSelect.methods.genSelections.call(this)
                : [];
        },
        onClick() {
            if (this.isDisabled)
                return;
            this.selectedIndex > -1
                ? (this.selectedIndex = -1)
                : this.onFocus();
            this.activateMenu();
        },
        onEnterDown() {
            // Avoid invoking this method
            // will cause updateSelf to
            // be called emptying search
        },
        onInput(e) {
            if (this.selectedIndex > -1)
                return;
            // If typing and menu is not currently active
            if (e.target.value) {
                this.activateMenu();
                if (!this.isAnyValueAllowed)
                    this.setMenuIndex(0);
            }
            this.mask && this.resetSelections(e.target);
            this.internalSearch = e.target.value;
            this.badInput = e.target.validity && e.target.validity.badInput;
        },
        onKeyDown(e) {
            const keyCode = e.keyCode;
            VSelect.methods.onKeyDown.call(this, e);
            // The ordering is important here
            // allows new value to be updated
            // and then moves the index to the
            // proper location
            this.changeSelectedIndex(keyCode);
        },
        onTabDown(e) {
            VSelect.methods.onTabDown.call(this, e);
            this.updateSelf();
        },
        selectItem(item) {
            VSelect.methods.selectItem.call(this, item);
            this.setSearch();
        },
        setSelectedItems() {
            VSelect.methods.setSelectedItems.call(this);
            // #4273 Don't replace if searching
            // #4403 Don't replace if focused
            if (!this.isFocused)
                this.setSearch();
        },
        setSearch() {
            // Wait for nextTick so selectedItem
            // has had time to update
            this.$nextTick(() => {
                this.internalSearch = (!this.selectedItem ||
                    this.multiple ||
                    this.hasSlot)
                    ? null
                    : this.getText(this.selectedItem);
            });
        },
        setValue() {
            this.internalValue = this.internalSearch;
            this.$emit('change', this.internalSearch);
        },
        updateSelf() {
            this.updateAutocomplete();
        },
        updateAutocomplete() {
            if (!this.searchIsDirty &&
                !this.internalValue)
                return;
            if (!this.valueComparator(this.internalSearch, this.getValue(this.internalValue))) {
                this.setSearch();
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkF1dG9jb21wbGV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZBdXRvY29tcGxldGUvVkF1dG9jb21wbGV0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyw2Q0FBNkMsQ0FBQTtBQUVwRCxhQUFhO0FBQ2IsT0FBTyxPQUFPLE1BQU0sb0JBQW9CLENBQUE7QUFDeEMsT0FBTyxVQUFVLE1BQU0sMEJBQTBCLENBQUE7QUFFakQsUUFBUTtBQUNSLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU3QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxnQkFBZ0I7SUFFdEIsT0FBTyxFQUFFLE9BQU87SUFFaEIsS0FBSyxFQUFFO1FBQ0wsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsbUJBQW1CLEVBQUU7WUFDbkIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO2dCQUU5QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQy9CLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFFakMsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFO3FCQUNuQixXQUFXLEVBQUU7cUJBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUs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LGtCQUFrQjtZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQ3JCLENBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQ25CLE9BQU07WUFFUixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FDdkIsSUFBSSxDQUFDLGNBQWMsRUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO2FBQ2pCO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fYXV0b2NvbXBsZXRlcy5zdHlsJ1xuXG4vLyBFeHRlbnNpb25zXG5pbXBvcnQgVlNlbGVjdCBmcm9tICcuLi9WU2VsZWN0L1ZTZWxlY3QnXG5pbXBvcnQgVlRleHRGaWVsZCBmcm9tICcuLi9WVGV4dEZpZWxkL1ZUZXh0RmllbGQnXG5cbi8vIFV0aWxzXG5pbXBvcnQgeyBrZXlDb2RlcyB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtYXV0b2NvbXBsZXRlJyxcblxuICBleHRlbmRzOiBWU2VsZWN0LFxuXG4gIHByb3BzOiB7XG4gICAgYWxsb3dPdmVyZmxvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGJyb3dzZXJBdXRvY29tcGxldGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdvZmYnXG4gICAgfSxcbiAgICBmaWx0ZXI6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogKGl0ZW0sIHF1ZXJ5VGV4dCwgaXRlbVRleHQpID0+IHtcbiAgICAgICAgY29uc3QgaGFzVmFsdWUgPSB2YWwgPT4gdmFsICE9IG51bGwgPyB2YWwgOiAnJ1xuXG4gICAgICAgIGNvbnN0IHRleHQgPSBoYXNWYWx1ZShpdGVtVGV4dClcbiAgICAgICAgY29uc3QgcXVlcnkgPSBoYXNWYWx1ZShxdWVyeVRleHQpXG5cbiAgICAgICAgcmV0dXJuIHRleHQudG9TdHJpbmcoKVxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLmluZGV4T2YocXVlcnkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+IC0xXG4gICAgICB9XG4gICAgfSxcbiAgICBoaWRlTm9EYXRhOiBCb29sZWFuLFxuICAgIG5vRmlsdGVyOiBCb29sZWFuLFxuICAgIG9mZnNldFk6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBvZmZzZXRPdmVyZmxvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIHNlYXJjaElucHV0OiB7XG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWRcbiAgICB9LFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogdm0gPT4gKHtcbiAgICBhdHRyc0lucHV0OiBudWxsLFxuICAgIGxhenlTZWFyY2g6IHZtLnNlYXJjaElucHV0XG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgVlNlbGVjdC5jb21wdXRlZC5jbGFzc2VzLmNhbGwodGhpcyksIHtcbiAgICAgICAgJ3YtYXV0b2NvbXBsZXRlJzogdHJ1ZSxcbiAgICAgICAgJ3YtYXV0b2NvbXBsZXRlLS1pcy1zZWxlY3RpbmctaW5kZXgnOiB0aGlzLnNlbGVjdGVkSW5kZXggPiAtMVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbXB1dGVkSXRlbXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRJdGVtc1xuICAgIH0sXG4gICAgZGlzcGxheWVkSXRlbXNDb3VudCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlU2VsZWN0ZWRcbiAgICAgICAgPyB0aGlzLmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aFxuICAgICAgICA6IHRoaXMuZmlsdGVyZWRJdGVtcy5sZW5ndGhcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRoZSByYW5nZSBvZiB0aGUgY3VycmVudCBpbnB1dCB0ZXh0XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgY3VycmVudFJhbmdlICgpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbSA9PSBudWxsKSByZXR1cm4gMFxuXG4gICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KHRoaXMuc2VsZWN0ZWRJdGVtKS50b1N0cmluZygpLmxlbmd0aFxuICAgIH0sXG4gICAgZmlsdGVyZWRJdGVtcyAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNTZWFyY2hpbmcgfHwgdGhpcy5ub0ZpbHRlcikgcmV0dXJuIHRoaXMuYWxsSXRlbXNcblxuICAgICAgcmV0dXJuIHRoaXMuYWxsSXRlbXMuZmlsdGVyKGkgPT4gdGhpcy5maWx0ZXIoaSwgdGhpcy5pbnRlcm5hbFNlYXJjaCwgdGhpcy5nZXRUZXh0KGkpKSlcbiAgICB9LFxuICAgIGludGVybmFsU2VhcmNoOiB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXp5U2VhcmNoXG4gICAgICB9LFxuICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5sYXp5U2VhcmNoID0gdmFsXG5cbiAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOnNlYXJjaElucHV0JywgdmFsKVxuICAgICAgfVxuICAgIH0sXG4gICAgaXNBbnlWYWx1ZUFsbG93ZWQgKCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICBpc0RpcnR5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaElzRGlydHkgfHwgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDBcbiAgICB9LFxuICAgIGlzU2VhcmNoaW5nICgpIHtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSByZXR1cm4gdGhpcy5zZWFyY2hJc0RpcnR5XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuc2VhcmNoSXNEaXJ0eSAmJlxuICAgICAgICB0aGlzLmludGVybmFsU2VhcmNoICE9PSB0aGlzLmdldFRleHQodGhpcy5zZWxlY3RlZEl0ZW0pXG4gICAgICApXG4gICAgfSxcbiAgICBtZW51Q2FuU2hvdyAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkKSByZXR1cm4gZmFsc2VcblxuICAgICAgcmV0dXJuICh0aGlzLmRpc3BsYXllZEl0ZW1zQ291bnQgPiAwKSB8fCAhdGhpcy5oaWRlTm9EYXRhXG4gICAgfSxcbiAgICBtZW51UHJvcHMgKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oVlNlbGVjdC5jb21wdXRlZC5tZW51UHJvcHMuY2FsbCh0aGlzKSwge1xuICAgICAgICBjb250ZW50Q2xhc3M6IChgdi1hdXRvY29tcGxldGVfX2NvbnRlbnQgJHt0aGlzLmNvbnRlbnRDbGFzcyB8fCAnJ31gKS50cmltKCksXG4gICAgICAgIHZhbHVlOiB0aGlzLm1lbnVDYW5TaG93ICYmIHRoaXMuaXNNZW51QWN0aXZlXG4gICAgICB9KVxuICAgIH0sXG4gICAgc2VhcmNoSXNEaXJ0eSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbFNlYXJjaCAhPSBudWxsICYmXG4gICAgICAgIHRoaXMuaW50ZXJuYWxTZWFyY2ggIT09ICcnXG4gICAgfSxcbiAgICBzZWxlY3RlZEl0ZW0gKCkge1xuICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHJldHVybiBudWxsXG5cbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMuZmluZChpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVDb21wYXJhdG9yKHRoaXMuZ2V0VmFsdWUoaSksIHRoaXMuZ2V0VmFsdWUodGhpcy5pbnRlcm5hbFZhbHVlKSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBsaXN0RGF0YSAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gVlNlbGVjdC5jb21wdXRlZC5saXN0RGF0YS5jYWxsKHRoaXMpXG5cbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YS5wcm9wcywge1xuICAgICAgICBpdGVtczogdGhpcy52aXJ0dWFsaXplZEl0ZW1zLFxuICAgICAgICBub0ZpbHRlcjogKFxuICAgICAgICAgIHRoaXMubm9GaWx0ZXIgfHxcbiAgICAgICAgICAhdGhpcy5pc1NlYXJjaGluZyB8fFxuICAgICAgICAgICF0aGlzLmZpbHRlcmVkSXRlbXMubGVuZ3RoXG4gICAgICAgICksXG4gICAgICAgIHNlYXJjaElucHV0OiB0aGlzLmludGVybmFsU2VhcmNoXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGZpbHRlcmVkSXRlbXMgKHZhbCkge1xuICAgICAgdGhpcy5vbkZpbHRlcmVkSXRlbXNDaGFuZ2VkKHZhbClcbiAgICB9LFxuICAgIGludGVybmFsVmFsdWUgKCkge1xuICAgICAgdGhpcy5zZXRTZWFyY2goKVxuICAgIH0sXG4gICAgaXNGb2N1c2VkICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJlxuICAgICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuc2VsZWN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZigpXG4gICAgICB9XG4gICAgfSxcbiAgICBpc01lbnVBY3RpdmUgKHZhbCkge1xuICAgICAgaWYgKHZhbCB8fCAhdGhpcy5oYXNTbG90KSByZXR1cm5cblxuICAgICAgdGhpcy5sYXp5U2VhcmNoID0gbnVsbFxuICAgIH0sXG4gICAgaXRlbXMgKHZhbCkge1xuICAgICAgLy8gSWYgd2UgYXJlIGZvY3VzZWQsIHRoZSBtZW51XG4gICAgICAvLyBpcyBub3QgYWN0aXZlIGFuZCBpdGVtcyBjaGFuZ2VcbiAgICAgIC8vIFVzZXIgaXMgcHJvYmFibHkgYXN5bmMgbG9hZGluZ1xuICAgICAgLy8gaXRlbXMsIHRyeSB0byBhY3RpdmF0ZSB0aGUgbWVudVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmlzRm9jdXNlZCAmJlxuICAgICAgICAhdGhpcy5pc01lbnVBY3RpdmUgJiZcbiAgICAgICAgdmFsLmxlbmd0aFxuICAgICAgKSB0aGlzLmFjdGl2YXRlTWVudSgpXG4gICAgfSxcbiAgICBzZWFyY2hJbnB1dCAodmFsKSB7XG4gICAgICB0aGlzLmxhenlTZWFyY2ggPSB2YWxcbiAgICB9LFxuICAgIGludGVybmFsU2VhcmNoICh2YWwpIHtcbiAgICAgIHRoaXMub25JbnRlcm5hbFNlYXJjaENoYW5nZWQodmFsKVxuICAgIH1cbiAgfSxcblxuICBjcmVhdGVkICgpIHtcbiAgICB0aGlzLnNldFNlYXJjaCgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uRmlsdGVyZWRJdGVtc0NoYW5nZWQgKHZhbCkge1xuICAgICAgdGhpcy5zZXRNZW51SW5kZXgoLTEpXG5cbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRNZW51SW5kZXgodmFsLmxlbmd0aCA9PT0gMSA/IDAgOiAtMSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBvbkludGVybmFsU2VhcmNoQ2hhbmdlZCAodmFsKSB7XG4gICAgICB0aGlzLnVwZGF0ZU1lbnVEaW1lbnNpb25zKClcbiAgICB9LFxuICAgIGFjdGl2YXRlTWVudSAoKSB7XG4gICAgICBpZiAodGhpcy5tZW51Q2FuU2hvdykge1xuICAgICAgICB0aGlzLmlzTWVudUFjdGl2ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZU1lbnVEaW1lbnNpb25zICgpIHtcbiAgICAgIGlmICh0aGlzLmlzTWVudUFjdGl2ZSAmJlxuICAgICAgICB0aGlzLiRyZWZzLm1lbnVcbiAgICAgICkge1xuICAgICAgICB0aGlzLiRyZWZzLm1lbnUudXBkYXRlRGltZW5zaW9ucygpXG4gICAgICB9XG4gICAgfSxcbiAgICBjaGFuZ2VTZWxlY3RlZEluZGV4IChrZXlDb2RlKSB7XG4gICAgICAvLyBEbyBub3QgYWxsb3cgY2hhbmdpbmcgb2Ygc2VsZWN0ZWRJbmRleFxuICAgICAgLy8gd2hlbiBzZWFyY2ggaXMgZGlydHlcbiAgICAgIGlmICh0aGlzLnNlYXJjaElzRGlydHkpIHJldHVyblxuXG4gICAgICBpZiAoIVtcbiAgICAgICAga2V5Q29kZXMuYmFja3NwYWNlLFxuICAgICAgICBrZXlDb2Rlcy5sZWZ0LFxuICAgICAgICBrZXlDb2Rlcy5yaWdodCxcbiAgICAgICAga2V5Q29kZXMuZGVsZXRlXG4gICAgICBdLmluY2x1ZGVzKGtleUNvZGUpKSByZXR1cm5cblxuICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxXG5cbiAgICAgIGlmIChrZXlDb2RlID09PSBrZXlDb2Rlcy5sZWZ0KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gLTFcbiAgICAgICAgICA/IGluZGV4ZXNcbiAgICAgICAgICA6IHRoaXMuc2VsZWN0ZWRJbmRleCAtIDFcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0ga2V5Q29kZXMucmlnaHQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4ID49IGluZGV4ZXNcbiAgICAgICAgICA/IC0xXG4gICAgICAgICAgOiB0aGlzLnNlbGVjdGVkSW5kZXggKyAxXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXhlc1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXNbdGhpcy5zZWxlY3RlZEluZGV4XVxuXG4gICAgICBpZiAoW1xuICAgICAgICBrZXlDb2Rlcy5iYWNrc3BhY2UsXG4gICAgICAgIGtleUNvZGVzLmRlbGV0ZVxuICAgICAgXS5pbmNsdWRlcyhrZXlDb2RlKSAmJlxuICAgICAgICAhdGhpcy5nZXREaXNhYmxlZChjdXJyZW50SXRlbSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gaW5kZXhlc1xuICAgICAgICAgID8gdGhpcy5zZWxlY3RlZEluZGV4IC0gMVxuICAgICAgICAgIDogdGhpcy5zZWxlY3RlZEl0ZW1zW3RoaXMuc2VsZWN0ZWRJbmRleCArIDFdXG4gICAgICAgICAgICA/IHRoaXMuc2VsZWN0ZWRJbmRleFxuICAgICAgICAgICAgOiAtMVxuXG4gICAgICAgIGlmIChuZXdJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLmludGVybmFsVmFsdWUgPSB0aGlzLm11bHRpcGxlID8gW10gOiB1bmRlZmluZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oY3VycmVudEl0ZW0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBuZXdJbmRleFxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJhYmxlQ2FsbGJhY2sgKCkge1xuICAgICAgdGhpcy5pbnRlcm5hbFNlYXJjaCA9IHVuZGVmaW5lZFxuXG4gICAgICBWU2VsZWN0Lm1ldGhvZHMuY2xlYXJhYmxlQ2FsbGJhY2suY2FsbCh0aGlzKVxuICAgIH0sXG4gICAgZ2VuSW5wdXQgKCkge1xuICAgICAgY29uc3QgaW5wdXQgPSBWVGV4dEZpZWxkLm1ldGhvZHMuZ2VuSW5wdXQuY2FsbCh0aGlzKVxuXG4gICAgICBpbnB1dC5kYXRhLmF0dHJzLnJvbGUgPSAnY29tYm9ib3gnXG4gICAgICBpbnB1dC5kYXRhLmRvbVByb3BzLnZhbHVlID0gdGhpcy5pbnRlcm5hbFNlYXJjaFxuXG4gICAgICByZXR1cm4gaW5wdXRcbiAgICB9LFxuICAgIGdlblNlbGVjdGlvbnMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzU2xvdCB8fCB0aGlzLm11bHRpcGxlXG4gICAgICAgID8gVlNlbGVjdC5tZXRob2RzLmdlblNlbGVjdGlvbnMuY2FsbCh0aGlzKVxuICAgICAgICA6IFtdXG4gICAgfSxcbiAgICBvbkNsaWNrICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHJldHVyblxuXG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPiAtMVxuICAgICAgICA/ICh0aGlzLnNlbGVjdGVkSW5kZXggPSAtMSlcbiAgICAgICAgOiB0aGlzLm9uRm9jdXMoKVxuXG4gICAgICB0aGlzLmFjdGl2YXRlTWVudSgpXG4gICAgfSxcbiAgICBvbkVudGVyRG93biAoKSB7XG4gICAgICAvLyBBdm9pZCBpbnZva2luZyB0aGlzIG1ldGhvZFxuICAgICAgLy8gd2lsbCBjYXVzZSB1cGRhdGVTZWxmIHRvXG4gICAgICAvLyBiZSBjYWxsZWQgZW1wdHlpbmcgc2VhcmNoXG4gICAgfSxcbiAgICBvbklucHV0IChlKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ID4gLTEpIHJldHVyblxuXG4gICAgICAvLyBJZiB0eXBpbmcgYW5kIG1lbnUgaXMgbm90IGN1cnJlbnRseSBhY3RpdmVcbiAgICAgIGlmIChlLnRhcmdldC52YWx1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2YXRlTWVudSgpXG4gICAgICAgIGlmICghdGhpcy5pc0FueVZhbHVlQWxsb3dlZCkgdGhpcy5zZXRNZW51SW5kZXgoMClcbiAgICAgIH1cblxuICAgICAgdGhpcy5tYXNrICYmIHRoaXMucmVzZXRTZWxlY3Rpb25zKGUudGFyZ2V0KVxuICAgICAgdGhpcy5pbnRlcm5hbFNlYXJjaCA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICB0aGlzLmJhZElucHV0ID0gZS50YXJnZXQudmFsaWRpdHkgJiYgZS50YXJnZXQudmFsaWRpdHkuYmFkSW5wdXRcbiAgICB9LFxuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgY29uc3Qga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgICBWU2VsZWN0Lm1ldGhvZHMub25LZXlEb3duLmNhbGwodGhpcywgZSlcblxuICAgICAgLy8gVGhlIG9yZGVyaW5nIGlzIGltcG9ydGFudCBoZXJlXG4gICAgICAvLyBhbGxvd3MgbmV3IHZhbHVlIHRvIGJlIHVwZGF0ZWRcbiAgICAgIC8vIGFuZCB0aGVuIG1vdmVzIHRoZSBpbmRleCB0byB0aGVcbiAgICAgIC8vIHByb3BlciBsb2NhdGlvblxuICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZEluZGV4KGtleUNvZGUpXG4gICAgfSxcbiAgICBvblRhYkRvd24gKGUpIHtcbiAgICAgIFZTZWxlY3QubWV0aG9kcy5vblRhYkRvd24uY2FsbCh0aGlzLCBlKVxuICAgICAgdGhpcy51cGRhdGVTZWxmKClcbiAgICB9LFxuICAgIHNlbGVjdEl0ZW0gKGl0ZW0pIHtcbiAgICAgIFZTZWxlY3QubWV0aG9kcy5zZWxlY3RJdGVtLmNhbGwodGhpcywgaXRlbSlcblxuICAgICAgdGhpcy5zZXRTZWFyY2goKVxuICAgIH0sXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyAoKSB7XG4gICAgICBWU2VsZWN0Lm1ldGhvZHMuc2V0U2VsZWN0ZWRJdGVtcy5jYWxsKHRoaXMpXG5cbiAgICAgIC8vICM0MjczIERvbid0IHJlcGxhY2UgaWYgc2VhcmNoaW5nXG4gICAgICAvLyAjNDQwMyBEb24ndCByZXBsYWNlIGlmIGZvY3VzZWRcbiAgICAgIGlmICghdGhpcy5pc0ZvY3VzZWQpIHRoaXMuc2V0U2VhcmNoKClcbiAgICB9LFxuICAgIHNldFNlYXJjaCAoKSB7XG4gICAgICAvLyBXYWl0IGZvciBuZXh0VGljayBzbyBzZWxlY3RlZEl0ZW1cbiAgICAgIC8vIGhhcyBoYWQgdGltZSB0byB1cGRhdGVcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbnRlcm5hbFNlYXJjaCA9IChcbiAgICAgICAgICAhdGhpcy5zZWxlY3RlZEl0ZW0gfHxcbiAgICAgICAgICB0aGlzLm11bHRpcGxlIHx8XG4gICAgICAgICAgdGhpcy5oYXNTbG90XG4gICAgICAgIClcbiAgICAgICAgICA/IG51bGxcbiAgICAgICAgICA6IHRoaXMuZ2V0VGV4dCh0aGlzLnNlbGVjdGVkSXRlbSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzZXRWYWx1ZSAoKSB7XG4gICAgICB0aGlzLmludGVybmFsVmFsdWUgPSB0aGlzLmludGVybmFsU2VhcmNoXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmludGVybmFsU2VhcmNoKVxuICAgIH0sXG4gICAgdXBkYXRlU2VsZiAoKSB7XG4gICAgICB0aGlzLnVwZGF0ZUF1dG9jb21wbGV0ZSgpXG4gICAgfSxcbiAgICB1cGRhdGVBdXRvY29tcGxldGUgKCkge1xuICAgICAgaWYgKCF0aGlzLnNlYXJjaElzRGlydHkgJiZcbiAgICAgICAgIXRoaXMuaW50ZXJuYWxWYWx1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgaWYgKCF0aGlzLnZhbHVlQ29tcGFyYXRvcihcbiAgICAgICAgdGhpcy5pbnRlcm5hbFNlYXJjaCxcbiAgICAgICAgdGhpcy5nZXRWYWx1ZSh0aGlzLmludGVybmFsVmFsdWUpXG4gICAgICApKSB7XG4gICAgICAgIHRoaXMuc2V0U2VhcmNoKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==