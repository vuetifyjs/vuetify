import {
  createSimpleTransition,
  createJavaScriptTransition
} from '../../util/helpers'

import ExpandTransitionFunctions from './expand-transition'
import RowExpandTransitionFunctions from './row-expand-transition'

// Component specific transitions
export const VBottomSheetTranstion = createSimpleTransition('bottom-sheet-transition')
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
export const VRowExpandTransition = createJavaScriptTransition('row-expand-transition', RowExpandTransitionFunctions)

export default function install (Vue) {
  Vue.component('v-bottom-sheet-transition', VBottomSheetTranstion)
  Vue.component('v-carousel-transition', VCarouselTransition)
  Vue.component('v-carousel-reverse-transition', VCarouselReverseTransition)
  Vue.component('v-dialog-transition', VDialogTransition)
  Vue.component('v-dialog-bottom-transition', VDialogBottomTransition)
  Vue.component('v-fab-transition', VFabTransition)
  Vue.component('v-fade-transition', VFadeTransition)
  Vue.component('v-menu-transition', VMenuTransition)
  Vue.component('v-scale-transition', VScaleTransition)
  Vue.component('v-slide-x-transition', VSlideXTransition)
  Vue.component('v-slide-x-reverse-transition', VSlideXReverseTransition)
  Vue.component('v-slide-y-transition', VSlideYTransition)
  Vue.component('v-slide-y-reverse-transition', VSlideYReverseTransition)
  Vue.component('v-tab-reverse-transition', VTabReverseTransition)
  Vue.component('v-tab-transition', VTabTransition)
  Vue.component('v-expand-transition', VExpandTransition)
  Vue.component('v-row-expand-transition', VRowExpandTransition)
}
