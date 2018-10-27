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
        onEnterDown() {
            this.updateSelf();
            VSelect.methods.onEnterDown.call(this);
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
            this.setSearch();
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
        updateEditing() {
            const value = this.internalValue.slice();
            value[this.editingIndex] = this.internalSearch;
            this.internalValue = value;
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
                this.internalValue.splice(index, 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNvbWJvYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkNvbWJvYm94L1ZDb21ib2JveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyw2Q0FBNkMsQ0FBQTtBQUVwRCxhQUFhO0FBQ2IsT0FBTyxPQUFPLE1BQU0sb0JBQW9CLENBQUE7QUFDeEMsT0FBTyxhQUFhLE1BQU0sZ0NBQWdDLENBQUE7QUFFMUQsUUFBUTtBQUNSLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU3QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxZQUFZO0lBRWxCLE9BQU8sRUFBRSxhQUFhO0lBRXRCLEtBQUssRUFBRTtRQUNMLFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxLQUFLO1lBQ1gsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO0tBQ0Y7SUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFlBQVksRUFBRSxDQUFDLENBQUM7S0FDakIsQ0FBQztJQUVGLFFBQVEsRUFBRTtRQUNSLFlBQVk7WUFDVixPQUFPLElBQUksQ0FBQyxRQUFRO2dCQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2dCQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQTtRQUNuRCxDQUFDO1FBQ0QsT0FBTztZQUNMLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDN0QsQ0FBQztRQUNELGlCQUFpQjtZQUNmLE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNELFdBQVc7WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsT0FBTyxLQUFLLENBQUE7WUFFakMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEQsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1Asc0JBQXNCO1lBQ3BCLE1BQU07UUFDUixDQUFDO1FBQ0QsdUJBQXVCLENBQUUsR0FBRztZQUMxQixJQUNFLEdBQUc7Z0JBQ0gsSUFBSSxDQUFDLFFBQVE7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsRUFDZjtnQkFDQSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDNUQsSUFBSSxTQUFTLElBQUksSUFBSTtvQkFBRSxPQUFNO2dCQUU3QixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNqRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7YUFDbEI7WUFFRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtRQUM3QixDQUFDO1FBQ0QsZ0JBQWdCLENBQUUsSUFBSSxFQUFFLEtBQUs7WUFDM0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUVyRSx5Q0FBeUM7WUFDekMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7b0JBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO29CQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pCLENBQUMsQ0FBQTthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ0QsV0FBVyxDQUFFLElBQUk7WUFDZixPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRTVDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUNELCtCQUErQjtRQUMvQix5Q0FBeUM7UUFDekMsV0FBVztZQUNULElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUNqQixPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUNELFNBQVMsQ0FBRSxDQUFDO1lBQ1YsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtZQUV6QixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBRXZDLHFDQUFxQztZQUNyQyxtQkFBbUI7WUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFDZixPQUFPLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsS0FBSyxDQUFDLEVBQ3JDO2dCQUNBLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTthQUNsQjtZQUVELGlDQUFpQztZQUNqQyxpQ0FBaUM7WUFDakMsa0NBQWtDO1lBQ2xDLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkMsQ0FBQztRQUNELFNBQVMsQ0FBRSxDQUFDO1lBQ1YscUNBQXFDO1lBQ3JDLG1DQUFtQztZQUNuQyxpQ0FBaUM7WUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFDZixJQUFJLENBQUMsY0FBYztnQkFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUMxQjtnQkFDQSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7Z0JBQ2xCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtnQkFFbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7YUFDekI7WUFFRCxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQy9DLENBQUM7UUFDRCxVQUFVLENBQUUsSUFBSTtZQUNkLDJDQUEyQztZQUMzQyxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTthQUNyQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQzVDO1lBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2xCLENBQUM7UUFDRCxnQkFBZ0I7WUFDZCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSTtnQkFDNUIsSUFBSSxDQUFDLGFBQWEsS0FBSyxFQUFFLEVBQ3pCO2dCQUNBLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFBO2FBQ3hCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7YUFDL0U7UUFDSCxDQUFDO1FBQ0QsYUFBYTtZQUNYLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFBO1lBRTlDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBRTFCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUNELGNBQWM7WUFDWixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFBO1lBRXpFLGdDQUFnQztZQUNoQyx5QkFBeUI7WUFDekIsSUFBSSxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtnQkFBRSxPQUFNO1lBRTlDLHNDQUFzQztZQUN0Qyx1Q0FBdUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFN0UsNkJBQTZCO1lBQzdCLDBCQUEwQjtZQUMxQixJQUFJLFdBQVc7Z0JBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUE7UUFDbEQsQ0FBQztRQUNELFVBQVU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUMzRCxDQUFDO1FBQ0QsVUFBVTtZQUNSLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUVyQywrQkFBK0I7WUFDL0IsK0JBQStCO1lBQy9CLGFBQWE7WUFDYixJQUFJLFNBQVMsR0FBRyxDQUFDO2dCQUNmLENBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQ25CLE9BQU07WUFFUixJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2FBQzVCO1lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzdELG1DQUFtQztZQUNuQyxxQ0FBcUM7WUFDckMsMENBQTBDO1lBQzFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNwQztZQUVELGtDQUFrQztZQUNsQyxxQ0FBcUM7WUFDckMsdUJBQXVCO1lBQ3ZCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUV2RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQTtRQUM1QixDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19hdXRvY29tcGxldGVzLnN0eWwnXG5cbi8vIEV4dGVuc2lvbnNcbmltcG9ydCBWU2VsZWN0IGZyb20gJy4uL1ZTZWxlY3QvVlNlbGVjdCdcbmltcG9ydCBWQXV0b2NvbXBsZXRlIGZyb20gJy4uL1ZBdXRvY29tcGxldGUvVkF1dG9jb21wbGV0ZSdcblxuLy8gVXRpbHNcbmltcG9ydCB7IGtleUNvZGVzIH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1jb21ib2JveCcsXG5cbiAgZXh0ZW5kczogVkF1dG9jb21wbGV0ZSxcblxuICBwcm9wczoge1xuICAgIGRlbGltaXRlcnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gKFtdKVxuICAgIH0sXG4gICAgcmV0dXJuT2JqZWN0OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGVkaXRpbmdJbmRleDogLTFcbiAgfSksXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjb3VudGVyVmFsdWUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGVcbiAgICAgICAgPyB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoXG4gICAgICAgIDogKHRoaXMuaW50ZXJuYWxTZWFyY2ggfHwgJycpLnRvU3RyaW5nKCkubGVuZ3RoXG4gICAgfSxcbiAgICBoYXNTbG90ICgpIHtcbiAgICAgIHJldHVybiBWU2VsZWN0LmNvbXB1dGVkLmhhc1Nsb3QuY2FsbCh0aGlzKSB8fCB0aGlzLm11bHRpcGxlXG4gICAgfSxcbiAgICBpc0FueVZhbHVlQWxsb3dlZCAoKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG4gICAgbWVudUNhblNob3cgKCkge1xuICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZCkgcmV0dXJuIGZhbHNlXG5cbiAgICAgIHJldHVybiAodGhpcy5kaXNwbGF5ZWRJdGVtc0NvdW50ID4gMCkgfHxcbiAgICAgICAgKCEhdGhpcy4kc2xvdHNbJ25vLWRhdGEnXSAmJiAhdGhpcy5oaWRlTm9EYXRhKVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgb25GaWx0ZXJlZEl0ZW1zQ2hhbmdlZCAoKSB7XG4gICAgICAvLyBub3BcbiAgICB9LFxuICAgIG9uSW50ZXJuYWxTZWFyY2hDaGFuZ2VkICh2YWwpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdmFsICYmXG4gICAgICAgIHRoaXMubXVsdGlwbGUgJiZcbiAgICAgICAgdGhpcy5kZWxpbWl0ZXJzXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZGVsaW1pdGVyID0gdGhpcy5kZWxpbWl0ZXJzLmZpbmQoZCA9PiB2YWwuZW5kc1dpdGgoZCkpXG4gICAgICAgIGlmIChkZWxpbWl0ZXIgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5pbnRlcm5hbFNlYXJjaCA9IHZhbC5zbGljZSgwLCB2YWwubGVuZ3RoIC0gZGVsaW1pdGVyLmxlbmd0aClcbiAgICAgICAgdGhpcy51cGRhdGVUYWdzKClcbiAgICAgIH1cblxuICAgICAgdGhpcy51cGRhdGVNZW51RGltZW5zaW9ucygpXG4gICAgfSxcbiAgICBnZW5DaGlwU2VsZWN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgY29uc3QgY2hpcCA9IFZTZWxlY3QubWV0aG9kcy5nZW5DaGlwU2VsZWN0aW9uLmNhbGwodGhpcywgaXRlbSwgaW5kZXgpXG5cbiAgICAgIC8vIEFsbG93IHVzZXIgdG8gdXBkYXRlIGFuIGV4aXN0aW5nIHZhbHVlXG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICBjaGlwLmNvbXBvbmVudE9wdGlvbnMubGlzdGVuZXJzLmRibGNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWRpdGluZ0luZGV4ID0gaW5kZXhcbiAgICAgICAgICB0aGlzLmludGVybmFsU2VhcmNoID0gdGhpcy5nZXRUZXh0KGl0ZW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTFcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hpcFxuICAgIH0sXG4gICAgb25DaGlwSW5wdXQgKGl0ZW0pIHtcbiAgICAgIFZTZWxlY3QubWV0aG9kcy5vbkNoaXBJbnB1dC5jYWxsKHRoaXMsIGl0ZW0pXG5cbiAgICAgIHRoaXMuZWRpdGluZ0luZGV4ID0gLTFcbiAgICB9LFxuICAgIC8vIFJlcXVpcmVzIGEgbWFudWFsIGRlZmluaXRpb25cbiAgICAvLyB0byBvdmVyd3JpdGUgcmVtb3ZhbCBpbiB2LWF1dG9jb21wbGV0ZVxuICAgIG9uRW50ZXJEb3duICgpIHtcbiAgICAgIHRoaXMudXBkYXRlU2VsZigpXG4gICAgICBWU2VsZWN0Lm1ldGhvZHMub25FbnRlckRvd24uY2FsbCh0aGlzKVxuICAgIH0sXG4gICAgb25LZXlEb3duIChlKSB7XG4gICAgICBjb25zdCBrZXlDb2RlID0gZS5rZXlDb2RlXG5cbiAgICAgIFZTZWxlY3QubWV0aG9kcy5vbktleURvd24uY2FsbCh0aGlzLCBlKVxuXG4gICAgICAvLyBJZiB1c2VyIGlzIGF0IHNlbGVjdGlvbiBpbmRleCBvZiAwXG4gICAgICAvLyBjcmVhdGUgYSBuZXcgdGFnXG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJlxuICAgICAgICBrZXlDb2RlID09PSBrZXlDb2Rlcy5sZWZ0ICYmXG4gICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGYoKVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgb3JkZXJpbmcgaXMgaW1wb3J0YW50IGhlcmVcbiAgICAgIC8vIGFsbG93cyBuZXcgdmFsdWUgdG8gYmUgdXBkYXRlZFxuICAgICAgLy8gYW5kIHRoZW4gbW92ZXMgdGhlIGluZGV4IHRvIHRoZVxuICAgICAgLy8gcHJvcGVyIGxvY2F0aW9uXG4gICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkSW5kZXgoa2V5Q29kZSlcbiAgICB9LFxuICAgIG9uVGFiRG93biAoZSkge1xuICAgICAgLy8gV2hlbiBhZGRpbmcgdGFncywgaWYgc2VhcmNoaW5nIGFuZFxuICAgICAgLy8gdGhlcmUgaXMgbm90IGEgZmlsdGVyZWQgb3B0aW9ucyxcbiAgICAgIC8vIGFkZCB0aGUgdmFsdWUgdG8gdGhlIHRhZ3MgbGlzdFxuICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiZcbiAgICAgICAgdGhpcy5pbnRlcm5hbFNlYXJjaCAmJlxuICAgICAgICB0aGlzLmdldE1lbnVJbmRleCgpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVGFncygpXG4gICAgICB9XG5cbiAgICAgIFZBdXRvY29tcGxldGUubWV0aG9kcy5vblRhYkRvd24uY2FsbCh0aGlzLCBlKVxuICAgIH0sXG4gICAgc2VsZWN0SXRlbSAoaXRlbSkge1xuICAgICAgLy8gQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgaXRlbXM6PHN0cmluZ1tdPlxuICAgICAgaWYgKHRoaXMuZWRpdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy51cGRhdGVFZGl0aW5nKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFZTZWxlY3QubWV0aG9kcy5zZWxlY3RJdGVtLmNhbGwodGhpcywgaXRlbSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTZWFyY2goKVxuICAgIH0sXG4gICAgc2V0U2VsZWN0ZWRJdGVtcyAoKSB7XG4gICAgICBpZiAodGhpcy5pbnRlcm5hbFZhbHVlID09IG51bGwgfHxcbiAgICAgICAgdGhpcy5pbnRlcm5hbFZhbHVlID09PSAnJ1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLm11bHRpcGxlID8gdGhpcy5pbnRlcm5hbFZhbHVlIDogW3RoaXMuaW50ZXJuYWxWYWx1ZV1cbiAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZUVkaXRpbmcgKCkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmludGVybmFsVmFsdWUuc2xpY2UoKVxuICAgICAgdmFsdWVbdGhpcy5lZGl0aW5nSW5kZXhdID0gdGhpcy5pbnRlcm5hbFNlYXJjaFxuXG4gICAgICB0aGlzLmludGVybmFsVmFsdWUgPSB2YWx1ZVxuXG4gICAgICB0aGlzLmVkaXRpbmdJbmRleCA9IC0xXG4gICAgfSxcbiAgICB1cGRhdGVDb21ib2JveCAoKSB7XG4gICAgICBjb25zdCBpc1VzaW5nU2xvdCA9IEJvb2xlYW4odGhpcy4kc2NvcGVkU2xvdHMuc2VsZWN0aW9uKSB8fCB0aGlzLmhhc0NoaXBzXG5cbiAgICAgIC8vIElmIHNlYXJjaCBpcyBub3QgZGlydHkgYW5kIGlzXG4gICAgICAvLyB1c2luZyBzbG90LCBkbyBub3RoaW5nXG4gICAgICBpZiAoaXNVc2luZ1Nsb3QgJiYgIXRoaXMuc2VhcmNoSXNEaXJ0eSkgcmV0dXJuXG5cbiAgICAgIC8vIFRoZSBpbnRlcm5hbCBzZWFyY2ggaXMgbm90IG1hdGNoaW5nXG4gICAgICAvLyB0aGUgaW50ZXJuYWwgdmFsdWUsIHVwZGF0ZSB0aGUgaW5wdXRcbiAgICAgIGlmICh0aGlzLmludGVybmFsU2VhcmNoICE9PSB0aGlzLmdldFRleHQodGhpcy5pbnRlcm5hbFZhbHVlKSkgdGhpcy5zZXRWYWx1ZSgpXG5cbiAgICAgIC8vIFJlc2V0IHNlYXJjaCBpZiB1c2luZyBzbG90XG4gICAgICAvLyB0byBhdm9pZCBhIGRvdWJsZSBpbnB1dFxuICAgICAgaWYgKGlzVXNpbmdTbG90KSB0aGlzLmludGVybmFsU2VhcmNoID0gdW5kZWZpbmVkXG4gICAgfSxcbiAgICB1cGRhdGVTZWxmICgpIHtcbiAgICAgIHRoaXMubXVsdGlwbGUgPyB0aGlzLnVwZGF0ZVRhZ3MoKSA6IHRoaXMudXBkYXRlQ29tYm9ib3goKVxuICAgIH0sXG4gICAgdXBkYXRlVGFncyAoKSB7XG4gICAgICBjb25zdCBtZW51SW5kZXggPSB0aGlzLmdldE1lbnVJbmRleCgpXG5cbiAgICAgIC8vIElmIHRoZSB1c2VyIGlzIG5vdCBzZWFyY2hpbmdcbiAgICAgIC8vIGFuZCBubyBtZW51IGl0ZW0gaXMgc2VsZWN0ZWRcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgIGlmIChtZW51SW5kZXggPCAwICYmXG4gICAgICAgICF0aGlzLnNlYXJjaElzRGlydHlcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGlmICh0aGlzLmVkaXRpbmdJbmRleCA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUVkaXRpbmcoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHRoaXMuaW50ZXJuYWxTZWFyY2gpXG4gICAgICAvLyBJZiBpdCBhbHJlYWR5IGV4aXN0cywgZG8gbm90aGluZ1xuICAgICAgLy8gdGhpcyBtaWdodCBuZWVkIHRvIGNoYW5nZSB0byBicmluZ1xuICAgICAgLy8gdGhlIGR1cGxpY2F0ZWQgaXRlbSB0byB0aGUgbGFzdCBlbnRlcmVkXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmludGVybmFsVmFsdWUuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBtZW51IGluZGV4IGlzIGdyZWF0ZXIgdGhhbiAxXG4gICAgICAvLyB0aGUgc2VsZWN0aW9uIGlzIGhhbmRsZWQgZWxzZXdoZXJlXG4gICAgICAvLyBUT0RPOiBmaW5kIG91dCB3aGVyZVxuICAgICAgaWYgKG1lbnVJbmRleCA+IC0xKSByZXR1cm4gKHRoaXMuaW50ZXJuYWxTZWFyY2ggPSBudWxsKVxuXG4gICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5pbnRlcm5hbFNlYXJjaClcbiAgICAgIHRoaXMuaW50ZXJuYWxTZWFyY2ggPSBudWxsXG4gICAgfVxuICB9XG59XG4iXX0=