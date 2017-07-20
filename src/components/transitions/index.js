import {
  createSimpleTransition,
  createJavaScriptTransition
} from '~util/helpers'

import ExpandTransitionFunctions from './expand-transition'

// Component specific transitions
export const CarouselTransition = createSimpleTransition('carousel-transition')
export const CarouselReverseTransition = createSimpleTransition('carousel-reverse-transition')
export const TabTransition = createSimpleTransition('tab-transition')
export const TabReverseTransition = createSimpleTransition('tab-reverse-transition')
export const MenuTransition = createSimpleTransition('menu-transition')
export const FabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in')

// Generic transitions
export const DialogTransition = createSimpleTransition('dialog-transition')
export const DialogBottomTransition = createSimpleTransition('dialog-bottom-transition')
export const FadeTransition = createSimpleTransition('fade-transition')
export const ScaleTransition = createSimpleTransition('scale-transition')
export const SlideXTransition = createSimpleTransition('slide-x-transition')
export const SlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition')
export const SlideYTransition = createSimpleTransition('slide-y-transition')
export const SlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition')

// JavaScript transitions
export const ExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionFunctions)

export default {
  CarouselTransition,
  CarouselReverseTransition,
  DialogTransition,
  DialogBottomTransition,
  FabTransition,
  FadeTransition,
  MenuTransition,
  ScaleTransition,
  SlideXTransition,
  SlideXReverseTransition,
  SlideYTransition,
  SlideYReverseTransition,
  TabReverseTransition,
  TabTransition,
  ExpandTransition
}
