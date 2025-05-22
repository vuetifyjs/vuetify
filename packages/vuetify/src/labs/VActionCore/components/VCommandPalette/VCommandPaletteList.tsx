// Components
import { VHotKey } from '../VHotKey/VHotKey'
import { VIcon } from '@/components/VIcon'
import { VList, VListItem, VListSubheader } from '@/components/VList'

// Utilities
import { unref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, VNode } from 'vue'
import type { ActionContext, ActionDefinition } from '@/labs/VActionCore'
import type { VCommandPaletteCustomItem } from './VCommandPalette' // Import the custom item type

// Helper to distinguish header items from actions/custom items
function isHeaderItem (item: any): item is { isHeader: true, title: string, id: string } {
  return item && typeof item === 'object' && 'isHeader' in item && item.isHeader === true
}

// Define scope types explicitly for clarity and reuse
export interface VCommandPaletteListItemScope {
  // The item can be an ActionDefinition or a VCommandPaletteCustomItem
  item: ActionDefinition<ActionContext> | VCommandPaletteCustomItem
  index: number
  itemHtmlId: string
  isSelected: boolean
  select: () => void
  isUsingActionCore: boolean // Pass this down to the slot
}

export interface VCommandPaletteListNoResultsScope {
  searchText: string | undefined
}

export interface VCommandPaletteListSubheaderScope {
  title: string
  id: string
}

