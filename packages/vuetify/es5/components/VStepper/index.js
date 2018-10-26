'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VStepperItems = exports.VStepperHeader = exports.VStepperStep = exports.VStepperContent = exports.VStepper = undefined;

var _helpers = require('../../util/helpers');

var _VStepper = require('./VStepper');

var _VStepper2 = _interopRequireDefault(_VStepper);

var _VStepperStep = require('./VStepperStep');

var _VStepperStep2 = _interopRequireDefault(_VStepperStep);

var _VStepperContent = require('./VStepperContent');

var _VStepperContent2 = _interopRequireDefault(_VStepperContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VStepperHeader = (0, _helpers.createSimpleFunctional)('v-stepper__header');
var VStepperItems = (0, _helpers.createSimpleFunctional)('v-stepper__items');
exports.VStepper = _VStepper2.default;
exports.VStepperContent = _VStepperContent2.default;
exports.VStepperStep = _VStepperStep2.default;
exports.VStepperHeader = VStepperHeader;
exports.VStepperItems = VStepperItems;
exports.default = {
    $_vuetify_subcomponents: {
        VStepper: _VStepper2.default,
        VStepperContent: _VStepperContent2.default,
        VStepperStep: _VStepperStep2.default,
        VStepperHeader: VStepperHeader,
        VStepperItems: VStepperItems
    }
};
//# sourceMappingURL=index.js.map