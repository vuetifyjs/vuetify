// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { VTreeviewItem } from './VTreeviewItem'
import { VCheckboxBtn } from '@/components/VCheckbox'

// Composables
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, reactive, toRaw, withModifiers } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalListItem } from '@/components/VList/VList'
import type { VListItemSlots } from '@/components/VList/VListItem'
import type { SelectStrategyProp } from '@/composables/nested/nested'
import type { GenericProps } from '@/util'
import type { ToggleListItemSlot } from './shared'

export type VTreeviewChildrenSlots<T> = {
  [K in keyof Omit<VListItemSlots, 'default'>]: VListItemSlots[K] & {
    item: T
    internalItem: InternalListItem<T>
  }
} & {
  default: never
  item: {
    props: InternalListItem['props']
    item: T
    internalItem: InternalListItem<T>
  }
  toggle: ToggleListItemSlot
}

export const makeVTreeviewChildrenProps = propsFactory({
  disabled: Boolean,
  loadChildren: Function as PropType<(item: unknown) => Promise<void>>,
  loadingIcon: {
    type: String,
    default: '$loading',
  },
  items: Array as PropType<readonly InternalListItem[]>,
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

  ...makeDensityProps(),
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
    const isLoading = reactive(new Set<unknown>())

    const isClickOnOpen = computed(() => !props.disabled && (props.openOnClick != null ? props.openOnClick : props.selectable))

    async function checkChildren (item: InternalListItem) {
      try {
        if (!props.items?.length || !props.loadChildren) return

        if (item?.children?.length === 0) {
          isLoading.add(item.value)
          await props.loadChildren(item.raw)
        }
      } finally {
        isLoading.delete(item.value)
      }
    }

    function selectItem (select: (value: boolean) => void, isSelected: boolean) {
      if (props.selectable) {
        select(!isSelected)
      }
    }

    return () => slots.default?.() ?? props.items?.map(item => {
      const { children, props: itemProps } = item
      const loading = isLoading.has(item.value)
      const slotsWithItem = {
        toggle: slots.toggle ? slotProps => slots.toggle?.(slotProps) : undefined,
        prepend: slotProps => (
          <>
            { props.selectable && (!children || (children && !['leaf', 'single-leaf'].includes(props.selectStrategy as string))) && (
              <div>
                <VCheckboxBtn
                  key={ item.value }
                  modelValue={ slotProps.isSelected }
                  disabled={ props.disabled }
                  loading={ loading }
                  color={ props.selectedColor }
                  density={ props.density }
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

            { slots.prepend?.({ ...slotProps, item: item.raw, internalItem: item }) }
          </>
        ),
        append: slots.append ? slotProps => slots.append?.({ ...slotProps, item: item.raw, internalItem: item }) : undefined,
        title: slots.title ? slotProps => slots.title?.({ ...slotProps, item: item.raw, internalItem: item }) : undefined,
        subtitle: slots.subtitle ? slotProps => slots.subtitle?.({ ...slotProps, item: item.raw, internalItem: item }) : undefined,
      } satisfies VTreeviewItem['$props']['$children']

      const treeviewGroupProps = VTreeviewGroup.filterProps(itemProps)
      const treeviewChildrenProps = VTreeviewChildren.filterProps(props)

      return children ? (
        <VTreeviewGroup
          { ...treeviewGroupProps }
          value={ props.returnObject ? item.raw : treeviewGroupProps?.value }
        >
          {{
            activator: ({ props: activatorProps }) => {
              const listItemProps = {
                ...itemProps,
                ...activatorProps,
                value: itemProps?.value,
                onToggleExpand: [() => checkChildren(item), activatorProps.onClick] as any,
                onClick: isClickOnOpen.value ? [() => checkChildren(item), activatorProps.onClick] as any : undefined,
              }

              return (
                <VTreeviewItem
                  { ...listItemProps }
                  value={ props.returnObject ? item.raw : itemProps.value }
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
        slots.item?.({ props: itemProps, item: item.raw, internalItem: item }) ?? (
          <VTreeviewItem
            { ...itemProps }
            value={ props.returnObject ? toRaw(item.raw) : itemProps.value }
            v-slots={ slotsWithItem }
          />
        ))
    })
  },
})
