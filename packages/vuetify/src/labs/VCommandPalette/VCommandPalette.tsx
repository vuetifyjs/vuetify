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
import { provideCommandPaletteContext } from '@/labs/VCommandPalette/composables/useCommandPaletteContext'
import { useCommandPaletteNavigation } from '@/labs/VCommandPalette/composables/useCommandPaletteNavigation'

// Utilities
import { computed, inject, nextTick, provide, readonly, ref, shallowRef, toRef, watch, watchEffect } from 'vue'
import { consoleError, EventProp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Ref } from 'vue'
import type { InternalItem } from '@/composables/filter'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'

type FilterFunction = (value: string, query: string, item?: InternalItem) => boolean

/**
 * Shared function to check if an item matches a search query.
 * Compares the lowercased title, subtitle, and keywords against the search term.
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

const makeVCommandPaletteContentProps = propsFactory({
  closeOnExecute: {
    type: Boolean,
    default: true,
  },
  title: String,
  placeholder: String,
  clearableSearch: Boolean,
  ...makeItemsProps({ itemTitle: 'title' }),
  ...makeFilterProps({ filterKeys: ['title', 'subtitle', 'keywords'] }),
}, 'VCommandPaletteContent')

const VCommandPaletteContent = genericComponent<VCommandPaletteSlots>()({
  name: 'VCommandPaletteContent',
  props: makeVCommandPaletteContentProps(),
  emits: {
    close: () => true,
    'click:item': (item: any, event: MouseEvent | KeyboardEvent) => true,
  },
  setup (props, { emit, slots }) {
    const { t } = useLocale()
    interface NavigationFrame { items: any[], selected: number }
    const navigationStack = ref<NavigationFrame[]>([])
    const search = shallowRef('')
    const currentItems = ref<any[]>([])

    // Initialize currentItems with props.items
    watch(() => props.items, newItems => {
      if (navigationStack.value.length === 0) {
        currentItems.value = newItems || []
      }
    }, { immediate: true })

    const currentRawActions = computed(() => {
      return currentItems.value || []
    })

    const itemTransformationProps = computed(() => ({
      itemTitle: props.itemTitle,
      itemValue: props.itemValue,
      itemChildren: props.itemChildren,
      itemProps: props.itemProps,
      returnObject: props.returnObject,
      valueComparator: props.valueComparator,
    }))

    const commandPaletteFilter: FilterFunction = (value: string, query: string, item?: InternalItem) => {
      if (!query || !query.trim()) return true
      if (!item?.raw) return false

      const searchLower = query.trim().toLowerCase()
      const rawItem = item.raw
      if (isGroupDefinition(rawItem)) {
        const groupMatches = itemMatches(rawItem, searchLower)
        const children = rawItem.children || []
        const hasMatchingChildren = children.some((child: any) => itemMatches(child, searchLower))
        return groupMatches || hasMatchingChildren
      } else if (isParentDefinition(rawItem)) {
        const parentMatches = itemMatches(rawItem, searchLower)
        const children = rawItem.children || []
        const hasMatchingChildren = children.some((child: any) => itemMatches(child, searchLower))
        return parentMatches || hasMatchingChildren
      } else {
        return itemMatches(rawItem, searchLower)
      }
    }

    const transformFilteredItems = (items: any[]) => {
      if (!search.value || !search.value.trim()) return items
      const searchLower = search.value.trim().toLowerCase()
      return items.map(item => {
        const rawItem = item.raw
        if (!rawItem) return item
        if (isGroupDefinition(rawItem)) {
          const groupMatches = itemMatches(rawItem, searchLower)
          const children = rawItem.children || []
          const filteredChildren = groupMatches
            ? children
            : children.filter((child: any) => itemMatches(child, searchLower))
          return { ...item, raw: { ...rawItem, children: filteredChildren } }
        }
        return item
      })
    }

    const transformedItems = computed(() => (
      transformItems(itemTransformationProps.value, currentRawActions.value)
    ))

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

    const filteredActions = computed(() => {
      return transformFilteredItems(filteredItems.value)
    })

    // Forward declare selectedIndex to avoid hoisting issues
    let selectedIndex: Ref<number>

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
    })

    // Assign selectedIndex from navigation
    selectedIndex = navigation.selectedIndex
    const { activeDescendantId, setSelectedIndex } = navigation

    // Provide context for custom layouts
    const context = provideCommandPaletteContext({
      items: filteredActions,
      selectedIndex,
      activeDescendantId,
      navigationMode: ref('list'),
    })

    const defaultSlotScope = computed<VCommandPaletteDefaultSlotScope>(() => ({
      items: filteredActions.value,
      rootProps: context.rootProps.value,
      getItemProps: context.getItemProps,
    }))

    watch(() => props.items, () => {
      navigationStack.value = []
      search.value = ''
      selectedIndex.value = -1
      // Reset to root level when items change
      currentItems.value = props.items || []
    })

    // Reset state when the parent dialog closes
    // This is passed from the parent VCommandPalette component
    const parentIsActive = inject<Ref<boolean>>('commandPaletteIsActive', ref(true))
    watch(parentIsActive, (newValue, oldValue) => {
      if (!newValue && oldValue) {
        // Dialog is closing - reset state for next open
        navigationStack.value = []
        search.value = ''
        selectedIndex.value = -1
        currentItems.value = props.items || []
      }
    })

    // Register item-specific hotkeys when the palette is open
    // Use watchEffect to automatically handle cleanup and re-registration
    watchEffect(() => {
      const allItems = props.items ?? []
      const processItems = (items: any[]) => {
        items.forEach(item => {
          if (item.hotkey && item.handler) {
            useHotkey(item.hotkey, e => {
              // Transform the raw item to a VuetifyListItem and use onItemClickFromList
              // This ensures the same logic (including closeOnExecute) is applied
              const [transformedItem] = transformItems(itemTransformationProps.value, [item])
              if (transformedItem) {
                onItemClickFromList(transformedItem, e)
              }
            }, { inputs: true })
          }
          if (item.children && Array.isArray(item.children)) {
            processItems(item.children)
          }
        })
      }
      processItems(allItems)
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
      // Check if default slot is provided for custom layout
      if (slots.default) {
        return (
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
                  clearable={ props.clearableSearch }
                                  aria-label="Search commands"
                aria-describedby="command-palette-instructions"
                />
              </>
            )}
            <VDivider />
            { slots.default(defaultSlotScope.value) }
            { slots.footer ? slots.footer(footerSlotScope.value) : (
              <VCommandPaletteInstructions
                id="command-palette-instructions"
                hasItems={ footerSlotScope.value.hasItems }
                hasParent={ footerSlotScope.value.hasParent }
              />
            )}
            { slots.append?.({ search: readonly(search) }) }
          </>
        )
      }

      // Default layout (backward compatibility)
      return (
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
                clearable={ props.clearableSearch }
                aria-label="Search commands"
                aria-describedby="command-palette-instructions"
              />
            </>
          )}
          <VDivider />
          <VCommandPaletteList
            items={ filteredActions.value }
            selectedIndex={ selectedIndex.value }
            onClick:item={ onItemClickFromList }
            onHover={ setSelectedIndex }
            aria-label="Command options"
          >
            {{
              item: slots.item,
              'no-data': slots['no-data'],
              'prepend-list': slots['prepend-list'],
              'append-list': slots['append-list'],
            }}
          </VCommandPaletteList>
          { slots.footer ? slots.footer(footerSlotScope.value) : (
            <VCommandPaletteInstructions
              id="command-palette-instructions"
              hasItems={ footerSlotScope.value.hasItems }
              hasParent={ footerSlotScope.value.hasParent }
            />
          )}
          { slots.append?.({ search: readonly(search) }) }
        </>
      )
    })
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
  ...makeFilterProps({ filterKeys: ['title', 'subtitle', 'keywords'] }),
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
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)

    // Provide isActive state to child components for state reset
    provide('commandPaletteIsActive', isActive)

    // Focus restoration for accessibility compliance (WCAG 2.1 Level A)
    const previouslyFocusedElement = shallowRef<HTMLElement | null>(null)

    useHotkey(toRef(props, 'hotkey'), () => {
      isActive.value = !isActive.value
    })

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

    // Note: Item-specific hotkey registration has been moved to VCommandPaletteContent
    // This ensures hotkeys are only active when the dialog is open and automatically
    // cleaned up when the dialog closes (component unmounts)

    function onClose () {
      isActive.value = false
    }

    function onClickItem (item: any, event: MouseEvent | KeyboardEvent) {
      emit('click:item', item, event)
    }

    function onAfterEnter () {
      emit('afterEnter')
    }

    function onAfterLeave () {
      emit('afterLeave')
    }

    useRender(() => {
      const dialogProps = VDialog.filterProps(props)
      // Make contentProps reactive by computing it inside useRender
      const contentProps = VCommandPaletteContent.filterProps(props)

      // Pass transition prop directly to VDialog (follows VOverlay/VDialog conventions)
      const transitionProps = { transition: props.transition }

      return (
        <VDialog
          { ...dialogProps }
          { ...transitionProps }
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
          v-slots={{
            default: () => (
              <VSheet rounded class="v-command-palette__sheet">
                <VCommandPaletteContent
                  { ...contentProps }
                  onClose={ onClose }
                  onClick:item={ onClickItem }
                  v-slots={ slots }
                />
              </VSheet>
            ),
          }}
        />
      )
    })
  },
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>

// Export helper components for custom layouts
export { VCommandPaletteItem } from './VCommandPaletteItem'
export { VCommandPaletteItems } from './VCommandPaletteItems'
export { useCommandPaletteContext } from './composables/useCommandPaletteContext'

// Export types for proper typing of items prop
export type {
  VCommandPaletteItem as VCommandPaletteItemType,
  VCommandPaletteActionItem,
  VCommandPaletteLinkItem,
  VCommandPaletteItemDefinition,
  VCommandPaletteParentDefinition,
  VCommandPaletteGroupDefinition,
} from './VCommandPaletteList'
