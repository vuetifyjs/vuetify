// Types
import type { StyleValue } from 'vue'
import type { VInput, VInputSlot, VInputSlots } from '@/components/VInput/VInput.types'
import type { SliderSize, SliderVariant } from '@/components/VSlider/slider.types'
import type { VSliderThumbSlots } from '@/components/VSlider/VSliderThumb.types'
import type { VSliderTrackSlots } from '@/components/VSlider/VSliderTrack.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueFormat } from '@/util/shared.types'

export type VSliderSlots = VInputSlots & VSliderThumbSlots & VSliderTrackSlots & {
  label: VInputSlot
  'prepend-inner': never
  'append-inner': never
}

export interface VSliderProps {
  appendIcon?: IconValue
  appendInnerIcon?: IconValue
  baseColor?: string
  centerAffix?: boolean
  centered?: boolean
  class?: any
  color?: string
  density?: Density
  detailsActive?: boolean
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean | null
  elevation?: string | number
  error?: boolean
  errorMessages?: string | readonly string[] | null
  focused?: boolean
  glow?: boolean
  hideDetails?: boolean | 'auto'
  hideSpinButtons?: boolean
  hint?: string
  hoverElevation?: string | number
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  label?: string
  max?: string | number
  maxErrors?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  min?: string | number
  minWidth?: string | number
  modelValue?: string | number
  name?: string
  noKeyboard?: boolean
  'onClick:append'?: ((args_0: MouseEvent) => void)
  'onClick:prepend'?: ((args_0: MouseEvent) => void)
  'onUpdate:focused'?: ((args_0: boolean) => void)
  persistentHint?: boolean
  prependIcon?: IconValue
  prependInnerIcon?: IconValue
  readonly?: boolean | null
  reverse?: boolean
  ripple?: boolean
  rounded?: string | number | boolean
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  showTicks?: boolean | 'always'
  size?: SliderSize
  step?: string | number
  style?: StyleValue
  theme?: string
  thumbColor?: string
  thumbGap?: number | string
  thumbLabel?: boolean | 'hover' | 'always'
  thumbSize?: string | number
  ticks?: readonly number[] | Record<number, string>
  tickSize?: string | number
  tile?: boolean
  trackColor?: string
  trackFillColor?: string
  trackSize?: string | number
  validateOn?: ValidateOn
  validationValue?: any
  valueFormat?: ValueFormat
  variant?: SliderVariant
  width?: string | number
}

export type VSliderDefaultKeys =
  | 'centerAffix'
  | 'centered'
  | 'density'
  | 'detailsActive'
  | 'direction'
  | 'disabled'
  | 'elevation'
  | 'error'
  | 'errorMessages'
  | 'focused'
  | 'glow'
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'max'
  | 'maxErrors'
  | 'messages'
  | 'min'
  | 'modelValue'
  | 'noKeyboard'
  | 'persistentHint'
  | 'readonly'
  | 'reverse'
  | 'ripple'
  | 'rounded'
  | 'rules'
  | 'showTicks'
  | 'size'
  | 'step'
  | 'style'
  | 'thumbLabel'
  | 'tickSize'
  | 'tile'
  | 'variant'

export declare const VSlider: VuetifyComponent<
  VSliderProps,
  VSliderDefaultKeys,
  {
    'update:focused': (value: boolean) => true
    'update:modelValue': (v: number) => true
    start: (value: number) => true
    end: (value: number) => true
  },
  VSliderSlots,
  ForwardRefs<{ focus: () => any }, [VInput]>
>
export type VSlider = InstanceType<typeof VSlider>
