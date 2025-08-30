/**
 * VCommandPalette Component
 *
 * A comprehensive, keyboard-driven command palette.
 */

// Styles
import '@/labs/VCommandPalette/VCommandPalette.scss'

// Components
import { VDialog } from '@/components/VDialog'
import { VDivider } from '@/components/VDivider'
import { VSheet } from '@/components/VSheet'
import { makeVSheetProps } from '@/components/VSheet/VSheet'
import { VCommandPaletteInstructions } from '@/labs/VCommandPalette/VCommandPaletteInstructions'
import { isGroupDefinition, isParentDefinition, VCommandPaletteList } from '@/labs/VCommandPalette/VCommandPaletteList'
import { VCommandPaletteSearch } from '@/labs/VCommandPalette/VCommandPaletteSearch'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { forwardRefs } from '@/composables/forwardRefs'
import { useHotkey } from '@/composables/hotkey'
import { makeItemsProps, transformItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTransitionProps } from '@/composables/transition'
import { provideCommandPaletteContext } from '@/labs/VCommandPalette/composables/useCommandPaletteContext'
import { useCommandPaletteNavigation } from '@/labs/VCommandPalette/composables/useCommandPaletteNavigation'

// Utilities
import { computed, nextTick, readonly, ref, shallowRef, toRef, useId, watch, watchEffect } from 'vue'
import { consoleError, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { VCommandPaletteItem } from './VCommandPaletteList'
import type { InternalItem } from '@/composables/filter'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'

type FilterFunction = (value: string, query: string, item?: InternalItem) => boolean

/**
 * Shared function to check if an item matches a search query.
 * Compares the lowercased title, subtitle, and keywords against the search term.
 *
 * This function is used by both the main filter and the group children filter
 * to ensure consistent matching behavior across all item types.
 */
function itemMatches (testItem: any, searchLower: string): boolean {
  if (!testItem) return false
  const title = testItem.title ? String(testItem.title).toLowerCase() : ''
  const subtitle = testItem.subtitle ? String(testItem.subtitle).toLowerCase() : ''

  // Ensure we have strings before calling includes
  if (typeof title !== 'string' || typeof subtitle !== 'string') return false
  if (typeof searchLower !== 'string') return false

  // Check title and subtitle
  if (title.includes(searchLower) || subtitle.includes(searchLower)) {
    return true
  }

  // Check keywords if they exist
  if (testItem.keywords && Array.isArray(testItem.keywords)) {
    return testItem.keywords.some((keyword: string) => {
      const keywordLower = String(keyword).toLowerCase()
      return keywordLower.includes(searchLower)
    })
  }

  return false
}

/**
 * Props factory for VCommandPaletteContent
 * Defines the internal content component's configuration options
 */
const makeVCommandPaletteContentProps = propsFactory({
  closeOnExecute: {
    type: Boolean,
    default: true,
  },
  title: String,
  placeholder: String,
  hideBack: Boolean,
  listProps: Object as PropType<VCommandPaletteList['$props']>,
  searchProps: Object as PropType<VCommandPaletteSearch['$props']>,
  // Scope for hotkeys: 'global' listens globally, 'focused' only when palette is focused
  hotkeysScope: {
    type: String as PropType<'global' | 'focused'>,
    default: 'global',
  },
  // Include standard item transformation props
  ...makeItemsProps({ itemTitle: 'title' }),
  // Items array with proper typing for command palette items
  items: {
    type: Array as PropType<VCommandPaletteItem[]>,
    default: () => [],
  },
  // Include filter props with support for title, subtitle, and keywords
  ...makeFilterProps({ filterKeys: ['title', 'subtitle', 'keywords'] }),
}, 'VCommandPaletteContent')

/**
 * VCommandPaletteContent Component
 *
 * The core logic component that handles:
 * - Search functionality and filtering
 * - Navigation state management
 * - Item transformation and rendering
 * - Keyboard event handling
 * - Hierarchical navigation (drilling into parents/groups)
 *
 * This component is separated from the main VCommandPalette to allow
 * for cleaner separation of concerns between dialog management and
 * command palette functionality.
 */
const VCommandPaletteContent = genericComponent<VCommandPaletteSlots>()({
  name: 'VCommandPaletteContent',
  props: makeVCommandPaletteContentProps(),
  emits: {
    close: () => true,
    'click:item': (item: any, event: MouseEvent | KeyboardEvent) => true,
  },
  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const uid = useId()
    const instructionsId = `command-palette-instructions-${uid}`

    interface NavigationFrame { items: any[], selected: number }
    const navigationStack = ref<NavigationFrame[]>([])
    const search = shallowRef('')
    const currentItems = ref<any[]>([]) // Current level items (before filtering)

    watch(() => props.items, newItems => {
      if (navigationStack.value.length === 0) {
        currentItems.value = newItems || []
      }
    }, { immediate: true })

    // Computed property for current raw actions (before transformation)
    const currentRawActions = computed(() => {
      return currentItems.value || []
    })

    // Items are now used directly without transformation since they're already VCommandPaletteItem[]

    /**
     * Custom filter function for command palette items
     * Handles complex filtering logic for different item types:
     * - Groups: Match if group title matches OR any child matches
     * - Parents: Match if parent title matches OR any child matches
     * - Regular items: Match based on title, subtitle, and keywords
     */
    const commandPaletteFilter: FilterFunction = (value: string, query: string, item?: InternalItem) => {
      if (!query || !query.trim()) return true
      if (!item?.raw) return false

      const searchLower = query.trim().toLowerCase()
      const rawItem = item.raw

      if (isGroupDefinition(rawItem)) {
        // For groups, check if group itself matches or any child matches
        const groupMatches = itemMatches(rawItem, searchLower)
        const children = rawItem.children || []
        const hasMatchingChildren = children.some((child: any) => itemMatches(child, searchLower))
        return groupMatches || hasMatchingChildren
      } else if (isParentDefinition(rawItem)) {
        // For parents, check if parent itself matches or any child matches
        const parentMatches = itemMatches(rawItem, searchLower)
        const children = rawItem.children || []
        const hasMatchingChildren = children.some((child: any) => itemMatches(child, searchLower))
        return parentMatches || hasMatchingChildren
      } else {
        // For regular items, use standard matching
        return itemMatches(rawItem, searchLower)
      }
    }

    /**
     * Transforms filtered items to show only matching children within groups
     * When searching, groups should only show children that match the search,
     * not all children. This provides a more focused search experience.
     */
    function transformFilteredItems (items: any[]): any[] {
      if (!search.value || !search.value.trim()) return items
      const searchLower = search.value.trim().toLowerCase()

      return items.map(item => {
        const rawItem = item.raw
        if (!rawItem) return item

        if (isGroupDefinition(rawItem)) {
          const groupMatches = itemMatches(rawItem, searchLower)
          const children = rawItem.children || []

          // If group title matches, show all children; otherwise, show only matching children
          const filteredChildren = groupMatches
            ? children
            : children.filter((child: any) => itemMatches(child, searchLower))

          return { ...item, raw: { ...rawItem, children: filteredChildren } }
        }
        return item
      })
    }

    // Item transformation configuration
    const itemTransformationProps = computed(() => ({
      itemTitle: props.itemTitle,
      itemValue: props.itemValue,
      itemChildren: props.itemChildren,
      itemProps: props.itemProps,
      itemType: props.itemType,
      returnObject: props.returnObject,
      valueComparator: props.valueComparator,
    }))

    // Transform raw items into VuetifyListItem format
    const transformedItems = computed(() => (
      transformItems(itemTransformationProps.value, currentRawActions.value)
    ))

    // Apply filtering to transformed items
    const { filteredItems } = useFilter(
      {
        customFilter: (value: string, query: string, item?: InternalItem) => {
          // Add extra safety checks before calling our filter
          if (value === undefined || value === null) return false
          if (query === undefined || query === null) return true
          if (!item) return false
          return commandPaletteFilter(value, query, item)
        },
        filterKeys: ['title', 'subtitle', 'keywords'],
        filterMode: 'some',
        noFilter: false,
      },
      transformedItems,
      () => search.value || '',
    )

    // Final filtered actions with group children filtering applied
    const filteredActions = computed(() => {
      return transformFilteredItems(filteredItems.value)
    })

    // Forward declare selectedIndex to avoid hoisting issues
    let selectedIndex: Ref<number>

    /**
     * Handles item clicks from the list component
     * Manages navigation logic for different item types:
     * - Items with children: Navigate into the children
     * - Items with handlers: Execute the handler
     * - Items with navigation: Let the browser/router handle it
     */
    async function onItemClickFromList (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) {
      if (!item || !item.raw) return

      // Check if item has children and should navigate into them
      if (item.raw.children && Array.isArray(item.raw.children) && item.raw.children.length > 0) {
        // Save current state before navigating
        navigationStack.value.push({
          items: currentItems.value,
          selected: selectedIndex.value,
        })

        // Navigate to children
        currentItems.value = item.raw.children
        search.value = ''
        selectedIndex.value = 0 // Auto-select first child
      } else {
        // Execute the item
        if (item.raw.handler && typeof item.raw.handler === 'function') {
          try {
            item.raw.handler(event, item.raw.value)
          } catch (error) {
            // Log error with context for debugging, but don't break the UI
            consoleError(`Failed to execute item handler for "${item.raw.title || item.raw.id}": ${error}`)

            // Re-throw in development to help with debugging
            if (process.env.NODE_ENV === 'development') {
              throw error
            }
          }
        }
        emit('click:item', item.raw, event)
        if (props.closeOnExecute) {
          emit('close')
        }
      }
    }

    /**
     * Handles close events from child components
     */
    function onClose () {
      emit('close')
    }

    // Initialize the navigation composable
    const navigation = useCommandPaletteNavigation({
      filteredItems: filteredActions,
      search,
      navigationStack,
      currentItems,
      itemTransformationProps,
      onItemClick: onItemClickFromList,
      onClose,
      isScopeActive: () => {
        if (props.hotkeysScope !== 'focused') return true
        const active = document.activeElement as HTMLElement | null
        if (!active) return false
        const container = active.closest('.v-command-palette') as HTMLElement | null
        if (!container) return false
        return !!container.querySelector(`#${instructionsId}`)
      },
    })

    // Assign selectedIndex from navigation
    selectedIndex = navigation.selectedIndex
    const { activeDescendantId, setSelectedIndex, reset, navigateBack } = navigation

    // Provide context for custom layouts
    const context = provideCommandPaletteContext({
      items: filteredActions,
      selectedIndex,
      activeDescendantId,
      navigationMode: shallowRef('list'),
      setSelectedIndex: navigation.setSelectedIndex,
      onItemClick: (item: any, e: any) => {
        // Transform possible raw item from custom layout back to list item
        const [transformed] = transformItems(itemTransformationProps.value, [item.raw ?? item])
        if (transformed) onItemClickFromList(transformed, e)
      },
    })

    // Computed slot scope for default slot (custom layouts)
    const defaultSlotScope = computed<VCommandPaletteDefaultSlotScope>(() => ({
      items: filteredActions.value,
      rootProps: context.rootProps.value,
      getItemProps: context.getItemProps,
    }))

    // Reset navigation state when items change
    watch(() => props.items, () => {
      reset()
      // Reset to root level when items change
      currentItems.value = props.items || []
    })

    // Register item-specific hotkeys when the palette is open
    // automatically handle cleanup and re-registration
    watchEffect(() => {
      const allItems = props.items ?? []
      function processItems (items: VCommandPaletteItem[]): void {
        items.forEach((item, index) => {
          if ('hotkey' in item && item.hotkey && 'handler' in item && item.handler) {
            useHotkey(item.hotkey, e => {
              const [transformedItem] = transformItems(itemTransformationProps.value, [item])
              if (transformedItem) onItemClickFromList(transformedItem, e)
            }, { inputs: true })
          }
          if ('children' in item && item.children && Array.isArray(item.children)) {
            processItems(item.children)
          }
        })
      }
      processItems(allItems)
    })

    // Computed slot scopes for header and footer
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

    const subheaderSlotScope = computed<VCommandPaletteSubheaderSlotScope>(() => ({
      search,
      filteredItems: filteredActions.value,
      totalResults: filteredActions.value.length,
      hasQuery: !!search.value.trim(),
      navigateBack,
      navigationStack,
    }))

    useRender(() => (
      <>
        { slots.prepend?.({ search: readonly(search) }) }
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
              aria-label="Search commands"
              aria-describedby={ instructionsId }
              showBack={ !props.hideBack && navigationStack.value.length > 0 }
              onClick:back={ navigateBack }
              { ...props.searchProps }
              v-slots={{
                back: slots.back,
              }}
            />
          </>
        )}
        <VDivider />
        { subheaderSlotScope.value.hasQuery && slots.subheader?.(subheaderSlotScope.value) }
        { slots.default?.(defaultSlotScope.value) ?? (
          <VCommandPaletteList
            items={ filteredActions.value }
            selectedIndex={ selectedIndex.value }
            onClick:item={ onItemClickFromList }
            onHover={ setSelectedIndex }
            aria-label="Command options"
            { ...props.listProps }
          >
            {{
              item: slots.item,
              'no-data': slots['no-data'],
              'prepend-list': slots['prepend-list'],
              'append-list': slots['append-list'],
            }}
          </VCommandPaletteList>
        )}
        { slots.footer?.(footerSlotScope.value) ?? (
          <VCommandPaletteInstructions
            id={ instructionsId }
            hasItems={ footerSlotScope.value.hasItems }
            hasParent={ footerSlotScope.value.hasParent }
          />
        )}
        { slots.append?.({ search: readonly(search) }) }
      </>
    ))

    return {
      selectedIndex,
      reset,
    }
  },
})

