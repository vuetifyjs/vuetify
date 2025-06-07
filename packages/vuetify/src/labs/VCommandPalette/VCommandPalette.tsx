// Styles
import '@/labs/VCommandPalette/VCommandPalette.scss'

// Components
import { VDialog } from '@/components/VDialog'
import { makeVDialogProps } from '@/components/VDialog/VDialog'
import { VDivider } from '@/components/VDivider'
import { VSheet } from '@/components/VSheet'
import { VCommandPaletteInstructions } from '@/labs/VCommandPalette/VCommandPaletteInstructions'
import { isGroupDefinition, VCommandPaletteList } from '@/labs/VCommandPalette/VCommandPaletteList'
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
import { computed, readonly, ref, shallowRef, toRef, watch } from 'vue'
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
  navigationStack: Ref<any[][]>
  title?: string
}

export type VCommandPaletteFooterSlotScope = {
  hasItems: boolean
  hasParent: boolean
  hasSelection: boolean
  navigationStack: Ref<any[][]>
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
    /** A stack to keep track of navigation history when drilling down into parent items. */
    const navigationStack = ref<any[][]>([])
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
      if (!query) return true

      const searchLower = query.toLowerCase()

      // Helper function to check if a single item matches
      function itemMatches (rawItem: any): boolean {
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
      } else {
        // For regular items and parents: match based on title/subtitle
        return itemMatches(rawItem)
      }
    }

    /**
     * Transform function to handle group filtering logic.
     * When a group matches, we need to decide which children to include.
     */
    const transformFilteredItems = (items: any[]) => {
      if (!search.value) return items

      const searchLower = search.value.toLowerCase()

      return items.map(item => {
        const rawItem = item.raw
        if (isGroupDefinition(rawItem)) {
          // Helper function to check if a single item matches
          const itemMatches = (testItem: any): boolean => {
            const title = testItem.title?.toLowerCase() ?? ''
            const subtitle = testItem.subtitle?.toLowerCase() ?? ''
            return title.includes(searchLower) || subtitle.includes(searchLower)
          }

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
     * Calculates the total number of selectable items.
     * This is crucial for keyboard navigation (arrow keys) because it needs to know the bounds
     * of the list, skipping over non-selectable items like group headers.
     * It counts the children of groups/parents because they are rendered as a flat list.
     */
    const selectableItemsCount = computed(() => {
      let count = 0

      filteredActions.value.forEach(item => {
        // Check if this is a group or parent that will be flattened
        if (item.raw?.type === 'group' || item.raw?.type === 'parent') {
          count += item.raw.children.length
        } else {
          // Regular item
          count += 1
        }
      })

      return count
    })

    /** When the filter changes (e.g., user types), auto-select the first item if available. */
    watch(filteredActions, () => {
      // Auto-select first item if there are selectable items, otherwise reset to -1
      selectedIndex.value = selectableItemsCount.value > 0 ? 0 : -1
    })

    /** When the dialog opens, auto-select the first item if available. */
    watch(isActive, (newValue) => {
      if (newValue && selectableItemsCount.value > 0) {
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
      // If the dialog is not active, do nothing
      if (!isActive.value) return

      // Calculate the maximum index for selectable items
      const maxIndex = selectableItemsCount.value - 1

      // If there are selectable items, update the selectedIndex
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
      // Find the actual item at the selected index by counting selectable items
      if (selectedIndex.value >= 0) {
        let selectableCount = 0
        for (const item of filteredActions.value) {
          if (item.raw?.type === 'group' || item.raw?.type === 'parent') {
            if (selectableCount + item.raw.children.length > selectedIndex.value) {
              const childIndex = selectedIndex.value - selectableCount
              const child = item.raw.children[childIndex]
              const [transformedChild] = transformItems(itemTransformationProps.value, [child])
              if (transformedChild) {
                onItemClickFromList(transformedChild, e)
              }
              return
            }
            selectableCount += item.raw.children.length
          } else {
            if (selectableCount === selectedIndex.value) {
              onItemClickFromList(item, e)
              return
            }
            selectableCount += 1
          }
        }
      }
    }, { inputs: true })

    /** Closes the dialog. The navigation stack is cleared in `onAfterLeave`. */
    useHotkey('escape', e => {
      if (!isActive.value) return
      // Always close the dialog on ESC - don't navigate back through stack
      // The state clearing in onAfterLeave will reset navigation properly
      isActive.value = false
    }, { inputs: true })

    /** Navigates back up the stack if not currently searching. */
    useHotkey('backspace', e => {
      if (!isActive.value || search.value) return
      e.preventDefault()
      if (navigationStack.value.length > 0) {
        currentRawActions.value = navigationStack.value.pop()!
        // The selectedIndex will be auto-updated by the filteredActions watcher
      }
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
     * Handles item clicks from the list.
     * - If the item has children (i.e., it's a parent), it drills down, pushing the current
     *   view onto the navigation stack and making the children the new `currentRawActions`.
     * - If it's a leaf item, it executes the handler and closes the dialog.
     */
    function onItemClickFromList (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) {
      if (item.raw?.children && item.raw.children.length > 0) {
        navigationStack.value.push(currentRawActions.value)
        currentRawActions.value = item.raw.children
        search.value = ''
        // The selectedIndex will be auto-updated by the filteredActions watcher
      } else {
        // Execute the handler if it exists
        if (item.raw?.handler && typeof item.raw.handler === 'function') {
          item.raw.handler(event, item.raw.value)
        }

        emit('click:item', item.raw, event)
        if (props.closeOnExecute) {
          isActive.value = false
        }
      }
    }

    /**
     * A list of all actions that have a hotkey assigned.
     * This is passed to VActionHotkey components for registration.
     */
    const actionHotkeys = computed(() => {
      return isActive.value ? filteredActions.value : []
    })

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
                { actionHotkeys.value.map(item => <HotkeyActivator key={ item.value } item={ item } onExecute={ onItemClickFromList } />) }

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
