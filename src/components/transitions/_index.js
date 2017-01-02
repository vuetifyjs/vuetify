import { createSimpleTransition } from '../../util/helpers'

const SlideXTransition = createSimpleTransition('slide-x-transition')
const SlideYTransition = createSimpleTransition('slide-y-transition')
const ScaleTransition = createSimpleTransition('scale-transition')
const TabTransition = createSimpleTransition('tab-transition')
const TabReverseTransition = createSimpleTransition('tab-reverse-transition')

export default {
  SlideXTransition,
  SlideYTransition,
  ScaleTransition,
  TabTransition,
  TabReverseTransition
}