import { createSimpleTransition } from '../../util/helpers'

// Component specific transitions
const CarouselTransition = createSimpleTransition('carousel-transition')
const CarouselReverseTransition = createSimpleTransition('carousel-reverse-transition')
const TabTransition = createSimpleTransition('tab-transition')
const TabReverseTransition = createSimpleTransition('tab-reverse-transition')
const MenuTransition = createSimpleTransition('menu-transition')
const FabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in')

// Generic transitions
const DialogTransition = createSimpleTransition('dialog-transition')
const DialogBottomTransition = createSimpleTransition('dialog-bottom-transition')
const FadeTransition = createSimpleTransition('fade-transition')
const ScaleTransition = createSimpleTransition('scale-transition')
const SlideXTransition = createSimpleTransition('slide-x-transition')
const SlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition')
const SlideYTransition = createSimpleTransition('slide-y-transition')
const SlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition')

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
  TabTransition,
  TabReverseTransition
}
