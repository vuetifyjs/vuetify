// Types
import type { StyleValue } from 'vue'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VProgressLinearSlots = {
  default: { value: number, buffer: number }
}

export interface VProgressLinearProps {
  absolute?: boolean
  active?: boolean
  bgColor?: string
  bgOpacity?: string | number
  bufferColor?: string
  bufferOpacity?: string | number
  bufferValue?: string | number
  chunkCount?: string | number
  chunkGap?: string | number
  chunkWidth?: string | number
  class?: any
  clickable?: boolean
  color?: string
  height?: string | number
  indeterminate?: boolean
  location?: Anchor | null
  max?: string | number
  modelValue?: string | number
  opacity?: string | number
  reveal?: boolean | { duration?: number | undefined }
  reverse?: boolean
  rounded?: string | number | boolean
  roundedBar?: boolean
  shape?: 'flat' | 'wavy'
  stopIndicator?: boolean
  stream?: boolean
  striped?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  transition?: boolean | { duration?: string | number | undefined }
  variant?: 'split'
}

type VProgressLinearDefaultKeys =
  | 'absolute'
  | 'active'
  | 'bufferValue'
  | 'chunkCount'
  | 'chunkGap'
  | 'chunkWidth'
  | 'clickable'
  | 'height'
  | 'indeterminate'
  | 'location'
  | 'max'
  | 'modelValue'
  | 'reveal'
  | 'reverse'
  | 'rounded'
  | 'roundedBar'
  | 'shape'
  | 'stopIndicator'
  | 'stream'
  | 'striped'
  | 'style'
  | 'tag'
  | 'tile'
  | 'transition'
  | 'variant'

export declare const VProgressLinear: VuetifyComponent<
  VProgressLinearProps,
  VProgressLinearDefaultKeys,
  {
    'update:modelValue': (value: number) => true
  },
  VProgressLinearSlots
>
export type VProgressLinear = InstanceType<typeof VProgressLinear>

export {}
