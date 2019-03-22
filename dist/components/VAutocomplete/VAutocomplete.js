var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_autocompletes.styl';
// Extensions
import VSelect, { defaultMenuProps as VSelectMenuProps } from '../VSelect/VSelect';
import VTextField from '../VTextField/VTextField';
// Utils
import { keyCodes } from '../../util/helpers';
var defaultMenuProps = __assign({}, VSelectMenuProps, { offsetY: true, offsetOverflow: true, transition: false });
/* @vue/component */
export default VSelect.extend({
    name: 'v-autocomplete',
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
            default: function (item, queryText, itemText) {
                return itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1;
            }
        },
        hideNoData: Boolean,
        noFilter: Boolean,
        searchInput: {
            default: undefined
        },
        menuProps: {
            type: VSelect.options.props.menuProps.type,
            default: function () { return defaultMenuProps; }
        },
        autoSelectFirst: {
            type: Boolean,
            default: false
        }
    },
    data: function (vm) { return ({
        attrsInput: null,
        lazySearch: vm.searchInput
    }); },
    computed: {
        classes: function () {
            return Object.assign({}, VSelect.options.computed.classes.call(this), {
                'v-autocomplete': true,
                'v-autocomplete--is-selecting-index': this.selectedIndex > -1
            });
        },
        computedItems: function () {
            return this.filteredItems;
        },
        selectedValues: function () {
            var _this = this;
            return this.selectedItems.map(function (item) { return _this.getValue(item); });
        },
        hasDisplayedItems: function () {
            var _this = this;
            return this.hideSelected
                ? this.filteredItems.some(function (item) { return !_this.hasItem(item); })
                : this.filteredItems.length > 0;
        },
        /**
         * The range of the current input text
         *
         * @return {Number}
         */
        currentRange: function () {
            if (this.selectedItem == null)
                return 0;
            return this.getText(this.selectedItem).toString().length;
        },
        filteredItems: function () {
            var _this = this;
            if (!this.isSearching || this.noFilter || this.internalSearch == null)
                return this.allItems;
            return this.allItems.filter(function (item) { return _this.filter(item, _this.internalSearch.toString(), _this.getText(item).toString()); });
        },
        internalSearch: {
            get: function () {
                return this.lazySearch;
            },
            set: function (val) {
                this.lazySearch = val;
                this.$emit('update:searchInput', val);
            }
        },
        isAnyValueAllowed: function () {
            return false;
        },
        isDirty: function () {
            return this.searchIsDirty || this.selectedItems.length > 0;
        },
        isSearching: function () {
            if (this.multiple)
                return this.searchIsDirty;
            return (this.searchIsDirty &&
                this.internalSearch !== this.getText(this.selectedItem));
        },
        menuCanShow: function () {
            if (!this.isFocused)
                return false;
            return this.hasDisplayedItems || !this.hideNoData;
        },
        $_menuProps: function () {
            var props = VSelect.options.computed.$_menuProps.call(this);
            props.contentClass = ("v-autocomplete__content " + (props.contentClass || '')).trim();
            return __assign({}, defaultMenuProps, props);
        },
        searchIsDirty: function () {
            return this.internalSearch != null &&
                this.internalSearch !== '';
        },
        selectedItem: function () {
            var _this = this;
            if (this.multiple)
                return null;
            return this.selectedItems.find(function (i) {
                return _this.valueComparator(_this.getValue(i), _this.getValue(_this.internalValue));
            });
        },
        listData: function () {
            var data = VSelect.options.computed.listData.call(this);
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
        filteredItems: function (val) {
            this.onFilteredItemsChanged(val);
        },
        internalValue: function () {
            this.setSearch();
        },
        isFocused: function (val) {
            if (val) {
                this.$refs.input &&
                    this.$refs.input.select();
            }
            else {
                this.updateSelf();
            }
        },
        isMenuActive: function (val) {
            if (val || !this.hasSlot)
                return;
            this.lazySearch = null;
        },
        items: function (val, oldVal) {
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
        searchInput: function (val) {
            this.lazySearch = val;
        },
        internalSearch: function (val) {
            this.onInternalSearchChanged(val);
        },
        itemText: function () {
            this.updateSelf();
        }
    },
    created: function () {
        this.setSearch();
    },
    methods: {
        onFilteredItemsChanged: function (val) {
            var _this = this;
            this.setMenuIndex(-1);
            this.$nextTick(function () {
                _this.setMenuIndex(val.length > 0 && (val.length === 1 || _this.autoSelectFirst) ? 0 : -1);
            });
        },
        onInternalSearchChanged: function (val) {
            this.updateMenuDimensions();
        },
        updateMenuDimensions: function () {
            if (this.isMenuActive &&
                this.$refs.menu) {
                this.$refs.menu.updateDimensions();
            }
        },
        changeSelectedIndex: function (keyCode) {
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
            var indexes = this.selectedItems.length - 1;
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
            var currentItem = this.selectedItems[this.selectedIndex];
            if ([
                keyCodes.backspace,
                keyCodes.delete
            ].includes(keyCode) &&
                !this.getDisabled(currentItem)) {
                var newIndex = this.selectedIndex === indexes
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
        clearableCallback: function () {
            this.internalSearch = undefined;
            VSelect.options.methods.clearableCallback.call(this);
        },
        genInput: function () {
            var input = VTextField.options.methods.genInput.call(this);
            input.data.attrs.role = 'combobox';
            input.data.domProps.value = this.internalSearch;
            return input;
        },
        genSelections: function () {
            return this.hasSlot || this.multiple
                ? VSelect.options.methods.genSelections.call(this)
                : [];
        },
        onClick: function () {
            if (this.isDisabled)
                return;
            this.selectedIndex > -1
                ? (this.selectedIndex = -1)
                : this.onFocus();
            this.activateMenu();
        },
        onEnterDown: function () {
            // Avoid invoking this method
            // will cause updateSelf to
            // be called emptying search
        },
        onInput: function (e) {
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
        onKeyDown: function (e) {
            var keyCode = e.keyCode;
            VSelect.options.methods.onKeyDown.call(this, e);
            // The ordering is important here
            // allows new value to be updated
            // and then moves the index to the
            // proper location
            this.changeSelectedIndex(keyCode);
        },
        onTabDown: function (e) {
            VSelect.options.methods.onTabDown.call(this, e);
            this.updateSelf();
        },
        setSelectedItems: function () {
            VSelect.options.methods.setSelectedItems.call(this);
            // #4273 Don't replace if searching
            // #4403 Don't replace if focused
            if (!this.isFocused)
                this.setSearch();
        },
        setSearch: function () {
            var _this = this;
            // Wait for nextTick so selectedItem
            // has had time to update
            this.$nextTick(function () {
                _this.internalSearch = (_this.multiple &&
                    _this.internalSearch &&
                    _this.isMenuActive)
                    ? _this.internalSearch
                    : (!_this.selectedItems.length ||
                        _this.multiple ||
                        _this.hasSlot)
                        ? null
                        : _this.getText(_this.selectedItem);
            });
        },
        updateSelf: function () {
            this.updateAutocomplete();
        },
        updateAutocomplete: function () {
            if (!this.searchIsDirty &&
                !this.internalValue)
                return;
            if (!this.valueComparator(this.internalSearch, this.getValue(this.internalValue))) {
                this.setSearch();
            }
        },
        hasItem: function (item) {
            return this.selectedValues.indexOf(this.getValue(item)) > -1;
        }
    }
});
//# sourceMappingURL=VAutocomplete.js.map