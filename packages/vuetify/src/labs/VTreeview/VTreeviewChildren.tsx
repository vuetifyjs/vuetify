// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { VTreeviewItem } from './VTreeviewItem'

// Utilities
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalListItem } from '@/components/VList/VList'
import type { VListItemSlots } from '@/components/VList/VListItem'
import type { GenericProps } from '@/util'

export type VTreeviewChildrenSlots<T> = {
  [K in keyof Omit<VListItemSlots, 'default'>]: VListItemSlots[K] & { item: T }
} & {
  default: never
  item: { props: InternalListItem['props'] }
}

export const makeVTreeviewChildrenProps = propsFactory({
  items: Array as PropType<readonly InternalListItem[]>,
}, 'VTreeviewChildren')

export const VTreeviewChildren = genericComponent<new <T extends InternalListItem>(
  props: {
    items?: readonly T[]
  },
  slots: VTreeviewChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VTreeviewChildren',

  props: makeVTreeviewChildrenProps(),

  setup (props, { slots }) {
    return () => slots.default?.() ?? props.items?.map(({ children, props: itemProps, raw: item }) => {
      const slotsWithItem = {
        prepend: slots.prepend ? (slotProps: any) => slots.prepend?.({ ...slotProps, item }) : undefined,
        append: slots.append ? (slotProps: any) => slots.append?.({ ...slotProps, item }) : undefined,
        title: slots.title ? (slotProps: any) => slots.title?.({ ...slotProps, item }) : undefined,
      }

      const treeviewGroupProps = VTreeviewGroup.filterProps(itemProps)

      return children ? (
        <VTreeviewGroup
          value={ itemProps?.value }
          { ...treeviewGroupProps }
        >
          {{
            activator: ({ props: activatorProps }) =>
              <VTreeviewItem { ...itemProps } { ...activatorProps } v-slots={ slotsWithItem } />,
            default: () => (
              <VTreeviewChildren { ...props } items={ children } v-slots={ slots } />
            ),
          }}
        </VTreeviewGroup>
      ) : (
        slots.item?.({ props: itemProps }) ?? (
          <VTreeviewItem
            { ...itemProps }
            v-slots={ slotsWithItem }
          />
        ))
    })
  },
})
