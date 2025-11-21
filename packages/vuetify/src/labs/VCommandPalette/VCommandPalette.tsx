/**
 * VCommandPalette Component
 *
 * A keyboard-driven command palette component that provides a searchable
 * dialog interface for executing commands and actions.
 */

// Components
import { VCard, VCardText } from '@/components/VCard'
import { VDialog } from '@/components/VDialog'
import { VList } from '@/components/VList'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeFilterProps } from '@/composables/filter'
import { useHotkey } from '@/composables/hotkey'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { computed, nextTick, ref, shallowRef, watch, watchEffect } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref, VNode } from 'vue'

// Internal
import { provideCommandPaletteContext } from './composables/useCommandPaletteContext'
import { useCommandPaletteNavigation } from './composables/useCommandPaletteNavigation'
import { isActionItem } from './types'

// Types
import type { VCommandPaletteItem as VCommandPaletteItemType } from './types'

// Internal
import { VCommandPaletteItemComponent } from './VCommandPaletteItem'

export const makeVCommandPaletteProps = propsFactory({
  // === Model/State ===
  modelValue: Boolean,
  search: String,

  // === Items & Content ===
  items: {
    type: Array as PropType<VCommandPaletteItemType[]>,
    default: () => [],
  },

  // === Search/Filter Props ===
  ...makeFilterProps({
    filterKeys: ['title', 'subtitle'],
  }),

  // === UX Props ===
  placeholder: String,
  hotkey: String,
  noDataText: String,

  // === Dialog Props (first-class) ===
  location: String,
  activator: [String, Object],
  dialogProps: Object as PropType<Record<string, any>>,

  // === Appearance Props ===
  ...makeThemeProps(),
  ...makeDensityProps(),
  ...makeTransitionProps(),
}, 'VCommandPalette')

/**
 * VCommandPalette Component
 */
