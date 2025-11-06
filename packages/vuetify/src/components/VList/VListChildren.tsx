// Components
import { VListGroup } from './VListGroup'
import { VListItem } from './VListItem'
import { VListSubheader } from './VListSubheader'
import { VDivider } from '@/components/VDivider'

// Utilities
import { mergeProps, toRef } from 'vue'
import { createList } from './list'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalListItem } from './VList'
import type { VListItemSlots } from './VListItem'
import type { TagProps } from '@/composables/tag'
import type { GenericProps } from '@/util'

export type VListChildrenSlots<T> = {
  [K in keyof Omit<VListItemSlots, 'default'>]: VListItemSlots[K] & { item: T }
} & {
  default: never
  item: { props: InternalListItem['props'] }
  divider: { props: InternalListItem['props'] }
  subheader: { props: InternalListItem['props'] }
  header: { props: InternalListItem['props'] }
}

export const makeVListChildrenProps = propsFactory({
  groupTag: [String, Object, Function] as PropType<TagProps['tag']>,
  items: Array as PropType<readonly InternalListItem[]>,
  returnObject: Boolean,
}, 'VListChildren')

export const VListChildren = genericComponent<new <T extends InternalListItem>(
  props: {
    groupTag?: TagProps['tag']
    items?: readonly T[]
    returnObject?: boolean
  },
  slots: VListChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VListChildren',

  props: makeVListChildrenProps(),

  setup (props, { slots }) {
    createList()

    return () => slots.default?.() ?? props.items?.map(({ children, props: itemProps, type, raw: item }) => {
      if (type === 'divider') {
        return slots.divider?.({ props: itemProps }) ?? (
          <VDivider { ...itemProps } />
        )
      }

      if (type === 'subheader') {
        return slots.subheader?.({ props: itemProps }) ?? (
          <VListSubheader { ...itemProps } />
        )
      }

      const slotsWithItem = {
        subtitle: slots.subtitle ? (slotProps: any) => slots.subtitle?.({ ...slotProps, item }) : undefined,
        prepend: slots.prepend ? (slotProps: any) => slots.prepend?.({ ...slotProps, item }) : undefined,
        append: slots.append ? (slotProps: any) => slots.append?.({ ...slotProps, item }) : undefined,
        title: slots.title ? (slotProps: any) => slots.title?.({ ...slotProps, item }) : undefined,
      }

      const childrenTag = toRef(() => props.groupTag === 'ol' || props.groupTag === 'ul' ? 'li' : undefined)

      const listGroupProps = VListGroup.filterProps(itemProps)

      return children ? (
        <VListGroup
          tag={ childrenTag.value }
          groupTag={ props.groupTag }
          { ...listGroupProps }
          value={ props.returnObject ? item : itemProps?.value }
          rawId={ itemProps?.value }
        >
          {{
            activator: ({ props: activatorProps }) => {
              const listItemProps = mergeProps(
                itemProps,
                activatorProps,
                { value: props.returnObject ? item : itemProps.value }
              ) as typeof itemProps

              return slots.header
                ? slots.header({ props: listItemProps })
                : (
                  <VListItem { ...listItemProps } v-slots={ slotsWithItem } />
                )
            },
            default: () => (
              <VListChildren
                groupTag={ props.groupTag }
                items={ children }
                returnObject={ props.returnObject }
                v-slots={ slots }
              />
            ),
          }}
        </VListGroup>
      ) : (
        slots.item ? slots.item({ props: itemProps }) : (
          <VListItem
            tag={ childrenTag.value }
            { ...itemProps }
            value={ props.returnObject ? item : itemProps.value }
            v-slots={ slotsWithItem }
          />
        )
      )
    })
  },
})
