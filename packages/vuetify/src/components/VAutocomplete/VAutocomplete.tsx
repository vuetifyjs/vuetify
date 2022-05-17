// Styles
import './VAutocomplete.sass'

// Components
import { makeSelectProps } from '@/components/VSelect/VSelect'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeTransitionProps } from '@/composables/transition'
import { InternalItem, transformItem, useItems } from '@/composables/items'
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
    const { items, transformIn, transformOut } = useItems(props)
    const search = useProxiedModel(props, 'search', '')
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => transformIn(wrapInArray(v)),
      v => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : transformed[0]
      }
    )
    const { filteredItems } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value))
    const selections = computed(() => {
      const array: InternalItem[] = Array(model.value.length)

      const indices = model.value.reduce((obj, value, index) => {
        obj[value] = index
        return obj
      }, {} as Record<any, number>)

      for (const item of items.value) {
        const index = indices[item.props.value]

        if (index != null) array.splice(index, 1, item)
      }

      return array
    })
    const selected = computed(() => selections.value.map(selection => selection.props.value))

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
    function onInput (e: InputEvent) {
      search.value = (e.target as HTMLInputElement).value
    }
    function onAfterLeave () {
      if (isFocused.value) isPristine.value = true
    }
    const isSelecting = ref(false)
    function select (item: any) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => selection === item.props.value)

        if (index === -1) {
          model.value = [...model.value, item.props.value]
          search.value = ''
        } else {
          const value = [...model.value]
          value.splice(index, 1)
          model.value = value
        }
      } else {
        model.value = [item.props.value]

        isSelecting.value = true

        search.value = item.props.title
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
          modelValue={ search.value }
          onInput={ onInput }
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
                      { !filteredItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                        <VListItem title={ t(props.noDataText) } />
                      )) }

                      { filteredItems.value.map(({ item, matches }) => (
                        <VListItem
                          { ...item.props }
                          onMousedown={ (e: MouseEvent) => e.preventDefault() }
                          onClick={ () => select(item) }
                        >
                          {{
                            title: () => {
                              return isPristine.value
                                ? item.props.title
                                : highlightResult(item.props.title, matches.title, search.value?.length ?? 0)
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
                                text: selection.props.title,
                              },
                            }}
                          >
                            { slots.chip
                              ? slots.chip({ props: slotProps, item: selection.item })
                              : (<VChip { ...slotProps } />)
                            }
                          </VDefaultsProvider>
                        ) }

                        { !hasChips && (
                          slots.selection
                            ? slots.selection({ item: selection.item })
                            : (
                              <span class="v-autocomplete__selection-text">
                                { selection.props.title }
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
