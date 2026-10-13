// Types
import type { UnwrapRef } from 'vue'
import type { GroupItemProvide } from '@/composables/group.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VSlideGroupItemSlots = {
  default: {
    isSelected: UnwrapRef<GroupItemProvide['isSelected']>
    select: GroupItemProvide['select']
    toggle: GroupItemProvide['toggle']
    selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>
  }
}

export interface VSlideGroupItemProps {
  disabled?: boolean
  selectedClass?: string
  value?: any
}

export type VSlideGroupItemDefaultKeys =
  | 'disabled'

export declare const VSlideGroupItem: VuetifyComponent<
  VSlideGroupItemProps,
  VSlideGroupItemDefaultKeys,
  {
    'group:selected': (val: { value: boolean }) => true
  },
  VSlideGroupItemSlots
>
export type VSlideGroupItem = InstanceType<typeof VSlideGroupItem>
