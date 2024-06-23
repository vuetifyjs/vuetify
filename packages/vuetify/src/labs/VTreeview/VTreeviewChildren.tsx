// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { VTreeviewItem } from './VTreeviewItem'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Utilities
import { shallowRef, withModifiers } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalListItem } from '@/components/VList/VList'
import type { VListItemSlots } from '@/components/VList/VListItem'
import type { SelectStrategyProp } from '@/composables/nested/nested'
import type { GenericProps } from '@/util'

export type VTreeviewChildrenSlots<T> = {
  [K in keyof Omit<VListItemSlots, 'default'>]: VListItemSlots[K] & { item: T }
} & {
  default: never
  item: { props: InternalListItem['props'] }
}

export const makeVTreeviewChildrenProps = propsFactory({
  loadChildren: Function as PropType<(item: unknown) => Promise<void>>,
  loadingIcon: {
    type: String,
    default: '$loading',
  },
  items: Array as PropType<readonly InternalListItem[]>,
  openOnClick: {
    type: Boolean,
    default: false,
  },
  selectable: Boolean,
  selectStrategy: [String, Function, Object] as PropType<SelectStrategyProp>,
}, 'VTreeviewChildren')

export const VTreeviewChildren = genericComponent<new <T extends InternalListItem>(
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

    function selectItem (select: (value: boolean) => void, isSelected: boolean) {
      if (props.selectable) {
        select(!isSelected)
      }
    }

    return () => slots.default?.() ?? props.items?.map(({ children, props: itemProps, raw: item }) => {
      const loading = isLoading.value === item.value
      const slotsWithItem = {
        prepend: slotProps => (
          <>
            { props.selectable && (!children || (children && !['leaf', 'single-leaf'].includes(props.selectStrategy as string))) && (
              <div>
                <VCheckboxBtn
                  key={ item.value }
                  modelValue={ slotProps.isSelected }
                  loading={ loading }
                  indeterminate={ slotProps.isIndeterminate }
                  onClick={ withModifiers(() => selectItem(slotProps.select, slotProps.isSelected), ['stop']) }
                  onKeydown={ (e: KeyboardEvent) => {
                    if (!['Enter', 'Space'].includes(e.key)) return
                    e.stopPropagation()
                    selectItem(slotProps.select, slotProps.isSelected)
                  }}
                />
              </div>
            )}

            { slots.prepend?.({ ...slotProps, item }) }
          </>
        ),
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
            activator: ({ props: activatorProps }) => {
              const listItemProps = {
                ...itemProps,
                ...activatorProps,
                value: itemProps?.value,
                onToggleExpand: activatorProps.onClick as any,
                onClick: props.openOnClick ? [() => checkChildren(item), activatorProps.onClick] as any : undefined,
              }

              return (
                <VTreeviewItem
                  { ...listItemProps }
                  loading={ loading }
                  v-slots={ slotsWithItem }
                />
              )
            },
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
        slots.item?.({ props: itemProps }) ?? (
          <VTreeviewItem
            { ...itemProps }
            v-slots={ slotsWithItem }
          />
        ))
    })
  },
})
