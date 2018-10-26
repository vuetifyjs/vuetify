// Styles
import '../../../src/stylus/components/_autocompletes.styl';
// Extensions
import VSelect from '../VSelect/VSelect';
import VAutocomplete from '../VAutocomplete/VAutocomplete';
// Utils
import { keyCodes } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-combobox',
    extends: VAutocomplete,
    props: {
        delimiters: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        returnObject: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            editingIndex: -1
        };
    },
    computed: {
        counterValue: function counterValue() {
            return this.multiple ? this.selectedItems.length : (this.internalSearch || '').toString().length;
        },
        hasSlot: function hasSlot() {
            return VSelect.computed.hasSlot.call(this) || this.multiple;
        },
        isAnyValueAllowed: function isAnyValueAllowed() {
            return true;
        },
        menuCanShow: function menuCanShow() {
            if (!this.isFocused) return false;
            return this.displayedItemsCount > 0 || !!this.$slots['no-data'] && !this.hideNoData;
        }
    },
    methods: {
        onFilteredItemsChanged: function onFilteredItemsChanged() {
            // nop
        },
        onInternalSearchChanged: function onInternalSearchChanged(val) {
            if (val && this.multiple && this.delimiters) {
                var delimiter = this.delimiters.find(function (d) {
                    return val.endsWith(d);
                });
                if (delimiter == null) return;
                this.internalSearch = val.slice(0, val.length - delimiter.length);
                this.updateTags();
            }
            this.updateMenuDimensions();
        },
        genChipSelection: function genChipSelection(item, index) {
            var _this = this;

            var chip = VSelect.methods.genChipSelection.call(this, item, index);
            // Allow user to update an existing value
            if (this.multiple) {
                chip.componentOptions.listeners.dblclick = function () {
                    _this.editingIndex = index;
                    _this.internalSearch = _this.getText(item);
                    _this.selectedIndex = -1;
                };
            }
            return chip;
        },
        onChipInput: function onChipInput(item) {
            VSelect.methods.onChipInput.call(this, item);
            this.editingIndex = -1;
        },

        // Requires a manual definition
        // to overwrite removal in v-autocomplete
        onEnterDown: function onEnterDown(e) {
            e.preventDefault();
            VSelect.methods.onEnterDown.call(this);
            // If has menu index, let v-select-list handle
            if (this.getMenuIndex() > -1) return;
            this.updateSelf();
        },
        onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode;
            VSelect.methods.onKeyDown.call(this, e);
            // If user is at selection index of 0
            // create a new tag
            if (this.multiple && keyCode === keyCodes.left && this.$refs.input.selectionStart === 0) {
                this.updateSelf();
            }
            // The ordering is important here
            // allows new value to be updated
            // and then moves the index to the
            // proper location
            this.changeSelectedIndex(keyCode);
        },
        onTabDown: function onTabDown(e) {
            // When adding tags, if searching and
            // there is not a filtered options,
            // add the value to the tags list
            if (this.multiple && this.internalSearch && this.getMenuIndex() === -1) {
                e.preventDefault();
                e.stopPropagation();
                return this.updateTags();
            }
            VAutocomplete.methods.onTabDown.call(this, e);
        },
        selectItem: function selectItem(item) {
            // Currently only supports items:<string[]>
            if (this.editingIndex > -1) {
                this.updateEditing();
            } else {
                VSelect.methods.selectItem.call(this, item);
            }
        },
        setSelectedItems: function setSelectedItems() {
            if (this.internalValue == null || this.internalValue === '') {
                this.selectedItems = [];
            } else {
                this.selectedItems = this.multiple ? this.internalValue : [this.internalValue];
            }
        },
        setValue: function setValue() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.internalSearch;

            VSelect.methods.setValue.call(this, value);
        },
        updateEditing: function updateEditing() {
            var value = this.internalValue.slice();
            value[this.editingIndex] = this.internalSearch;
            this.setValue(value);
            this.editingIndex = -1;
        },
        updateCombobox: function updateCombobox() {
            var isUsingSlot = Boolean(this.$scopedSlots.selection) || this.hasChips;
            // If search is not dirty and is
            // using slot, do nothing
            if (isUsingSlot && !this.searchIsDirty) return;
            // The internal search is not matching
            // the internal value, update the input
            if (this.internalSearch !== this.getText(this.internalValue)) this.setValue();
            // Reset search if using slot
            // to avoid a double input
            if (isUsingSlot) this.internalSearch = undefined;
        },
        updateSelf: function updateSelf() {
            this.multiple ? this.updateTags() : this.updateCombobox();
        },
        updateTags: function updateTags() {
            var menuIndex = this.getMenuIndex();
            // If the user is not searching
            // and no menu item is selected
            // do nothing
            if (menuIndex < 0 && !this.searchIsDirty) return;
            if (this.editingIndex > -1) {
                return this.updateEditing();
            }
            var index = this.selectedItems.indexOf(this.internalSearch);
            // If it already exists, do nothing
            // this might need to change to bring
            // the duplicated item to the last entered
            if (index > -1) {
                var internalValue = this.internalValue.slice();
                internalValue.splice(index, 1);
                this.setValue(internalValue);
            }
            // If menu index is greater than 1
            // the selection is handled elsewhere
            // TODO: find out where
            if (menuIndex > -1) return this.internalSearch = null;
            this.selectItem(this.internalSearch);
            this.internalSearch = null;
        }
    }
};
//# sourceMappingURL=VCombobox.js.map