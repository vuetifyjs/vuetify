// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { makeVTreeviewItemProps, VTreeviewItem } from './VTreeviewItem'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VDivider } from '@/components/VDivider'
import { VListSubheader } from '@/components/VList'

// Composables
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, mergeProps, reactive, ref, toRaw } from 'vue'
import { genericComponent, getIndentLines, pick, propsFactory, renderSlot } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalListItem } from '@/components/VList/VList'
import type { VListItemSlots } from '@/components/VList/VListItem'
import type { SelectStrategyProp } from '@/composables/nested/nested'
import type { GenericProps, IndentLinesVariant, IndentLineType } from '@/util'

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
  divider: { props: InternalListItem['props'] }
  subheader: { props: InternalListItem['props'] }
}

export const makeVTreeviewChildrenProps = propsFactory({
  fluid: Boolean,
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
  activatable: Boolean,
  selectable: Boolean,
  selectedColor: String,
  selectStrategy: [String, Function, Object] as PropType<SelectStrategyProp>,
  index: Number,
  isLastGroup: Boolean,
  separateRoots: Boolean,
  parentIndentLines: Array as PropType<IndentLineType[]>,
  indentLinesVariant: String as PropType<IndentLinesVariant>,
  path: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  ...pick(makeVTreeviewItemProps(), ['hideActions']),
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
    const activatorItems = ref<VTreeviewItem[]>([])

    const isClickOnOpen = computed(() => (
      !props.disabled && (
        props.openOnClick != null
          ? props.openOnClick
          : props.selectable && !props.activatable
      )))

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
        select(isSelected)
      }
    }

    return () => slots.default?.() ?? props.items?.map((item, index, items) => {
      const { children, props: itemProps } = item
      const loading = isLoading.has(item.value)
      const nextItemHasChildren = !!items.at(index + 1)?.children

      const depth = props.path?.length ?? 0
      const isLast = items.length - 1 === index
      const treeItemProps = {
        index,
        depth,
        isFirst: index === 0,
        isLast,
        path: [...props.path, index],
        hideAction: props.hideActions,
      }

      const indentLines = getIndentLines({
        depth,
        isLast,
        isLastGroup: props.isLastGroup,
        leafLinks: !props.hideActions && !props.fluid,
        separateRoots: props.separateRoots,
        parentIndentLines: props.parentIndentLines,
        variant: props.indentLinesVariant,
      })

      const slotsWithItem = {
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
                  onUpdate:modelValue={ v => selectItem(slotProps.select, v) }
                  onClick={ (e: PointerEvent) => e.stopPropagation() }
                  onKeydown={ (e: KeyboardEvent) => {
                    if (!['Enter', 'Space'].includes(e.key)) return
                    e.stopPropagation()
                    selectItem(slotProps.select, slotProps.isSelected)
                  }}
                />
              </div>
            )}

            { slots.prepend?.({ ...slotProps, ...treeItemProps, item: item.raw, internalItem: item }) }
          </>
        ),
        append: slots.append
          ? slotProps => slots.append?.({ ...slotProps, ...treeItemProps, item: item.raw, internalItem: item })
          : undefined,
        title: slots.title ? slotProps => slots.title?.({ ...slotProps, item: item.raw, internalItem: item }) : undefined,
        subtitle: slots.subtitle ? slotProps => slots.subtitle?.({ ...slotProps, item: item.raw, internalItem: item }) : undefined,
      } satisfies VTreeviewItem['$props']['$children']

      const treeviewGroupProps = VTreeviewGroup.filterProps(itemProps)
      const treeviewChildrenProps = VTreeviewChildren.filterProps({ ...props, ...treeItemProps })

      return children ? (
        <VTreeviewGroup
          { ...treeviewGroupProps }
          value={ props.returnObject ? item.raw : treeviewGroupProps?.value }
          rawId={ treeviewGroupProps?.value }
        >
          {{
            activator: ({ props: activatorProps }) => {
              const listItemProps = {
                ...mergeProps(activatorProps, itemProps),
                value: itemProps?.value,
                onToggleExpand: [() => checkChildren(item), activatorProps.onClick] as any,
                onClick: isClickOnOpen.value
                  ? [() => checkChildren(item), activatorProps.onClick] as any
                  : () => selectItem(activatorItems.value[index]?.select, !activatorItems.value[index]?.isSelected),
              }

              return (
                <VTreeviewItem
                  ref={ el => activatorItems.value[index] = el as VTreeviewItem }
                  { ...listItemProps }
                  hideActions={ props.hideActions }
                  indentLines={ indentLines.node }
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
                indentLinesVariant={ props.indentLinesVariant }
                parentIndentLines={ indentLines.children }
                isLastGroup={ nextItemHasChildren }
                returnObject={ props.returnObject }
                v-slots={ slots }
              />
            ),
          }}
        </VTreeviewGroup>
      ) : renderSlot(
        slots.item,
        { props: itemProps, item: item.raw, internalItem: item },
        () => {
          if (item.type === 'divider') {
            return renderSlot(
              slots.divider,
              { props: item.raw },
              () => <VDivider { ...item.props } />,
            )
          }
          if (item.type === 'subheader') {
            return renderSlot(
              slots.subheader,
              { props: item.raw },
              () => <VListSubheader { ...item.props } />,
            )
          }
          return (
            <VTreeviewItem
              { ...itemProps }
              hideActions={ props.hideActions }
              indentLines={ indentLines.leaf }
              value={ props.returnObject ? toRaw(item.raw) : itemProps.value }
              v-slots={ slotsWithItem }
            />
          )
        })
    })
  },
})
