// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'

// Utilities
import { genericComponent } from '@/util'
import { VSlideGroupSymbol } from './VSlideGroup'

// Types
import type { UnwrapRef } from 'vue'
import type { MakeSlots } from '@/util'
import type { GroupItemProvide } from '@/composables/group'

export const VSlideGroupItem = genericComponent<new () => {
  $slots: MakeSlots<{
    default: [{
      isSelected: UnwrapRef<GroupItemProvide['isSelected']>
      select: GroupItemProvide['select']
      toggle: GroupItemProvide['toggle']
      selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>
    }]
  }>
}>()({
  name: 'VSlideGroupItem',

  props: {
    ...makeGroupItemProps(),
  },

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { slots }) {
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol)

    return () => slots.default?.({
      isSelected: slideGroupItem.isSelected.value,
      select: slideGroupItem.select,
      toggle: slideGroupItem.toggle,
      selectedClass: slideGroupItem.selectedClass.value,
    })
  },
})

export type VSlideGroupItem = InstanceType<typeof VSlideGroupItem>
