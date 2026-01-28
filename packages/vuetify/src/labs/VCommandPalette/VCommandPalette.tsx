// Styles
import './VCommandPalette.scss'

// Components
import { VCommandPaletteSymbol } from './shared'
import { VCommandPaletteItemComponent } from './VCommandPaletteItem'
import { VDialog } from '@/components/VDialog'
import { makeVDialogProps } from '@/components/VDialog/VDialog'
import { VList } from '@/components/VList'
import { VSheet } from '@/components/VSheet'
import { VTextField } from '@/components/VTextField'

// Composables
import { useCommandPaletteNavigation } from './composables/useCommandPaletteNavigation'
import { makeDensityProps } from '@/composables/density'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useHotkey } from '@/composables/hotkey'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, onUnmounted, provide, ref, shallowRef, toRef, watch, watchEffect } from 'vue'
import { isActionItem } from './types'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { VCommandPaletteItem as VCommandPaletteItemType } from './types'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVCommandPaletteProps = propsFactory({
  modelValue: Boolean,
  search: String,
  items: {
    type: Array as PropType<VCommandPaletteItemType[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '$vuetify.command.search',
  },
  inputIcon: {
    type: String,
    default: '$search',
  },
  hotkey: String,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  listProps: Object as PropType<VList['$props']>,

  ...makeFilterProps({ filterKeys: ['title', 'subtitle'] }),
  ...makeDensityProps(),
  ...omit(makeVDialogProps({ maxWidth: 500 }), ['modelValue']),
}, 'VCommandPalette')

export type VCommandPaletteSlots = {
  activator: OverlaySlots['activator']
  default: never
  prepend: never
  append: never
  input: never
  'no-data': never
}

export const VCommandPalette = genericComponent<VCommandPaletteSlots>()({
  name: 'VCommandPalette',

  props: makeVCommandPaletteProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    'update:search': (value: string) => true,
    'click:item': (item: VCommandPaletteItemType, event: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const isOpen = useProxiedModel(props, 'modelValue')
    const searchQuery = useProxiedModel(props, 'search') as Ref<string>
    const searchInputRef = ref<VTextField>()
    const dialogRef = ref<VDialog>()
    const previouslyFocusedElement = shallowRef<HTMLElement | null>(null)

    const internalItems = computed(() =>
      props.items.map((item, index) => ({
        value: index,
        type: item.type,
        raw: item,
        ...('title' in item && { title: item.title }),
        ...('subtitle' in item && { subtitle: item.subtitle }),
      }))
    )

    const { filteredItems: filterResult } = useFilter(props, internalItems, searchQuery)

    const filteredItems = computed(() => filterResult.value.map(item => item.raw))

    const itemsForList = computed(() => {
      return filteredItems.value.map((item, idx) => ({
        ...item,
        value: idx,
      }))
    })

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

    provide(VCommandPaletteSymbol, {
      items: computed(() => props.items),
      filteredItems,
      selectedIndex: navigation.selectedIndex,
      search: searchQuery,
      setSelectedIndex: navigation.setSelectedIndex,
    })

    // Register main hotkey with cleanup - using toRef for reactivity
    const hotkeyUnsubscribe = useHotkey(toRef(props, 'hotkey'), () => {
      isOpen.value = !isOpen.value
    })

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

    function findNextSelectableIndex (startIndex: number, direction: 1 | -1): number {
      const items = filteredItems.value
      if (items.length === 0) return -1

      let index = startIndex
      const maxIterations = items.length

      for (let i = 0; i < maxIterations; i++) {
        index += direction
        if (index >= items.length) index = 0
        if (index < 0) index = items.length - 1

        if (isActionItem(items[index])) {
          return index
        }
      }

      return -1
    }

    function handleSearchKeydown (e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          const nextIndex = findNextSelectableIndex(navigation.selectedIndex.value, 1)
          if (nextIndex !== -1) {
            navigation.setSelectedIndex(nextIndex)
          }
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prevIndex = findNextSelectableIndex(navigation.selectedIndex.value, -1)
          if (prevIndex !== -1) {
            navigation.setSelectedIndex(prevIndex)
          }
          break
        }
        case 'Enter':
          e.preventDefault()
          navigation.executeSelected(e)
          break
        case 'Escape':
          e.preventDefault()
          isOpen.value = false
          break
      }
    }

    watch(isOpen, (newValue, oldValue) => {
      if (newValue && !oldValue) {
        previouslyFocusedElement.value = document.activeElement as HTMLElement | null
        searchQuery.value = ''
        navigation.reset()

        // Use requestAnimationFrame to ensure DOM is fully rendered
        nextTick(() => {
          requestAnimationFrame(() => {
            if (searchInputRef.value && typeof searchInputRef.value.focus === 'function') {
              searchInputRef.value.focus()
            }
          })
        })
      } else if (!newValue && oldValue) {
        nextTick(() => {
          previouslyFocusedElement.value?.focus({ preventScroll: true })
          previouslyFocusedElement.value = null
        })
      }
    }, { immediate: true })

    onUnmounted(() => {
      hotkeyUnsubscribe()
      previouslyFocusedElement.value = null
    })

    useRender(() => {
      const dialogProps = VDialog.filterProps(omit(props, ['modelValue', 'class', 'style']))

      return (
        <VDialog
          ref={ dialogRef }
          class="v-command-palette"
          v-model={ isOpen.value }
          scrollable
          { ...dialogProps }
        >
          {{
            activator: slots.activator,
            default: () => (
              <VSheet
                class={ props.class }
                style={ props.style }
              >
                { slots.prepend?.() }

              <div class="v-command-palette__input-container">
                { slots.input?.() ?? (
                  <VTextField
                    ref={ searchInputRef }
                    v-model={ searchQuery.value }
                    density={ props.density }
                    placeholder={ t(props.placeholder) }
                    prependInnerIcon={ props.inputIcon }
                    autocomplete="off"
                    autofocus
                    singleLine
                    hideDetails
                    variant="solo"
                    flat
                    bgColor="transparent"
                    onKeydown={ handleSearchKeydown }
                  />
                )}
              </div>

                <div class="v-command-palette__content">
                  { filteredItems.value.length > 0 ? (
                    <VList
                      key="list"
                      class="v-command-palette__list"
                      density={ props.density }
                      items={ itemsForList.value }
                      itemType="type"
                      itemProps
                      activatable
                      { ...props.listProps }
                      navigationStrategy="track"
                      navigationIndex={ navigation.selectedIndex.value }
                      onUpdate:navigationIndex={ navigation.setSelectedIndex }
                      v-slots={{
                        item: ({ props }: { props: any }) => (
                          <VCommandPaletteItemComponent
                            key={ `item-${props.index}` }
                            item={ props }
                            index={ props.index }
                            onExecute={ (event: MouseEvent | KeyboardEvent) => navigation.execute(props.index, event) }
                          />
                        ),
                      }}
                    />
                  ) : (
                    <div key="no-data" class="v-command-palette__no-data">
                      { slots['no-data']?.() || t(props.noDataText) }
                    </div>
                  )}
                </div>

                { slots.append?.() }
              </VSheet>
            ),
          }}
        </VDialog>
      )
    })
  },
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>
