// Styles
import './VSelect.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'
import { VListChildren } from '../VList/VListChildren'

// Composables
import { makeItemsProps, useItems } from '@/composables/items'
import { makeTransitionProps } from '@/composables/transition'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { IconValue } from '@/composables/icons'

// Utility
import { computed, mergeProps, ref } from 'vue'
import { genericComponent, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { MakeSlots } from '@/util'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { VFieldSlots } from '@/components/VField/VField'
import type { InternalItem } from '@/composables/items'
import type { ListItemSlot } from '../VList/VListChildren'

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
  readonly: Boolean,

  ...makeItemsProps(),
  itemType: {
    type: String,
    default: 'type',
  },
}, 'select')

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = T extends Primitive
  ? T
  : (ReturnObject extends true ? T : any)

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? Val<T, ReturnObject>[]
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
    modelValue?: Readonly<V>
    'onUpdate:modelValue'?: (val: V) => void
  } & Omit<VTextField['$props'], 'modelValue' | 'onUpdate:modelValue'>
  $slots: Omit<VInputSlots & VFieldSlots, 'default'> & MakeSlots<{
    item: [ListItemSlot<T>]
    chip: [ListItemSlot<T>]
    selection: [{ item: T, index: number }]
    'no-data': []
  }>
}>()({
  name: 'VSelect',

  props: {
    ...makeSelectProps(),
    ...makeTransitionProps({ transition: { component: VDialogTransition } }),
  },

  emits: {
    'update:modelValue': (val: any) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { slots }) {
    const vTextFieldRef = ref<VTextField>()
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
        return items.value.find(item => item.value === v.value) || v
      })
    })
    const selected = computed(() => selections.value.map(selection => selection.value))

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
        menu.value = true
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false
      }
    }
    function select (item: InternalItem<any>) {
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
          modelValue={ model.value.map(v => v.value).join(', ') }
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
          onBlur={ () => menu.value = false }
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
                    selected={ selected.value }
                    selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                    onMousedown={ (e: MouseEvent) => e.preventDefault() }
                    opened={ items.value.map(item => item.value) }
                    type="select"
                  >
                    { slots['prepend-item']?.() }

                    <VListChildren
                      items={ items.value }
                      noDataText={ !props.hideNoData ? props.noDataText : undefined }
                    >
                      {{
                        ...slots,
                        item: ({ item, index }) => {
                          const onClick = () => select(item)

                          if (slots.item) return slots.item({ item, props: mergeProps(item.props, { onClick }), index })

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
                        },
                      }}
                    </VListChildren>

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
                  }

                  return (
                    <div key={ index } class="v-select__selection">
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
