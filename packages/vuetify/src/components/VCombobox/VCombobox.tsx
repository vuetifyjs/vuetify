// Styles
import './VCombobox.sass'

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
import { computed, ComputedRef, ref, watch } from 'vue'
import { genericComponent, useRender, wrapInArray } from '@/util'

// Types
import type { FilterMatch } from '@/composables/filter'
import type { MakeSlots } from '@/util'

export interface DefaultSelectionSlot {
  selection: {
    selected: boolean
    title: string
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
        <span class="v-combobox__unmask">{ text.substr(0, matches) }</span>
        <span class="v-combobox__mask">{ text.substr(matches, length) }</span>
        <span class="v-combobox__unmask">{ text.substr(matches + length) }</span>
      </>
    )
    : text
}

function genItem (item: any) {
  return {
    title: String((typeof item === 'object' ? item.title : item) ?? ''),
    value: (typeof item === 'object' ? item.value : item),
  }
}

export const VCombobox = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    chip: [DefaultChipSlot]
    default: []
    selection: [DefaultSelectionSlot]
  }>
}>()({
  name: 'VCombobox',

  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    // hideNoData: {
    //   type: Boolean,
    //   default: true,
    // },
    // items: {
    //   type: Array as PropType<VComboboxItem[]>,
    //   default: () => ([]),
    // },
    // modelValue: {
    //   type: [Number, String, Array] as PropType<VComboboxItem | VComboboxItem[]>,
    //   default: () => ([]),
    // },
    // multiple: Boolean,
    search: String,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps({ menuIcon: '' }),
    ...makeTransitionProps({ transition: false } as const),

    hideNoData: {
      type: Boolean,
      default: true,
    },
  },

  emits: {
    'click:clear': (e: MouseEvent) => true,
    'update:search': (val: any) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { emit, slots }) {
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
    const items = computed(() => {
      return (props.items || []).map((item: string | Record<string, any>) => {
        return genItem(item)
      })
    })
    const selections = computed(() => {
      const array: any[] = []

      for (const value of wrapInArray(model.value)) {
        const obj = genItem(value)
        const found = array.find(selection => selection === obj.value)

        if (found != null) array.push(obj.value)
      }

      return array
    })
    const searchValue = computed(() => isPristine.value ? undefined : search.value)
    const { filteredItems } = useFilter(props, items, searchValue)

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
      if (
        ['Enter'].includes(e.key) &&
        filteredItems.value.length === 0 &&
        search.value != null
      ) {
        if (props.multiple) {
          model.value = [
            ...wrapInArray(model.value),
            search.value,
          ]
          search.value = ''
        } else {
          model.value = [search.value]
        }
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control')
    })

    watch(model, val => {
      const value = String(val[0] ?? '')

      search.value = value
    })

    watch(menu, val => {
      if (!val) isPristine.value = true
    })

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)

      return (
        <VTextField
          ref={ vTextFieldRef }
          modelValue={ search.value }
          class={[
            'v-combobox',
            {
              'v-combobox--active-menu': menu.value,
              'v-combobox--chips': !!props.chips,
              [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true,
            },
          ]}
          dirty={ !!search.value || model.value.length > 0 }
          onUpdate:modelValue={ val => {
            if (!isFocused.value) return

            const value = val ? [val] : []

            if (value) {
              isPristine.value = false
            }

            model.value = value
          } }
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
                    contentClass="v-combobox__content"
                    eager={ props.eager }
                    openOnClick={ false }
                    transition={ props.transition }
                  >
                    <VList
                      v-model:selected={ model.value }
                      selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
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
                  { selections.value.map((selection, index) => {
                    const selected = selection?.selected
                    const title = selection?.title
                    const value = selection?.value

                    function onChipClose (e: Event) {
                      e.stopPropagation()
                      e.preventDefault()

                      model.value = model.value.filter(item => item !== value)
                    }

                    const slotProps = {
                      'onClick:close': onChipClose,
                      modelValue: selected,
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
                        <div class="v-combobox__selection">
                          { hasChips
                            ? slots.chip
                              ? slots.chip({ props: slotProps, selection })
                              : (<VChip { ...slotProps } />)
                            : slots.selection
                              ? slots.selection({ selection })
                              : (
                                <span class="v-combobox__selection-text">
                                  { title }
                                  { index < model.value.length - 1 && (
                                    <span class="v-combobox__selection-comma">,</span>
                                  ) }
                                </span>
                              )
                          }
                        </div>
                      </VDefaultsProvider>
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

export type VCombobox = InstanceType<typeof VCombobox>