export const VCommandPalette = genericComponent()({
  name: 'VCommandPalette',

  props: makeVCommandPaletteProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    'update:search': (value: string) => true,
    'click:item': (item: VCommandPaletteItemType, event: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()

    // Dialog state
    const isOpen = useProxiedModel(props, 'modelValue')
    const searchQuery = useProxiedModel(props, 'search') as Ref<string>

    // Theme and density
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)

    // Refs for focus management
    const searchInputRef = ref<InstanceType<typeof VTextField>>()
    const dialogRef = ref<InstanceType<typeof VDialog>>()
    const previouslyFocusedElement = shallowRef<HTMLElement | null>(null)

    /**
     * Simple filter implementation for MVP
     * Filters items based on search query matching title and subtitle
     */
    const filteredItems = computed(() => {
      if (!searchQuery.value || !searchQuery.value.trim()) {
        return props.items
      }

      const query = searchQuery.value.toLowerCase()

      return props.items.filter(item => {
        const titleMatch = 'title' in item && item.title && String(item.title).toLowerCase().includes(query)
        const subtitleMatch = 'subtitle' in item && item.subtitle && String(item.subtitle).toLowerCase().includes(query)
        return titleMatch || subtitleMatch
      })
    })

    /**
     * Prepare items for VList with proper value assignment
     * VList's items prop enables automatic activation and scroll-to-active
     */
    const itemsForList = computed(() => {
      return filteredItems.value.map((item, idx) => ({
        ...item,
        value: idx,
      }))
    })

    /**
     * Initialize navigation composable
     */
    const navigation = useCommandPaletteNavigation({
      filteredItems,
      onItemClick: (item, event) => {
        if ('onClick' in item && item.onClick) {
          item.onClick(event, item.value)
        }
        emit('click:item', item, event)
        isOpen.value = false
      },
    })

    /**
     * Provide context for future custom layout support
     */
    provideCommandPaletteContext({
      items: computed(() => props.items),
      filteredItems,
      selectedIndex: navigation.selectedIndex,
      activeDescendantId: navigation.activeDescendantId,
      search: searchQuery,
      setSelectedIndex: navigation.setSelectedIndex,
    })

    /**
     * Register global hotkey to toggle palette
     */
    if (props.hotkey) {
      useHotkey(props.hotkey, () => {
        isOpen.value = !isOpen.value
      })
    }

    /**
     * Register item-level hotkeys (only when palette is open)
     */
    watchEffect(onCleanup => {
      if (!isOpen.value) {
        return
      }

      const hotkeyUnsubscribes: Array<() => void> = []

      function registerItemHotkeys (items: VCommandPaletteItemType[]) {
        items.forEach(item => {
          if (isActionItem(item) && item.hotkey) {
            const unsubscribe = useHotkey(item.hotkey, event => {
              event.preventDefault()
              if (item.onClick) {
                item.onClick(event as KeyboardEvent, item.value)
              }
              emit('click:item', item, event as KeyboardEvent)
              isOpen.value = false
            }, { inputs: true })
            hotkeyUnsubscribes.push(unsubscribe)
          }
        })
      }

      registerItemHotkeys(props.items)

      onCleanup(() => {
        hotkeyUnsubscribes.forEach(unsubscribe => unsubscribe?.())
      })
    })

    /**
     * Handle dialog open/close for focus management
     */
    watch(isOpen, (newValue, oldValue) => {
      if (newValue && !oldValue) {
        previouslyFocusedElement.value = document.activeElement as HTMLElement | null
        searchQuery.value = ''
        navigation.reset()

        // Auto-select first item
        nextTick(() => {
          navigation.setSelectedIndex(0)
          const input = searchInputRef.value?.$el?.querySelector('input')
          if (input) {
            input.focus()
          }
        })
      } else if (!newValue && oldValue) {
        nextTick(() => {
          previouslyFocusedElement.value?.focus({ preventScroll: true })
          previouslyFocusedElement.value = null
        })
      }
    })

    /**
     * Compute merged dialog props
     */
    const computedDialogProps = computed(() => {
      const baseProps: Record<string, any> = {
        modelValue: isOpen.value,
        'onUpdate:modelValue': (v: boolean) => {
          isOpen.value = v
        },
        scrollable: true,
        ...(props.dialogProps || {}),
      }

      if (props.location) {
        baseProps.location = props.location
      }
      if (props.activator) {
        baseProps.activator = props.activator
      }

      return baseProps
    })

    useRender((): VNode => (
      <VDialog
        ref={ dialogRef }
        { ...computedDialogProps.value }
        class="v-command-palette"
      >
        {{
          default: () => (
            <VCard
              class={[
                themeClasses.value,
                densityClasses.value,
              ]}
            >
              { /* @ts-expect-error slots type is inferred as 'default' only */ }
              { (slots.prepend as any)?.() }

              <div class="px-4 py-2">
                <VTextField
                  ref={ searchInputRef }
                  v-model={ searchQuery.value }
                  placeholder={ props.placeholder || t('$vuetify.command.search') }
                  prependInnerIcon="mdi-magnify"
                  singleLine
                  hideDetails
                  variant="solo"
                  flat
                  bgColor="transparent"
                />
              </div>

              <VCardText class="pa-0">
                { filteredItems.value.length > 0 ? (
                  <VList
                    key="list"
                    class="v-command-palette__list"
                    items={ itemsForList.value }
                    itemType="type"
                    activatable
                    navigationStrategy="track"
                    navigationIndex={ navigation.selectedIndex.value }
                    onUpdate:navigationIndex={ navigation.setSelectedIndex }
                    role="listbox"
                    aria-label={ `${filteredItems.value.length} options available` }
                    aria-activedescendant={ navigation.activeDescendantId.value }
                    v-slots={{
                      item: ({ item, index }: any) => (
                        <VCommandPaletteItemComponent
                          key={ `item-${index}` }
                          item={ item.raw }
                          index={ index }
                          onExecute={ (event: any) => {
                            navigation.executeSelected(event)
                          }}
                        />
                      ),
                      divider: ({ item, index }: any) => (
                        <VCommandPaletteItemComponent
                          key={ `divider-${index}` }
                          item={ item.raw }
                          index={ index }
                        />
                      ),
                      subheader: ({ item, index }: any) => (
                        <VCommandPaletteItemComponent
                          key={ `subheader-${index}` }
                          item={ item.raw }
                          index={ index }
                        />
                      ),
                    }}
                  />
                ) : (
                  <div key="no-data" class="pa-4 text-center text-disabled">
                    { /* @ts-expect-error slots type is inferred as 'default' only */ }
                    { (slots['no-data'] as any)?.() || (props.noDataText || t('$vuetify.noDataText')) }
                  </div>
                )}
              </VCardText>

              { /* @ts-expect-error slots type is inferred as 'default' only */ }
              { (slots.append as any)?.() }
            </VCard>
          ),
        }}
      </VDialog>
    ))
  },
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>
