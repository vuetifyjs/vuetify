// Styles
import '../../stylus/components/_autocompletes.styl';
// Extensions
import VSelect, { defaultMenuProps as VSelectMenuProps } from '../VSelect/VSelect';
import VTextField from '../VTextField/VTextField';
// Utils
import { keyCodes } from '../../util/helpers';
const defaultMenuProps = {
    ...VSelectMenuProps,
    offsetY: true,
    offsetOverflow: true,
    transition: false
};
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
        searchInput: {
            default: undefined
        },
        menuProps: {
            type: VSelect.props.menuProps.type,
            default: () => defaultMenuProps
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
        $_menuProps() {
            const props = VSelect.computed.$_menuProps.call(this);
            props.contentClass = `v-autocomplete__content ${props.contentClass || ''}`.trim();
            return {
                ...defaultMenuProps,
                ...props
            };
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
        items(val, oldVal) {
            // If we are focused, the menu
            // is not active, hide no data is enabled,
            // and items change
            // User is probably async loading
            // items, try to activate the menu
            if (!(oldVal && oldVal.length) &&
                this.hideNoData &&
                this.isFocused &&
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
                    this.setValue(this.multiple ? [] : undefined);
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
                this.internalSearch = (!this.selectedItems.length ||
                    this.multiple ||
                    this.hasSlot)
                    ? null
                    : this.getText(this.selectedItem);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkF1dG9jb21wbGV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZBdXRvY29tcGxldGUvVkF1dG9jb21wbGV0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyw2Q0FBNkMsQ0FBQTtBQUVwRCxhQUFhO0FBQ2IsT0FBTyxPQUFPLEVBQUUsRUFBRSxnQkFBZ0IsSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2xGLE9BQU8sVUFBVSxNQUFNLDBCQUEwQixDQUFBO0FBRWpELFFBQVE7QUFDUixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFN0MsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixHQUFHLGdCQUFnQjtJQUNuQixPQUFPLEVBQUUsSUFBSTtJQUNiLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLFVBQVUsRUFBRSxLQUFLO0NBQ2xCLENBQUE7QUFFRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxnQkFBZ0I7SUFFdEIsT0FBTyxFQUFFLE9BQU87SUFFaEIsS0FBSyxFQUFFO1FBQ0wsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsbUJBQW1CLEVBQUU7WUFDbkIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO2dCQUU5QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7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QUFFLENBQUE7YUFDakI7UUFDSCxDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19hdXRvY29tcGxldGVzLnN0eWwnXG5cbi8vIEV4dGVuc2lvbnNcbmltcG9ydCBWU2VsZWN0LCB7IGRlZmF1bHRNZW51UHJvcHMgYXMgVlNlbGVjdE1lbnVQcm9wcyB9IGZyb20gJy4uL1ZTZWxlY3QvVlNlbGVjdCdcbmltcG9ydCBWVGV4dEZpZWxkIGZyb20gJy4uL1ZUZXh0RmllbGQvVlRleHRGaWVsZCdcblxuLy8gVXRpbHNcbmltcG9ydCB7IGtleUNvZGVzIH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG5jb25zdCBkZWZhdWx0TWVudVByb3BzID0ge1xuICAuLi5WU2VsZWN0TWVudVByb3BzLFxuICBvZmZzZXRZOiB0cnVlLFxuICBvZmZzZXRPdmVyZmxvdzogdHJ1ZSxcbiAgdHJhbnNpdGlvbjogZmFsc2Vcbn1cblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtYXV0b2NvbXBsZXRlJyxcblxuICBleHRlbmRzOiBWU2VsZWN0LFxuXG4gIHByb3BzOiB7XG4gICAgYWxsb3dPdmVyZmxvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGJyb3dzZXJBdXRvY29tcGxldGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdvZmYnXG4gICAgfSxcbiAgICBmaWx0ZXI6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogKGl0ZW0sIHF1ZXJ5VGV4dCwgaXRlbVRleHQpID0+IHtcbiAgICAgICAgY29uc3QgaGFzVmFsdWUgPSB2YWwgPT4gdmFsICE9IG51bGwgPyB2YWwgOiAnJ1xuXG4gICAgICAgIGNvbnN0IHRleHQgPSBoYXNWYWx1ZShpdGVtVGV4dClcbiAgICAgICAgY29uc3QgcXVlcnkgPSBoYXNWYWx1ZShxdWVyeVRleHQpXG5cbiAgICAgICAgcmV0dXJuIHRleHQudG9TdHJpbmcoKVxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLmluZGV4T2YocXVlcnkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+IC0xXG4gICAgICB9XG4gICAgfSxcbiAgICBoaWRlTm9EYXRhOiBCb29sZWFuLFxuICAgIG5vRmlsdGVyOiBCb29sZWFuLFxuICAgIHNlYXJjaElucHV0OiB7XG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWRcbiAgICB9LFxuICAgIG1lbnVQcm9wczoge1xuICAgICAgdHlwZTogVlNlbGVjdC5wcm9wcy5tZW51UHJvcHMudHlwZSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGRlZmF1bHRNZW51UHJvcHNcbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogdm0gPT4gKHtcbiAgICBhdHRyc0lucHV0OiBudWxsLFxuICAgIGxhenlTZWFyY2g6IHZtLnNlYXJjaElucHV0XG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgVlNlbGVjdC5jb21wdXRlZC5jbGFzc2VzLmNhbGwodGhpcyksIHtcbiAgICAgICAgJ3YtYXV0b2NvbXBsZXRlJzogdHJ1ZSxcbiAgICAgICAgJ3YtYXV0b2NvbXBsZXRlLS1pcy1zZWxlY3RpbmctaW5kZXgnOiB0aGlzLnNlbGVjdGVkSW5kZXggPiAtMVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbXB1dGVkSXRlbXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRJdGVtc1xuICAgIH0sXG4gICAgZGlzcGxheWVkSXRlbXNDb3VudCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlU2VsZWN0ZWRcbiAgICAgICAgPyB0aGlzLmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aFxuICAgICAgICA6IHRoaXMuZmlsdGVyZWRJdGVtcy5sZW5ndGhcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRoZSByYW5nZSBvZiB0aGUgY3VycmVudCBpbnB1dCB0ZXh0XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgY3VycmVudFJhbmdlICgpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbSA9PSBudWxsKSByZXR1cm4gMFxuXG4gICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KHRoaXMuc2VsZWN0ZWRJdGVtKS50b1N0cmluZygpLmxlbmd0aFxuICAgIH0sXG4gICAgZmlsdGVyZWRJdGVtcyAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNTZWFyY2hpbmcgfHwgdGhpcy5ub0ZpbHRlcikgcmV0dXJuIHRoaXMuYWxsSXRlbXNcblxuICAgICAgcmV0dXJuIHRoaXMuYWxsSXRlbXMuZmlsdGVyKGkgPT4gdGhpcy5maWx0ZXIoaSwgdGhpcy5pbnRlcm5hbFNlYXJjaCwgdGhpcy5nZXRUZXh0KGkpKSlcbiAgICB9LFxuICAgIGludGVybmFsU2VhcmNoOiB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXp5U2VhcmNoXG4gICAgICB9LFxuICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5sYXp5U2VhcmNoID0gdmFsXG5cbiAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOnNlYXJjaElucHV0JywgdmFsKVxuICAgICAgfVxuICAgIH0sXG4gICAgaXNBbnlWYWx1ZUFsbG93ZWQgKCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICBpc0RpcnR5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaElzRGlydHkgfHwgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDBcbiAgICB9LFxuICAgIGlzU2VhcmNoaW5nICgpIHtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSByZXR1cm4gdGhpcy5zZWFyY2hJc0RpcnR5XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuc2VhcmNoSXNEaXJ0eSAmJlxuICAgICAgICB0aGlzLmludGVybmFsU2VhcmNoICE9PSB0aGlzLmdldFRleHQodGhpcy5zZWxlY3RlZEl0ZW0pXG4gICAgICApXG4gICAgfSxcbiAgICBtZW51Q2FuU2hvdyAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkKSByZXR1cm4gZmFsc2VcblxuICAgICAgcmV0dXJuICh0aGlzLmRpc3BsYXllZEl0ZW1zQ291bnQgPiAwKSB8fCAhdGhpcy5oaWRlTm9EYXRhXG4gICAgfSxcbiAgICAkX21lbnVQcm9wcyAoKSB7XG4gICAgICBjb25zdCBwcm9wcyA9IFZTZWxlY3QuY29tcHV0ZWQuJF9tZW51UHJvcHMuY2FsbCh0aGlzKVxuICAgICAgcHJvcHMuY29udGVudENsYXNzID0gYHYtYXV0b2NvbXBsZXRlX19jb250ZW50ICR7cHJvcHMuY29udGVudENsYXNzIHx8ICcnfWAudHJpbSgpXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5kZWZhdWx0TWVudVByb3BzLFxuICAgICAgICAuLi5wcm9wc1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VhcmNoSXNEaXJ0eSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbFNlYXJjaCAhPSBudWxsICYmXG4gICAgICAgIHRoaXMuaW50ZXJuYWxTZWFyY2ggIT09ICcnXG4gICAgfSxcbiAgICBzZWxlY3RlZEl0ZW0gKCkge1xuICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHJldHVybiBudWxsXG5cbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMuZmluZChpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVDb21wYXJhdG9yKHRoaXMuZ2V0VmFsdWUoaSksIHRoaXMuZ2V0VmFsdWUodGhpcy5pbnRlcm5hbFZhbHVlKSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBsaXN0RGF0YSAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gVlNlbGVjdC5jb21wdXRlZC5saXN0RGF0YS5jYWxsKHRoaXMpXG5cbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YS5wcm9wcywge1xuICAgICAgICBpdGVtczogdGhpcy52aXJ0dWFsaXplZEl0ZW1zLFxuICAgICAgICBub0ZpbHRlcjogKFxuICAgICAgICAgIHRoaXMubm9GaWx0ZXIgfHxcbiAgICAgICAgICAhdGhpcy5pc1NlYXJjaGluZyB8fFxuICAgICAgICAgICF0aGlzLmZpbHRlcmVkSXRlbXMubGVuZ3RoXG4gICAgICAgICksXG4gICAgICAgIHNlYXJjaElucHV0OiB0aGlzLmludGVybmFsU2VhcmNoXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGZpbHRlcmVkSXRlbXMgKHZhbCkge1xuICAgICAgdGhpcy5vbkZpbHRlcmVkSXRlbXNDaGFuZ2VkKHZhbClcbiAgICB9LFxuICAgIGludGVybmFsVmFsdWUgKCkge1xuICAgICAgdGhpcy5zZXRTZWFyY2goKVxuICAgIH0sXG4gICAgaXNGb2N1c2VkICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJlxuICAgICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuc2VsZWN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZigpXG4gICAgICB9XG4gICAgfSxcbiAgICBpc01lbnVBY3RpdmUgKHZhbCkge1xuICAgICAgaWYgKHZhbCB8fCAhdGhpcy5oYXNTbG90KSByZXR1cm5cblxuICAgICAgdGhpcy5sYXp5U2VhcmNoID0gbnVsbFxuICAgIH0sXG4gICAgaXRlbXMgKHZhbCwgb2xkVmFsKSB7XG4gICAgICAvLyBJZiB3ZSBhcmUgZm9jdXNlZCwgdGhlIG1lbnVcbiAgICAgIC8vIGlzIG5vdCBhY3RpdmUsIGhpZGUgbm8gZGF0YSBpcyBlbmFibGVkLFxuICAgICAgLy8gYW5kIGl0ZW1zIGNoYW5nZVxuICAgICAgLy8gVXNlciBpcyBwcm9iYWJseSBhc3luYyBsb2FkaW5nXG4gICAgICAvLyBpdGVtcywgdHJ5IHRvIGFjdGl2YXRlIHRoZSBtZW51XG4gICAgICBpZiAoXG4gICAgICAgICEob2xkVmFsICYmIG9sZFZhbC5sZW5ndGgpICYmXG4gICAgICAgIHRoaXMuaGlkZU5vRGF0YSAmJlxuICAgICAgICB0aGlzLmlzRm9jdXNlZCAmJlxuICAgICAgICAhdGhpcy5pc01lbnVBY3RpdmUgJiZcbiAgICAgICAgdmFsLmxlbmd0aFxuICAgICAgKSB0aGlzLmFjdGl2YXRlTWVudSgpXG4gICAgfSxcbiAgICBzZWFyY2hJbnB1dCAodmFsKSB7XG4gICAgICB0aGlzLmxhenlTZWFyY2ggPSB2YWxcbiAgICB9LFxuICAgIGludGVybmFsU2VhcmNoICh2YWwpIHtcbiAgICAgIHRoaXMub25JbnRlcm5hbFNlYXJjaENoYW5nZWQodmFsKVxuICAgIH1cbiAgfSxcblxuICBjcmVhdGVkICgpIHtcbiAgICB0aGlzLnNldFNlYXJjaCgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uRmlsdGVyZWRJdGVtc0NoYW5nZWQgKHZhbCkge1xuICAgICAgdGhpcy5zZXRNZW51SW5kZXgoLTEpXG5cbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRNZW51SW5kZXgodmFsLmxlbmd0aCA9PT0gMSA/IDAgOiAtMSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBvbkludGVybmFsU2VhcmNoQ2hhbmdlZCAodmFsKSB7XG4gICAgICB0aGlzLnVwZGF0ZU1lbnVEaW1lbnNpb25zKClcbiAgICB9LFxuICAgIHVwZGF0ZU1lbnVEaW1lbnNpb25zICgpIHtcbiAgICAgIGlmICh0aGlzLmlzTWVudUFjdGl2ZSAmJlxuICAgICAgICB0aGlzLiRyZWZzLm1lbnVcbiAgICAgICkge1xuICAgICAgICB0aGlzLiRyZWZzLm1lbnUudXBkYXRlRGltZW5zaW9ucygpXG4gICAgICB9XG4gICAgfSxcbiAgICBjaGFuZ2VTZWxlY3RlZEluZGV4IChrZXlDb2RlKSB7XG4gICAgICAvLyBEbyBub3QgYWxsb3cgY2hhbmdpbmcgb2Ygc2VsZWN0ZWRJbmRleFxuICAgICAgLy8gd2hlbiBzZWFyY2ggaXMgZGlydHlcbiAgICAgIGlmICh0aGlzLnNlYXJjaElzRGlydHkpIHJldHVyblxuXG4gICAgICBpZiAoIVtcbiAgICAgICAga2V5Q29kZXMuYmFja3NwYWNlLFxuICAgICAgICBrZXlDb2Rlcy5sZWZ0LFxuICAgICAgICBrZXlDb2Rlcy5yaWdodCxcbiAgICAgICAga2V5Q29kZXMuZGVsZXRlXG4gICAgICBdLmluY2x1ZGVzKGtleUNvZGUpKSByZXR1cm5cblxuICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxXG5cbiAgICAgIGlmIChrZXlDb2RlID09PSBrZXlDb2Rlcy5sZWZ0KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gLTFcbiAgICAgICAgICA/IGluZGV4ZXNcbiAgICAgICAgICA6IHRoaXMuc2VsZWN0ZWRJbmRleCAtIDFcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0ga2V5Q29kZXMucmlnaHQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4ID49IGluZGV4ZXNcbiAgICAgICAgICA/IC0xXG4gICAgICAgICAgOiB0aGlzLnNlbGVjdGVkSW5kZXggKyAxXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXhlc1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXNbdGhpcy5zZWxlY3RlZEluZGV4XVxuXG4gICAgICBpZiAoW1xuICAgICAgICBrZXlDb2Rlcy5iYWNrc3BhY2UsXG4gICAgICAgIGtleUNvZGVzLmRlbGV0ZVxuICAgICAgXS5pbmNsdWRlcyhrZXlDb2RlKSAmJlxuICAgICAgICAhdGhpcy5nZXREaXNhYmxlZChjdXJyZW50SXRlbSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gaW5kZXhlc1xuICAgICAgICAgID8gdGhpcy5zZWxlY3RlZEluZGV4IC0gMVxuICAgICAgICAgIDogdGhpcy5zZWxlY3RlZEl0ZW1zW3RoaXMuc2VsZWN0ZWRJbmRleCArIDFdXG4gICAgICAgICAgICA/IHRoaXMuc2VsZWN0ZWRJbmRleFxuICAgICAgICAgICAgOiAtMVxuXG4gICAgICAgIGlmIChuZXdJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMubXVsdGlwbGUgPyBbXSA6IHVuZGVmaW5lZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oY3VycmVudEl0ZW0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBuZXdJbmRleFxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJhYmxlQ2FsbGJhY2sgKCkge1xuICAgICAgdGhpcy5pbnRlcm5hbFNlYXJjaCA9IHVuZGVmaW5lZFxuXG4gICAgICBWU2VsZWN0Lm1ldGhvZHMuY2xlYXJhYmxlQ2FsbGJhY2suY2FsbCh0aGlzKVxuICAgIH0sXG4gICAgZ2VuSW5wdXQgKCkge1xuICAgICAgY29uc3QgaW5wdXQgPSBWVGV4dEZpZWxkLm1ldGhvZHMuZ2VuSW5wdXQuY2FsbCh0aGlzKVxuXG4gICAgICBpbnB1dC5kYXRhLmF0dHJzLnJvbGUgPSAnY29tYm9ib3gnXG4gICAgICBpbnB1dC5kYXRhLmRvbVByb3BzLnZhbHVlID0gdGhpcy5pbnRlcm5hbFNlYXJjaFxuXG4gICAgICByZXR1cm4gaW5wdXRcbiAgICB9LFxuICAgIGdlblNlbGVjdGlvbnMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzU2xvdCB8fCB0aGlzLm11bHRpcGxlXG4gICAgICAgID8gVlNlbGVjdC5tZXRob2RzLmdlblNlbGVjdGlvbnMuY2FsbCh0aGlzKVxuICAgICAgICA6IFtdXG4gICAgfSxcbiAgICBvbkNsaWNrICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHJldHVyblxuXG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPiAtMVxuICAgICAgICA/ICh0aGlzLnNlbGVjdGVkSW5kZXggPSAtMSlcbiAgICAgICAgOiB0aGlzLm9uRm9jdXMoKVxuXG4gICAgICB0aGlzLmFjdGl2YXRlTWVudSgpXG4gICAgfSxcbiAgICBvbkVudGVyRG93biAoKSB7XG4gICAgICAvLyBBdm9pZCBpbnZva2luZyB0aGlzIG1ldGhvZFxuICAgICAgLy8gd2lsbCBjYXVzZSB1cGRhdGVTZWxmIHRvXG4gICAgICAvLyBiZSBjYWxsZWQgZW1wdHlpbmcgc2VhcmNoXG4gICAgfSxcbiAgICBvbklucHV0IChlKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ID4gLTEpIHJldHVyblxuXG4gICAgICAvLyBJZiB0eXBpbmcgYW5kIG1lbnUgaXMgbm90IGN1cnJlbnRseSBhY3RpdmVcbiAgICAgIGlmIChlLnRhcmdldC52YWx1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2YXRlTWVudSgpXG4gICAgICAgIGlmICghdGhpcy5pc0FueVZhbHVlQWxsb3dlZCkgdGhpcy5zZXRNZW51SW5kZXgoMClcbiAgICAgIH1cblxuICAgICAgdGhpcy5tYXNrICYmIHRoaXMucmVzZXRTZWxlY3Rpb25zKGUudGFyZ2V0KVxuICAgICAgdGhpcy5pbnRlcm5hbFNlYXJjaCA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICB0aGlzLmJhZElucHV0ID0gZS50YXJnZXQudmFsaWRpdHkgJiYgZS50YXJnZXQudmFsaWRpdHkuYmFkSW5wdXRcbiAgICB9LFxuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgY29uc3Qga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgICBWU2VsZWN0Lm1ldGhvZHMub25LZXlEb3duLmNhbGwodGhpcywgZSlcblxuICAgICAgLy8gVGhlIG9yZGVyaW5nIGlzIGltcG9ydGFudCBoZXJlXG4gICAgICAvLyBhbGxvd3MgbmV3IHZhbHVlIHRvIGJlIHVwZGF0ZWRcbiAgICAgIC8vIGFuZCB0aGVuIG1vdmVzIHRoZSBpbmRleCB0byB0aGVcbiAgICAgIC8vIHByb3BlciBsb2NhdGlvblxuICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZEluZGV4KGtleUNvZGUpXG4gICAgfSxcbiAgICBvblRhYkRvd24gKGUpIHtcbiAgICAgIFZTZWxlY3QubWV0aG9kcy5vblRhYkRvd24uY2FsbCh0aGlzLCBlKVxuICAgICAgdGhpcy51cGRhdGVTZWxmKClcbiAgICB9LFxuICAgIHNldFNlbGVjdGVkSXRlbXMgKCkge1xuICAgICAgVlNlbGVjdC5tZXRob2RzLnNldFNlbGVjdGVkSXRlbXMuY2FsbCh0aGlzKVxuXG4gICAgICAvLyAjNDI3MyBEb24ndCByZXBsYWNlIGlmIHNlYXJjaGluZ1xuICAgICAgLy8gIzQ0MDMgRG9uJ3QgcmVwbGFjZSBpZiBmb2N1c2VkXG4gICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkKSB0aGlzLnNldFNlYXJjaCgpXG4gICAgfSxcbiAgICBzZXRTZWFyY2ggKCkge1xuICAgICAgLy8gV2FpdCBmb3IgbmV4dFRpY2sgc28gc2VsZWN0ZWRJdGVtXG4gICAgICAvLyBoYXMgaGFkIHRpbWUgdG8gdXBkYXRlXG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxTZWFyY2ggPSAoXG4gICAgICAgICAgIXRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggfHxcbiAgICAgICAgICB0aGlzLm11bHRpcGxlIHx8XG4gICAgICAgICAgdGhpcy5oYXNTbG90XG4gICAgICAgIClcbiAgICAgICAgICA/IG51bGxcbiAgICAgICAgICA6IHRoaXMuZ2V0VGV4dCh0aGlzLnNlbGVjdGVkSXRlbSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICB1cGRhdGVTZWxmICgpIHtcbiAgICAgIHRoaXMudXBkYXRlQXV0b2NvbXBsZXRlKClcbiAgICB9LFxuICAgIHVwZGF0ZUF1dG9jb21wbGV0ZSAoKSB7XG4gICAgICBpZiAoIXRoaXMuc2VhcmNoSXNEaXJ0eSAmJlxuICAgICAgICAhdGhpcy5pbnRlcm5hbFZhbHVlXG4gICAgICApIHJldHVyblxuXG4gICAgICBpZiAoIXRoaXMudmFsdWVDb21wYXJhdG9yKFxuICAgICAgICB0aGlzLmludGVybmFsU2VhcmNoLFxuICAgICAgICB0aGlzLmdldFZhbHVlKHRoaXMuaW50ZXJuYWxWYWx1ZSlcbiAgICAgICkpIHtcbiAgICAgICAgdGhpcy5zZXRTZWFyY2goKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19