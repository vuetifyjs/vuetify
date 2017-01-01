import { createSimpleTransition } from '../../util/helpers'

const SlideXTransition = createSimpleTransition('slide-x-transition')
const SlideYTransition = createSimpleTransition('slide-y-transition')
const ScaleTransition = createSimpleTransition('scale-transition')

export default {
  SlideXTransition,
  SlideYTransition,
  ScaleTransition
}