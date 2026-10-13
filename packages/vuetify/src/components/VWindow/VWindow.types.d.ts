// Types
import type { StyleValue } from 'vue'
import type { GroupProvide } from '@/composables/group.types'
import type { IconValue } from '@/composables/icons.types'
import type { TouchHandlers } from '@/directives/touch/touch.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ClassValue, JSXComponent } from '@/util/shared.types'

export interface VWindowProps<T = any> {
  class?: ClassValue
  continuous?: boolean
  crossfade?: boolean
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  mandatory?: boolean | 'force'
  modelValue?: T
  nextIcon?: IconValue
  prevIcon?: IconValue
  reverse?: boolean
  selectedClass?: string
  showArrows?: string | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  touch?: boolean | TouchHandlers
  transitionDuration?: number
  verticalArrows?: boolean | 'left' | 'right'
  wheel?: boolean
}

export type VWindowDefaultKeys =
  | 'continuous'
  | 'crossfade'
  | 'direction'
  | 'disabled'
  | 'mandatory'
  | 'nextIcon'
  | 'prevIcon'
  | 'reverse'
  | 'selectedClass'
  | 'style'
  | 'tag'
  | 'touch'
  | 'wheel'

export interface VWindowControlProps {
  'aria-label': string
  class: string
  icon: IconValue
  onClick: () => void
}

export type VWindowSlots = {
  default: { group: GroupProvide }
  additional: { group: GroupProvide }
  prev: { props: VWindowControlProps }
  next: { props: VWindowControlProps }
}

export type VWindowEmits = {
  'update:modelValue': (value: any) => true
}

export type VWindowExposed = {
  group: GroupProvide
}

export declare const VWindow: VuetifyComponent<
  VWindowProps,
  VWindowDefaultKeys,
  VWindowEmits,
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VWindowSlots,
  ) => GenericProps<typeof props, typeof slots>,
  VWindowExposed
>
export type VWindow = InstanceType<typeof VWindow>
