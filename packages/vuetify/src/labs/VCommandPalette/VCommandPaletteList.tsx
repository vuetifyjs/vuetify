// Styles
import './VCommandPalette.scss'

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
import { VHotkey } from './VHotkey'
import type { makeVListItemProps } from '@/components/VList/VListItem'

// Common properties that all items must have
interface BaseItemProps {
  id: string
  title: string
  visible?: MaybeRef<boolean>
}

// Make all Vuetify list item properties optional
type VListDisplayTypes = Partial<Pick<ReturnType<typeof makeVListItemProps>,
| 'appendAvatar'
| 'appendIcon'
| 'prependAvatar'
| 'prependIcon'
| 'subtitle'
>>

// Get the actual prop value types, not the prop definitions
type VListNavigableTypes = {
  to?: RouteLocationRaw
  href?: string
}

// Base for all items - type is optional and defaults to 'item'
type VCommandPaletteItemBase<TValue = unknown> = BaseItemProps & VListDisplayTypes & {
  type?: 'item'
}

// Action item - discriminated by presence of handler/value
export interface VCommandPaletteActionItem<TValue = unknown> extends VCommandPaletteItemBase<TValue> {
  handler?: (params?: TValue) => void
  value?: TValue
  // Explicitly exclude navigation properties
  to?: never
  href?: never
  children?: never
}

// Link item - discriminated by presence of to/href
export interface VCommandPaletteLinkItem extends VCommandPaletteItemBase, VListNavigableTypes {
  // Explicitly exclude action properties
  handler?: never
  value?: never
  children?: never
}

// Union of action and link items - both have type 'item' but discriminated by properties
export type VCommandPaletteItemDefinition<TValue = unknown> =
  | VCommandPaletteActionItem<TValue>
  | VCommandPaletteLinkItem

// Parent item that contains children
export interface VCommandPaletteParentDefinition extends BaseItemProps, VListDisplayTypes {
  type: 'parent'
  children: VCommandPaletteItemDefinition[]
  handler?: never // Ensure this is not a leaf item
  value?: never
  to?: never
  href?: never
}

// Group item that can contain both items and parents
export interface VCommandPaletteGroupDefinition extends BaseItemProps {
  type: 'group'
  divider?: 'start' | 'end' | 'none' | 'both' // Default is none
  children: Array<VCommandPaletteItemDefinition | VCommandPaletteParentDefinition>
  handler?: never
  value?: never
  to?: never
  href?: never
  keywords?: never
  hotkey?: never
}

// Type guard functions using property-based discrimination
export function isItemDefinition (item: VCommandPaletteItem): item is VCommandPaletteItemDefinition {
  return item.type === 'item' || item.type === undefined
}

export function isActionItem (item: VCommandPaletteItem): item is VCommandPaletteActionItem {
  return (item.type === 'item' || item.type === undefined) &&
         ('handler' in item || 'value' in item) &&
         !('to' in item) && !('href' in item)
}

export function isLinkItem (item: VCommandPaletteItem): item is VCommandPaletteLinkItem {
  return (item.type === 'item' || item.type === undefined) &&
         ('to' in item || 'href' in item) &&
         !('handler' in item) && !('value' in item)
}

export function isParentDefinition (item: VCommandPaletteItem): item is VCommandPaletteParentDefinition {
  return item.type === 'parent'
}

export function isGroupDefinition (item: VCommandPaletteItem): item is VCommandPaletteGroupDefinition {
  return item.type === 'group'
}

export type VCommandPaletteItem = VCommandPaletteItemDefinition | VCommandPaletteParentDefinition | VCommandPaletteGroupDefinition

// Example usage demonstrating property-based discriminated union:
const testItems: VCommandPaletteItem[] = [
  {
    // type: 'item', // ✅ Optional - defaults to 'item'
    id: 'item1',
    title: 'Action Item',
    handler: () => { /* Action executed */ },
    // to: '/somewhere', // ❌ TypeScript error: Types of property 'to' are incompatible
    // href: 'https://example.com', // ❌ TypeScript error: Types of property 'href' are incompatible
  },
  {
    type: 'item', // ✅ Explicitly set to 'item'
    id: 'item2',
    title: 'Link Item',
    href: 'https://example.com',
    // handler: () => {}, // ❌ TypeScript error: Types of property 'handler' are incompatible
    // value: 'something', // ❌ TypeScript error: Types of property 'value' are incompatible
  },
  {
    type: 'parent',
    id: 'parent1',
    title: 'Parent 1',
    children: [
      {
        // type defaults to 'item' for child items too
        id: 'child1',
        title: 'Child Action',
        handler: () => { /* Child executed */ },
      },
    ],
  },
  {
    type: 'group',
    id: 'group1',
    title: 'Group 1',
    divider: 'start',
    children: [
      {
        type: 'item', // ✅ Defaults to 'item'
        id: 'groupItem1',
        title: 'Group Item 1',
        handler: () => { /* Group item executed */ },
      },
      {
        type: 'parent',
        id: 'parent1',
        title: 'Parent 1',
        children: [
          {
            // type defaults to 'item' for child items too
            id: 'child1',
            title: 'Child Action',
            handler: () => { /* Child executed */ },
          },
        ],
      },
    ],
  },
]

