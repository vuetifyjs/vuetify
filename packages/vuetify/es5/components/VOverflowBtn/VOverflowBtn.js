'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_overflow-buttons.styl');

var _VSelect = require('../VSelect/VSelect');

var _VSelect2 = _interopRequireDefault(_VSelect);

var _VAutocomplete = require('../VAutocomplete');

var _VAutocomplete2 = _interopRequireDefault(_VAutocomplete);

var _VTextField = require('../VTextField/VTextField');

var _VTextField2 = _interopRequireDefault(_VTextField);

var _VBtn = require('../VBtn');

var _VBtn2 = _interopRequireDefault(_VBtn);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
// Styles
exports.default = {
    name: 'v-overflow-btn',
    extends: _VAutocomplete2.default,
    props: {
        segmented: Boolean,
        editable: Boolean,
        transition: _VSelect2.default.props.transition
    },
    computed: {
        classes: function classes() {
            return Object.assign(_VAutocomplete2.default.computed.classes.call(this), {
                'v-overflow-btn': true,
                'v-overflow-btn--segmented': this.segmented,
                'v-overflow-btn--editable': this.editable
            });
        },
        isAnyValueAllowed: function isAnyValueAllowed() {
            return this.editable || _VAutocomplete2.default.computed.isAnyValueAllowed.call(this);
        },
        isSingle: function isSingle() {
            return true;
        },
        computedItems: function computedItems() {
            return this.segmented ? this.allItems : this.filteredItems;
        },
        $_menuProps: function $_menuProps() {
            var props = _VAutocomplete2.default.computed.$_menuProps.call(this);
            props.transition = props.transition || 'v-menu-transition';
            return props;
        }
    },
    methods: {
        genSelections: function genSelections() {
            return this.editable ? _VAutocomplete2.default.methods.genSelections.call(this) : _VSelect2.default.methods.genSelections.call(this); // Override v-autocomplete's override
        },
        genCommaSelection: function genCommaSelection(item, index, last) {
            return this.segmented ? this.genSegmentedBtn(item) : _VSelect2.default.methods.genCommaSelection.call(this, item, index, last);
        },
        genInput: function genInput() {
            var input = _VTextField2.default.methods.genInput.call(this);
            input.data.domProps.value = this.editable ? this.internalSearch : '';
            input.data.attrs.readonly = !this.isAnyValueAllowed;
            return input;
        },
        genLabel: function genLabel() {
            if (this.editable && this.isFocused) return null;
            var label = _VTextField2.default.methods.genLabel.call(this);
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
                (0, _console.consoleWarn)('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this);
                return null;
            }
            return this.$createElement(_VBtn2.default, {
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
// Extensions
//# sourceMappingURL=VOverflowBtn.js.map