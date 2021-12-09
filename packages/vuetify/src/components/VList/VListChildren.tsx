// Components
import { VListGroup } from './VListGroup'
import { VListItem } from './VListItem'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { Prop } from 'vue'
import type { MakeSlots } from '@/util'
import type { ListGroupHeaderSlot } from './VListGroup'
import type { ListItem } from './VList'

export const VListChildren = genericComponent<new <T extends ListItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    externalHeader: [ListGroupHeaderSlot]
    item: [T]
  }>
}>()({
  name: 'VListChildren',

  props: {
    items: Array as Prop<ListItem[]>,
  },

  setup (props, { slots }) {
    return () => slots.default?.() ?? props.items?.map(({ children, ...item }) => {
      const { value, ...rest } = item
      return children ? (
        <VListGroup
          value={value}
          items={children}
          v-slots={{
            ...slots,
            header: headerProps => slots.externalHeader
              ? slots.externalHeader({ ...rest, ...headerProps })
              : <VListItem {...rest} {...headerProps} />,
          }}
        />
      ) : (
        slots.item ? slots.item(item) : <VListItem {...item} v-slots={slots} />
      )
    })
  },
})
