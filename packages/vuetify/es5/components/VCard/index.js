'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VCardText = exports.VCardActions = exports.VCardTitle = exports.VCardMedia = exports.VCard = undefined;

var _helpers = require('../../util/helpers');

var _VCard = require('./VCard');

var _VCard2 = _interopRequireDefault(_VCard);

var _VCardMedia = require('./VCardMedia');

var _VCardMedia2 = _interopRequireDefault(_VCardMedia);

var _VCardTitle = require('./VCardTitle');

var _VCardTitle2 = _interopRequireDefault(_VCardTitle);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VCardActions = _vue2.default.extend((0, _helpers.createSimpleFunctional)('v-card__actions'));
var VCardText = _vue2.default.extend((0, _helpers.createSimpleFunctional)('v-card__text'));
exports.VCard = _VCard2.default;
exports.VCardMedia = _VCardMedia2.default;
exports.VCardTitle = _VCardTitle2.default;
exports.VCardActions = VCardActions;
exports.VCardText = VCardText;
exports.default = {
    $_vuetify_subcomponents: {
        VCard: _VCard2.default,
        VCardMedia: _VCardMedia2.default,
        VCardTitle: _VCardTitle2.default,
        VCardActions: VCardActions,
        VCardText: VCardText
    }
};
//# sourceMappingURL=index.js.map