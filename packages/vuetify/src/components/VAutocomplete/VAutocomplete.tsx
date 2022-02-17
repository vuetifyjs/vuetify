// Styles
import './VAutocomplete.sass'

// Components
import { VChip } from '@/components/VChip'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import type { FilterMatch } from '@/composables/filter'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useForwardRef } from '@/composables/forwardRef'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, ref, watch } from 'vue'
import { genericComponent, useRender, wrapInArray } from '@/util'

// Types
import type { LinkProps } from '@/composables/router'
import type { MakeSlots } from '@/util'
import type { PropType } from 'vue'
import { makeTransitionProps } from '@/composables/transition'

export type SelectItem = string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any) | (LinkProps & {
  text: string
})

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
    default: []
    title: []
  }>
}>()({
  name: 'VAutocomplete',

  props: {
    chips: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
    modelValue: {
      type: [Number, String, Array],
      default: () => ([]),
    },
    multiple: Boolean,
    noDataText: {
      type: String,
      default: '$vuetify.noDataText',
    },
    openOnClear: Boolean,
    openOnClick: Boolean,
    search: String,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeTransitionProps({ transition: false } as const),
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
    const menu = ref(false)
    const search = useProxiedModel(props, 'search', '')
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => wrapInArray(v),
      (v: any) => props.multiple ? v : v[0]
    )
    const items = computed(() => {
      const array = []

      for (const item of props.items) {
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

      if (!array.length && !props.hideNoData) {
        array.push({ title: t(props.noDataText) })
      }

      return array
    })
    const selections = computed(() => {
      return wrapInArray(model.value).map(value => {
        return items.value.find(item => item.value === value)
      })
    })
    const searchValue = computed(() => isPristine.value ? undefined : search.value)
    const { filteredItems } = useFilter(props, items.value, searchValue)

    function onClear (e: MouseEvent) {
      model.value = []

      if (props.openOnClear) {
        menu.value = true
      }

      search.value = undefined
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

    watch(() => model.value, () => {
      if (!isFocused.value || props.multiple) return

      menu.value = false
      search.value = selections.value[0]?.title
    })
    watch(() => isFocused.value, val => {
      menu.value = val
      isPristine.value = true

      if (val && !props.multiple) {
        search.value = selections.value[0]?.title
      } else if (!val) {
        search.value = ''
      }
    })

    useRender(() => {
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
          onClick:control={ () => menu.value = true }
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
                    openOnClick={ false }
                    transition={ props.transition }
                  >
                    <VList
                      v-model:active={ model.value }
                      activeStrategy={ props.multiple ? 'multiple' : 'single' }
                    >
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
                    const title = typeof selection === 'string' ? selection : selection?.title

                    return (
                      <div class="v-autocomplete__selection">
                        { props.chips
                          ? (
                            <VChip
                              text={ title }
                              size="small"
                            />
                          ) : (
                            <span class="v-autocomplete__selection-text">
                              { title }
                              { index < model.value.length - 1 && (
                                <span class="v-autocomplete__selection-comma">,</span>
                              ) }
                            </span>
                          )
                        }
                      </div>
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
      //
    }, vTextFieldRef)
  },
})

export type VAutocomplete = InstanceType<typeof VAutocomplete>
