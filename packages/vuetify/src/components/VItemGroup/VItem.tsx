// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { VItemGroupSymbol } from './VItemGroup'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { MakeSlots } from '@/util'
import type { GroupItemProvide } from '@/composables/group'

export const VItem = genericComponent<new () => {
  $slots: MakeSlots<{
    default: [GroupItemProvide]
  }>
}>()({
  name: 'VItem',

  props: makeGroupItemProps(),

  setup (props, { slots }) {
    const { isSelected, select, toggle, selectedClass, value, disabled } = useGroupItem(props, VItemGroupSymbol)
    return () => slots.default?.({
      isSelected: isSelected.value,
      selectedClass: selectedClass.value,
      select,
      toggle,
      value: value.value,
      disabled: disabled.value,
    })
  },
})

export type VItem = InstanceType<typeof VItem>
