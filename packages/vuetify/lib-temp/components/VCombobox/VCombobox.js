// Styles
import '../../stylus/components/_autocompletes.styl';
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
            default: () => ([])
        },
        returnObject: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        editingIndex: -1
    }),
    computed: {
        counterValue() {
            return this.multiple
                ? this.selectedItems.length
                : (this.internalSearch || '').toString().length;
        },
        hasSlot() {
            return VSelect.computed.hasSlot.call(this) || this.multiple;
        },
        isAnyValueAllowed() {
            return true;
        },
        menuCanShow() {
            if (!this.isFocused)
                return false;
            return (this.displayedItemsCount > 0) ||
                (!!this.$slots['no-data'] && !this.hideNoData);
        }
    },
    methods: {
        onFilteredItemsChanged() {
            // nop
        },
        onInternalSearchChanged(val) {
            if (val &&
                this.multiple &&
                this.delimiters) {
                const delimiter = this.delimiters.find(d => val.endsWith(d));
                if (delimiter == null)
                    return;
                this.internalSearch = val.slice(0, val.length - delimiter.length);
                this.updateTags();
            }
            this.updateMenuDimensions();
        },
        genChipSelection(item, index) {
            const chip = VSelect.methods.genChipSelection.call(this, item, index);
            // Allow user to update an existing value
            if (this.multiple) {
                chip.componentOptions.listeners.dblclick = () => {
                    this.editingIndex = index;
                    this.internalSearch = this.getText(item);
                    this.selectedIndex = -1;
                };
            }
            return chip;
        },
        onChipInput(item) {
            VSelect.methods.onChipInput.call(this, item);
            this.editingIndex = -1;
        },
        // Requires a manual definition
        // to overwrite removal in v-autocomplete
        onEnterDown(e) {
            e.preventDefault();
            VSelect.methods.onEnterDown.call(this);
            // If has menu index, let v-select-list handle
            if (this.getMenuIndex() > -1)
                return;
            this.updateSelf();
        },
        onKeyDown(e) {
            const keyCode = e.keyCode;
            VSelect.methods.onKeyDown.call(this, e);
            // If user is at selection index of 0
            // create a new tag
            if (this.multiple &&
                keyCode === keyCodes.left &&
                this.$refs.input.selectionStart === 0) {
                this.updateSelf();
            }
            // The ordering is important here
            // allows new value to be updated
            // and then moves the index to the
            // proper location
            this.changeSelectedIndex(keyCode);
        },
        onTabDown(e) {
            // When adding tags, if searching and
            // there is not a filtered options,
            // add the value to the tags list
            if (this.multiple &&
                this.internalSearch &&
                this.getMenuIndex() === -1) {
                e.preventDefault();
                e.stopPropagation();
                return this.updateTags();
            }
            VAutocomplete.methods.onTabDown.call(this, e);
        },
        selectItem(item) {
            // Currently only supports items:<string[]>
            if (this.editingIndex > -1) {
                this.updateEditing();
            }
            else {
                VSelect.methods.selectItem.call(this, item);
            }
        },
        setSelectedItems() {
            if (this.internalValue == null ||
                this.internalValue === '') {
                this.selectedItems = [];
            }
            else {
                this.selectedItems = this.multiple ? this.internalValue : [this.internalValue];
            }
        },
        setValue(value = this.internalSearch) {
            VSelect.methods.setValue.call(this, value);
        },
        updateEditing() {
            const value = this.internalValue.slice();
            value[this.editingIndex] = this.internalSearch;
            this.setValue(value);
            this.editingIndex = -1;
        },
        updateCombobox() {
            const isUsingSlot = Boolean(this.$scopedSlots.selection) || this.hasChips;
            // If search is not dirty and is
            // using slot, do nothing
            if (isUsingSlot && !this.searchIsDirty)
                return;
            // The internal search is not matching
            // the internal value, update the input
            if (this.internalSearch !== this.getText(this.internalValue))
                this.setValue();
            // Reset search if using slot
            // to avoid a double input
            if (isUsingSlot)
                this.internalSearch = undefined;
        },
        updateSelf() {
            this.multiple ? this.updateTags() : this.updateCombobox();
        },
        updateTags() {
            const menuIndex = this.getMenuIndex();
            // If the user is not searching
            // and no menu item is selected
            // do nothing
            if (menuIndex < 0 &&
                !this.searchIsDirty)
                return;
            if (this.editingIndex > -1) {
                return this.updateEditing();
            }
            const index = this.selectedItems.indexOf(this.internalSearch);
            // If it already exists, do nothing
            // this might need to change to bring
            // the duplicated item to the last entered
            if (index > -1) {
                const internalValue = this.internalValue.slice();
                internalValue.splice(index, 1);
                this.setValue(internalValue);
            }
            // If menu index is greater than 1
            // the selection is handled elsewhere
            // TODO: find out where
            if (menuIndex > -1)
                return (this.internalSearch = null);
            this.selectItem(this.internalSearch);
            this.internalSearch = null;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNvbWJvYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkNvbWJvYm94L1ZDb21ib2JveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyw2Q0FBNkMsQ0FBQTtBQUVwRCxhQUFhO0FBQ2IsT0FBTyxPQUFPLE1BQU0sb0JBQW9CLENBQUE7QUFDeEMsT0FBTyxhQUFhLE1BQU0sZ0NBQWdDLENBQUE7QUFFMUQsUUFBUTtBQUNSLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU3QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxZQUFZO0lBRWxCLE9BQU8sRUFBRSxhQUFhO0lBRXRCLEtBQUssRUFBRTtRQUNMLFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxLQUFLO1lBQ1gsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO0tBQ0Y7SUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFlBQVksRUFBRSxDQUFDLENBQUM7S0FDakIsQ0FBQztJQUVGLFFBQVEsRUFBRTtRQUNSLFlBQVk7WUFDVixPQUFPLElBQUksQ0FBQyxRQUFRO2dCQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2dCQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQTtRQUNuRCxDQUFDO1FBQ0QsT0FBTztZQUNMLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDN0QsQ0FBQztRQUNELGlCQUFpQjtZQUNmLE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNELFdBQVc7WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsT0FBTyxLQUFLLENBQUE7WUFFakMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEQsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1Asc0JBQXNCO1lBQ3BCLE1BQU07UUFDUixDQUFDO1FBQ0QsdUJBQXVCLENBQUUsR0FBRztZQUMxQixJQUNFLEdBQUc7Z0JBQ0gsSUFBSSxDQUFDLFFBQVE7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsRUFDZjtnQkFDQSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDNUQsSUFBSSxTQUFTLElBQUksSUFBSTtvQkFBRSxPQUFNO2dCQUU3QixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNqRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7YUFDbEI7WUFFRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtRQUM3QixDQUFDO1FBQ0QsZ0JBQWdCLENBQUUsSUFBSSxFQUFFLEtBQUs7WUFDM0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUVyRSx5Q0FBeUM7WUFDekMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7b0JBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO29CQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pCLENBQUMsQ0FBQTthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ0QsV0FBVyxDQUFFLElBQUk7WUFDZixPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRTVDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUNELCtCQUErQjtRQUMvQix5Q0FBeUM7UUFDekMsV0FBVyxDQUFFLENBQUM7WUFDWixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7WUFFbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRXRDLDhDQUE4QztZQUM5QyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQUUsT0FBTTtZQUVwQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbkIsQ0FBQztRQUNELFNBQVMsQ0FBRSxDQUFDO1lBQ1YsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtZQUV6QixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBRXZDLHFDQUFxQztZQUNyQyxtQkFBbUI7WUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFDZixPQUFPLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsS0FBSyxDQUFDLEVBQ3JDO2dCQUNBLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTthQUNsQjtZQUVELGlDQUFpQztZQUNqQyxpQ0FBaUM7WUFDakMsa0NBQWtDO1lBQ2xDLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkMsQ0FBQztRQUNELFNBQVMsQ0FBRSxDQUFDO1lBQ1YscUNBQXFDO1lBQ3JDLG1DQUFtQztZQUNuQyxpQ0FBaUM7WUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFDZixJQUFJLENBQUMsY0FBYztnQkFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUMxQjtnQkFDQSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7Z0JBQ2xCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtnQkFFbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7YUFDekI7WUFFRCxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQy9DLENBQUM7UUFDRCxVQUFVLENBQUUsSUFBSTtZQUNkLDJDQUEyQztZQUMzQyxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTthQUNyQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQzVDO1FBQ0gsQ0FBQztRQUNELGdCQUFnQjtZQUNkLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJO2dCQUM1QixJQUFJLENBQUMsYUFBYSxLQUFLLEVBQUUsRUFDekI7Z0JBQ0EsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUE7YUFDeEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTthQUMvRTtRQUNILENBQUM7UUFDRCxRQUFRLENBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjO1lBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDNUMsQ0FBQztRQUNELGFBQWE7WUFDWCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQTtZQUU5QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBRXBCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUNELGNBQWM7WUFDWixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFBO1lBRXpFLGdDQUFnQztZQUNoQyx5QkFBeUI7WUFDekIsSUFBSSxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtnQkFBRSxPQUFNO1lBRTlDLHNDQUFzQztZQUN0Qyx1Q0FBdUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFN0UsNkJBQTZCO1lBQzdCLDBCQUEwQjtZQUMxQixJQUFJLFdBQVc7Z0JBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUE7UUFDbEQsQ0FBQztRQUNELFVBQVU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUMzRCxDQUFDO1FBQ0QsVUFBVTtZQUNSLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUVyQywrQkFBK0I7WUFDL0IsK0JBQStCO1lBQy9CLGFBQWE7WUFDYixJQUFJLFNBQVMsR0FBRyxDQUFDO2dCQUNmLENBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQ25CLE9BQU07WUFFUixJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2FBQzVCO1lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzdELG1DQUFtQztZQUNuQyxxQ0FBcUM7WUFDckMsMENBQTBDO1lBQzFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNkLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ2hELGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUU5QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2FBQzdCO1lBRUQsa0NBQWtDO1lBQ2xDLHFDQUFxQztZQUNyQyx1QkFBdUI7WUFDdkIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFBO1lBRXZELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBO1FBQzVCLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2F1dG9jb21wbGV0ZXMuc3R5bCdcblxuLy8gRXh0ZW5zaW9uc1xuaW1wb3J0IFZTZWxlY3QgZnJvbSAnLi4vVlNlbGVjdC9WU2VsZWN0J1xuaW1wb3J0IFZBdXRvY29tcGxldGUgZnJvbSAnLi4vVkF1dG9jb21wbGV0ZS9WQXV0b2NvbXBsZXRlJ1xuXG4vLyBVdGlsc1xuaW1wb3J0IHsga2V5Q29kZXMgfSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWNvbWJvYm94JyxcblxuICBleHRlbmRzOiBWQXV0b2NvbXBsZXRlLFxuXG4gIHByb3BzOiB7XG4gICAgZGVsaW1pdGVyczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiAoW10pXG4gICAgfSxcbiAgICByZXR1cm5PYmplY3Q6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgZWRpdGluZ0luZGV4OiAtMVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvdW50ZXJWYWx1ZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZVxuICAgICAgICA/IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGhcbiAgICAgICAgOiAodGhpcy5pbnRlcm5hbFNlYXJjaCB8fCAnJykudG9TdHJpbmcoKS5sZW5ndGhcbiAgICB9LFxuICAgIGhhc1Nsb3QgKCkge1xuICAgICAgcmV0dXJuIFZTZWxlY3QuY29tcHV0ZWQuaGFzU2xvdC5jYWxsKHRoaXMpIHx8IHRoaXMubXVsdGlwbGVcbiAgICB9LFxuICAgIGlzQW55VmFsdWVBbGxvd2VkICgpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcbiAgICBtZW51Q2FuU2hvdyAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkKSByZXR1cm4gZmFsc2VcblxuICAgICAgcmV0dXJuICh0aGlzLmRpc3BsYXllZEl0ZW1zQ291bnQgPiAwKSB8fFxuICAgICAgICAoISF0aGlzLiRzbG90c1snbm8tZGF0YSddICYmICF0aGlzLmhpZGVOb0RhdGEpXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBvbkZpbHRlcmVkSXRlbXNDaGFuZ2VkICgpIHtcbiAgICAgIC8vIG5vcFxuICAgIH0sXG4gICAgb25JbnRlcm5hbFNlYXJjaENoYW5nZWQgKHZhbCkge1xuICAgICAgaWYgKFxuICAgICAgICB2YWwgJiZcbiAgICAgICAgdGhpcy5tdWx0aXBsZSAmJlxuICAgICAgICB0aGlzLmRlbGltaXRlcnNcbiAgICAgICkge1xuICAgICAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLmRlbGltaXRlcnMuZmluZChkID0+IHZhbC5lbmRzV2l0aChkKSlcbiAgICAgICAgaWYgKGRlbGltaXRlciA9PSBudWxsKSByZXR1cm5cblxuICAgICAgICB0aGlzLmludGVybmFsU2VhcmNoID0gdmFsLnNsaWNlKDAsIHZhbC5sZW5ndGggLSBkZWxpbWl0ZXIubGVuZ3RoKVxuICAgICAgICB0aGlzLnVwZGF0ZVRhZ3MoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnVwZGF0ZU1lbnVEaW1lbnNpb25zKClcbiAgICB9LFxuICAgIGdlbkNoaXBTZWxlY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICBjb25zdCBjaGlwID0gVlNlbGVjdC5tZXRob2RzLmdlbkNoaXBTZWxlY3Rpb24uY2FsbCh0aGlzLCBpdGVtLCBpbmRleClcblxuICAgICAgLy8gQWxsb3cgdXNlciB0byB1cGRhdGUgYW4gZXhpc3RpbmcgdmFsdWVcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIGNoaXAuY29tcG9uZW50T3B0aW9ucy5saXN0ZW5lcnMuZGJsY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lZGl0aW5nSW5kZXggPSBpbmRleFxuICAgICAgICAgIHRoaXMuaW50ZXJuYWxTZWFyY2ggPSB0aGlzLmdldFRleHQoaXRlbSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGlwXG4gICAgfSxcbiAgICBvbkNoaXBJbnB1dCAoaXRlbSkge1xuICAgICAgVlNlbGVjdC5tZXRob2RzLm9uQ2hpcElucHV0LmNhbGwodGhpcywgaXRlbSlcblxuICAgICAgdGhpcy5lZGl0aW5nSW5kZXggPSAtMVxuICAgIH0sXG4gICAgLy8gUmVxdWlyZXMgYSBtYW51YWwgZGVmaW5pdGlvblxuICAgIC8vIHRvIG92ZXJ3cml0ZSByZW1vdmFsIGluIHYtYXV0b2NvbXBsZXRlXG4gICAgb25FbnRlckRvd24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBWU2VsZWN0Lm1ldGhvZHMub25FbnRlckRvd24uY2FsbCh0aGlzKVxuXG4gICAgICAvLyBJZiBoYXMgbWVudSBpbmRleCwgbGV0IHYtc2VsZWN0LWxpc3QgaGFuZGxlXG4gICAgICBpZiAodGhpcy5nZXRNZW51SW5kZXgoKSA+IC0xKSByZXR1cm5cblxuICAgICAgdGhpcy51cGRhdGVTZWxmKClcbiAgICB9LFxuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgY29uc3Qga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgICBWU2VsZWN0Lm1ldGhvZHMub25LZXlEb3duLmNhbGwodGhpcywgZSlcblxuICAgICAgLy8gSWYgdXNlciBpcyBhdCBzZWxlY3Rpb24gaW5kZXggb2YgMFxuICAgICAgLy8gY3JlYXRlIGEgbmV3IHRhZ1xuICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiZcbiAgICAgICAga2V5Q29kZSA9PT0ga2V5Q29kZXMubGVmdCAmJlxuICAgICAgICB0aGlzLiRyZWZzLmlucHV0LnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmKClcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIG9yZGVyaW5nIGlzIGltcG9ydGFudCBoZXJlXG4gICAgICAvLyBhbGxvd3MgbmV3IHZhbHVlIHRvIGJlIHVwZGF0ZWRcbiAgICAgIC8vIGFuZCB0aGVuIG1vdmVzIHRoZSBpbmRleCB0byB0aGVcbiAgICAgIC8vIHByb3BlciBsb2NhdGlvblxuICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZEluZGV4KGtleUNvZGUpXG4gICAgfSxcbiAgICBvblRhYkRvd24gKGUpIHtcbiAgICAgIC8vIFdoZW4gYWRkaW5nIHRhZ3MsIGlmIHNlYXJjaGluZyBhbmRcbiAgICAgIC8vIHRoZXJlIGlzIG5vdCBhIGZpbHRlcmVkIG9wdGlvbnMsXG4gICAgICAvLyBhZGQgdGhlIHZhbHVlIHRvIHRoZSB0YWdzIGxpc3RcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmXG4gICAgICAgIHRoaXMuaW50ZXJuYWxTZWFyY2ggJiZcbiAgICAgICAgdGhpcy5nZXRNZW51SW5kZXgoKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVRhZ3MoKVxuICAgICAgfVxuXG4gICAgICBWQXV0b2NvbXBsZXRlLm1ldGhvZHMub25UYWJEb3duLmNhbGwodGhpcywgZSlcbiAgICB9LFxuICAgIHNlbGVjdEl0ZW0gKGl0ZW0pIHtcbiAgICAgIC8vIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIGl0ZW1zOjxzdHJpbmdbXT5cbiAgICAgIGlmICh0aGlzLmVkaXRpbmdJbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRWRpdGluZygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBWU2VsZWN0Lm1ldGhvZHMuc2VsZWN0SXRlbS5jYWxsKHRoaXMsIGl0ZW0pXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTZWxlY3RlZEl0ZW1zICgpIHtcbiAgICAgIGlmICh0aGlzLmludGVybmFsVmFsdWUgPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLmludGVybmFsVmFsdWUgPT09ICcnXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW11cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMubXVsdGlwbGUgPyB0aGlzLmludGVybmFsVmFsdWUgOiBbdGhpcy5pbnRlcm5hbFZhbHVlXVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0VmFsdWUgKHZhbHVlID0gdGhpcy5pbnRlcm5hbFNlYXJjaCkge1xuICAgICAgVlNlbGVjdC5tZXRob2RzLnNldFZhbHVlLmNhbGwodGhpcywgdmFsdWUpXG4gICAgfSxcbiAgICB1cGRhdGVFZGl0aW5nICgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5pbnRlcm5hbFZhbHVlLnNsaWNlKClcbiAgICAgIHZhbHVlW3RoaXMuZWRpdGluZ0luZGV4XSA9IHRoaXMuaW50ZXJuYWxTZWFyY2hcblxuICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgICAgdGhpcy5lZGl0aW5nSW5kZXggPSAtMVxuICAgIH0sXG4gICAgdXBkYXRlQ29tYm9ib3ggKCkge1xuICAgICAgY29uc3QgaXNVc2luZ1Nsb3QgPSBCb29sZWFuKHRoaXMuJHNjb3BlZFNsb3RzLnNlbGVjdGlvbikgfHwgdGhpcy5oYXNDaGlwc1xuXG4gICAgICAvLyBJZiBzZWFyY2ggaXMgbm90IGRpcnR5IGFuZCBpc1xuICAgICAgLy8gdXNpbmcgc2xvdCwgZG8gbm90aGluZ1xuICAgICAgaWYgKGlzVXNpbmdTbG90ICYmICF0aGlzLnNlYXJjaElzRGlydHkpIHJldHVyblxuXG4gICAgICAvLyBUaGUgaW50ZXJuYWwgc2VhcmNoIGlzIG5vdCBtYXRjaGluZ1xuICAgICAgLy8gdGhlIGludGVybmFsIHZhbHVlLCB1cGRhdGUgdGhlIGlucHV0XG4gICAgICBpZiAodGhpcy5pbnRlcm5hbFNlYXJjaCAhPT0gdGhpcy5nZXRUZXh0KHRoaXMuaW50ZXJuYWxWYWx1ZSkpIHRoaXMuc2V0VmFsdWUoKVxuXG4gICAgICAvLyBSZXNldCBzZWFyY2ggaWYgdXNpbmcgc2xvdFxuICAgICAgLy8gdG8gYXZvaWQgYSBkb3VibGUgaW5wdXRcbiAgICAgIGlmIChpc1VzaW5nU2xvdCkgdGhpcy5pbnRlcm5hbFNlYXJjaCA9IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgdXBkYXRlU2VsZiAoKSB7XG4gICAgICB0aGlzLm11bHRpcGxlID8gdGhpcy51cGRhdGVUYWdzKCkgOiB0aGlzLnVwZGF0ZUNvbWJvYm94KClcbiAgICB9LFxuICAgIHVwZGF0ZVRhZ3MgKCkge1xuICAgICAgY29uc3QgbWVudUluZGV4ID0gdGhpcy5nZXRNZW51SW5kZXgoKVxuXG4gICAgICAvLyBJZiB0aGUgdXNlciBpcyBub3Qgc2VhcmNoaW5nXG4gICAgICAvLyBhbmQgbm8gbWVudSBpdGVtIGlzIHNlbGVjdGVkXG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgICBpZiAobWVudUluZGV4IDwgMCAmJlxuICAgICAgICAhdGhpcy5zZWFyY2hJc0RpcnR5XG4gICAgICApIHJldHVyblxuXG4gICAgICBpZiAodGhpcy5lZGl0aW5nSW5kZXggPiAtMSkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVFZGl0aW5nKClcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGVjdGVkSXRlbXMuaW5kZXhPZih0aGlzLmludGVybmFsU2VhcmNoKVxuICAgICAgLy8gSWYgaXQgYWxyZWFkeSBleGlzdHMsIGRvIG5vdGhpbmdcbiAgICAgIC8vIHRoaXMgbWlnaHQgbmVlZCB0byBjaGFuZ2UgdG8gYnJpbmdcbiAgICAgIC8vIHRoZSBkdXBsaWNhdGVkIGl0ZW0gdG8gdGhlIGxhc3QgZW50ZXJlZFxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgY29uc3QgaW50ZXJuYWxWYWx1ZSA9IHRoaXMuaW50ZXJuYWxWYWx1ZS5zbGljZSgpXG4gICAgICAgIGludGVybmFsVmFsdWUuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoaW50ZXJuYWxWYWx1ZSlcbiAgICAgIH1cblxuICAgICAgLy8gSWYgbWVudSBpbmRleCBpcyBncmVhdGVyIHRoYW4gMVxuICAgICAgLy8gdGhlIHNlbGVjdGlvbiBpcyBoYW5kbGVkIGVsc2V3aGVyZVxuICAgICAgLy8gVE9ETzogZmluZCBvdXQgd2hlcmVcbiAgICAgIGlmIChtZW51SW5kZXggPiAtMSkgcmV0dXJuICh0aGlzLmludGVybmFsU2VhcmNoID0gbnVsbClcblxuICAgICAgdGhpcy5zZWxlY3RJdGVtKHRoaXMuaW50ZXJuYWxTZWFyY2gpXG4gICAgICB0aGlzLmludGVybmFsU2VhcmNoID0gbnVsbFxuICAgIH1cbiAgfVxufVxuIl19