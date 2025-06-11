// Styles
import '@/labs/VCommandPalette/VCommandPalette.scss'

// Components
import { VDialog } from '@/components/VDialog'
import { makeVDialogProps } from '@/components/VDialog/VDialog'
import { VDivider } from '@/components/VDivider'
import { VSheet } from '@/components/VSheet'
import { VCommandPaletteInstructions } from '@/labs/VCommandPalette/VCommandPaletteInstructions'
import { isGroupDefinition, isParentDefinition, VCommandPaletteList } from '@/labs/VCommandPalette/VCommandPaletteList'
import { VCommandPaletteSearch } from '@/labs/VCommandPalette/VCommandPaletteSearch'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useHotkey } from '@/composables/hotkey'
import { makeItemsProps, transformItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { computed, readonly, ref, shallowRef, toRef, watch, watchEffect } from 'vue'
import { EventProp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { InternalListItem } from '@/components/VList/VList'
import type { FilterFunction } from '@/composables/filter'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'

const HotkeyActivator = genericComponent()({
  name: 'VHotkeyActivator',
  props: {
    item: {
      type: Object as PropType<InternalListItem>,
      required: true,
    },
    onExecute: {
      type: Function as PropType<(item: InternalListItem, e: KeyboardEvent) => void>,
      required: true,
    },
  },
  setup (props) {
    if (props.item.raw?.hotkey) {
      useHotkey(props.item.raw.hotkey, e => {
        props.onExecute(props.item, e)
      }, { inputs: true })
    }

    return () => null // This is a renderless component
  },
})

// VCommandPalette's own slot scope/type definitions
export type VCommandPaletteItemRenderScope = {
  item: any
  props: Record<string, any>
}

export type VCommandPaletteGenericSlotScope = {
  search: Readonly<Ref<string>>
}

export type VCommandPaletteSlots = {
  search: { modelValue: string }
  item: VCommandPaletteItemRenderScope
  'no-data': never
  header: VCommandPaletteHeaderSlotScope
  footer: VCommandPaletteFooterSlotScope
  'prepend-list': never
  'append-item': never
  prepend: VCommandPaletteGenericSlotScope
  append: VCommandPaletteGenericSlotScope
}

export type VCommandPaletteHeaderSlotScope = {
  search: Ref<string>
  navigationStack: Ref<any[]>
  title?: string
}

export type VCommandPaletteFooterSlotScope = {
  hasItems: boolean
  hasParent: boolean
  hasSelection: boolean
  navigationStack: Ref<any[]>
}

export const makeVCommandPaletteProps = propsFactory({
  hotkey: String,
  title: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  closeOnExecute: {
    type: Boolean,
    default: true,
  },
  afterEnter: EventProp<[]>(),
  afterLeave: EventProp<[]>(),
  clearableSearch: {
    type: Boolean,
    default: true,
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeFilterProps({ filterKeys: ['title'] }),
  ...makeItemsProps({ itemTitle: 'title' }),
  ...makeTransitionProps({ transition: 'dialog-transition' }),
  ...makeThemeProps(),
  ...makeVDialogProps({
    maxHeight: 450,
    maxWidth: 720,
    absolute: true,
    scrollable: true,
  }),
}, 'VCommandPalette')

export const VCommandPalette = genericComponent<VCommandPaletteSlots>()({
  name: 'VCommandPalette',

  props: makeVCommandPaletteProps(),

  emits: {
    afterEnter: () => true,
    afterLeave: () => true,
    'update:modelValue': (value: boolean) => true,
    'click:item': (item: any, event: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { emit, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { t } = useLocale()
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)

    // --- Core State ---

    /** The currently selected item's index. -1 means no selection. */
    const selectedIndex = shallowRef(-1)
    /**
     * A stack that tracks navigation history when drilling into parent items.
     * We persist both the item list _and_ the previously selected index so that
     * we can restore the correct visual selection when the user navigates back.
     */
    interface NavigationFrame { items: any[], selected: number }
    const navigationStack = ref<NavigationFrame[]>([])
    /** The current search query string. */
    const search = shallowRef('')
    /** The raw items currently being displayed, changes on drill-down/pop. */
    const currentRawActions = ref<any[]>(props.items ?? [])

    /** When the top-level items prop changes, reset the component's state. */
    watch(() => props.items, newItems => {
      currentRawActions.value = newItems ?? []
      navigationStack.value = []
      search.value = ''
    }, { deep: true })

    // --- Item Processing ---

    /** Props used by `transformItems` to convert raw item objects into a standard format. */
    const itemTransformationProps = computed(() => ({
      itemTitle: props.itemTitle,
      itemValue: props.itemValue,
      itemChildren: props.itemChildren,
      itemProps: props.itemProps,
      returnObject: props.returnObject,
      valueComparator: props.valueComparator,
    }))

    /**
     * Custom filter function for command palette items that handles group/parent hierarchies.
     * This allows us to leverage the useFilter composable while maintaining special group logic.
     */
    const commandPaletteFilter: FilterFunction = (value, query, item) => {
      if (!query || !query.trim()) return true

      const searchLower = query.trim().toLowerCase()

      // Helper function to check if a single item matches
      function itemMatches (rawItem: any): boolean {
        if (!rawItem) return false
        const title = rawItem.title?.toLowerCase() ?? ''
        const subtitle = rawItem.subtitle?.toLowerCase() ?? ''
        return title.includes(searchLower) || subtitle.includes(searchLower)
      }

      // Get the raw item from the InternalItem structure
      const rawItem = item?.raw
      if (!rawItem) return false

      if (isGroupDefinition(rawItem)) {
        // For groups: match if group title matches OR any child matches
        const groupMatches = itemMatches(rawItem)
        const hasMatchingChildren = rawItem.children.some(itemMatches)
        return groupMatches || hasMatchingChildren
      } else if (isParentDefinition(rawItem)) {
        // For parent items: match if parent title matches OR any child matches
        const parentMatches = itemMatches(rawItem)
        const hasMatchingChildren = rawItem.children.some(itemMatches)
        return parentMatches || hasMatchingChildren
      } else {
        // For regular items: match based on title/subtitle
        return itemMatches(rawItem)
      }
    }

    /**
     * Transform function to handle group filtering logic.
     * When a group matches, we need to decide which children to include.
     */
    const transformFilteredItems = (items: any[]) => {
      if (!search.value || !search.value.trim()) return items

      const searchLower = search.value.trim().toLowerCase()

      return items.map(item => {
        const rawItem = item.raw
        if (!rawItem) return item

        // Helper function to check if a single item matches
        const itemMatches = (testItem: any): boolean => {
          if (!testItem) return false
          const title = testItem.title?.toLowerCase() ?? ''
          const subtitle = testItem.subtitle?.toLowerCase() ?? ''
          return title.includes(searchLower) || subtitle.includes(searchLower)
        }

        if (isGroupDefinition(rawItem)) {
          const groupMatches = itemMatches(rawItem)

          // If group title matches, include all children
          // If group title doesn't match, include only matching children
          const filteredChildren = groupMatches
            ? rawItem.children
            : rawItem.children.filter(itemMatches)

          return {
            ...item,
            raw: {
              ...rawItem,
              children: filteredChildren,
            },
          }
        }
        return item
      })
    }

    // Use the composable filter with our custom logic
    const transformedItems = computed(() => (
      transformItems(itemTransformationProps.value, currentRawActions.value)
    ))

    const { filteredItems } = useFilter(
      {
        customFilter: commandPaletteFilter,
        filterKeys: ['title', 'subtitle'],
        filterMode: 'some',
        noFilter: false,
      },
      transformedItems,
      () => search.value,
    )

    // Apply the group-specific transformation after filtering
    const filteredActions = computed(() => {
      return transformFilteredItems(filteredItems.value)
    })

    /**
     * Returns the number of keyboard-selectable rows rendered in the list.
     *  • Regular items        → +1
     *  • Parent (with children) → +1 for its header + children.length
     *  • Group                → children.length   (header is NOT selectable)
     */
    const selectableItemsCount = computed(() => {
      let count = 0

      filteredActions.value.forEach(item => {
        if (item.raw?.type === 'parent') {
          // Parent header itself + each child
          count += 1 + item.raw.children.length
        } else if (item.raw?.type === 'group') {
          // Only the children of the group are selectable, not the header
          count += item.raw.children.length
        } else {
          count += 1
        }
      })

      return count
    })

    /**
     * Whenever the list of rendered items changes (due to filtering or drilling),
     * ensure there is a valid selection. We only auto-select when there is **no**
     * current selection or when the existing selection is out of range.
     */
    watch(filteredActions, () => {
      const maxIndex = selectableItemsCount.value - 1
      if (selectedIndex.value > maxIndex) {
        selectedIndex.value = maxIndex
      }
    })

    /** When the dialog opens, immediately select the first available item. */
    watch(isActive, newValue => {
      if (newValue && selectableItemsCount.value > 0) {
        selectedIndex.value = 0
      }
    })

    /** Additional watcher to ensure auto-selection happens when items are available */
    watch([selectableItemsCount, isActive], ([count, active]) => {
      if (active && count > 0 && selectedIndex.value === -1) {
        selectedIndex.value = 0
      }
    })

    // Reset state when dialog closes is handled in onAfterLeave

    // --- Hotkey Registration ---

    /** Toggles the dialog's visibility. */
    useHotkey(toRef(props, 'hotkey'), e => {
      isActive.value = !isActive.value
    })

    /** Moves selection up, wrapping around to the bottom. */
    useHotkey('arrowup', e => {
      if (!isActive.value) return
      const maxIndex = selectableItemsCount.value - 1
      if (maxIndex >= 0) {
        // Move the selection up by one, or wrap around to the bottom if at the start
        selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : maxIndex
      }
    }, { inputs: true })

    /** Moves selection down, wrapping around to the top. */
    useHotkey('arrowdown', e => {
      if (!isActive.value) return
      // Calculate the maximum index for selectable items
      const maxIndex = selectableItemsCount.value - 1
      if (maxIndex >= 0) {
        // Move the selection down by one, or wrap around to the top if at the end
        selectedIndex.value = selectedIndex.value < maxIndex ? selectedIndex.value + 1 : 0
      }
    }, { inputs: true })

    /**
     * Executes the selected item's action or navigates into it.
     * It has to recalculate the item's position in the flattened list to find the correct one.
     */
    useHotkey('enter', e => {
      if (!isActive.value) return

      if (selectedIndex.value < 0) {
        // Auto-select the first selectable row on initial Enter press
        if (selectableItemsCount.value === 0) return
        selectedIndex.value = 0
      }

      let selectableCount = 0

      for (const item of filteredActions.value) {
        const raw = item.raw

        if (raw?.type === 'parent') {
          // First selectable row is the parent header itself
          if (selectableCount === selectedIndex.value) {
            // Drill into the parent
            onItemClickFromList(item, e)
            return
          }

          const childrenStart = selectableCount + 1
          const childrenEnd = childrenStart + raw.children.length - 1

          if (selectedIndex.value >= childrenStart && selectedIndex.value <= childrenEnd) {
            const childIndex = selectedIndex.value - childrenStart
            const child = raw.children[childIndex]
            const [transformedChild] = transformItems(itemTransformationProps.value, [child])
            if (transformedChild) {
              onItemClickFromList(transformedChild, e)
            }
            return
          }

          selectableCount += 1 + raw.children.length
        } else if (raw?.type === 'group') {
          // Group header is not selectable; only its children are
          if (selectableCount + raw.children.length > selectedIndex.value) {
            const childIndex = selectedIndex.value - selectableCount
            const child = raw.children[childIndex]
            const [transformedChild] = transformItems(itemTransformationProps.value, [child])
            if (transformedChild) {
              onItemClickFromList(transformedChild, e)
            }
            return
          }
          selectableCount += raw.children.length
        } else {
          if (selectableCount === selectedIndex.value) {
            onItemClickFromList(item, e)
            return
          }
          selectableCount += 1
        }
      }
    }, { inputs: true })

    /** Closes the dialog. The navigation stack is cleared in `onAfterLeave`. */
    useHotkey('escape', e => {
      if (!isActive.value) return
      // Only close the dialog on ESC if not persistent
      if (!props.persistent) {
        // Always close the dialog on ESC - don't navigate back through stack
        // The state clearing in onAfterLeave will reset navigation properly
        isActive.value = false
      }
    }, { inputs: true })

    /** Navigates back up the stack if not currently searching. */
    async function doBackspace () {
      if (navigationStack.value.length > 0) {
        const previous = navigationStack.value.pop()!
        currentRawActions.value = previous.items
        // Temporarily clear selection until list updates
        selectedIndex.value = -1
        // Restore the previously selected row on the next tick so that
        // the DOM reflects the new list before we apply the index.
        selectedIndex.value = previous.selected
        // The selectedIndex will also be validated by the filteredActions watcher
      }
    }

    useHotkey('backspace', e => {
      if (!isActive.value || search.value) return
      e.preventDefault()
      doBackspace()
    }, { inputs: true, preventDefault: false })

    // --- Event Handlers ---

    function onAfterEnter () {
      emit('afterEnter')
    }

    /**
     * Resets the component's state after the leave transition has finished.
     * A timeout is used to ensure the state isn't cleared while the dialog is still visible,
     * which would cause a jarring visual flash.
     */
    function onAfterLeave () {
      // Wait for the dialog transition to fully complete before clearing state
      // Dialog transition duration is 125ms for leave (from dialog-transition.scss)
      setTimeout(() => {
        selectedIndex.value = -1
        search.value = ''
        navigationStack.value = []
        currentRawActions.value = props.items ?? []
        // TODO: Shouldn't onAfterLeave make it so I don't have to do this?
      }, 150) // Add a small buffer to the 125ms transition duration
      emit('afterLeave')
    }

    /**
     * A list of all actions that have a hotkey assigned.
     * This should include ALL items with hotkeys, not just currently visible ones,
     * so that global hotkeys work even when the palette is closed or when items are filtered.
     */
    const actionHotkeys = computed(() => {
      const collectHotkeys = (items: any[]): VuetifyListItem[] => {
        const result: VuetifyListItem[] = []

        items.forEach(item => {
          // Transform the item to get the proper VuetifyListItem structure
          const [transformedItem] = transformItems(itemTransformationProps.value, [item])
          if (transformedItem && transformedItem.raw?.hotkey) {
            result.push(transformedItem)
          }

          // Recursively collect hotkeys from children
          if (item.children && Array.isArray(item.children)) {
            result.push(...collectHotkeys(item.children))
          }
        })

        return result
      }

      return collectHotkeys(props.items ?? [])
    })

    // --- Global item-specific hotkeys ---
    const hotkeyDisposers: Array<() => void> = []

    watchEffect(() => {
      // Cleanup previous registrations
      while (hotkeyDisposers.length) {
        const dispose = hotkeyDisposers.pop()!
        if (typeof dispose === 'function') dispose()
      }

      actionHotkeys.value.forEach(item => {
        const hotkey = item.raw?.hotkey as string | undefined
        if (hotkey) {
          const disposer = useHotkey(hotkey, e => {
            onItemClickFromList(item, e)
          }, { inputs: true })
          hotkeyDisposers.push(disposer)
        }
      })
    })

    /**
     * Handles item clicks from the list.
     * - If the item has children (i.e., it's a parent), it drills down, pushing the current
     *   view onto the navigation stack and making the children the new `currentRawActions`.
     * - If it's a leaf item, it executes the handler and closes the dialog.
     */
    async function onItemClickFromList (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) {
      // If the event is from a mouse click, the dialog must be active.
      // This prevents click events from registering after the dialog has been closed.
      // Global hotkeys (KeyboardEvent) can still be executed when the dialog is inactive.
      if (event instanceof MouseEvent && !isActive.value) return

      // Add safety check for item and item.raw
      if (!item || !item.raw) return

      if (item.raw.children && Array.isArray(item.raw.children) && item.raw.children.length > 0) {
        // Save the current view and selection before drilling in
        navigationStack.value.push({ items: currentRawActions.value, selected: selectedIndex.value })
        currentRawActions.value = item.raw.children
        search.value = ''
        // Immediately clear selection so list renders without out-of-range index
        selectedIndex.value = -1
        // After DOM updates, default to the first item if available
        if (selectableItemsCount.value > 0) {
          selectedIndex.value = 0
        }
        // The selectedIndex will also be validated by the filteredActions watcher
      } else {
        // Execute the handler if it exists
        if (item.raw.handler && typeof item.raw.handler === 'function') {
          item.raw.handler(event, item.raw.value)
        }

        emit('click:item', item.raw, event)
        if (props.closeOnExecute) {
          isActive.value = false
        }
      }
    }

    const headerSlotScope = computed<VCommandPaletteHeaderSlotScope>(() => ({
      search,
      navigationStack,
      title: props.title,
    }))

    const footerSlotScope = computed<VCommandPaletteFooterSlotScope>(() => ({
      hasItems: !!filteredActions.value.length,
      hasParent: !!navigationStack.value.length,
      hasSelection: selectedIndex.value > -1,
      navigationStack,
    }))

    useRender(() => {
      const dialogProps = VDialog.filterProps(props)

      return (
        <VDialog
          { ...dialogProps }
          modelValue={ isActive.value }
          onUpdate:modelValue={ (v: boolean) => isActive.value = v }
          onAfterEnter={ onAfterEnter }
          onAfterLeave={ onAfterLeave }
          class={[
            'v-command-palette',
            'v-command-palette__dialog',
            themeClasses.value,
            densityClasses.value,
            props.class,
          ]}
          style={ props.style }
          transition={ props.transition }
          v-slots={{
            default: () => (
              <VSheet rounded class={['v-command-palette__sheet']}>
               { slots.prepend && (
              <div class="v-command-palette__prepend">
                { slots.prepend?.({ search: readonly(search) }) }
              </div>
               )}
                { /* Hotkey activators are now registered via a composable in setup */ }

                { slots.header ? slots.header(headerSlotScope.value) : (
                  <>
                    { props.title && (
                      <div key="command-palette-title" class="v-command-palette__title pa-4">
                        { t(props.title) }
                      </div>
                    )}
                    <VCommandPaletteSearch
                      v-model={ search.value }
                      placeholder={ props.placeholder }
                      clearable={ props.clearableSearch }
                    />
                  </>
                )}

                <VDivider />
                <VCommandPaletteList
                  items={ filteredActions.value }
                  selectedIndex={ selectedIndex.value }
                  onClick:item={ onItemClickFromList }
                  onHover={ (idx: number) => { selectedIndex.value = idx } }
                >
                  {{
                    item: slots.item,
                    'no-data': slots['no-data'],
                    'prepend-list': slots['prepend-list'],
                    'append-list': slots['append-item'],
                  }}
                </VCommandPaletteList>

                { slots.footer ? slots.footer(footerSlotScope.value) : (
                  <VCommandPaletteInstructions
                    hasItems={ footerSlotScope.value.hasItems }
                    hasParent={ footerSlotScope.value.hasParent }
                    hasSelection={ footerSlotScope.value.hasSelection }
                  />
                )}
                            { slots.append && (
              <div class="v-command-palette__append">
                { slots.append?.({ search: readonly(search) }) }
              </div>
                            )}
              </VSheet>
            ),
          }}
        />
      )
    })
  },
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>
