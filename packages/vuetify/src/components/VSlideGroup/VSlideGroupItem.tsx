import { makeGroupItemProps } from '@/composables/group'
import { useSlideGroupItem } from '@/composables/slideGroup'
import { defineComponent } from '@/util'

export const VSlideGroupItem = defineComponent({
  name: 'VSlideGroupItem',

  props: {
    ...makeGroupItemProps(),
  },

  setup (props, { slots }) {
    const slideGroupItem = useSlideGroupItem(props)

    return () => slots.default?.({
      isSelected: slideGroupItem.isSelected.value,
      select: slideGroupItem.select,
    })
  },
})
