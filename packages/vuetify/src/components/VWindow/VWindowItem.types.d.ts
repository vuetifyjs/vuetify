// Types
import type { StyleValue } from 'vue'
import type { GroupItemProvide } from '@/composables/group.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { ClassValue } from '@/util/shared.types'

export interface VWindowItemProps {
  class?: ClassValue
  disabled?: boolean
  eager?: boolean
  reverseTransition?: string | boolean
  selectedClass?: string
  style?: StyleValue
  transition?: string | boolean
  value?: any
}

type VWindowItemDefaultKeys =
  | 'disabled'
  | 'eager'
  | 'reverseTransition'
  | 'style'
  | 'transition'

export type VWindowItemEmits = {
  'group:selected': (val: { value: boolean }) => true
}

export type VWindowItemExposed = {
  groupItem: GroupItemProvide
}

export declare const VWindowItem: VuetifyComponent<
  VWindowItemProps,
  VWindowItemDefaultKeys,
  VWindowItemEmits,
  { default: never },
  VWindowItemExposed
>
export type VWindowItem = InstanceType<typeof VWindowItem>

export {}
