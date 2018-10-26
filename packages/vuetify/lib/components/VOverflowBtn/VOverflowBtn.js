// Styles
import '../../../src/stylus/components/_overflow-buttons.styl';
// Extensions
import VSelect from '../VSelect/VSelect';
import VAutocomplete from '../VAutocomplete';
import VTextField from '../VTextField/VTextField';
import VBtn from '../VBtn';
import { consoleWarn } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-overflow-btn',
    extends: VAutocomplete,
    props: {
        segmented: Boolean,
        editable: Boolean,
        transition: VSelect.props.transition
    },
    computed: {
        classes: function classes() {
            return Object.assign(VAutocomplete.computed.classes.call(this), {
                'v-overflow-btn': true,
                'v-overflow-btn--segmented': this.segmented,
                'v-overflow-btn--editable': this.editable
            });
        },
        isAnyValueAllowed: function isAnyValueAllowed() {
            return this.editable || VAutocomplete.computed.isAnyValueAllowed.call(this);
        },
        isSingle: function isSingle() {
            return true;
        },
        computedItems: function computedItems() {
            return this.segmented ? this.allItems : this.filteredItems;
        },
        $_menuProps: function $_menuProps() {
            var props = VAutocomplete.computed.$_menuProps.call(this);
            props.transition = props.transition || 'v-menu-transition';
            return props;
        }
    },
    methods: {
        genSelections: function genSelections() {
            return this.editable ? VAutocomplete.methods.genSelections.call(this) : VSelect.methods.genSelections.call(this); // Override v-autocomplete's override
        },
        genCommaSelection: function genCommaSelection(item, index, last) {
            return this.segmented ? this.genSegmentedBtn(item) : VSelect.methods.genCommaSelection.call(this, item, index, last);
        },
        genInput: function genInput() {
            var input = VTextField.methods.genInput.call(this);
            input.data.domProps.value = this.editable ? this.internalSearch : '';
            input.data.attrs.readonly = !this.isAnyValueAllowed;
            return input;
        },
        genLabel: function genLabel() {
            if (this.editable && this.isFocused) return null;
            var label = VTextField.methods.genLabel.call(this);
            if (!label) return label;
            // Reset previously set styles from parent
            label.data.style = {};
            return label;
        },
        genSegmentedBtn: function genSegmentedBtn(item) {
            var _this = this;

            var itemValue = this.getValue(item);
            var itemObj = this.computedItems.find(function (i) {
                return _this.getValue(i) === itemValue;
            }) || item;
            if (!itemObj.text || !itemObj.callback) {
                consoleWarn('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this);
                return null;
            }
            return this.$createElement(VBtn, {
                props: { flat: true },
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        itemObj.callback(e);
                    }
                }
            }, [itemObj.text]);
        },
        setSelectedItems: function setSelectedItems() {
            if (this.internalValue == null) {
                this.selectedItems = [];
            } else {
                this.selectedItems = [this.internalValue];
            }
        }
    }
};
//# sourceMappingURL=VOverflowBtn.js.map