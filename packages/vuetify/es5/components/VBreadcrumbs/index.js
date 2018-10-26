'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VBreadcrumbsDivider = exports.VBreadcrumbsItem = exports.VBreadcrumbs = undefined;

var _VBreadcrumbs = require('./VBreadcrumbs');

var _VBreadcrumbs2 = _interopRequireDefault(_VBreadcrumbs);

var _VBreadcrumbsItem = require('./VBreadcrumbsItem');

var _VBreadcrumbsItem2 = _interopRequireDefault(_VBreadcrumbsItem);

var _helpers = require('../../util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VBreadcrumbsDivider = (0, _helpers.createSimpleFunctional)('v-breadcrumbs__divider', 'li');
exports.VBreadcrumbs = _VBreadcrumbs2.default;
exports.VBreadcrumbsItem = _VBreadcrumbsItem2.default;
exports.VBreadcrumbsDivider = VBreadcrumbsDivider;
exports.default = {
    $_vuetify_subcomponents: {
        VBreadcrumbs: _VBreadcrumbs2.default,
        VBreadcrumbsItem: _VBreadcrumbsItem2.default,
        VBreadcrumbsDivider: VBreadcrumbsDivider
    }
};
//# sourceMappingURL=index.js.map