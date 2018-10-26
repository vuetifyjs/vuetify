'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VTextField = undefined;

var _VTextField = require('./VTextField');

var _VTextField2 = _interopRequireDefault(_VTextField);

var _VTextarea = require('../VTextarea/VTextarea');

var _VTextarea2 = _interopRequireDefault(_VTextarea);

var _rebuildFunctionalSlots = require('../../util/rebuildFunctionalSlots');

var _rebuildFunctionalSlots2 = _interopRequireDefault(_rebuildFunctionalSlots);

var _dedupeModelListeners = require('../../util/dedupeModelListeners');

var _dedupeModelListeners2 = _interopRequireDefault(_dedupeModelListeners);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: remove this in v2.0
/* @vue/component */
var wrapper = {
    functional: true,
    $_wrapperFor: _VTextField2.default,
    props: {
        textarea: Boolean,
        multiLine: Boolean
    },
    render: function render(h, _ref) {
        var props = _ref.props,
            data = _ref.data,
            slots = _ref.slots,
            parent = _ref.parent;

        (0, _dedupeModelListeners2.default)(data);
        var children = (0, _rebuildFunctionalSlots2.default)(slots(), h);
        if (props.textarea) {
            (0, _console.deprecate)('<v-text-field textarea>', '<v-textarea outline>', wrapper, parent);
        }
        if (props.multiLine) {
            (0, _console.deprecate)('<v-text-field multi-line>', '<v-textarea>', wrapper, parent);
        }
        if (props.textarea || props.multiLine) {
            data.attrs.outline = props.textarea;
            return h(_VTextarea2.default, data, children);
        } else {
            return h(_VTextField2.default, data, children);
        }
    }
};
exports.VTextField = wrapper;
exports.default = wrapper;
//# sourceMappingURL=index.js.map