// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type ColorPickerMode = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'hexa'

export interface VColorPickerProps {
  bgColor?: string
  border?: string | number | boolean
  canvasHeight?: string | number
  class?: any
  color?: string
  disabled?: boolean
  divided?: boolean
  dotSize?: string | number
  elevation?: string | number
  eyeDropperIcon?: IconValue
  height?: string | number
  hideCanvas?: boolean
  hideEyeDropper?: boolean
  hideHeader?: boolean
  hideInputLabels?: boolean
  hideInputs?: boolean
  hideSliders?: boolean
  hideTitle?: boolean
  hoverElevation?: string | number
  landscape?: boolean
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  mode?: ColorPickerMode
  modelValue?: string | Record<string, unknown> | null
  modes?: readonly ColorPickerMode[]
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  readonly?: boolean
  rounded?: string | number | boolean
  showSwatches?: boolean
  style?: StyleValue
  swatches?: readonly (readonly (string | number | { readonly h: number, readonly s: number, readonly v: number, readonly a?: number | undefined } | { readonly r: number, readonly g: number, readonly b: number, readonly a?: number | undefined } | { readonly h: number, readonly s: number, readonly l: number, readonly a?: number | undefined })[])[]
  swatchesMaxHeight?: string | number
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string
  width?: string | number
}

type VColorPickerDefaultKeys =
  | 'canvasHeight'
  | 'disabled'
  | 'divided'
  | 'dotSize'
  | 'eyeDropperIcon'
  | 'hideCanvas'
  | 'hideEyeDropper'
  | 'hideHeader'
  | 'hideInputLabels'
  | 'hideInputs'
  | 'hideSliders'
  | 'hideTitle'
  | 'landscape'
  | 'mode'
  | 'modes'
  | 'readonly'
  | 'rounded'
  | 'showSwatches'
  | 'style'
  | 'swatchesMaxHeight'
  | 'tag'
  | 'tile'

export declare const VColorPicker: VuetifyComponent<
  VColorPickerProps,
  VColorPickerDefaultKeys,
  {
    'update:modelValue': (color: any) => true
    'update:mode': (mode: ColorPickerMode) => true
  },
  null
>
export type VColorPicker = InstanceType<typeof VColorPicker>

export {}
