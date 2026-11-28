// Composables
import { VItemGroupSymbol } from './VItemGroup'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { VItemSlots } from './VItem.types'

export const VItem = genericComponent<VItemSlots>()({
  name: 'VItem',

  props: makeGroupItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

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
