// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { VItemGroupSymbol } from './VItemGroup'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VItem',

  props: makeProps(makeGroupItemProps()),

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
