import {
  createSimpleTransition,
  createJavaScriptTransition
} from '../../util/helpers'

import ExpandTransitionGenerator from './expand-transition'

// Component specific transitions
export const VBottomSheetTransition = createSimpleTransition('bottom-sheet-transition')
export const VCarouselTransition = createSimpleTransition('carousel-transition')
export const VCarouselReverseTransition = createSimpleTransition('carousel-reverse-transition')
export const VTabTransition = createSimpleTransition('tab-transition')
export const VTabReverseTransition = createSimpleTransition('tab-reverse-transition')
export const VMenuTransition = createSimpleTransition('menu-transition')
export const VFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in')

// Generic transitions
export const VDialogTransition = createSimpleTransition('dialog-transition')
export const VDialogBottomTransition = createSimpleTransition('dialog-bottom-transition')
export const VFadeTransition = createSimpleTransition('fade-transition')
export const VScaleTransition = createSimpleTransition('scale-transition')
export const VScrollXTransition = createSimpleTransition('scroll-x-transition')
export const VScrollXReverseTransition = createSimpleTransition('scroll-x-reverse-transition')
export const VScrollYTransition = createSimpleTransition('scroll-y-transition')
export const VScrollYReverseTransition = createSimpleTransition('scroll-y-reverse-transition')
export const VSlideXTransition = createSimpleTransition('slide-x-transition')
export const VSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition')
export const VSlideYTransition = createSimpleTransition('slide-y-transition')
export const VSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition')

// JavaScript transitions
export const VExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionGenerator())
export const VRowExpandTransition = createJavaScriptTransition('row-expand-transition', ExpandTransitionGenerator('datatable__expand-col--expanded'))

export default {
  $_vuetify_subcomponents: {
    VBottomSheetTransition,
    VCarouselTransition,
    VCarouselReverseTransition,
    VDialogTransition,
    VDialogBottomTransition,
    VFabTransition,
    VFadeTransition,
    VMenuTransition,
    VScaleTransition,
    VScrollXTransition,
    VScrollXReverseTransition,
    VScrollYTransition,
    VScrollYReverseTransition,
    VSlideXTransition,
    VSlideXReverseTransition,
    VSlideYTransition,
    VSlideYReverseTransition,
    VTabReverseTransition,
    VTabTransition,
    VExpandTransition,
    VRowExpandTransition
  }
}
