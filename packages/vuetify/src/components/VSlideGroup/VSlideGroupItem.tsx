// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { VSlideGroupSymbol } from './VSlideGroup'

// Utilities
import { defineComponent } from '@/util'

export const VSlideGroupItem = defineComponent({
  name: 'VSlideGroupItem',

  props: {
    ...makeGroupItemProps(),
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
