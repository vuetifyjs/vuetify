// Styles
import './VSelect.sass'

// Components
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeTransitionProps } from '@/composables/transition'
import { useForwardRef } from '@/composables/forwardRef'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { LinkProps } from '@/composables/router'
import type { MakeSlots } from '@/util'
import type { PropType } from 'vue'

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

export type SelectItem = string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any) | (LinkProps & {
  text: string
})

export const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  items: {
    type: Array as PropType<SelectItem[]>,
    default: () => ([]),
  },
  menuIcon: {
    type: String,
    default: '$dropdown',
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
}, 'select')

export const VSelect = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    default: []
    selection: [DefaultSelectionSlot]
  }>
}>()({
  name: 'VSelect',

  props: {
    ...makeSelectProps(),
    ...makeTransitionProps({ transition: 'scale-transition' }),
  },

  emits: {
    'click:clear': (e: MouseEvent) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots, emit }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const activator = ref()
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => wrapInArray(v),
      (v: any) => props.multiple ? v : v[0]
    )

    const menu = ref(false)
    const selected = computed({
      get: () => model.value,
      set: val => {
        model.value = val

        if (props.multiple) return

        menu.value = false
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

    function onClear (e: MouseEvent) {
      selected.value = []

      if (props.openOnClear) {
        menu.value = true
      }
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

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)

      return (
        <VTextField
          ref={ vTextFieldRef }
          class={[
            'v-select',
            {
              'v-select--active-menu': menu.value,
              'v-select--chips': !!props.chips,
              [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
            },
          ]}
          readonly
          onClick:clear={ onClear }
          onClick:control={ () => menu.value = true }
          onBlur={ () => menu.value = false }
          modelValue={ model.value.join(', ') }
          onKeydown={ onKeydown }
        >
          {{
            ...slots,
            appendInner: slotProps => (
              <>
                { slots.appendInner?.(slotProps) }

                { props.menuIcon && (
                  <VIcon
                    class="v-select__menu-icon"
                    icon={ props.menuIcon }
                  />
                ) }
              </>
            ),
            default: () => (
              <>
                { activator.value && (
                  <VMenu
                    v-model={ menu.value }
                    activator={ activator.value }
                    contentClass="v-select__content"
                    eager={ props.eager }
                    openOnClick={ false }
                    transition={ props.transition }
                  >
                    <VList
                      v-model:selected={ selected.value }
                      selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                    >
                      { !items.value.length && !props.hideNoData && (
                        <VListItem title={ t(props.noDataText) } />
                      )}

                      { items.value.map(({ title, value }) => (
                        <VListItem
                          title={ title }
                          value={ value }
                          onMousedown={ (e: MouseEvent) => e.preventDefault() }
                        />
                      )) }
                    </VList>
                  </VMenu>
                ) }

                <div class="v-select__selections v-field__input">
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
                        <div class="v-select__selection">
                          { hasChips
                            ? slots.chip
                              ? slots.chip({ props: slotProps, selection })
                              : (<VChip { ...slotProps } />)
                            : slots.selection
                              ? slots.selection({ selection })
                              : (
                                <span class="v-select__selection-text">
                                  { title }
                                  { index < model.value.length - 1 && (
                                    <span class="v-select__selection-comma">,</span>
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
      //
    }, vTextFieldRef)
  },
})

export type VSelect = InstanceType<typeof VSelect>
