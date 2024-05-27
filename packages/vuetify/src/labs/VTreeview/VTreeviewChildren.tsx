// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { VTreeviewItem } from './VTreeviewItem'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Utilities
import { shallowRef } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VListItemSlots } from '@/components/VList/VListItem'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps } from '@/util'

export type VTreeviewChildrenSlots<T> = {
  [K in keyof Omit<VListItemSlots, 'default'>]: VListItemSlots[K] & { item: T }
} & {
  default: never
  item: { item: ListItem, props: ListItem['props'], index: number }
}

export const makeVTreeviewChildrenProps = propsFactory({
  loadChildren: Function as PropType<(item: unknown) => Promise<void>>,
  loadingIcon: {
    type: String,
    default: '$loading',
  },
  items: Array as PropType<readonly ListItem[]>,
  selectable: Boolean,
}, 'VTreeviewChildren')

export const VTreeviewChildren = genericComponent<new <T extends ListItem>(
  props: {
    items?: readonly T[]
  },
  slots: VTreeviewChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VTreeviewChildren',

  props: makeVTreeviewChildrenProps(),

  setup (props, { emit, slots }) {
    const isLoading = shallowRef(null)

    function checkChildren (item: any) {
      return new Promise<void>(resolve => {
        if (!props.items?.length || !props.loadChildren) return resolve()

        if (item?.children?.length === 0) {
          isLoading.value = item.value
          props.loadChildren(item).then(resolve)

          return
        }

        resolve()
      }).finally(() => {
        isLoading.value = null
      })
    }

    function onClick (e: MouseEvent | KeyboardEvent, item: any) {
      e.stopPropagation()

      checkChildren(item)
    }

    return () => slots.default?.() ?? props.items?.map((internalItem, index) => {
      const { children, props: itemProps, raw: item } = internalItem

      const loading = isLoading.value === item.value
      const slotsWithItem = {
        prepend: slots.prepend
          ? slotProps => slots.prepend?.({ ...slotProps, item })
          : props.selectable
            ? ({ isSelected, isIndeterminate }) => (
              <VCheckboxBtn
                key={ item.value }
                tabindex="-1"
                modelValue={ isSelected }
                loading={ loading }
                indeterminate={ isIndeterminate }
                onClick={ (e: MouseEvent) => onClick(e, item) }
              />
            )
            : undefined,
        append: slots.append ? slotProps => slots.append?.({ ...slotProps, item }) : undefined,
        title: slots.title ? slotProps => slots.title?.({ ...slotProps, item }) : undefined,
      } satisfies VTreeviewItem['$props']['$children']

      const treeviewGroupProps = VTreeviewGroup.filterProps(itemProps)
      const treeviewChildrenProps = VTreeviewChildren.filterProps(props)

      return children ? (
        <VTreeviewGroup
          value={ itemProps?.value }
          { ...treeviewGroupProps }
        >
          {{
            activator: ({ props: activatorProps }) => (
              <VTreeviewItem
                { ...itemProps }
                { ...activatorProps }
                loading={ loading }
                v-slots={ slotsWithItem }
                onClick={ (e: MouseEvent | KeyboardEvent) => onClick(e, item) }
              />
            ),
            default: () => (
              <VTreeviewChildren
                { ...treeviewChildrenProps }
                items={ children }
                v-slots={ slots }
              />
            ),
          }}
        </VTreeviewGroup>
      ) : (
        slots.item?.({ item: internalItem, props: itemProps, index }) ?? (
          <VTreeviewItem
            { ...itemProps }
            v-slots={ slotsWithItem }
          />
        ))
    })
  },
})
