// Components
import { VDivider } from '../VDivider'
import { VListGroup } from './VListGroup'
import { VListItem } from './VListItem'
import { VListSubheader } from './VListSubheader'

// Utilities
import { genericComponent } from '@/util'
import { createList } from './list'

// Types
import type { InternalListItem } from './VList'
import type { ListGroupHeaderSlot } from './VListGroup'
import type { MakeSlots } from '@/util'
import type { Prop } from 'vue'

export const VListChildren = genericComponent<new <T extends InternalListItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    default: []
    externalHeader: [ListGroupHeaderSlot]
    item: [T]
  }>
}>()({
  name: 'VListChildren',

  props: {
    items: Array as Prop<InternalListItem[]>,
  },

  setup (props, { slots }) {
    createList()

    return () => slots.default?.() ?? props.items?.map(({ children, props: itemProps, type }) => {
      if (type === 'divider') return <VDivider {...itemProps} />

      if (type === 'subheader') return <VListSubheader {...itemProps} v-slots={ slots } />

      return children ? (
        <VListGroup
          value={ itemProps?.value }
        >
          {{
            items: () => (
              <VListChildren items={ children } v-slots={ slots } />
            ),
            header: headerProps => slots.externalHeader
              ? slots.externalHeader({ ...itemProps, ...headerProps })
              : <VListItem { ...itemProps } { ...headerProps } />,
          }}
        </VListGroup>
      ) : (
        slots.item ? slots.item(itemProps) : <VListItem { ...itemProps } v-slots={ slots } />
      )
    })
  },
})
