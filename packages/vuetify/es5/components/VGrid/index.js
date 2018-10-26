'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VSpacer = exports.VLayout = exports.VFlex = exports.VContent = exports.VContainer = undefined;

var _helpers = require('../../util/helpers');

var _VContainer = require('./VContainer');

var _VContainer2 = _interopRequireDefault(_VContainer);

var _VContent = require('./VContent');

var _VContent2 = _interopRequireDefault(_VContent);

var _VFlex = require('./VFlex');

var _VFlex2 = _interopRequireDefault(_VFlex);

var _VLayout = require('./VLayout');

var _VLayout2 = _interopRequireDefault(_VLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VSpacer = (0, _helpers.createSimpleFunctional)('spacer', 'div', 'v-spacer');
exports.VContainer = _VContainer2.default;
exports.VContent = _VContent2.default;
exports.VFlex = _VFlex2.default;
exports.VLayout = _VLayout2.default;
exports.VSpacer = VSpacer;
exports.default = {
    $_vuetify_subcomponents: {
        VContainer: _VContainer2.default,
        VContent: _VContent2.default,
        VFlex: _VFlex2.default,
        VLayout: _VLayout2.default,
        VSpacer: VSpacer
    }
};
//# sourceMappingURL=index.js.map