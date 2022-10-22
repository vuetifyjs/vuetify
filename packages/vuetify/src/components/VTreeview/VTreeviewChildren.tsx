// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { VTreeviewItem } from './VTreeviewItem'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { SlotsToProps } from '@/util'
import type { Prop } from 'vue'
import type { TreeviewGroupActivatorSlot } from './VTreeviewGroup'
import type { InternalListItem } from '../VList/VList'

export const VTreeviewChildren = genericComponent<new <T>() => {
  $props: {
    items?: T[]
  } & SlotsToProps<{
    default: []
    activator: [TreeviewGroupActivatorSlot]
    item: [T]
  }>
}>()({
  name: 'VTreeviewChildren',

  props: {
    items: Array as Prop<InternalListItem[]>,
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
            activator: ({ props: activatorProps }) => {
              const { activator, ...rest } = slots

              return activator
                ? activator({ props: { ...itemProps, ...activatorProps } })
                : <VTreeviewItem { ...itemProps } { ...activatorProps } v-slots={ rest } />
            },
          }}
        </VTreeviewGroup>
      ) : (
        slots.item ? slots.item({ props: itemProps }) : (
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
