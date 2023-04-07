// Components
import { VDivider } from '../VDivider'
import { VListGroup } from './VListGroup'
import { VListItem } from './VListItem'

// Composables
import { useLocale } from '@/composables'

// Utilities
import { createList } from './list'
import { genericComponent } from '@/util'

// Types
import type { Prop } from 'vue'
import type { SlotsToProps } from '@/util'
import type { VListGroupSlots } from './VListGroup'
import type { ListItemSubtitleSlot, ListItemTitleSlot } from './VListItem'
import type { InternalListItem } from './VList'
import { VListSubheader } from './VListSubheader'

export type ListItemSlot<T> = {
  item: InternalListItem<T>
  props: InternalListItem<T>['props']
  index: number
}

export const VListChildren = genericComponent<new <T>() => {
  $props: {
    items?: InternalListItem<T>[]
  } & SlotsToProps<{
    default: []
    header: [VListGroupSlots['activator'] & { item: InternalListItem<T> }]
    item: [ListItemSlot<T>]
    items?: T[]
    title: [ListItemTitleSlot]
    subtitle: [ListItemSubtitleSlot]
  }>
}>()({
  name: 'VListChildren',

  props: {
    items: Array as Prop<InternalListItem<any>[]>,
    noDataText: {
      type: String,
    },
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    createList()

    return () => {
      if (slots.default) return slots.default()

      if (!props.items?.length && props.noDataText) {
        return slots['no-data']?.({ noDataText: props.noDataText }) ?? <VListItem title={ t(props.noDataText) } />
      }

      return props.items?.map((internalItem, index) => {
        const { children, props: itemProps, raw: item } = internalItem

        const slotsWithItem = {
          subtitle: slots.subtitle ? (slotProps: any) => slots.subtitle?.({ ...slotProps, item }) : undefined,
          prepend: slots.prepend ? (slotProps: any) => slots.prepend?.({ ...slotProps, item }) : undefined,
          append: slots.append ? (slotProps: any) => slots.append?.({ ...slotProps, item }) : undefined,
          default: slots.default ? (slotProps: any) => slots.default?.({ ...slotProps, item }) : undefined,
          title: slots.title ? (slotProps: any) => slots.title?.({ ...slotProps, item }) : undefined,
        }

        const [listGroupProps, _1] = VListGroup.filterProps(itemProps)

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
                ? slots.header({ item: internalItem, props: { ...itemProps, ...activatorProps } })
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
