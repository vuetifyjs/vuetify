import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { defineComponent } from '@/util'
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
    })
  },
})
