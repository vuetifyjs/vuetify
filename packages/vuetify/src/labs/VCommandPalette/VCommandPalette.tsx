// Styles
import './VCommandPalette.scss'

// Components
import { VActionHotkey } from './VActionHotkey'
import { VCommandPaletteInstructions } from './VCommandPaletteInstructions'
import { VCommandPaletteList } from './VCommandPaletteList'
import { VCommandPaletteSearch } from './VCommandPaletteSearch'
import { VCard } from '@/components/VCard'
import { VDialog } from '@/components/VDialog'
import { makeVDialogProps } from '@/components/VDialog/VDialog'
import { VDivider } from '@/components/VDivider'

// Composables
import { useHotkey } from './useHotkey'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeItemsProps, transformItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { computed, ref, toRef, watch } from 'vue'
import { EventProp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Ref } from 'vue'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'

// VCommandPalette's own slot scope/type definitions
export type VCommandPaletteItemRenderScope = {
  item: any
  props: Record<string, any>
}

export type VCommandPaletteSlots = {
  search: { modelValue: string }
  item: VCommandPaletteItemRenderScope
  'no-data': never
  header: VCommandPaletteHeaderSlotScope
  footer: VCommandPaletteFooterSlotScope
  'prepend-item': never
  'append-item': never
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
  modelValue: Boolean,
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

    const selectedIndex = ref(-1)
    const navigationStack = ref<any[][]>([])
    const search = ref('')
    const currentRawActions = ref<any[]>(props.items ?? [])

    watch(() => props.items, newItems => {
      currentRawActions.value = newItems ?? []
      navigationStack.value = []
      search.value = ''
    }, { deep: true })

    const itemTransformationProps = computed(() => ({
      itemTitle: props.itemTitle,
      itemValue: props.itemValue,
      itemChildren: props.itemChildren,
      itemProps: props.itemProps,
      returnObject: props.returnObject,
      valueComparator: props.valueComparator,
    }))

    const processedCurrentActions = computed(() => transformItems(itemTransformationProps.value, currentRawActions.value))
    const { filteredItems: filteredActions } = useFilter(props, processedCurrentActions, search)

    watch(filteredActions, () => {
      selectedIndex.value = -1
    })

    // --- Hotkey Registration ---
    useHotkey(toRef(props, 'hotkey'), e => {
      isActive.value = !isActive.value
    })
    useHotkey('arrowup', e => {
      if (!isActive.value) return
      selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : filteredActions.value.length - 1
    }, { inputs: true })
    useHotkey('arrowdown', e => {
      if (!isActive.value) return
      selectedIndex.value = selectedIndex.value < filteredActions.value.length - 1 ? selectedIndex.value + 1 : 0
    }, { inputs: true })
    useHotkey('enter', e => {
      if (!isActive.value) return
      if (selectedIndex.value >= 0 && filteredActions.value[selectedIndex.value]) {
        onItemClickFromList(filteredActions.value[selectedIndex.value], e)
      }
    }, { inputs: true })
    useHotkey('escape', e => {
      if (!isActive.value) return
      if (navigationStack.value.length > 0) {
        currentRawActions.value = navigationStack.value.pop()!
        search.value = ''
      } else {
        isActive.value = false
      }
    }, { inputs: true })
    useHotkey('backspace', e => {
      if (!isActive.value || search.value) return
      e.preventDefault()
      if (navigationStack.value.length > 0) {
        currentRawActions.value = navigationStack.value.pop()!
      }
    }, { inputs: true, preventDefault: false })

    function onAfterEnter () {
      emit('afterEnter')
    }
    function onAfterLeave () {
      emit('afterLeave')
    }

    function onItemClickFromList (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) {
      if (item.raw?.children && item.raw.children.length > 0) {
        navigationStack.value.push(currentRawActions.value)
        currentRawActions.value = item.raw.children
        search.value = ''
      } else {
        emit('click:item', item.raw, event)
        if (props.closeOnExecute) {
          isActive.value = false
        }
      }
    }

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
              <VCard>
                { actionHotkeys.value.map(item => <VActionHotkey key={ item.value } item={ item } onExecute={ onItemClickFromList } />) }

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
                    'prepend-item': slots['prepend-item'],
                    'append-item': slots['append-item'],
                  }}
                </VCommandPaletteList>

                { slots.footer ? slots.footer(footerSlotScope.value) : (
                  <VCommandPaletteInstructions
                    hasItems={ footerSlotScope.value.hasItems }
                    hasParent={ footerSlotScope.value.hasParent }
                    hasSelection={ footerSlotScope.value.hasSelection }
                  />
                )}
              </VCard>
            ),
          }}
        />
      )
    })
  },
})
