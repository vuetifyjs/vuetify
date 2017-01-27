import { createSimpleTransition } from '../../util/helpers'

const SlideXTransition = createSimpleTransition('slide-x-transition')
const SlideYTransition = createSimpleTransition('slide-y-transition')
const ScaleTransition = createSimpleTransition('scale-transition')
const TabTransition = createSimpleTransition('tab-transition')
const TabReverseTransition = createSimpleTransition('tab-reverse-transition')
const SliderTransition = createSimpleTransition('slider-transition')
const SliderReverseTransition = createSimpleTransition('slider-reverse-transition')
const ModalTransition = createSimpleTransition('modal-transition')
const ModalBottomTransition = createSimpleTransition('modal-bottom-transition')
const FadeTransition = createSimpleTransition('fade-transition')
const MenuTransition = createSimpleTransition('menu-transition')

export default {
  SlideXTransition,
  SlideYTransition,
  ScaleTransition,
  FadeTransition,
  TabTransition,
  TabReverseTransition,
  ModalTransition,
  ModalBottomTransition,
  MenuTransition,
  SliderTransition,
  SliderReverseTransition
}
