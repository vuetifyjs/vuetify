// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { VTreeviewItem } from './VTreeviewItem'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { MakeSlots } from '@/util'
import type { Prop } from 'vue'
import type { InternalTreeviewItem } from './shared'
import type { TreeviewGroupActivatorSlot } from './VTreeviewGroup'

export const VTreeviewChildren = genericComponent<new <T extends InternalTreeviewItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    default: []
    header: [TreeviewGroupActivatorSlot]
    item: [T]
  }>
}>()({
  name: 'VTreeviewChildren',

  props: {
    items: Array as Prop<InternalTreeviewItem[]>,
  },

  setup (props, { slots }) {
    return () => slots.default?.() ?? props.items?.map(({ children, props: itemProps }) => {
      return children ? (
        <VTreeviewGroup
          key={ itemProps?.value }
          value={ itemProps?.value }
          hideExpand={ !children }
        >
          {{
            default: () => (
              <VTreeviewChildren items={ children } v-slots={ slots } />
            ),
            activator: ({ props: activatorProps }) => slots.header
              ? slots.header({ ...itemProps, ...activatorProps })
              : <VTreeviewItem { ...itemProps } { ...activatorProps } v-slots={ slots } />,
          }}
        </VTreeviewGroup>
      ) : (
        slots.item ? slots.item(itemProps) : (
          <VTreeviewItem
            key={ itemProps?.value }
            { ...itemProps }
            v-slots={ slots }
          />
        )
      )
    })
  },
})
