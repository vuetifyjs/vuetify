// Types
import type { StyleValue } from 'vue'
import type { VMenu } from '@/components/VMenu/VMenu.types'
import type { VSlider } from '@/components/VSlider/VSlider.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VMediaVolumeOptions = Pick<VMediaVolume['$props'],
  'direction' | 'inline' | 'sliderProps' | 'menuProps'
>

export type VMediaVolumeSlider = 'visible' | 'hover' | 'hidden'

export interface VMediaVolumeProps {
  class?: any
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  inline?: boolean | 'left' | 'right'
  label?: string
  menuProps?: Pick<VMenu['$props'], 'location' | 'offset' | 'openOnHover' | 'openDelay' | 'closeDelay' | 'contentClass' | 'zIndex' >
  modelValue?: number
  onClick?: ((args_0: MouseEvent | KeyboardEvent) => void)
  slider?: VMediaVolumeSlider
  sliderProps?: Pick<VSlider['$props'], 'color' | 'disabled' | 'step' | 'thumbSize' | 'trackSize' | 'trackColor' | 'maxWidth' | 'width' >
  style?: StyleValue
}

export type VMediaVolumeDefaultKeys =
  | 'direction'
  | 'disabled'
  | 'modelValue'
  | 'slider'
  | 'style'

export declare const VMediaVolume: VuetifyComponent<
  VMediaVolumeProps,
  VMediaVolumeDefaultKeys,
  {
    'update:modelValue': (value: number) => true
  },
  { default: never },
  { toggleMuted: () => void }
>
export type VMediaVolume = InstanceType<typeof VMediaVolume>
