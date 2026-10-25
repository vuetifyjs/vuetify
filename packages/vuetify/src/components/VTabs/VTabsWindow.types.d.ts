// Types
import type { StyleValue } from 'vue'
import type { VWindowSlots } from '@/components/VWindow/VWindow.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VTabsWindowProps {
  class?: any
  crossfade?: boolean
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  modelValue?: any
  reverse?: boolean
  selectedClass?: string
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  transitionDuration?: number
  verticalArrows?: boolean | 'left' | 'right'
  wheel?: boolean
}

type VTabsWindowDefaultKeys =
  | 'crossfade'
  | 'direction'
  | 'disabled'
  | 'reverse'
  | 'selectedClass'
  | 'style'
  | 'tag'
  | 'wheel'

export declare const VTabsWindow: VuetifyComponent<
  VTabsWindowProps,
  VTabsWindowDefaultKeys,
  {
    'update:modelValue': (v: any) => true
  },
  new <TModel>(
    props: {
      modelValue?: TModel
      'onUpdate:modelValue'?: (value: TModel) => void
    },
    slots: VWindowSlots
  ) => GenericProps<typeof props, typeof slots>
>
export type VTabsWindow = InstanceType<typeof VTabsWindow>

export {}
