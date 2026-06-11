// Components
import { VTreeviewGroup } from './VTreeviewGroup'
import { makeVTreeviewItemProps, VTreeviewItem } from './VTreeviewItem'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VDivider } from '@/components/VDivider'
import { VListItemAction, VListSubheader } from '@/components/VList'

// Composables
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { useRtl } from '@/composables/locale'
import { VNestedSymbol } from '@/composables/nested/nested'

// Utilities
import { computed, inject, reactive, ref, toRaw } from 'vue'
import { focusableChildren, genericComponent, getIndentLines, pick, propsFactory, renderSlot } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTreeviewItemSlots } from './VTreeviewItem'
import type { InternalListItem } from '@/components/VList/VList'
import type { SelectStrategyProp } from '@/composables/nested/nested'
import type { GenericProps, IndentLinesVariant, IndentLineType } from '@/util'

export type VTreeviewChildrenSlots<T> = {
  [K in keyof Omit<VTreeviewItemSlots, 'default'>]: VTreeviewItemSlots[K] & {
    item: T
    internalItem: InternalListItem<T>
  }
} & {
  default: never
  item: {
    props: InternalListItem['props'] & { indentLines?: IndentLineType[] }
    item: T
    internalItem: InternalListItem<T>
  }
  header: {
    props: InternalListItem['props'] & { indentLines?: IndentLineType[] }
    item: T
    internalItem: InternalListItem<T>
    loading: boolean
  }
  footer: {
    props: { indentLines?: IndentLineType[] }
    item: T
    internalItem: InternalListItem<T>
    loading: boolean
  }
  divider: { props: InternalListItem['props'] }
  subheader: { props: InternalListItem['props'] }
}

// Roving focus crosses VTreeviewChildren instances, so it has to walk the DOM.
// The first child is the first treeitem inside this node's own group, and the
// parent is the treeitem referenced by the enclosing group's aria-labelledby.
function focusFirstChild (el: HTMLElement) {
  el.closest('.v-list-group')
    ?.querySelector<HTMLElement>(':scope > .v-list-group__items [role="treeitem"]')
    ?.focus()
}

function focusParent (el: HTMLElement) {
  const id = el.closest('.v-list-group__items')?.getAttribute('aria-labelledby')
  if (id) document.getElementById(id)?.focus()
}

// Up/Down/Home/End move between treeitems only. focusableChildren already drops
// nodes inside a collapsing (inert) subtree and hidden ones, so the visible
// treeitems are exactly the rows a user can step through.
function visibleTreeitems (el: HTMLElement) {
  const tree = el.closest('.v-treeview')
  return tree
    ? focusableChildren(tree).filter(x => x.matches('[role="treeitem"]'))
    : []
}

function siblingTreeitem (el: HTMLElement, offset: 1 | -1) {
  const items = visibleTreeitems(el)
  return items[items.indexOf(el) + offset] ?? null
}

function focusSibling (el: HTMLElement, offset: 1 | -1) {
  siblingTreeitem(el, offset)?.focus()
}

