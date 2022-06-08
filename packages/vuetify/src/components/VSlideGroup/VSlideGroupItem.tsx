// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { VSlideGroupSymbol } from './VSlideGroup'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VSlideGroupItem = defineComponent({
  name: 'VSlideGroupItem',

  props: {
    ...makeGroupItemProps(),
  },

  setup (props, { slots }) {
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol)

    useRender(() => slots.default?.({
      isSelected: slideGroupItem.isSelected.value,
      select: slideGroupItem.select,
      toggle: slideGroupItem.toggle,
      selectedClass: slideGroupItem.selectedClass.value,
    }))

    return slideGroupItem.isReady
  },
})
