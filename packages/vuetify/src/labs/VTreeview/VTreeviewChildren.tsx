// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { makeVTreeviewItemProps, VTreeviewItem } from './VTreeviewItem'
import { createList } from '@/components/VList/list'

// Utilities
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTreeviewItemSlots } from './VTreeviewItem'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps } from '@/util'

export type VTreeviewChildrenSlots<T> = {
  [K in keyof Omit<VTreeviewItemSlots, 'default'>]: VTreeviewItemSlots[K] & { item: T }
} & {
  default: never
  item: { props: ListItem['props'] }
}

export const makeVTreeviewChildrenProps = propsFactory({
  items: Array as PropType<readonly ListItem[]>,
  ...makeVTreeviewItemProps(),
}, 'VTreeviewChildren')

export const VTreeviewChildren = genericComponent<new <T extends ListItem>(
  props: {
    items?: readonly T[]
  },
  slots: VTreeviewChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VTreeviewChildren',

  props: makeVTreeviewChildrenProps(),

  setup (props, { slots }) {
    createList()

    return () => slots.default?.() ?? props.items?.map(({ children, props: itemProps, raw: item }) => {
      const slotsWithItem = {
        prepend: slots.prepend ? (slotProps: any) => slots.prepend?.({ ...slotProps, item }) : undefined,
        append: slots.append ? (slotProps: any) => slots.append?.({ ...slotProps, item }) : undefined,
        title: slots.title ? (slotProps: any) => slots.title?.({ ...slotProps, item }) : undefined,
      }

      const [treeviewGroupProps, _1] = VTreeviewGroup.filterProps(itemProps)

      const [treeviewItemProps, _2] = VTreeviewItem.filterProps(props)

      return children ? (
        <VTreeviewGroup
          value={ itemProps?.value }
          { ...treeviewGroupProps }
        >
          {{
            activator: ({ props: activatorProps }) =>
              <VTreeviewItem { ...treeviewItemProps } { ...itemProps } { ...activatorProps } v-slots={ slotsWithItem } />,
            default: () => (
              <VTreeviewChildren { ...props } items={ children } v-slots={ slots } />
            ),
          }}
        </VTreeviewGroup>
      ) : (
        slots.item ? slots.item({ props: itemProps }) : (
        <VTreeviewItem
          { ...treeviewItemProps }
          { ...itemProps }
          v-slots={ slotsWithItem }
        />
        ))
    })
  },
})
