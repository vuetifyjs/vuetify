// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { VItemGroupSymbol } from './VItemGroup'

// Utilities
import { defineComponent } from '@/util'

export const VItem = defineComponent({
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
