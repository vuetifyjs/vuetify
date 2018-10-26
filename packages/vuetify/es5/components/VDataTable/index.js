'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VTableOverflow = exports.VEditDialog = exports.VDataTable = undefined;

var _helpers = require('../../util/helpers');

var _VDataTable = require('./VDataTable');

var _VDataTable2 = _interopRequireDefault(_VDataTable);

var _VEditDialog = require('./VEditDialog');

var _VEditDialog2 = _interopRequireDefault(_VEditDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VTableOverflow = (0, _helpers.createSimpleFunctional)('v-table__overflow');
exports.VDataTable = _VDataTable2.default;
exports.VEditDialog = _VEditDialog2.default;
exports.VTableOverflow = VTableOverflow;
exports.default = {
    $_vuetify_subcomponents: {
        VDataTable: _VDataTable2.default,
        VEditDialog: _VEditDialog2.default,
        VTableOverflow: VTableOverflow
    }
};
//# sourceMappingURL=index.js.map