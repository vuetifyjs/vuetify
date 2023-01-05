// Styles
import './VSelect.sass'

// Components
import { filterVTextFieldProps, makeVTextFieldProps } from '@/components/VTextField/VTextField'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VDialogTransition } from '@/components/transitions'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeItemsProps, useItems } from '@/composables/items'
import { makeTransitionProps } from '@/composables/transition'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { IconValue } from '@/composables/icons'

// Utility
import { computed, mergeProps, ref } from 'vue'
import { deepEqual, genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { VInputSlots } from '@/components/VInput/VInput'
import type { VFieldSlots } from '@/components/VField/VField'
import type { InternalItem } from '@/composables/items'
import type { MakeSlots, SlotsToProps } from '@/util'
import type { PropType } from 'vue'

export const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: '$dropdown',
  },
  menuProps: {
    type: Object as PropType<VMenu['$props']>,
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  openOnClear: Boolean,
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },

  ...makeItemsProps({ itemChildren: false }),
}, 'v-select')

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = T extends Primitive
  ? T
  : (ReturnObject extends true ? T : any)

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject>

export const VSelect = genericComponent<new <
  T,
  ReturnObject extends boolean = false,
  Multiple extends boolean = false,
  V extends Value<T, ReturnObject, Multiple> = Value<T, ReturnObject, Multiple>
>() => {
  $props: {
    items?: readonly T[]
    returnObject?: ReturnObject
    multiple?: Multiple
    modelValue?: V
    'onUpdate:modelValue'?: (val: V) => void
  } & SlotsToProps<
    Omit<VInputSlots & VFieldSlots, 'default'> & MakeSlots<{
      item: [{ item: InternalItem<T>, index: number, props: Record<string, unknown> }]
      chip: [{ item: InternalItem<T>, index: number, props: Record<string, unknown> }]
      selection: [{ item: InternalItem<T>, index: number }]
      'prepend-item': []
      'append-item': []
      'no-data': []
    }>
  >
}>()({
  name: 'VSelect',

  props: {
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null,
    }), ['validationValue', 'dirty', 'appendInnerIcon']),
    ...makeTransitionProps({ transition: { component: VDialogTransition } }),
  },

  emits: {
    'update:modelValue': (val: any) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const menu = useProxiedModel(props, 'menu')
    const { items, transformIn, transformOut } = useItems(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => transformIn(wrapInArray(v)),
      v => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : (transformed[0] ?? null)
      }
    )
    const selections = computed(() => {
      return model.value.map(v => {
        return items.value.find(item => props.valueComparator(item.value, v.value)) || v
      })
    })
    const selected = computed(() => selections.value.map(selection => selection.props.value))
    const listRef = ref<VList>()

    function onClear (e: MouseEvent) {
      model.value = []

      if (props.openOnClear) {
        menu.value = true
      }
    }
    function onClickControl () {
      if (
        (props.hideNoData && !items.value.length) ||
        props.readonly
      ) return

      menu.value = !menu.value
    }
    function onKeydown (e: KeyboardEvent) {
      if (props.readonly) return

      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault()
        menu.value = true
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false
      }

      if (e.key === 'ArrowDown') {
        listRef.value?.focus('next')
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        listRef.value?.focus('prev')
      } else if (e.key === 'Home') {
        e.preventDefault()
        listRef.value?.focus('first')
      } else if (e.key === 'End') {
        e.preventDefault()
        listRef.value?.focus('last')
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
    function onBlur (e: FocusEvent) {
      if (!listRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
        menu.value = false
      }
    }
    function onFocusout (e: FocusEvent) {
      if (e.relatedTarget == null) {
        vTextFieldRef.value?.focus()
      }
    }

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)
      const [textFieldProps] = filterVTextFieldProps(props)

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          modelValue={ model.value.map(v => v.props.value).join(', ') }
          onUpdate:modelValue={ v => { if (v == null) model.value = [] } }
          validationValue={ model.externalValue }
          dirty={ model.value.length > 0 }
          class={[
            'v-select',
            {
              'v-select--active-menu': menu.value,
              'v-select--chips': !!props.chips,
              [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
              'v-select--selected': model.value.length,
            },
          ]}
          appendInnerIcon={ props.menuIcon }
          readonly
          onClick:clear={ onClear }
          onClick:control={ onClickControl }
          onBlur={ onBlur }
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
                  closeOnContentClick={ false }
                  transition={ props.transition }
                  { ...props.menuProps }
                >
                  <VList
                    ref={ listRef }
                    selected={ selected.value }
                    selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                    onMousedown={ (e: MouseEvent) => e.preventDefault() }
                    onFocusout={ onFocusout }
                  >
                    { !items.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                      <VListItem title={ t(props.noDataText) } />
                    )) }

                    { slots['prepend-item']?.() }

                    { items.value.map((item, index) => {
                      if (slots.item) {
                        return slots.item?.({
                          item,
                          index,
                          props: mergeProps(item.props, { onClick: () => select(item) }),
                        })
                      }

                      return (
                        <VListItem
                          key={ index }
                          { ...item.props }
                          onClick={ () => select(item) }
                        >
                          {{
                            prepend: ({ isSelected }) => props.multiple && !props.hideSelected ? (
                              <VCheckboxBtn modelValue={ isSelected } ripple={ false } />
                            ) : undefined,
                          }}
                        </VListItem>
                      )
                    })}

                    { slots['append-item']?.() }
                  </VList>
                </VMenu>

                { selections.value.map((item, index) => {
                  function onChipClose (e: Event) {
                    e.stopPropagation()
                    e.preventDefault()

                    select(item)
                  }

                  const slotProps = {
                    'onClick:close': onChipClose,
                    modelValue: true,
                    'onUpdate:modelValue': undefined,
                  }

                  return (
                    <div key={ item.value } class="v-select__selection">
                      { hasChips ? (
                        <VDefaultsProvider
                          defaults={{
                            VChip: {
                              closable: props.closableChips,
                              size: 'small',
                              text: item.title,
                            },
                          }}
                        >
                          { slots.chip
                            ? slots.chip({ item, index, props: slotProps })
                            : (<VChip { ...slotProps } />)
                          }
                        </VDefaultsProvider>
                      ) : (
                        slots.selection
                          ? slots.selection({ item, index })
                          : (
                            <span class="v-select__selection-text">
                              { item.title }
                              { props.multiple && (index < selections.value.length - 1) && (
                                <span class="v-select__selection-comma">,</span>
                              ) }
                            </span>
                          )
                      )}
                    </div>
                  )
                }) }
              </>
            ),
          }}
        </VTextField>
      )
    })

    return forwardRefs({
      menu,
      select,
    }, vTextFieldRef)
  },
})

export type VSelect = InstanceType<typeof VSelect>