// VCommandPalette's slot scope and type definitions
export type VCommandPaletteItemRenderScope = {
  item: any
  props: Record<string, any>
}

export type VCommandPaletteGenericSlotScope = {
  search: Readonly<Ref<string>>
}

export type VCommandPaletteDefaultSlotScope = {
  items: any[]
  rootProps: Record<string, any>
  getItemProps: (item: any, index: number) => Record<string, any>
}

export type VCommandPaletteSlots = {
  default: VCommandPaletteDefaultSlotScope
  search: { modelValue: string }
  item: VCommandPaletteItemRenderScope
  'no-data': never
  header: VCommandPaletteHeaderSlotScope
  footer: VCommandPaletteFooterSlotScope
  'prepend-list': never
  'append-list': never
  prepend: VCommandPaletteGenericSlotScope
  append: VCommandPaletteGenericSlotScope
  subheader: VCommandPaletteSubheaderSlotScope
}

export type VCommandPaletteHeaderSlotScope = {
  search: Ref<string>
  navigationStack: Ref<any[]>
  title?: string
}

export type VCommandPaletteSubheaderSlotScope = {
  search: Ref<string>
  filteredItems: any[]
  totalResults: number
  hasQuery: boolean
  navigateBack: () => void
  navigationStack: Ref<any[]>
}

