import {
  createSimpleTransition,
  createJavaScriptTransition
} from '../../util/helpers'

import ExpandTransitionFunctions from './expand-transition'

// Component specific transitions
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
export const VSlideXTransition = createSimpleTransition('slide-x-transition')
export const VSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition')
export const VSlideYTransition = createSimpleTransition('slide-y-transition')
export const VSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition')

// JavaScript transitions
export const VExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionFunctions)

export default {
  VCarouselTransition,
  VCarouselReverseTransition,
  VDialogTransition,
  VDialogBottomTransition,
  VFabTransition,
  VFadeTransition,
  VMenuTransition,
  VScaleTransition,
  VSlideXTransition,
  VSlideXReverseTransition,
  VSlideYTransition,
  VSlideYReverseTransition,
  VTabReverseTransition,
  VTabTransition,
  VExpandTransition
}
