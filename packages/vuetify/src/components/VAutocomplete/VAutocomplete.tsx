// Styles
import './VAutocomplete.sass'

// Components
import { genItem, makeSelectProps } from '@/components/VSelect/VSelect'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeTransitionProps } from '@/composables/transition'
import { useForwardRef } from '@/composables/forwardRef'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, nextTick, ref, watch } from 'vue'
import { genericComponent, useRender, wrapInArray } from '@/util'

// Types
import type { FilterMatch } from '@/composables/filter'
import type { DefaultChipSlot, InternalSelectItem } from '@/components/VSelect/VSelect'
import type { MakeSlots } from '@/util'

export interface InternalAutocompleteItem extends InternalSelectItem {

}

export interface DefaultAutocompleteSlot {
  selection: InternalAutocompleteItem
}

function highlightResult (text: string, matches: FilterMatch, length: number) {
  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented')

  return typeof matches === 'number' && ~matches
    ? (
      <>
        <span class="v-autocomplete__unmask">{ text.substr(0, matches) }</span>
        <span class="v-autocomplete__mask">{ text.substr(matches, length) }</span>
        <span class="v-autocomplete__unmask">{ text.substr(matches + length) }</span>
      </>
    )
    : text
}

export const VAutocomplete = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    chip: [DefaultChipSlot]
    default: []
    selection: [DefaultAutocompleteSlot]
  }>
}>()({
  name: 'VAutocomplete',

  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    search: String,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps(),
    ...makeTransitionProps({ transition: false }),
  },

  emits: {
    'click:clear': (e: MouseEvent) => true,
    'update:search': (val: any) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const activator = ref()
    const isFocused = ref(false)
    const isPristine = ref(true)
    const menu = ref(false)
    const items = computed(() => props.items.map(genItem))
    const search = useProxiedModel(props, 'search', '')
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => wrapInArray(v || []),
      (v: any) => props.multiple ? v : v[0]
    )
    const { filteredItems } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value))
    const selections = computed(() => {
      const array: InternalSelectItem[] = []
      let index = 0
      for (const unwrapped of model.value) {
        const item = genItem(unwrapped)

        const found = array.find(selection => selection.value === item.value)

        if (found == null) {
          array.push({
            ...item,
            index,
          })

          index++
        }
      }

      return array
    })
    const selected = computed(() => selections.value.map(selection => selection.value))

    function onClear (e: MouseEvent) {
      model.value = []

      if (props.openOnClear) {
        menu.value = true
      }

      search.value = ''
    }
    function onClickControl () {
      if (props.hideNoData && !filteredItems.value.length) return

      menu.value = true
    }
    function onKeydown (e: KeyboardEvent) {
      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false
      }

      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        isPristine.value = true
      }
    }
    function onAfterLeave () {
      if (isFocused.value) isPristine.value = true
    }
    const isSelecting = ref(false)
    function select (item: any) {
      if (props.multiple) {
        const index = selections.value.findIndex(selection => selection.value === item.value)

        if (index === -1) {
          model.value.push(item.value)
        } else {
          model.value = selected.value.filter(selection => selection !== item.value)
        }
      } else {
        model.value = [item.value]

        isSelecting.value = true

        search.value = item.title
        menu.value = false
        isPristine.value = true

        nextTick(() => (isSelecting.value = false))
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control')
    })

    watch(isFocused, val => {
      if (val) {
        isSelecting.value = true
        search.value = props.multiple ? '' : String(model.value ?? '')
        isPristine.value = true

        nextTick(() => isSelecting.value = false)
      } else {
        menu.value = false
        search.value = ''
      }
    })

    watch(search, val => {
      if (!isFocused.value || isSelecting.value) return

      if (val) menu.value = true

      isPristine.value = !val
    })

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)

      return (
        <VTextField
          ref={ vTextFieldRef }
          v-model={ search.value }
          class={[
            'v-autocomplete',
            {
              'v-autocomplete--active-menu': menu.value,
              'v-autocomplete--chips': !!props.chips,
              [`v-autocomplete--${props.multiple ? 'multiple' : 'single'}`]: true,
            },
          ]}
          appendInnerIcon={ props.menuIcon }
          dirty={ selected.value.length > 0 }
          onClick:clear={ onClear }
          onClick:control={ onClickControl }
          onClick:input={ onClickControl }
          onFocus={ () => isFocused.value = true }
          onBlur={ () => isFocused.value = false }
          onKeydown={ onKeydown }
        >
          {{
            ...slots,
            default: () => (
              <>
                { activator.value && (
                  <VMenu
                    v-model={ menu.value }
                    activator={ activator.value }
                    contentClass="v-autocomplete__content"
                    eager={ props.eager }
                    openOnClick={ false }
                    transition={ props.transition }
                    onAfterLeave={ onAfterLeave }
                  >
                    <VList
                      selected={ selected.value }
                      selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                    >
                      { !filteredItems.value.length && !props.hideNoData && (
                        <VListItem title={ t(props.noDataText) } />
                      ) }

                      { filteredItems.value.map(({ item, matches }) => (
                        <VListItem
                          value={ item.value }
                          onMousedown={ (e: MouseEvent) => e.preventDefault() }
                          onClick={ () => select(item) }
                        >
                          {{
                            title: () => {
                              return isPristine.value
                                ? item.title
                                : highlightResult(item.title, matches.title, search.value?.length ?? 0)
                            },
                          }}
                        </VListItem>
                      )) }
                    </VList>
                  </VMenu>
                ) }
                  { selections.value.map((selection, index) => {
                    function onChipClose (e: Event) {
                      e.stopPropagation()
                      e.preventDefault()

                      select(selection)
                    }

                    const slotProps = {
                      'onClick:close': onChipClose,
                      modelValue: true,
                    }

                    return (
                      <div class="v-autocomplete__selection">
                        { hasChips && (
                          <VDefaultsProvider
                            defaults={{
                              VChip: {
                                closable: props.closableChips,
                                size: 'small',
                                text: selection.title,
                              },
                            }}
                          >
                            { slots.chip
                              ? slots.chip({ props: slotProps, selection })
                              : (<VChip { ...slotProps } />)
                            }
                          </VDefaultsProvider>
                        ) }

                        { !hasChips && (
                          slots.selection
                            ? slots.selection({ selection })
                            : (
                              <span class="v-autocomplete__selection-text">
                                { selection.title }
                                { props.multiple && (index < selections.value.length - 1) && (
                                  <span class="v-autocomplete__selection-comma">,</span>
                                ) }
                              </span>
                            )
                        ) }
                      </div>
                    )
                  }) }
              </>
            ),
          }}
        </VTextField>
      )
    })

    return useForwardRef({
      filteredItems,
    }, vTextFieldRef)
  },
})

export type VAutocomplete = InstanceType<typeof VAutocomplete>
