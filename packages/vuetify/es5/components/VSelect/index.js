'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VSelect = undefined;

var _VSelect = require('./VSelect');

var _VSelect2 = _interopRequireDefault(_VSelect);

var _VOverflowBtn = require('../VOverflowBtn');

var _VOverflowBtn2 = _interopRequireDefault(_VOverflowBtn);

var _VAutocomplete = require('../VAutocomplete');

var _VAutocomplete2 = _interopRequireDefault(_VAutocomplete);

var _VCombobox = require('../VCombobox');

var _VCombobox2 = _interopRequireDefault(_VCombobox);

var _rebuildFunctionalSlots = require('../../util/rebuildFunctionalSlots');

var _rebuildFunctionalSlots2 = _interopRequireDefault(_rebuildFunctionalSlots);

var _dedupeModelListeners = require('../../util/dedupeModelListeners');

var _dedupeModelListeners2 = _interopRequireDefault(_dedupeModelListeners);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
var wrapper = {
    functional: true,
    $_wrapperFor: _VSelect2.default,
    props: {
        // VAutoComplete
        /** @deprecated */
        autocomplete: Boolean,
        /** @deprecated */
        combobox: Boolean,
        multiple: Boolean,
        /** @deprecated */
        tags: Boolean,
        // VOverflowBtn
        /** @deprecated */
        editable: Boolean,
        /** @deprecated */
        overflow: Boolean,
        /** @deprecated */
        segmented: Boolean
    },
    render: function render(h, _ref) {
        var props = _ref.props,
            data = _ref.data,
            slots = _ref.slots,
            parent = _ref.parent;

        (0, _dedupeModelListeners2.default)(data);
        var children = (0, _rebuildFunctionalSlots2.default)(slots(), h);
        if (props.autocomplete) {
            (0, _console.deprecate)('<v-select autocomplete>', '<v-autocomplete>', wrapper, parent);
        }
        if (props.combobox) {
            (0, _console.deprecate)('<v-select combobox>', '<v-combobox>', wrapper, parent);
        }
        if (props.tags) {
            (0, _console.deprecate)('<v-select tags>', '<v-combobox multiple>', wrapper, parent);
        }
        if (props.overflow) {
            (0, _console.deprecate)('<v-select overflow>', '<v-overflow-btn>', wrapper, parent);
        }
        if (props.segmented) {
            (0, _console.deprecate)('<v-select segmented>', '<v-overflow-btn segmented>', wrapper, parent);
        }
        if (props.editable) {
            (0, _console.deprecate)('<v-select editable>', '<v-overflow-btn editable>', wrapper, parent);
        }
        if (props.combobox || props.tags) {
            data.attrs.multiple = props.tags;
            return h(_VCombobox2.default, data, children);
        } else if (props.autocomplete) {
            data.attrs.multiple = props.multiple;
            return h(_VAutocomplete2.default, data, children);
        } else if (props.overflow || props.segmented || props.editable) {
            data.attrs.segmented = props.segmented;
            data.attrs.editable = props.editable;
            return h(_VOverflowBtn2.default, data, children);
        } else {
            data.attrs.multiple = props.multiple;
            return h(_VSelect2.default, data, children);
        }
    }
};
exports.VSelect = wrapper;
exports.default = wrapper;
//# sourceMappingURL=index.js.map