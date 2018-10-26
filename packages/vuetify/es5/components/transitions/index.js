'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VRowExpandTransition = exports.VExpandTransition = exports.VSlideYReverseTransition = exports.VSlideYTransition = exports.VSlideXReverseTransition = exports.VSlideXTransition = exports.VScrollYReverseTransition = exports.VScrollYTransition = exports.VScrollXReverseTransition = exports.VScrollXTransition = exports.VScaleTransition = exports.VFadeTransition = exports.VDialogBottomTransition = exports.VDialogTransition = exports.VFabTransition = exports.VMenuTransition = exports.VTabReverseTransition = exports.VTabTransition = exports.VCarouselReverseTransition = exports.VCarouselTransition = exports.VBottomSheetTransition = undefined;

var _helpers = require('../../util/helpers');

var _expandTransition = require('./expand-transition');

var _expandTransition2 = _interopRequireDefault(_expandTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Component specific transitions
var VBottomSheetTransition = exports.VBottomSheetTransition = (0, _helpers.createSimpleTransition)('bottom-sheet-transition');
var VCarouselTransition = exports.VCarouselTransition = (0, _helpers.createSimpleTransition)('carousel-transition');
var VCarouselReverseTransition = exports.VCarouselReverseTransition = (0, _helpers.createSimpleTransition)('carousel-reverse-transition');
var VTabTransition = exports.VTabTransition = (0, _helpers.createSimpleTransition)('tab-transition');
var VTabReverseTransition = exports.VTabReverseTransition = (0, _helpers.createSimpleTransition)('tab-reverse-transition');
var VMenuTransition = exports.VMenuTransition = (0, _helpers.createSimpleTransition)('menu-transition');
var VFabTransition = exports.VFabTransition = (0, _helpers.createSimpleTransition)('fab-transition', 'center center', 'out-in');
// Generic transitions
var VDialogTransition = exports.VDialogTransition = (0, _helpers.createSimpleTransition)('dialog-transition');
var VDialogBottomTransition = exports.VDialogBottomTransition = (0, _helpers.createSimpleTransition)('dialog-bottom-transition');
var VFadeTransition = exports.VFadeTransition = (0, _helpers.createSimpleTransition)('fade-transition');
var VScaleTransition = exports.VScaleTransition = (0, _helpers.createSimpleTransition)('scale-transition');
var VScrollXTransition = exports.VScrollXTransition = (0, _helpers.createSimpleTransition)('scroll-x-transition');
var VScrollXReverseTransition = exports.VScrollXReverseTransition = (0, _helpers.createSimpleTransition)('scroll-x-reverse-transition');
var VScrollYTransition = exports.VScrollYTransition = (0, _helpers.createSimpleTransition)('scroll-y-transition');
var VScrollYReverseTransition = exports.VScrollYReverseTransition = (0, _helpers.createSimpleTransition)('scroll-y-reverse-transition');
var VSlideXTransition = exports.VSlideXTransition = (0, _helpers.createSimpleTransition)('slide-x-transition');
var VSlideXReverseTransition = exports.VSlideXReverseTransition = (0, _helpers.createSimpleTransition)('slide-x-reverse-transition');
var VSlideYTransition = exports.VSlideYTransition = (0, _helpers.createSimpleTransition)('slide-y-transition');
var VSlideYReverseTransition = exports.VSlideYReverseTransition = (0, _helpers.createSimpleTransition)('slide-y-reverse-transition');
// JavaScript transitions
var VExpandTransition = exports.VExpandTransition = (0, _helpers.createJavaScriptTransition)('expand-transition', (0, _expandTransition2.default)());
var VRowExpandTransition = exports.VRowExpandTransition = (0, _helpers.createJavaScriptTransition)('row-expand-transition', (0, _expandTransition2.default)('datatable__expand-col--expanded'));
exports.default = {
    $_vuetify_subcomponents: {
        VBottomSheetTransition: VBottomSheetTransition,
        VCarouselTransition: VCarouselTransition,
        VCarouselReverseTransition: VCarouselReverseTransition,
        VDialogTransition: VDialogTransition,
        VDialogBottomTransition: VDialogBottomTransition,
        VFabTransition: VFabTransition,
        VFadeTransition: VFadeTransition,
        VMenuTransition: VMenuTransition,
        VScaleTransition: VScaleTransition,
        VScrollXTransition: VScrollXTransition,
        VScrollXReverseTransition: VScrollXReverseTransition,
        VScrollYTransition: VScrollYTransition,
        VScrollYReverseTransition: VScrollYReverseTransition,
        VSlideXTransition: VSlideXTransition,
        VSlideXReverseTransition: VSlideXReverseTransition,
        VSlideYTransition: VSlideYTransition,
        VSlideYReverseTransition: VSlideYReverseTransition,
        VTabReverseTransition: VTabReverseTransition,
        VTabTransition: VTabTransition,
        VExpandTransition: VExpandTransition,
        VRowExpandTransition: VRowExpandTransition
    }
};
//# sourceMappingURL=index.js.map