export const makeVCommandPaletteListProps = propsFactory({
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
  items: {
    type: Array as PropType<Array<VCommandPaletteItem>>,
    default: () => ([] as Array<VCommandPaletteItem>),
  },
  selectedIndex: {
    type: Number,
    default: -1,
  },
}, 'VCommandPaletteList')

// Scope for the item slot, should match what VCommandPalette provides
export type VCommandPaletteListItemSlotScope = {
  item: VCommandPaletteItem
  props: Record<string, any>
}

export type VCommandPaletteListSlots = {
  item: VCommandPaletteListItemSlotScope
  'no-data': never // Use 'never' for slots with no scope
  'prepend-item': never
  'append-item': never
}

export const VCommandPaletteList = genericComponent<VCommandPaletteListSlots>()({
  name: 'VCommandPaletteList',
  props: makeVCommandPaletteListProps(),
  emits: {
    'click:item': (item: VCommandPaletteItem, event: MouseEvent | KeyboardEvent) => true,
  },
  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const vListRef = ref<typeof VList>()
    const vListProps = VList.filterProps(omit(props, ['items', 'selectedIndex']))

    // Adapter function to convert VuetifyListItem to VListItem props
    function getVListItemProps (item: any, index: number, isSelectable = true) {
      const baseProps = {
        title: item.title,
        active: isSelectable && props.selectedIndex === index,
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

    // Create a flat list of renderable items for proper keyboard navigation
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
                hotkey: (child as any).hotkey,
              },
              raw: child,
            }
            result.push({ type: 'item', item: transformedChild, key: `${index}-${childIndex}` })
          })
        } else if (item.raw && isParentDefinition(item.raw)) {
          result.push({ type: 'group', originalIndex: index, item, key: `${index}-header` })

          item.raw.children.forEach((child: any, childIndex: number) => {
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
                hotkey: (child as any).hotkey,
              },
              raw: child,
            }
            result.push({ type: 'item', item: transformedChild, key: `${index}-${childIndex}` })
          })
        } else {
          result.push({ type: 'item', originalIndex: index, item, key: `${index}` })
        }
      })

      return result
    })

    // Create a mapping from original selectedIndex to flattened index
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

    // Watch for selection changes and scroll to keep selected item in view
    watch([actualSelectedIndex, flattenedItems], async () => {
      if (actualSelectedIndex.value >= 0 && vListRef.value) {
        await nextTick()
        const listElement = vListRef.value.$el
        if (listElement) {
          const selectedElement = listElement.querySelector('.v-list-item--active')
          if (selectedElement) {
            selectedElement.scrollIntoView({
              block: 'nearest',
              behavior: 'smooth'
            })
          }
        }
      }
    }, { flush: 'post' })

    useRender(() => (
      <VList ref={ vListRef } { ...vListProps } class="v-command-palette__list">
        { slots['prepend-item']?.() }
        { flattenedItems.value.length > 0
          ? flattenedItems.value.map((flatItem, flatIndex) => {
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
                : <VListSubheader key={ flatItem.key } { ...groupProps } class="v-command-palette__list-group" />
            }

            if (flatItem.type === 'item') {
              const isActive = flatIndex === actualSelectedIndex.value
              const itemProps = {
                ...getVListItemProps(flatItem.item!, flatItem.originalIndex ?? 0, true),
                active: isActive,
              }
              const slotProps = { item: flatItem.item, props: itemProps }

              return slots.item
                ? slots.item(slotProps)
                : (
                    <VListItem key={ flatItem.key } { ...itemProps } class="v-command-palette__list-group">
                      {{
                        append: flatItem.item?.props?.hotkey ? () => <VHotkey keys={ flatItem.item.props.hotkey } /> : undefined,
                      }}
                    </VListItem>
                )
            }

            return null
          })
          : (
            slots['no-data']?.() ??
              <VListItem key="no-data-fallback" title={ t('$vuetify.noDataText') } />
          )
        }
        { slots['append-item']?.() }
      </VList>
    ))
  },
})
