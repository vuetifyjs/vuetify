// Types
import type { StyleValue } from 'vue'
import type { VInput } from '@/components/VInput/VInput.types'
import type { SliderSize, SliderVariant } from '@/components/VSlider/slider.types'
import type { VSliderSlots } from '@/components/VSlider/VSlider.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { ValueFormat } from '@/util/shared.types'

export interface VRangeSliderProps {
  appendIcon?: IconValue
  baseColor?: string
  centerAffix?: boolean
  class?: any
  color?: string
  density?: Density
  detailsActive?: boolean
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean | null
  elevation?: string | number
  endThumbAriaLabel?: string
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
  modelValue?: readonly (string | number)[]
  name?: string
  noKeyboard?: boolean
  'onClick:append'?: ((args_0: MouseEvent) => void)
  'onClick:prepend'?: ((args_0: MouseEvent) => void)
  'onUpdate:focused'?: ((args_0: boolean) => void)
  persistentHint?: boolean
  prependIcon?: IconValue
  readonly?: boolean | null
  reverse?: boolean
  ripple?: boolean
  rounded?: string | number | boolean
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  showTicks?: boolean | 'always'
  size?: SliderSize
  startThumbAriaLabel?: string
  step?: string | number
  strict?: boolean
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

type VRangeSliderDefaultKeys =
  | 'centerAffix'
  | 'density'
  | 'detailsActive'
  | 'direction'
  | 'disabled'
  | 'elevation'
  | 'endThumbAriaLabel'
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
  | 'startThumbAriaLabel'
  | 'step'
  | 'strict'
  | 'style'
  | 'thumbLabel'
  | 'tickSize'
  | 'tile'
  | 'variant'

export declare const VRangeSlider: VuetifyComponent<
  VRangeSliderProps,
  VRangeSliderDefaultKeys,
  {
    'update:focused': (value: boolean) => true
    'update:modelValue': (value: [number, number]) => true
    end: (value: [number, number]) => true
    start: (value: [number, number]) => true
  },
  VSliderSlots,
  ForwardRefs<{ focus: () => any }, [VInput]>
>
export type VRangeSlider = InstanceType<typeof VRangeSlider>

export {}
