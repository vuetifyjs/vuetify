// Components
import { VCard, VCardText } from '@/components/VCard'
import { VDialog } from '@/components/VDialog'
import { VList } from '@/components/VList'
import { VTextField } from '@/components/VTextField'

// Composables
import { provideCommandPaletteContext } from './composables/useCommandPaletteContext'
import { useCommandPaletteNavigation } from './composables/useCommandPaletteNavigation'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeFilterProps, useFilter } from '@/composables/filter'
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
import type { VCommandPaletteItem as VCommandPaletteItemType } from './types'
import { isActionItem } from './types'
import { VCommandPaletteItemComponent } from './VCommandPaletteItem'

export const makeVCommandPaletteProps = propsFactory({
  modelValue: Boolean,
  search: String,
  items: {
    type: Array as PropType<VCommandPaletteItemType[]>,
    default: () => [],
  },
  placeholder: String,
  hotkey: String,
  noDataText: String,
  location: String,
  activator: [String, Object],
  dialogProps: Object as PropType<Record<string, any>>,

  ...makeFilterProps({ filterKeys: ['title', 'subtitle'] }),
  ...makeThemeProps(),
  ...makeDensityProps(),
  ...makeTransitionProps(),
}, 'VCommandPalette')

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
    const isOpen = useProxiedModel(props, 'modelValue')
    const searchQuery = useProxiedModel(props, 'search') as Ref<string>
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const searchInputRef = ref<InstanceType<typeof VTextField>>()
    const dialogRef = ref<InstanceType<typeof VDialog>>()
    const previouslyFocusedElement = shallowRef<HTMLElement | null>(null)

    const internalItems = computed(() =>
      props.items.map((item, index) => ({ value: index, raw: item }))
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

    provideCommandPaletteContext({
      items: computed(() => props.items),
      filteredItems,
      selectedIndex: navigation.selectedIndex,
      search: searchQuery,
      setSelectedIndex: navigation.setSelectedIndex,
    })

    if (props.hotkey) {
      useHotkey(props.hotkey, () => {
        isOpen.value = !isOpen.value
      })
    }

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

        nextTick(() => {
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
                  onKeydown={ handleSearchKeydown }
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
                    v-slots={{
                      item: ({ props }: { props: any }) => (
                        <VCommandPaletteItemComponent
                          key={ `item-${props.index}` }
                          item={ props }
                          index={ props.index }
                          onExecute={ navigation.executeSelected }
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
