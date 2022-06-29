// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'

// Utilities
import { defineComponent } from '@/util'

// Types
import { VSlideGroupSymbol } from './VSlideGroup'

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
