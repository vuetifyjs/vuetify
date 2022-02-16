// Styles
import './VAutocomplete.sass'

// Components
import { VChip } from '@/components/VChip'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
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

export type SelectItem = string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any) | (LinkProps & {
  text: string
})

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
      type: Array as PropType<SelectItem[]>,
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

    ...makeFilterProps(),
  },

  emits: {
    'click:clear': (e: MouseEvent) => true,
    'update:search': (val: any) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const activator = ref()
    const search = useProxiedModel(props, 'search')
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => wrapInArray(v),
      (v: any) => props.multiple ? v : v[0]
    )
    const { filteredItems } = useFilter(props, props.items, search)

    const menu = ref(false)
    const active = computed({
      get: () => model.value,
      set: val => {
        model.value = val

        if (props.multiple) return

        menu.value = false
      },
    })
    const items = computed(() => {
      const array = []

      for (const { item } of filteredItems.value as any) {
        const title = item?.title ?? String(item)
        const value = item?.value ?? item

        if (props.hideSelected && active.value.includes(value)) {
          continue
        }

        array.push({ title, value })
      }

      if (!array.length && !props.hideNoData) {
        array.push({ title: t(props.noDataText) })
      }

      return array
    })
    const selections = computed(() => {
      const array = []

      for (const value of active.value) {
        const selection = props.items.find(item => {
          return (
            typeof item === 'string' ? item : item?.value
          ) === value
        })

        if (selection) {
          array.push(selection)
        }
      }

      return array
    })
    const searchValue = computed({
      get: () => {
        return String(search.value ?? '')
      },
      set: val => {
        search.value = val

        emit('update:search', val)
      },
    })

    function onClear (e: MouseEvent) {
      active.value = []

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
      }

      if (
        e.key === 'Escape' &&
        menu.value
      ) {
        menu.value = false
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control')
    })

    watch(() => active.value, () => {
      search.value = props.multiple ? undefined : selections.value[0]?.title
    })

    useRender(() => {
      return (
        <VTextField
          ref={ vTextFieldRef }
          v-model={ searchValue.value }
          class={[
            'v-autocomplete',
            {
              'v-autocomplete--active-menu': menu.value,
              'v-autocomplete--chips': !!props.chips,
              [`v-autocomplete--${props.multiple ? 'multiple' : 'single'}`]: true,
            },
          ]}
          dirty={ active.value.length > 0 }
          onClick:clear={ onClear }
          onClick:control={ () => props.openOnClick && (menu.value = true) }
          onFocus={ () => {
            search.value = props.multiple ? undefined : selections.value[0]?.title
          }}
          onBlur={ () => {
            search.value = undefined
            menu.value = false
          } }
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
                    transition={ false }
                  >
                    <VList
                      v-model:active={ active.value }
                      items={ items.value }
                      activeStrategy={ props.multiple ? 'multiple' : 'single' }
                    >
                      {{
                        item: (item: any) => {
                          return (
                            <VListItem
                              onMousedown={ (e: MouseEvent) => e.preventDefault() }
                              { ...item }
                            />
                          )
                        },
                      }}
                    </VList>
                  </VMenu>
                ) }

                <div class="v-autocomplete__selections v-field__input">
                  { selections.value.map((selection, index) => (
                    <div class="v-autocomplete__selection">
                      { props.chips
                        ? (
                          <VChip
                            text={ selection.title }
                            size="small"
                          />
                        ) : (
                          <span class="v-autocomplete__selection-text">
                            { selection.title }
                            { index < model.value.length - 1 && (
                              <span class="v-autocomplete__selection-comma">,</span>
                            ) }
                          </span>
                        )
                      }
                    </div>
                  )) }
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
