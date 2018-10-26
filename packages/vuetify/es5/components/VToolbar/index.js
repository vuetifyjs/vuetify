'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VToolbarItems = exports.VToolbarTitle = exports.VToolbarSideIcon = exports.VToolbar = undefined;

var _helpers = require('../../util/helpers');

var _VToolbar = require('./VToolbar');

var _VToolbar2 = _interopRequireDefault(_VToolbar);

var _VToolbarSideIcon = require('./VToolbarSideIcon');

var _VToolbarSideIcon2 = _interopRequireDefault(_VToolbarSideIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VToolbarTitle = (0, _helpers.createSimpleFunctional)('v-toolbar__title');
var VToolbarItems = (0, _helpers.createSimpleFunctional)('v-toolbar__items');
exports.VToolbar = _VToolbar2.default;
exports.VToolbarSideIcon = _VToolbarSideIcon2.default;
exports.VToolbarTitle = VToolbarTitle;
exports.VToolbarItems = VToolbarItems;
exports.default = {
    $_vuetify_subcomponents: {
        VToolbar: _VToolbar2.default,
        VToolbarItems: VToolbarItems,
        VToolbarTitle: VToolbarTitle,
        VToolbarSideIcon: _VToolbarSideIcon2.default
    }
};
//# sourceMappingURL=index.js.map