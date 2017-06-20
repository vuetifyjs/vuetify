import { createSimpleTransition } from '../../util/helpers'

const SlideXTransition = createSimpleTransition('slide-x-transition')
const SlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition')
const SlideYTransition = createSimpleTransition('slide-y-transition')
const SlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition')
const ScaleTransition = createSimpleTransition('scale-transition')
const TabTransition = createSimpleTransition('tab-transition')
const TabReverseTransition = createSimpleTransition('tab-reverse-transition')
const CarouselTransition = createSimpleTransition('carousel-transition')
const CarouselReverseTransition = createSimpleTransition('carousel-reverse-transition')
const DialogTransition = createSimpleTransition('dialog-transition')
const DialogBottomTransition = createSimpleTransition('dialog-bottom-transition')
const FadeTransition = createSimpleTransition('fade-transition')
const MenuTransition = createSimpleTransition('menu-transition')

export default {
  SlideXTransition,
  SlideXReverseTransition,
  SlideYTransition,
  SlideYReverseTransition,
  ScaleTransition,
  FadeTransition,
  TabTransition,
  TabReverseTransition,
  DialogTransition,
  DialogBottomTransition,
  MenuTransition,
  CarouselTransition,
  CarouselReverseTransition
}
