// Styles
import './VSelect.sass'

// Components
import { VChip } from '@/components/VChip'
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
    title: []
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

      for (const item of props.items as any) {
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
      return items.value.filter(item => active.value.includes(item.value))
    })

    function onClear (e: MouseEvent) {
      active.value = []

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
      return (
        <VTextField
          ref={ vTextFieldRef }
          class={[
            'v-select',
            {
              'v-select--active-menu': menu.value,
              'v-select--chips': !!props.chips,
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
                    openOnClick={ false }
                    transition={ props.transition }
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

                <div class="v-select__selections v-field__input">
                  { selections.value.map((selection, index) => (
                    <div class="v-select__selection">
                      { props.chips
                        ? (
                          <VChip
                            text={ selection.title }
                            size="small"
                          />
                        ) : (
                          <span class="v-select__selection-text">
                            { selection.title }
                            { index < model.value.length - 1 && (
                              <span class="v-select__selection-comma">,</span>
                            ) }
                          </span>
                        )
                      }
                    </div>
                  )) }

                  { slots.selections?.() }
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
