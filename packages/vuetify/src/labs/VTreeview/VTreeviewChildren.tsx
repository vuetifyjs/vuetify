// Components
import { VTreeviewItem } from './VTreeviewItem'
import { VTreeviewGroup } from './VTreeviewGroup'

// Utilities
import { createList } from '@/components/VList/list'
import { genericComponent, propsFactory } from '@/util'

//Type
import type { GenericProps } from '@/util'
import type { ListItem } from '@/composables/list-items'
import type { VTreeviewItemSlots } from './VTreeviewItem'
import type { PropType } from 'vue'


export type VTreeviewChildrenSlots<T> = {
  [K in keyof Omit<VTreeviewItemSlots, 'default'>]: VTreeviewItemSlots[K] & { item: T }
} & {
  default: never
  item: { props: ListItem['props'] }
}

export const makeVTreeviewChildrenProps = propsFactory({
  items: Array as PropType<readonly ListItem[]>,
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
      slots.item ? slots.item({ props: itemProps }) : (
        <VTreeviewItem
          { ...itemProps }
          v-slots={ slotsWithItem }
        />
      ))
    })
  },
})
