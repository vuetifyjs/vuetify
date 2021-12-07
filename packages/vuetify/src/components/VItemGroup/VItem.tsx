// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { VItemGroupSymbol } from './VItemGroup'

// Utilities
import { genericComponent, useRender } from '@/util'

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
    const item = useGroupItem(props, VItemGroupSymbol)

    if (item) {
      useRender(() => {
        const {
          isSelected,
          select,
          toggle,
          selectedClass,
          value,
          disabled,
          group,
          id,
        } = item

        return (
          <>
            {
              slots.default?.({
                isSelected,
                selectedClass,
                select,
                toggle,
                value,
                disabled,
                group,
                id,
              } as GroupItemProvide)
            }
          </>
        )
      })
    }

    return {}
  },
})

export type VItem = InstanceType<typeof VItem>
