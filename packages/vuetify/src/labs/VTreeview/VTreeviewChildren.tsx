// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { VTreeviewItem } from './VTreeviewItem'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, shallowRef, toRaw, withModifiers } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VListItemSlots } from '@/components/VList/VListItem'
import type { ListItem } from '@/composables/list-items'
import type { SelectStrategyProp } from '@/composables/nested/nested'
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
  openOnClick: {
    type: Boolean,
    default: undefined,
  },
  indeterminateIcon: {
    type: IconValue,
    default: '$checkboxIndeterminate',
  },
  falseIcon: IconValue,
  trueIcon: IconValue,
  returnObject: Boolean,
  selectable: Boolean,
  selectedColor: String,
  selectStrategy: [String, Function, Object] as PropType<SelectStrategyProp>,
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

    const isClickOnOpen = computed(() => props.openOnClick != null ? props.openOnClick : props.selectable)

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

    return () => slots.default?.() ?? props.items?.map((internalItem, index) => {
      const { children, props: itemProps, raw: item } = internalItem

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
                  color={ props.selectedColor }
                  indeterminate={ slotProps.isIndeterminate }
                  indeterminateIcon={ props.indeterminateIcon }
                  falseIcon={ props.falseIcon }
                  trueIcon={ props.trueIcon }
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
          { ...treeviewGroupProps }
          value={ props.returnObject ? item : treeviewGroupProps?.value }
        >
          {{
            activator: ({ props: activatorProps }) => {
              const listItemProps = {
                ...itemProps,
                ...activatorProps,
                value: itemProps?.value,
                onToggleExpand: activatorProps.onClick as any,
                onClick: isClickOnOpen.value ? [() => checkChildren(item), activatorProps.onClick] as any : undefined,
              }

              return (
                <VTreeviewItem
                  { ...listItemProps }
                  value={ props.returnObject ? toRaw(item) : itemProps.value }
                  loading={ loading }
                  v-slots={ slotsWithItem }
                />
              )
            },
            default: () => (
              <VTreeviewChildren
                { ...treeviewChildrenProps }
                items={ children }
                returnObject={ props.returnObject }
                v-slots={ slots }
              />
            ),
          }}
        </VTreeviewGroup>
      ) : (
        slots.item?.({ item: internalItem, props: itemProps, index }) ?? (
          <VTreeviewItem
            { ...itemProps }
            value={ props.returnObject ? toRaw(item) : itemProps.value }
            v-slots={ slotsWithItem }
          />
        ))
    })
  },
})
