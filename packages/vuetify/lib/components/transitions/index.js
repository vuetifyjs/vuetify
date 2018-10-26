import { createSimpleTransition, createJavaScriptTransition } from '../../util/helpers';
import ExpandTransitionGenerator from './expand-transition';
// Component specific transitions
export var VBottomSheetTransition = createSimpleTransition('bottom-sheet-transition');
export var VCarouselTransition = createSimpleTransition('carousel-transition');
export var VCarouselReverseTransition = createSimpleTransition('carousel-reverse-transition');
export var VTabTransition = createSimpleTransition('tab-transition');
export var VTabReverseTransition = createSimpleTransition('tab-reverse-transition');
export var VMenuTransition = createSimpleTransition('menu-transition');
export var VFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in');
// Generic transitions
export var VDialogTransition = createSimpleTransition('dialog-transition');
export var VDialogBottomTransition = createSimpleTransition('dialog-bottom-transition');
export var VFadeTransition = createSimpleTransition('fade-transition');
export var VScaleTransition = createSimpleTransition('scale-transition');
export var VScrollXTransition = createSimpleTransition('scroll-x-transition');
export var VScrollXReverseTransition = createSimpleTransition('scroll-x-reverse-transition');
export var VScrollYTransition = createSimpleTransition('scroll-y-transition');
export var VScrollYReverseTransition = createSimpleTransition('scroll-y-reverse-transition');
export var VSlideXTransition = createSimpleTransition('slide-x-transition');
export var VSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition');
export var VSlideYTransition = createSimpleTransition('slide-y-transition');
export var VSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition');
// JavaScript transitions
export var VExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionGenerator());
export var VRowExpandTransition = createJavaScriptTransition('row-expand-transition', ExpandTransitionGenerator('datatable__expand-col--expanded'));
export default {
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