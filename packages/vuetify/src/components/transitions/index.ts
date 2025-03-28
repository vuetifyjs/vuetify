import {
  createCssTransition,
  createJavascriptTransition,
} from './createTransition'

import ExpandTransitionGenerator from './expand-transition'

// Component specific transitions
export const VFabTransition = createCssTransition('fab-transition', 'center center', 'out-in')

// Generic transitions
export const VDialogBottomTransition = createCssTransition('dialog-bottom-transition')
export const VDialogTopTransition = createCssTransition('dialog-top-transition')
export const VFadeTransition = createCssTransition('fade-transition')
export const VScaleTransition = createCssTransition('scale-transition')
export const VScrollXTransition = createCssTransition('scroll-x-transition')
export const VScrollXReverseTransition = createCssTransition('scroll-x-reverse-transition')
export const VScrollYTransition = createCssTransition('scroll-y-transition')
export const VScrollYReverseTransition = createCssTransition('scroll-y-reverse-transition')
export const VSlideXTransition = createCssTransition('slide-x-transition')
export const VSlideXReverseTransition = createCssTransition('slide-x-reverse-transition')
export const VSlideYTransition = createCssTransition('slide-y-transition')
export const VSlideYReverseTransition = createCssTransition('slide-y-reverse-transition')
export const VGooTransition = createCssTransition('goo-transition')

// Javascript transitions
export const VExpandTransition = createJavascriptTransition('expand-transition', ExpandTransitionGenerator())
export const VExpandXTransition = createJavascriptTransition('expand-x-transition', ExpandTransitionGenerator('', true))

export { VDialogTransition } from './dialog-transition'

export type VFabTransition = InstanceType<typeof VFabTransition>
export type VDialogBottomTransition = InstanceType<typeof VDialogBottomTransition>
export type VDialogTopTransition = InstanceType<typeof VDialogTopTransition>
export type VFadeTransition = InstanceType<typeof VFadeTransition>
export type VScaleTransition = InstanceType<typeof VScaleTransition>
export type VScrollXTransition = InstanceType<typeof VScrollXTransition>
export type VScrollXReverseTransition = InstanceType<typeof VScrollXReverseTransition>
export type VScrollYTransition = InstanceType<typeof VScrollYTransition>
export type VScrollYReverseTransition = InstanceType<typeof VScrollYReverseTransition>
export type VSlideXTransition = InstanceType<typeof VSlideXTransition>
export type VSlideXReverseTransition = InstanceType<typeof VSlideXReverseTransition>
export type VSlideYTransition = InstanceType<typeof VSlideYTransition>
export type VSlideYReverseTransition = InstanceType<typeof VSlideYReverseTransition>
export type VExpandTransition = InstanceType<typeof VExpandTransition>
export type VExpandXTransition = InstanceType<typeof VExpandXTransition>
export type VGooTransition = InstanceType<typeof VGooTransition>
