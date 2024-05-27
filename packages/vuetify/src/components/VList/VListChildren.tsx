// Components
import { VListGroup } from './VListGroup'
import { VListItem } from './VListItem'

// Composables
import { VListSubheader } from './VListSubheader'
import { VDivider } from '../VDivider'

// Utilities
import { createList } from './list'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VListItemSlots } from './VListItem'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps } from '@/util'

export type VListChildrenSlots<T> = {
  [K in keyof Omit<VListItemSlots, 'default'>]: VListItemSlots[K] & { item: T }
} & {
  default: never
  item: { item: ListItem, props: ListItem['props'], index: number }
  divider: { item: ListItem, props: ListItem['props'], index: number }
  subheader: { item: ListItem, props: ListItem['props'], index: number }
  header: { item: ListItem, props: ListItem['props'], index: number }
}

export const makeVListChildrenProps = propsFactory({
  items: Array as PropType<readonly ListItem[]>,
  returnObject: Boolean,
}, 'VListChildren')

export const VListChildren = genericComponent<new <T extends ListItem>(
  props: {
    items?: readonly T[]
    returnObject?: boolean
  },
  slots: VListChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VListChildren',

  props: makeVListChildrenProps(),

  setup (props, { slots }) {
    createList()

    return () => {
      if (slots.default) return slots.default()

      return props.items?.map((internalItem, index) => {
        const { children, props: itemProps, raw: item } = internalItem

        const slotsWithItem = {
          subtitle: slots.subtitle ? (slotProps: any) => slots.subtitle?.({ ...slotProps, item }) : undefined,
          prepend: slots.prepend ? (slotProps: any) => slots.prepend?.({ ...slotProps, item }) : undefined,
          append: slots.append ? (slotProps: any) => slots.append?.({ ...slotProps, item }) : undefined,
          // default: slots.default ? (slotProps: any) => slots.default?.({ ...slotProps, item }) : undefined,
          title: slots.title ? (slotProps: any) => slots.title?.({ ...slotProps, item }) : undefined,
        }

        const listGroupProps = VListGroup.filterProps(itemProps)

        return children && itemProps.subheader ? (
          <div>
            <VListSubheader { ...itemProps }></VListSubheader>
            <VListChildren items={ children } v-slots={ slots } />
            { itemProps.divider && <VDivider /> }
          </div>
        ) : children ? (
          <VListGroup
            value={ itemProps?.value }
            { ...listGroupProps }
          >
            {{
              activator: ({ props: activatorProps }) => slots.header
                ? slots.header({ item: internalItem, props: { ...itemProps, ...activatorProps }, index })
                : <VListItem { ...itemProps } { ...activatorProps } v-slots={ slotsWithItem } />,
              default: () => (
                <VListChildren
                  items={ children }
                  v-slots={ slots }
                />
              ),
            }}
          </VListGroup>
        ) : (
          slots.item ? slots.item({ item: internalItem, props: itemProps, index }) : (
            <VListItem
              { ...itemProps }
              v-slots={ slotsWithItem }
            />
          )
        )
      })
    }
  },
})