export const makeVCommandPaletteListProps = propsFactory({
  actions: {
    // Update prop type to accept ActionDefinition, VCommandPaletteCustomItem, or HeaderItem
    type: Array as PropType<Readonly<({ isHeader: true, title: string, id: string } | ActionDefinition<ActionContext> | VCommandPaletteCustomItem)[]>>,
    default: () => [],
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
  listId: {
    type: String,
    required: true,
  },
  searchText: String,
  density: {
    type: String as PropType<'default' | 'comfortable' | 'compact' | null>,
    default: 'default',
  },
  // New prop to determine how to handle items
  isUsingActionCore: {
    type: Boolean,
    default: true, // Default to true for backward compatibility if not provided
  },
}, 'VCommandPaletteList')

export const VCommandPaletteList = genericComponent<{
  item: VCommandPaletteListItemScope
  'no-results': VCommandPaletteListNoResultsScope
  subheader: VCommandPaletteListSubheaderScope
}>()({
  name: 'VCommandPaletteList',
  props: makeVCommandPaletteListProps(),
  emits: {
    actionClick: (action: ActionDefinition<ActionContext> | VCommandPaletteCustomItem) => true,
    itemNavigate: (action: ActionDefinition<ActionContext> | VCommandPaletteCustomItem) => true,
  },
  setup (props, { slots, emit }) {
    const getItemHtmlId = (itemInput: ActionDefinition<ActionContext> | VCommandPaletteCustomItem | { isHeader: true, title: string, id: string }, index: number) => {
      const item = itemInput as any // Use 'any' for simplicity here, properties are checked below
      if (isHeaderItem(item)) {
        return `${props.listId}-header-${item.id}-${index}`
      }
      // item.id should exist on both ActionDefinition and VCommandPaletteCustomItem
      return `${props.listId}-item-${item.id}-${index}`
    }

    const handleActionClick = (item: ActionDefinition<ActionContext> | VCommandPaletteCustomItem) => {
      // Check for subItems, which can exist on both types
      if (item.subItems && typeof item.subItems === 'function') {
        emit('itemNavigate', item)
      } else {
        emit('actionClick', item)
      }
    }

    const renderSlotWithFallback = (
      slotFn: ((scope: any) => VNode[] | VNode | string | undefined) | undefined,
      scope: any,
      fallbackFn: () => VNode | VNode[]
    ): VNode | VNode[] => {
      if (!slotFn) return fallbackFn()
      try {
        const slotResult = slotFn(scope)
        if (slotResult == null) return fallbackFn()
        if (typeof slotResult === 'string') {
          return slotResult.trim().length > 0 ? (slotResult.trim().startsWith('<') ? <div v-html={ slotResult } /> : <>{ slotResult }</>) : fallbackFn()
        }
        if (Array.isArray(slotResult)) {
          return slotResult.length > 0 ? slotResult : fallbackFn()
        }
        return slotResult
      } catch (err) {
        console.error('[VCommandPaletteList] Error rendering slot:', err)
        return fallbackFn()
      }
    }

    useRender(() => {
      const scopeNoResults: VCommandPaletteListNoResultsScope = { searchText: props.searchText }

      return (
        <VList
          id={ props.listId }
          role="listbox"
          aria-labelledby={ `${props.listId}-title` }
          class="v-command-palette__list"
          density={ props.density }
        >
          { props.actions.length === 0 ? (
            renderSlotWithFallback(
              slots['no-results'],
              scopeNoResults,
              () => (
                <VListItem
                  disabled
                  title={ props.searchText ? 'No results found.' : 'Type to search...' }
                  id={ `${props.listId}-no-results` }
                  role="option"
                  class="v-command-palette__no-results"
                />
              )
            )
          ) : (
            <>
              { props.actions.map((itemOrHeader, index) => {
                if (isHeaderItem(itemOrHeader)) {
                  return renderSlotWithFallback(
                    slots.subheader,
                    { title: itemOrHeader.title, id: itemOrHeader.id },
                    () => <VListSubheader key={ itemOrHeader.id } class="v-command-palette__subheader">{ itemOrHeader.title }</VListSubheader>
                  )
                }

                const item = itemOrHeader as ActionDefinition<ActionContext> | VCommandPaletteCustomItem
                const itemHtmlId = getItemHtmlId(item, index)
                const isSelected = index === props.selectedIndex

                const select = () => handleActionClick(item)
                const scopeItem: VCommandPaletteListItemScope = {
                  item,
                  index,
                  itemHtmlId,
                  isSelected,
                  select,
                  isUsingActionCore: props.isUsingActionCore,
                }

                return renderSlotWithFallback(
                  slots.item,
                  scopeItem,
                  () => (
                    <VListItem
                      key={ item.id } // Assuming item.id is unique and suitable as key
                      id={ itemHtmlId }
                      role="option"
                      aria-selected={ isSelected }
                      title={ unref(item.title) }
                      subtitle={ unref((item as any).subtitle) ?? undefined }
                      active={ isSelected }
                      onClick={ select }
                      class={{
                        'v-command-palette__item--selected': isSelected,
                        [`v-command-palette__item--${props.density}`]: !!props.density && props.density !== 'default',
                      }}
                      value={ item.id } // value prop for VList's selection model if used
                      nav
                    >
                      {{
                        prepend: () => item.icon ? <VIcon icon={ unref(item.icon) } /> : undefined,
                        append: () => {
                          let hotkeyDisplayContent: string | undefined = undefined
                          if (props.isUsingActionCore) {
                            // For ActionDefinition, VHotKey uses action.id and actionCore instance implicitly (or action.hotkey)
                            const ad = item as ActionDefinition // Type assertion
                            const displayHotkey = Array.isArray(ad.hotkey) ? ad.hotkey[0] : ad.hotkey
                            return displayHotkey ? <VHotKey hotkey={ displayHotkey } dense /> : null
                          } else {
                            // For VCommandPaletteCustomItem, use hotkeyDisplay
                            const ci = item as VCommandPaletteCustomItem // Type assertion
                            hotkeyDisplayContent = Array.isArray(ci.hotkeyDisplay) ? ci.hotkeyDisplay[0] : ci.hotkeyDisplay
                            return hotkeyDisplayContent ? <kbd class="v-command-palette__hotkey-display">{ hotkeyDisplayContent }</kbd> : null
                          }
                        },
                      }}
                    </VListItem>
                  )
                )
              })}
            </>
          )}
        </VList>
      )
    })

    const scrollToItem = (index: number) => {
      if (index < 0 || index >= props.actions.length) return
      try {
        const item = props.actions[index]
        if (!item) return
        const element = document.getElementById(getItemHtmlId(item, index))
        if (element && typeof element.scrollIntoView === 'function') {
          element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }
      } catch (err) {
        console.debug(`[VCommandPaletteList] scrollToItem: ${err}`)
      }
    }

    return {
      scrollToItem,
    }
  },
})

export type VCommandPaletteList = InstanceType<typeof VCommandPaletteList>;

// Add a simple style for the kbd tag if not already globally styled
// This would typically go in a .scss file associated with VCommandPalette or VHotKey
const kbdStyle = document.createElement('style');
kbdStyle.innerHTML = `
  .v-command-palette__hotkey-display {
    font-size: 0.75em;
    padding: 0.1em 0.4em;
    border-radius: 3px;
    border: 1px solid #ccc; /* Adjust color as per theme */
    background-color: #f7f7f7; /* Adjust color as per theme */
    color: #333; /* Adjust color as per theme */
    margin-left: 8px;
    white-space: nowrap;
  }
`;
document.head.appendChild(kbdStyle);
