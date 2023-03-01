// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { VItemGroupSymbol } from './VItemGroup'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { GroupItemProvide } from '@/composables/group'

export const VItem = genericComponent<{ default: [GroupItemProvide] }>()({
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
