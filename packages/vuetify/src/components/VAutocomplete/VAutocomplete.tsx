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
import { useForwardRef } from '@/composables/forwardRef'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, ref, watch } from 'vue'
import { genericComponent, useRender, wrapInArray } from '@/util'

// Types
import type { FilterMatch } from '@/composables/filter'
import type { MakeSlots } from '@/util'

export interface DefaultSelectionSlot {
  selection: {
    active: boolean
    text: string
    value: any
  }
}

export interface DefaultChipSlot extends DefaultSelectionSlot {
  props: {
    'onClick:close': (e: Event) => void
    modelValue: any
  }
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
    selection: [DefaultSelectionSlot]
  }>
}>()({
  name: 'VAutocomplete',

  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    search: String,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps({ menuIcon: '' }),
    ...makeTransitionProps({ transition: false } as const),
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
    const search = useProxiedModel(props, 'search', '')
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => wrapInArray(v || []),
      (v: any) => props.multiple ? v : v[0]
    )
    const menu = ref(false)
    const active = computed({
      get: () => model.value,
      set: val => {
        model.value = val

        if (props.multiple) return

        menu.value = false
        isPristine.value = true
      },
    })
    const items = computed(() => {
      const array = []

      for (const item of props.items as any) {
        const title = item?.title ?? String(item)
        const value = item?.value ?? item
        const active = model.value.includes(value)

        if (props.hideSelected && active) continue

        array.push({
          active,
          title,
          value,
        })
      }

      return array
    })
    const selections = computed(() => {
      return model.value.map(value => {
        return items.value.find(item => item.value === value)
      })
    })
    const searchValue = computed(() => isPristine.value ? undefined : search.value)
    const { filteredItems } = useFilter(props, items, searchValue)

    function onClear (e: MouseEvent) {
      model.value = []

      if (props.openOnClear) {
        menu.value = true
      }

      search.value = undefined
    }
    function onClickControl () {
      if (props.hideNoData && !filteredItems.value.length) return

      menu.value = true
    }
    function onKeydown (e: KeyboardEvent) {
      if (
        ['Enter', ' '].includes(e.key) &&
        !menu.value
      ) {
        menu.value = true
      } else if (
        e.key === 'Escape' &&
        menu.value
      ) {
        menu.value = false
      } else if (
        !e.ctrlKey &&
        !e.shiftKey
      ) {
        isPristine.value = false
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control')
    })

    watch(() => active.value, () => {
      if (!isFocused.value || props.multiple) return

      search.value = selections.value[0]?.title
    })

    watch(() => searchValue.value, () => {
      if (!isFocused.value) return

      if (props.hideNoData && !filteredItems.value.length) {
        menu.value = false
      } else {
        menu.value = true
      }
    })

    watch(() => isFocused.value, val => {
      isPristine.value = true

      if (val && !props.multiple) {
        search.value = selections.value[0]?.title
      } else if (!val) {
        search.value = ''
        menu.value = false
      }
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
          dirty={ model.value.length > 0 }
          onClick:clear={ onClear }
          onClick:control={ onClickControl }
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
                  >
                    <VList
                      v-model:active={ active.value }
                      activeStrategy={ props.multiple ? 'multiple' : 'single' }
                    >
                      { !filteredItems.value.length && !props.hideNoData && (
                        <VListItem title={ t(props.noDataText) } />
                      )}

                      { filteredItems.value.map(({ item, matches }) => (
                        <VListItem
                          value={ item.value }
                          onMousedown={ (e: MouseEvent) => e.preventDefault() }
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

                <div class="v-autocomplete__selections v-field__input">
                  { selections.value.map((selection, index) => {
                    const active = selection?.active
                    const title = selection?.title
                    const value = selection?.value

                    function onChipClose (e: Event) {
                      e.stopPropagation()
                      e.preventDefault()

                      model.value = model.value.filter(item => item !== value)
                    }

                    const slotProps = {
                      'onClick:close': onChipClose,
                      modelValue: active,
                    }

                    return (
                      <VDefaultsProvider
                        defaults={{
                          VChip: {
                            closable: props.closableChips,
                            size: 'small',
                            text: title,
                          },
                        }}
                      >
                        <div class="v-autocomplete__selection">
                          { hasChips
                            ? slots.chip
                              ? slots.chip({ props: slotProps, selection })
                              : (<VChip { ...slotProps } />)
                            : slots.selection
                              ? slots.selection({ selection })
                              : (
                                <span class="v-autocomplete__selection-text">
                                  { title }
                                  { index < model.value.length - 1 && (
                                    <span class="v-autocomplete__selection-comma">,</span>
                                  ) }
                                </span>
                              )
                          }
                        </div>
                      </VDefaultsProvider>
                    )
                  }) }
                </div>
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
