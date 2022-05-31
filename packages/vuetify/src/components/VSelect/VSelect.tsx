// Styles
import './VSelect.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeItemsProps, useItems } from '@/composables/items'
import { makeTransitionProps } from '@/composables/transition'
import { useForwardRef } from '@/composables/forwardRef'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { IconValue } from '@/composables/icons'

// Utility
import { computed, ref } from 'vue'
import { genericComponent, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { InternalItem } from '@/composables/items'
import type { MakeSlots } from '@/util'

export interface InternalSelectItem extends InternalItem {}

export interface DefaultSelectionSlot {
  selection: InternalSelectItem
}

export interface DefaultChipSlot extends DefaultSelectionSlot {
  props: {
    'onClick:close': (e: Event) => void
    modelValue: any
  }
}

export const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menuIcon: {
    type: IconValue,
    default: '$dropdown',
  },
  modelValue: {
    type: null,
    default: () => ([]),
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  openOnClear: Boolean,

  ...makeItemsProps({ itemChildren: false }),
}, 'select')

export const VSelect = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    chip: [DefaultChipSlot]
    default: []
    selection: [{ item: T }]
  }>
}>()({
  name: 'VSelect',

  props: {
    ...makeSelectProps(),
    ...makeTransitionProps({ transition: { component: VDialogTransition } }),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const menu = ref(false)
    const { items, transformIn, transformOut } = useItems(props)
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
    const selections = computed(() => {
      return model.value.map(v => {
        return items.value.find(item => item.value === v.value) || v
      })
    })
    const selected = computed(() => selections.value.map(selection => selection.props.value))

    function onClear (e: MouseEvent) {
      model.value = []

      if (props.openOnClear) {
        menu.value = true
      }
    }
    function onClickControl () {
      if (props.hideNoData && !items.value.length) return

      menu.value = true
    }
    function onKeydown (e: KeyboardEvent) {
      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false
      }
    }
    function select (item: InternalItem) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => selection === item.value)

        if (index === -1) {
          model.value = [...model.value, item]
        } else {
          const value = [...model.value]
          value.splice(index, 1)
          model.value = value
        }
      } else {
        model.value = [item]
        menu.value = false
      }
    }

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
          appendInnerIcon={ props.menuIcon }
          readonly
          onClick:clear={ onClear }
          onClick:input={ onClickControl }
          onClick:control={ onClickControl }
          onBlur={ () => menu.value = false }
          modelValue={ model.value.map(v => v.props.value).join(', ') }
          onKeydown={ onKeydown }
        >
          {{
            ...slots,
            default: () => (
              <>
                <VMenu
                  v-model={ menu.value }
                  activator="parent"
                  contentClass="v-select__content"
                  eager={ props.eager }
                  openOnClick={ false }
                  transition={ props.transition }
                >
                  <VList
                    selected={ selected.value }
                    selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                  >
                    { !items.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                      <VListItem title={ t(props.noDataText) } />
                    )) }

                    { items.value.map(item => (
                      <VListItem
                        { ...item.props }
                        onMousedown={ (e: MouseEvent) => e.preventDefault() }
                        onClick={ () => select(item) }
                      />
                    )) }
                  </VList>
                </VMenu>

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
                    <div class="v-select__selection">
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
                            ? slots.chip({ props: slotProps, selection })
                            : (<VChip { ...slotProps } />)
                          }
                        </VDefaultsProvider>
                      ) }

                      { !hasChips && (
                        slots.selection
                          ? slots.selection({ item: selection.originalItem })
                          : (
                            <span class="v-select__selection-text">
                              { selection.props.title }
                              { props.multiple && (index < selections.value.length - 1) && (
                                <span class="v-select__selection-comma">,</span>
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

    return useForwardRef({}, vTextFieldRef)
  },
})

export type VSelect = InstanceType<typeof VSelect>