export type VCommandPaletteFooterSlotScope = {
  hasItems: boolean
  hasParent: boolean
  hasSelection: boolean
  navigationStack: Ref<any[]>
}

export const makeVCommandPaletteProps = propsFactory({
  contained: Boolean,
  persistent: Boolean,
  modelValue: Boolean,
  hotkey: String,
  title: String,
  placeholder: String,
  hideBack: Boolean,
  listProps: Object as PropType<VCommandPaletteList['$props']>,
  searchProps: Object as PropType<VCommandPaletteSearch['$props']>,
  // Whether to close the palette when an item is executed
  closeOnExecute: {
    type: Boolean,
    default: true,
  },
  // Include standard item transformation props
  ...makeItemsProps({ itemTitle: 'title' }),
  // Items array with proper typing for command palette items
  items: {
    type: Array as PropType<VCommandPaletteItem[]>,
    default: () => [],
  },
  // Standard Vuetify component props
  ...makeVSheetProps({
    maxHeight: 450,
    maxWidth: 720,
  }),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeFilterProps({ filterKeys: ['title', 'subtitle', 'keywords'] }),
  ...makeTransitionProps({ transition: 'dialog-transition' }),
  ...makeThemeProps(),
}, 'VCommandPalette')

/**
 * VCommandPalette Component
 *
 * The main command palette component that provides a keyboard-driven interface
 * for application commands. This component manages the dialog state, focus
 * restoration, and global hotkey registration while delegating the core
 * functionality to VCommandPaletteContent.
 */
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
    // Dialog state management
    const isActive = useProxiedModel(props, 'modelValue')
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)

    const vCommandPaletteContentRef = ref<InstanceType<typeof VCommandPaletteContent>>()

    // Provide isActive state to child components for state reset
    if (!props.contained) {
      // Focus restoration for accessibility compliance (WCAG 2.1 Level A)
      const previouslyFocusedElement = shallowRef<HTMLElement | null>(null)

      // Register global hotkey for opening/closing the palette (only if provided)
      // useHotkey automatically handles undefined values by not registering any listeners
      useHotkey(toRef(props, 'hotkey'), () => {
        isActive.value = !isActive.value
      })

      // Register escape key to close the palette (respects persistent prop)
      useHotkey('escape', () => {
        if (isActive.value && !props.persistent) {
          isActive.value = false
        }
      }, { inputs: true })

      // Watch for palette open/close to manage focus restoration
      watch(isActive, (newValue, oldValue) => {
        if (newValue && !oldValue) {
        // Palette is opening - save the currently focused element
          previouslyFocusedElement.value = document.activeElement as HTMLElement
        } else if (!newValue && oldValue && previouslyFocusedElement.value && typeof previouslyFocusedElement.value.focus === 'function') {
        // Palette is closing - restore focus to the previously focused element
        // Use nextTick to ensure the dialog has fully closed before restoring focus
          nextTick(() => {
            previouslyFocusedElement.value?.focus({ preventScroll: true })
            previouslyFocusedElement.value = null
          })
        }
      })
    }

    // Note: Item-specific hotkey registration has been moved to VCommandPaletteContent
    // This ensures hotkeys are only active when the dialog is open and automatically
    // cleaned up when the dialog closes (component unmounts)

    /**
     * Handles close events from the content component
     */
    function onClose () {
      isActive.value = false
    }

    /**
     * Handles item click events and forwards them to parent
     */
    function onClickItem (item: any, event: MouseEvent | KeyboardEvent) {
      emit('click:item', item, event)
    }

    /**
     * Handles dialog enter transition completion
     */
    function onAfterEnter () {
      emit('afterEnter')
    }

    /**
     * Handles dialog leave transition completion
     */
    function onAfterLeave () {
      vCommandPaletteContentRef.value?.reset()
      emit('afterLeave')
    }

    useRender(() => {
      // Extract content-specific props
      const contentProps = VCommandPaletteContent.filterProps(props)
      const sheetProps = VSheet.filterProps(props)

      const commandPaletteContent = (
        <VCommandPaletteContent
          { ...contentProps }
          onClose={ onClose }
          onClick:item={ onClickItem }
          v-slots={ slots }
          ref={ vCommandPaletteContentRef }
        />
      )

      if (props.contained) {
        return isActive.value ? (
          <VSheet
            class={[
              'v-command-palette',
              themeClasses.value,
              densityClasses.value,
              props.class,
            ]}
            style={ props.style }
            { ...sheetProps }
          >
            { commandPaletteContent }
          </VSheet>
        ) : <></>
      }

      return (
        <VDialog
          modelValue={ isActive.value }
          maxHeight={ sheetProps.maxHeight }
          maxWidth={ sheetProps.maxWidth }
          persistent={ props.persistent }
          transition={ props.transition }
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
          v-slots={{
            default: () => (
              <VSheet
                class={[
                  'v-command-palette__sheet',
                ]}
                { ...sheetProps }
              >
                { commandPaletteContent }
              </VSheet>
            ),
          }}
        />
      )
    })

    return forwardRefs({}, vCommandPaletteContentRef)
  },
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>

export { VCommandPaletteItem as VCommandPaletteItemComponent } from './VCommandPaletteItem'
export { VCommandPaletteItems } from './VCommandPaletteItems'
export { useCommandPaletteContext } from './composables/useCommandPaletteContext'

export type {
  VCommandPaletteItem,
  VCommandPaletteActionItem,
  VCommandPaletteLinkItem,
  VCommandPaletteItemDefinition,
  VCommandPaletteParentDefinition,
  VCommandPaletteGroupDefinition,
} from './VCommandPaletteList'
