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
import { computed, onMounted, readonly, ref, shallowRef, toRef, watch, nextTick } from 'vue'
import { EventProp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { InternalItem } from '@/composables/filter'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'

type FilterFunction = (value: string, query: string, item?: InternalItem) => boolean

const makeVCommandPaletteContentProps = propsFactory({
  closeOnExecute: {
    type: Boolean,
    default: true,
  },
  title: String,
  placeholder: String,
  clearableSearch: Boolean,
  ...makeItemsProps({ itemTitle: 'title' }),
  ...makeFilterProps({ filterKeys: ['title'] }),
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
    const selectedIndex = shallowRef(-1)
    interface NavigationFrame { items: any[], selected: number }
    const navigationStack = ref<NavigationFrame[]>([])
    const search = shallowRef('')

    const currentRawActions = computed(() => {
      if (navigationStack.value.length) {
        return navigationStack.value[navigationStack.value.length - 1].items
      }
      return props.items ?? []
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
      function itemMatches (rawItem: any): boolean {
        if (!rawItem) return false
        // Safely convert to string and handle undefined/null values
        const title = rawItem.title ? String(rawItem.title).toLowerCase() : ''
        const subtitle = rawItem.subtitle ? String(rawItem.subtitle).toLowerCase() : ''
        // Ensure we have strings before calling includes
        if (typeof title !== 'string' || typeof subtitle !== 'string') return false
        return title.includes(searchLower) || subtitle.includes(searchLower)
      }
      const rawItem = item.raw
      if (isGroupDefinition(rawItem)) {
        const groupMatches = itemMatches(rawItem)
        const children = rawItem.children || []
        const hasMatchingChildren = children.some(itemMatches)
        return groupMatches || hasMatchingChildren
      } else if (isParentDefinition(rawItem)) {
        const parentMatches = itemMatches(rawItem)
        const children = rawItem.children || []
        const hasMatchingChildren = children.some(itemMatches)
        return parentMatches || hasMatchingChildren
      } else {
        return itemMatches(rawItem)
      }
    }

    const transformFilteredItems = (items: any[]) => {
      if (!search.value || !search.value.trim()) return items
      const searchLower = search.value.trim().toLowerCase()
      return items.map(item => {
        const rawItem = item.raw
        if (!rawItem) return item
        const itemMatches = (testItem: any): boolean => {
          if (!testItem) return false
          const title = testItem.title ? String(testItem.title).toLowerCase() : ''
          const subtitle = testItem.subtitle ? String(testItem.subtitle).toLowerCase() : ''
          // Ensure we have strings before calling includes
          if (typeof title !== 'string' || typeof subtitle !== 'string') return false
          if (typeof searchLower !== 'string') return false
          return title.includes(searchLower) || subtitle.includes(searchLower)
        }
        if (isGroupDefinition(rawItem)) {
          const groupMatches = itemMatches(rawItem)
          const children = rawItem.children || []
          const filteredChildren = groupMatches
            ? children
            : children.filter(itemMatches)
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
        filterKeys: ['title', 'subtitle'],
        filterMode: 'some',
        noFilter: false,
      },
      transformedItems,
      () => search.value || '',
    )

    const filteredActions = computed(() => {
      return transformFilteredItems(filteredItems.value)
    })

    const selectableItemsCount = computed(() => {
      let count = 0
      filteredActions.value.forEach(item => {
        if (item.raw?.type === 'parent') {
          const children = item.raw.children || []
          count += 1 + children.length
        } else if (item.raw?.type === 'group') {
          const children = item.raw.children || []
          count += children.length
        } else {
          count += 1
        }
      })
      return count
    })

    watch(() => props.items, () => {
      navigationStack.value = []
      search.value = ''
      selectedIndex.value = -1
      // Auto-select first item after items change
      if (selectableItemsCount.value > 0) {
        selectedIndex.value = 0
      }
    })

    watch(filteredActions, () => {
      const maxIndex = selectableItemsCount.value - 1
      if (selectedIndex.value > maxIndex) {
        selectedIndex.value = maxIndex >= 0 ? maxIndex : -1
      }
      // Auto-select first item when filtered results change
      if (selectedIndex.value === -1 && selectableItemsCount.value > 0) {
        selectedIndex.value = 0
      }
    })

    // Auto-select first item when component mounts and items are available
    onMounted(() => {
      if (selectableItemsCount.value > 0 && selectedIndex.value === -1) {
        selectedIndex.value = 0
      }
    })

    // Also watch for when items become available
    watch(selectableItemsCount, newCount => {
      if (newCount > 0 && selectedIndex.value === -1) {
        selectedIndex.value = 0
      }
    }, { immediate: true })

    // Register item-specific hotkeys when the palette is open
    const registerContentHotkeys = () => {
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
    }

    // Register hotkeys when component mounts and items change
    onMounted(() => {
      registerContentHotkeys()
    })

    watch(() => props.items, () => {
      registerContentHotkeys()
    })

    useHotkey('arrowup', e => {
      e.preventDefault()
      const maxIndex = selectableItemsCount.value - 1
      if (maxIndex < 0) return
      selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : maxIndex
    }, { inputs: true })

    useHotkey('arrowdown', e => {
      e.preventDefault()
      const maxIndex = selectableItemsCount.value - 1
      if (maxIndex < 0) return
      selectedIndex.value = selectedIndex.value < maxIndex ? selectedIndex.value + 1 : 0
    }, { inputs: true })

    useHotkey('enter', e => {
      if (selectedIndex.value < 0) {
        if (selectableItemsCount.value > 0) {
          selectedIndex.value = 0
        } else {
          return
        }
      }

      let selectableCount = 0
      for (const item of filteredActions.value) {
        const raw = item.raw
        if (raw?.type === 'parent') {
          if (selectableCount === selectedIndex.value) {
            onItemClickFromList(item, e)
            return
          }
          const children = raw.children || []
          const childrenStart = selectableCount + 1
          const childrenEnd = childrenStart + children.length - 1
          if (selectedIndex.value >= childrenStart && selectedIndex.value <= childrenEnd) {
            const childIndex = selectedIndex.value - childrenStart
            const child = children[childIndex]
            const [transformedChild] = transformItems(itemTransformationProps.value, [child])
            if (transformedChild) onItemClickFromList(transformedChild, e)
            return
          }
          selectableCount += 1 + children.length
        } else if (raw?.type === 'group') {
          const children = raw.children || []
          if (selectableCount + children.length > selectedIndex.value) {
            const childIndex = selectedIndex.value - selectableCount
            const child = children[childIndex]
            const [transformedChild] = transformItems(itemTransformationProps.value, [child])
            if (transformedChild) onItemClickFromList(transformedChild, e)
            return
          }
          selectableCount += children.length
        } else {
          if (selectableCount === selectedIndex.value) {
            onItemClickFromList(item, e)
            return
          }
          selectableCount += 1
        }
      }
    }, { inputs: true })

    async function doBackspace () {
      if (navigationStack.value.length > 0) {
        const previousFrame = navigationStack.value.pop()
        if (previousFrame) {
          selectedIndex.value = previousFrame.selected
        }
      }
    }

    useHotkey('backspace', e => {
      if (search.value) return
      e.preventDefault()
      doBackspace()
    }, { inputs: true, preventDefault: false })

    async function onItemClickFromList (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) {
      if (!item || !item.raw) return

      // Check if item has children and should navigate into them
      if (item.raw.children && Array.isArray(item.raw.children) && item.raw.children.length > 0) {
        navigationStack.value.push({ items: item.raw.children, selected: selectedIndex.value })
        search.value = ''
        selectedIndex.value = 0 // Auto-select first child
      } else {
        // Execute the item
        if (item.raw.handler && typeof item.raw.handler === 'function') {
          try {
            item.raw.handler(event, item.raw.value)
          } catch (error) {
            // Silently handle errors to avoid console spam in tests
          }
        }
        emit('click:item', item.raw, event)
        if (props.closeOnExecute) {
          emit('close')
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
        { slots.append?.({ search: readonly(search) }) }
      </>
    ))
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
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)

    useHotkey(toRef(props, 'hotkey'), () => {
      isActive.value = !isActive.value
    })

    useHotkey('escape', () => {
      if (isActive.value && !props.persistent) {
        isActive.value = false
      }
    }, { inputs: true })

    // Register global hotkeys for items at the main component level
    const registerItemHotkeys = () => {
      const allItems = props.items ?? []
      const processItems = (items: any[]) => {
        items.forEach(item => {
          if (item.hotkey && item.handler) {
            useHotkey(item.hotkey, e => {
              try {
                item.handler(e, item.value)
              } catch (error) {
                // Silently handle errors to avoid console spam in tests
              }
            })
          }
          if (item.children && Array.isArray(item.children)) {
            processItems(item.children)
          }
        })
      }
      processItems(allItems)
    }

    // Register hotkeys when items change
    watch(() => props.items, registerItemHotkeys, { immediate: true })

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
              <VSheet rounded class="v-command-palette__sheet">
                { isActive.value && (
                  <VCommandPaletteContent
                    { ...contentProps }
                    onClose={ onClose }
                    onClick:item={ onClickItem }
                    v-slots={ slots }
                  />
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