function focusEdge (el: HTMLElement, edge: 'first' | 'last') {
  const items = visibleTreeitems(el)
  ;(edge === 'first' ? items[0] : items.at(-1))?.focus()
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
    const { isRtl } = useRtl()
    const nested = inject(VNestedSymbol, null)
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

    function idOf (item: InternalListItem) {
      return props.returnObject ? toRaw(item.raw) : item.value
    }

    const verticalKeys = ['ArrowUp', 'ArrowDown', 'Home', 'End']

    function onItemKeydown (e: KeyboardEvent, item: InternalListItem) {
      const root = nested?.root
      if (!root) return

      const el = e.currentTarget as HTMLElement
      const onItem = e.target === e.currentTarget

      if (verticalKeys.includes(e.key)) {
        e.stopPropagation()
        if (!onItem) return
        e.preventDefault()
        if (e.key === 'ArrowDown') focusSibling(el, 1)
        else if (e.key === 'ArrowUp') focusSibling(el, -1)
        else if (e.key === 'Home') focusEdge(el, 'first')
        else if (e.key === 'End') focusEdge(el, 'last')
        return
      }

      if (e.key === 'Tab') {
        const controls = focusableChildren(el)
        if (controls.length) {
          if (!e.shiftKey && e.target === controls.at(-1)) {
            const next = siblingTreeitem(el, 1)
            if (next) {
              e.preventDefault()
              next.focus()
            }
          } else if (e.shiftKey && e.target === controls[0]) {
            e.preventDefault()
            el.focus()
          }
        }
        return
      }

      if (onItem) onItemActionKeydown(e, item, el, root)
    }

    function onItemActionKeydown (e: KeyboardEvent, item: InternalListItem, el: HTMLElement, root: NonNullable<typeof nested>['root']) {
      const expandKey = isRtl.value ? 'ArrowLeft' : 'ArrowRight'
      const collapseKey = isRtl.value ? 'ArrowRight' : 'ArrowLeft'
      const expandable = !!item.children
      const isExpanded = root.opened.value.has(idOf(item))
      const selectableNode = props.selectable &&
        (!item.children || !['leaf', 'single-leaf'].includes(props.selectStrategy as string))

      const toggleExpand = () => {
        checkChildren(item)
        root.open(idOf(item), !isExpanded, e)
      }
      const toggleSelect = () => root.select(idOf(item), root.selected.value.get(idOf(item)) !== 'on', e)

      if (e.key === 'Enter') {
        e.preventDefault()
        if (props.activatable) root.activate(idOf(item), !root.activated.value.has(idOf(item)), e)
        if (expandable) toggleExpand()
        else if (selectableNode) toggleSelect()
      } else if (e.key === ' ') {
        e.preventDefault()
        if (selectableNode) toggleSelect()
        else if (expandable) toggleExpand()
      } else if (e.key === expandKey) {
        e.preventDefault()
        if (expandable && !isExpanded) {
          checkChildren(item)
          root.open(idOf(item), true, e)
        } else if (isExpanded) {
          focusFirstChild(el)
        }
      } else if (e.key === collapseKey) {
        e.preventDefault()
        if (expandable && isExpanded) {
          root.open(idOf(item), false, e)
        } else {
          focusParent(el)
        }
      } else if (e.key === '*') {
        e.preventDefault()
        for (const sibling of props.items ?? []) {
          if (!sibling.children) continue
          checkChildren(sibling)
          root.open(idOf(sibling), true, e)
        }
      }
    }

    return () => slots.default?.() ?? props.items?.map((item, index, items) => {
      const { children, props: itemProps } = item
      const loading = isLoading.has(item.value)
      const nextItemHasChildren = !!items.at(index + 1)?.children

      const depth = props.path?.length ?? 0
      const isLast = items.length - 1 === index
      const nodePositionProps = {
        index,
        depth,
        isFirst: index === 0,
        isLast,
        path: [...props.path, index],
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

      const treeItemProps = {
        ...itemProps as InternalListItem['props'] & { disabled?: boolean },
        hideActions: props.hideActions,
        indentLines: children ? indentLines.node : indentLines.leaf,
        onKeydown: (e: KeyboardEvent) => onItemKeydown(e, item),
      }

      const slotsWithItem = {
        toggle: slots.toggle
          ? slotProps => slots.toggle?.({ ...slotProps, ...nodePositionProps, item: item.raw, internalItem: item, loading })
          : undefined,
        prepend: slotProps => (
          <>
            { props.selectable && (!children || (children && !['leaf', 'single-leaf'].includes(props.selectStrategy as string))) && (
              <VListItemAction start>
                <VCheckboxBtn
                  key={ item.value }
                  aria-hidden="true"
                  tabindex={ -1 }
                  modelValue={ slotProps.isSelected }
                  disabled={ props.disabled || itemProps.disabled }
                  loading={ loading }
                  color={ props.selectedColor }
                  density={ props.density }
                  indeterminate={ slotProps.isIndeterminate }
                  indeterminateIcon={ props.indeterminateIcon }
                  falseIcon={ props.falseIcon }
                  trueIcon={ props.trueIcon }
                  onUpdate:modelValue={ v => selectItem(slotProps.select, v) }
                  onClick={ (e: PointerEvent) => e.stopPropagation() }
                />
              </VListItemAction>
            )}

            { slots.prepend?.({ ...slotProps, ...nodePositionProps, item: item.raw, internalItem: item }) }
          </>
        ),
        append: slots.append
          ? slotProps => slots.append?.({ ...slotProps, ...nodePositionProps, item: item.raw, internalItem: item })
          : undefined,
        title: slots.title ? slotProps => slots.title?.({ ...slotProps, item: item.raw, internalItem: item }) : undefined,
        subtitle: slots.subtitle ? slotProps => slots.subtitle?.({ ...slotProps, item: item.raw, internalItem: item }) : undefined,
      } satisfies VTreeviewItem['$props']['$children']

      const treeviewGroupProps = VTreeviewGroup.filterProps(itemProps)
      const treeviewChildrenProps = VTreeviewChildren.filterProps({ ...props, ...nodePositionProps })

      const footerProps = {
        hideActions: props.hideActions,
        indentLines: indentLines.footer,
      }

      return children ? (
        <VTreeviewGroup
          { ...treeviewGroupProps }
          value={ props.returnObject ? item.raw : treeviewGroupProps?.value }
          rawId={ treeviewGroupProps?.value }
        >
          {{
            activator: ({ props: activatorProps, isOpen }) => {
              const listItemProps = {
                ...treeItemProps,
                ...activatorProps,
                value: treeItemProps?.value,
                'aria-expanded': isOpen,
                'aria-level': depth + 1,
                'aria-posinset': index + 1,
                'aria-setsize': items.length,
                onToggleExpand: [() => checkChildren(item), activatorProps.onClick] as any,
                onClick: props.disabled || treeItemProps.disabled
                  ? undefined
                  : isClickOnOpen.value
                    ? [() => checkChildren(item), activatorProps.onClick] as any
                    : () => selectItem(activatorItems.value[index]?.select, !activatorItems.value[index]?.isSelected),
              }

              return renderSlot(
                slots.header,
                { props: listItemProps, item: item.raw, internalItem: item, loading },
                () => (
                  <VTreeviewItem
                    ref={ el => activatorItems.value[index] = el as VTreeviewItem }
                    { ...listItemProps }
                    hasCustomPrepend={ !!slots.prepend }
                    value={ props.returnObject ? item.raw : itemProps.value }
                    loading={ loading }
                    v-slots={ slotsWithItem }
                  />
                )
              )
            },
            default: () => (
              <>
                <VTreeviewChildren
                  { ...treeviewChildrenProps }
                  items={ children }
                  indentLinesVariant={ props.indentLinesVariant }
                  parentIndentLines={ indentLines.children }
                  isLastGroup={ nextItemHasChildren }
                  returnObject={ props.returnObject }
                  v-slots={ slots }
                />
                { slots.footer?.({ props: footerProps, item: item.raw, internalItem: item, loading }) }
              </>
            ),
          }}
        </VTreeviewGroup>
      ) : renderSlot(
        slots.item,
        { props: treeItemProps, item: item.raw, internalItem: item, ...nodePositionProps },
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
              { ...treeItemProps }
              hasCustomPrepend={ !!slots.prepend }
              aria-level={ depth + 1 }
              aria-posinset={ index + 1 }
              aria-setsize={ items.length }
              value={ props.returnObject ? toRaw(item.raw) : treeItemProps.value }
              v-slots={ slotsWithItem }
            />
          )
        })
    })
  },
})
