// Styles
import '@/labs/VCommandPalette/VCommandPalette.scss'

// Components
import { VDivider } from '@/components/VDivider'
import { VList, VListItem, VListSubheader } from '@/components/VList'
import { makeVListProps } from '@/components/VList/VList'

// Composables
import { useLocale } from '@/composables/locale' // For default no-data text

// Utilities
import { computed, nextTick, ref, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { MaybeRef, PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { makeVListItemProps } from '@/components/VList/VListItem'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'
import { VHotkey } from '@/labs/VCommandPalette/VHotkey'

/** Common properties that all items must have. */
interface BaseItemProps {
  id: string
  title: string
  visible?: MaybeRef<boolean>
}

/** A subset of VListItem props used for display purposes. */
type VListDisplayTypes = Partial<Pick<ReturnType<typeof makeVListItemProps>,
| 'appendAvatar'
| 'appendIcon'
| 'prependAvatar'
| 'prependIcon'
| 'subtitle'
>>

/** Standard navigation properties. */
type VListNavigableTypes = {
  to?: RouteLocationRaw
  href?: string
}

/** The base for all command palette items. Defaults to `type: 'item'`. */
type VCommandPaletteItemBase<TValue = unknown> = BaseItemProps & VListDisplayTypes & {
  type?: 'item'
  hotkey?: string
}

/** An item that performs an action when triggered. */
export interface VCommandPaletteActionItem<TValue = unknown> extends VCommandPaletteItemBase<TValue> {
  handler?: (params?: TValue) => void
  value?: TValue
  // Explicitly exclude navigation and children properties
  to?: never
  href?: never
  children?: never
}

/** An item that navigates to a URL when triggered. */
export interface VCommandPaletteLinkItem extends VCommandPaletteItemBase, VListNavigableTypes {
  // Explicitly exclude action and children properties
  handler?: never
  value?: never
  children?: never
}

/** A union of all possible leaf-node item types. */
export type VCommandPaletteItemDefinition<TValue = unknown> =
  | VCommandPaletteActionItem<TValue>
  | VCommandPaletteLinkItem

/** An item that contains other items and allows drilling down into them. */
export interface VCommandPaletteParentDefinition extends BaseItemProps, VListDisplayTypes {
  type: 'parent'
  children: VCommandPaletteItemDefinition[]
  // Explicitly exclude properties that would make it a leaf item
  handler?: never
  value?: never
  to?: never
  href?: never
}

/** An item that visually groups other items under a non-clickable header. */
export interface VCommandPaletteGroupDefinition extends BaseItemProps {
  type: 'group'
  divider?: 'start' | 'end' | 'none' | 'both' // Default is none
  children: Array<VCommandPaletteItemDefinition | VCommandPaletteParentDefinition>
  // Explicitly exclude properties that would make it a leaf or parent item
  handler?: never
  value?: never
  to?: never
  href?: never
  keywords?: never
  hotkey?: never
}

// --- Type Guards ---

/** Checks if an item is a leaf-node item (action or link). */
export function isItemDefinition (item: VCommandPaletteItem): item is VCommandPaletteItemDefinition {
  return item.type === 'item' || item.type === undefined
}

/** Checks if an item is an action item. */
export function isActionItem (item: VCommandPaletteItem): item is VCommandPaletteActionItem {
  return (item.type === 'item' || item.type === undefined) &&
         ('handler' in item || 'value' in item) &&
         !('to' in item) && !('href' in item)
}

/** Checks if an item is a link item. */
export function isLinkItem (item: VCommandPaletteItem): item is VCommandPaletteLinkItem {
  return (item.type === 'item' || item.type === undefined) &&
         ('to' in item || 'href' in item) &&
         !('handler' in item) && !('value' in item)
}

/** Checks if an item is a parent item. */
export function isParentDefinition (item: VCommandPaletteItem): item is VCommandPaletteParentDefinition {
  return item.type === 'parent'
}

/** Checks if an item is a group item. */
export function isGroupDefinition (item: VCommandPaletteItem): item is VCommandPaletteGroupDefinition {
  return item.type === 'group'
}

/** A union of all possible item types in the command palette. */
export type VCommandPaletteItem = VCommandPaletteItemDefinition | VCommandPaletteParentDefinition | VCommandPaletteGroupDefinition

export const makeVCommandPaletteListProps = propsFactory({
  /**
   * The list of items to display. This is expected to be an array of `VuetifyListItem`
   * objects, which are produced by the `transformItems` function in the parent component.
  */
  items: {
    type: Array as PropType<Array<VuetifyListItem>>,
    default: () => ([] as Array<VuetifyListItem>),
  },
  selectedIndex: {
    type: Number,
    default: -1,
  },
  ...omit(makeVListProps({
    density: 'compact' as const,
    nav: true,
  }), [
    'items',
    'itemChildren',
    'itemType',
    'itemValue',
    'itemProps',
  ]),
}, 'VCommandPaletteList')

// Scope for the item slot, should match what VCommandPalette provides
export type VCommandPaletteListItemSlotScope = {
  item: VCommandPaletteItem
  props: Record<string, any>
}

export type VCommandPaletteListSlots = {
  item: VCommandPaletteListItemSlotScope
  'no-data': never // Use 'never' for slots with no scope
  'prepend-list': never
  'append-list': never
}

export const VCommandPaletteList = genericComponent<VCommandPaletteListSlots>()({
  name: 'VCommandPaletteList',

  props: makeVCommandPaletteListProps(),

  emits: {
    'click:item': (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) => true,
    /** Emitted when the user hovers a selectable item. Payload is the selectable index */
    hover: (selectableIndex: number) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const vListRef = ref<typeof VList>()
    const vListProps = VList.filterProps(omit(props, ['items', 'selectedIndex']))

    /**
     * An adapter function that extracts the necessary props from a `VuetifyListItem`
     * to pass to a `VListItem` component. It also attaches the click handler.
     */
    function getVListItemProps (item: any, index: number, isSelectable = true) {
      const baseProps = {
        title: item.title,
        onClick: isSelectable ? (e: MouseEvent | KeyboardEvent) => emit('click:item', item, e) : undefined,
      }

      // Extract properties from item.props (VuetifyListItem structure)
      const itemProps = item.props || {}
      const optionalProps: Record<string, any> = {}

      if (itemProps.subtitle !== undefined) {
        optionalProps.subtitle = itemProps.subtitle
      }
      if (itemProps.appendAvatar !== undefined) {
        optionalProps.appendAvatar = itemProps.appendAvatar
      }
      if (itemProps.appendIcon !== undefined) {
        optionalProps.appendIcon = itemProps.appendIcon
      }
      if (itemProps.prependAvatar !== undefined) {
        optionalProps.prependAvatar = itemProps.prependAvatar
      }
      if (itemProps.prependIcon !== undefined) {
        optionalProps.prependIcon = itemProps.prependIcon
      }
      if (itemProps.to !== undefined) {
        optionalProps.to = itemProps.to
      }
      if (itemProps.href !== undefined) {
        optionalProps.href = itemProps.href
      }

      return { ...baseProps, ...optionalProps }
    }

    /**
     * This computed property is the core of the list's rendering logic. It takes the
     * `items` prop (which is a flat list of `VuetifyListItem`s) and transforms it into
     * a structure that can be rendered correctly, including group headers and dividers.
     *
     * Why flatten?
     * - VList expects a flat array to render.
     * - Groups need to be displayed with their children directly beneath them.
     * - This structure makes it possible to map a simple `selectedIndex` to a complex
     *   visual layout for keyboard navigation.
     */
    const flattenedItems = computed(() => {
      const result: Array<{ type: 'divider' | 'group' | 'item', originalIndex?: number, item?: any, key: string }> = []

      props.items.forEach((item: any, index) => {
        if (item.raw && isGroupDefinition(item.raw)) {
          const groupItem = item.raw as VCommandPaletteGroupDefinition
          const showStartDivider = groupItem.divider === 'start' || groupItem.divider === 'both'
          const showEndDivider = groupItem.divider === 'end' || groupItem.divider === 'both'

          if (showStartDivider) {
            result.push({ type: 'divider', key: `${index}-start-divider`, item: 'start' })
          }

          result.push({ type: 'group', originalIndex: index, item, key: `${index}-group` })

          if (showEndDivider) {
            result.push({ type: 'divider', key: `${index}-end-divider`, item: 'end' })
          }

          groupItem.children.forEach((child: any, childIndex: number) => {
            const transformedChild = {
              title: child.title,
              value: child.value,
              props: {
                title: child.title,
                subtitle: child.subtitle,
                prependIcon: child.prependIcon,
                appendIcon: child.appendIcon,
                prependAvatar: child.prependAvatar,
                appendAvatar: child.appendAvatar,
                to: child.to,
                href: child.href,
                hotkey: child.hotkey,
              },
              raw: child,
            }
            result.push({ type: 'item', item: transformedChild, key: `${index}-${childIndex}` })
          })
        } else {
          // Parent items and regular items - show as clickable items (no children exposed)
          // Parents will be drilled down into when clicked
          result.push({ type: 'item', originalIndex: index, item, key: `${index}` })
        }
      })

      return result
    })

    /**
     * Maps the `selectedIndex` (which only counts selectable items) to the actual index
     * within the `flattenedItems` array (which includes non-selectable headers and dividers).
     * This is essential for correctly applying the '--active' class for styling.
     */
    const actualSelectedIndex = computed(() => {
      if (props.selectedIndex === -1) return -1

      let selectableItemCount = 0
      for (let i = 0; i < flattenedItems.value.length; i++) {
        const flatItem = flattenedItems.value[i]
        if (flatItem.type === 'item') {
          if (selectableItemCount === props.selectedIndex) {
            return i
          }
          selectableItemCount++
        }
      }
      return -1
    })

    /**
     * Calculate the correct activeDescendantId based on the selectedIndex from the composable.
     * This maps the logical selectedIndex (counting only selectable items) to the actual DOM element ID.
     */
    const activeDescendantId = computed(() => {
      if (props.selectedIndex === -1) return undefined

      // Use the selectedIndex directly since we're now using sequential IDs for selectable items
      return `command-palette-item-${props.selectedIndex}`
    })

    /**
     * Watches for changes in the selected index and scrolls the active item into view.
     * This ensures that as the user navigates with the keyboard, the selected item is
     * always visible.
     */
    watch([actualSelectedIndex, flattenedItems], async () => {
      if (actualSelectedIndex.value >= 0 && vListRef.value) {
        await nextTick()
        const listElement = vListRef.value.$el
        if (listElement) {
          const selectedElement = listElement.querySelector('.v-list-item--active')
          if (selectedElement) {
            selectedElement.scrollIntoView({
              block: 'nearest',
              behavior: 'instant',
            })
          }
        }
      }
    }, { flush: 'post' })

    // Count selectable items for ARIA label
    const selectableItemsCount = computed(() => {
      return flattenedItems.value.filter(item => item.type === 'item').length
    })

    useRender(() => (
      <VList
        ref={ vListRef }
        { ...vListProps }
        class="v-command-palette__list"
        role="listbox"
        tabindex="0"
        aria-activedescendant={ activeDescendantId.value }
        aria-label={ `${selectableItemsCount.value} ${selectableItemsCount.value === 1 ? 'option' : 'options'} available` }
        aria-multiselectable="false"
      >
        { slots['prepend-list']?.() }
        { flattenedItems.value.length > 0
          ? (() => {
            let selectableCounter = -1
            return flattenedItems.value.map((flatItem, flatIndex) => {
              if (flatItem.type === 'item') {
                selectableCounter++
              }

              // We create a local copy so it can be referenced in events
              const currentSelectableIndex = selectableCounter

              // Existing logic below (slightly adjusted to add onMouseenter)
              if (flatItem.type === 'divider') {
                return (
                <VDivider
                  key={ flatItem.key }
                  class={[flatItem.item === 'start' ? 'v-command-palette__list-divider-start' : 'v-command-palette__list-divider-end']}
                />
                )
              }

              if (flatItem.type === 'group') {
                const groupProps = getVListItemProps(flatItem.item!, flatItem.originalIndex!, false)
                const slotProps = { item: flatItem.item, props: groupProps }

                return slots.item
                  ? slots.item(slotProps)
                  : <VListSubheader key={ flatItem.key } { ...groupProps } class="v-command-palette__list-group" role="presentation" />
              }

              if (flatItem.type === 'item') {
                const isActive = flatIndex === actualSelectedIndex.value
                const itemId = `command-palette-item-${currentSelectableIndex}`
                const item = flatItem.item!

                // Enhanced ARIA attributes for better accessibility
                const itemProps = {
                  ...getVListItemProps(item, currentSelectableIndex, true),
                  active: isActive,
                  id: itemId,
                  role: 'option',
                  'aria-selected': isActive,
                  'aria-describedby': item.props?.subtitle ? `${itemId}-description` : undefined,
                  'aria-label': item.props?.hotkey
                    ? `${item.title}. ${item.props.subtitle || ''}. Hotkey: ${item.props.hotkey}`
                    : `${item.title}. ${item.props.subtitle || ''}`,
                }
                const slotProps = { item: flatItem.item, props: itemProps }

                const defaultNode = (
                  <VListItem
                    key={ flatItem.key }
                    { ...itemProps }
                    class="v-command-palette__list-group"
                    onMouseenter={ () => emit('hover', currentSelectableIndex) }
                  >
                    {{
                      append: flatItem.item?.props?.hotkey ? () => <VHotkey keys={ flatItem.item.props.hotkey } /> : undefined,
                    }}
                  </VListItem>
                )

                return slots.item ? slots.item(slotProps) : defaultNode
              }

              return null
            })
          })()
          : (
            slots['no-data']?.() ??
              <VListItem key="no-data-fallback" title={ t('$vuetify.noDataText') } />
          )
        }
        { slots['append-list']?.() }
      </VList>
    ))
  },
})

export type VCommandPaletteList = InstanceType<typeof VCommandPaletteList>
