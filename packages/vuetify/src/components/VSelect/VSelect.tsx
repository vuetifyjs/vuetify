// Styles
import './VSelect.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'
import { makeVTextFieldProps } from '@/components/VTextField/VTextField'

// Composables
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { IconValue } from '@/composables/icons'
import { makeItemsProps, useItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { computed, mergeProps, ref, shallowRef } from 'vue'
import { deepEqual, genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { Component, PropType } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps } from '@/util'

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = [T] extends [Primitive]
  ? T
  : (ReturnObject extends true ? T : any)

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject> | null

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
}, 'select')

export const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({ transition: { component: VDialogTransition as Component } }),
}, 'v-select')

export const VSelect = genericComponent<new <
  T extends readonly any[],
  Item = T extends readonly (infer U)[] ? U : never,
  ReturnObject extends boolean = false,
  Multiple extends boolean = false,
  V extends Value<Item, ReturnObject, Multiple> = Value<Item, ReturnObject, Multiple>
>(
  props: {
    items?: T
    returnObject?: ReturnObject
    multiple?: Multiple
    modelValue?: V | null
    'onUpdate:modelValue'?: (val: V) => void
  },
  slots: Omit<VInputSlots & VFieldSlots, 'default'> & {
    item: { item: ListItem<Item>, index: number, props: Record<string, unknown> }
    chip: { item: ListItem<Item>, index: number, props: Record<string, unknown> }
    selection: { item: ListItem<Item>, index: number }
    'prepend-item': never
    'append-item': never
    'no-data': never
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSelect',

  props: makeVSelectProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (val: any) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const vMenuRef = ref<VMenu>()
    const _menu = useProxiedModel(props, 'menu')
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return
        _menu.value = v
      },
    })
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
    const form = useForm()
    const selections = computed(() => {
      return model.value.map(v => {
        return items.value.find(item => props.valueComparator(item.value, v.value)) || v
      })
    })
    const selected = computed(() => selections.value.map(selection => selection.props.value))
    const isFocused = shallowRef(false)

    let keyboardLookupPrefix = ''
    let keyboardLookupLastTime: number

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter(item => !selections.value.some(s => s === item))
      }
      return items.value
    })

    const listRef = ref<VList>()

    function onClear (e: MouseEvent) {
      if (props.openOnClear) {
        menu.value = true
      }
    }
    function onMousedownControl () {
      if (
        (props.hideNoData && !items.value.length) ||
        props.readonly || form?.isReadonly.value
      ) return

      menu.value = !menu.value
    }
    function onKeydown (e: KeyboardEvent) {
      if (props.readonly || form?.isReadonly.value) return

      if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
        e.preventDefault()
      }

      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false
      }

      if (e.key === 'ArrowDown') {
        listRef.value?.focus('next')
      } else if (e.key === 'ArrowUp') {
        listRef.value?.focus('prev')
      } else if (e.key === 'Home') {
        listRef.value?.focus('first')
      } else if (e.key === 'End') {
        listRef.value?.focus('last')
      }

      // html select hotkeys
      const KEYBOARD_LOOKUP_THRESHOLD = 1000 // milliseconds

      function checkPrintable (e: KeyboardEvent) {
        const isPrintableChar = e.key.length === 1
        const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey
        return isPrintableChar && noModifier
      }

      if (props.multiple || !checkPrintable(e)) return

      const now = performance.now()
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = ''
      }
      keyboardLookupPrefix += e.key.toLowerCase()
      keyboardLookupLastTime = now

      const item = items.value.find(item => item.title.toLowerCase().startsWith(keyboardLookupPrefix))
      if (item !== undefined) {
        model.value = [item]
      }
    }
    function select (item: ListItem) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => props.valueComparator(selection, item.value))

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
    function onAfterLeave () {
      if (isFocused.value) {
        vTextFieldRef.value?.focus()
      }
    }
    function onFocusin (e: FocusEvent) {
      isFocused.value = true
    }

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)
      const hasList = !!((!props.hideNoData || displayItems.value.length) || slots.prepend || slots.append || slots['no-data'])
      const isDirty = model.value.length > 0
      const [textFieldProps] = VTextField.filterProps(props)

      const placeholder = isDirty || (
        !isFocused.value &&
        props.label &&
        !props.persistentPlaceholder
      ) ? undefined : props.placeholder

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          modelValue={ model.value.map(v => v.props.value).join(', ') }
          onUpdate:modelValue={ v => { if (v == null) model.value = [] } }
          v-model:focused={ isFocused.value }
          validationValue={ model.externalValue }
          dirty={ isDirty }
          class={[
            'v-select',
            {
              'v-select--active-menu': menu.value,
              'v-select--chips': !!props.chips,
              [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
              'v-select--selected': model.value.length,
              'v-select--selection-slot': !!slots.selection,
            },
            props.class,
          ]}
          style={ props.style }
          readonly
          placeholder={ placeholder }
          onClick:clear={ onClear }
          onMousedown:control={ onMousedownControl }
          onBlur={ onBlur }
          onKeydown={ onKeydown }
        >
          {{
            ...slots,
            default: () => (
              <>
                <VMenu
                  ref={ vMenuRef }
                  v-model={ menu.value }
                  activator="parent"
                  contentClass="v-select__content"
                  eager={ props.eager }
                  maxHeight={ 310 }
                  openOnClick={ false }
                  closeOnContentClick={ false }
                  transition={ props.transition }
                  onAfterLeave={ onAfterLeave }
                  { ...props.menuProps }
                >
                  { hasList && (
                    <VList
                      ref={ listRef }
                      selected={ selected.value }
                      selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                      onMousedown={ (e: MouseEvent) => e.preventDefault() }
                      onFocusin={ onFocusin }
                    >
                      { !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                        <VListItem title={ t(props.noDataText) } />
                      ))}

                      { slots['prepend-item']?.() }

                      { displayItems.value.map((item, index) => {
                        const itemProps = mergeProps(item.props, {
                          key: index,
                          onClick: () => select(item),
                        })

                        return slots.item?.({
                          item,
                          index,
                          props: itemProps,
                        }) ?? (
                          <VListItem { ...itemProps }>
                            {{
                              prepend: ({ isSelected }) => (
                                <>
                                  { props.multiple && !props.hideSelected ? (
                                    <VCheckboxBtn
                                      key={ item.value }
                                      modelValue={ isSelected }
                                      ripple={ false }
                                      tabindex="-1"
                                    />
                                  ) : undefined }

                                  { item.props.prependIcon && (
                                    <VIcon icon={ item.props.prependIcon } />
                                  )}
                                </>
                              ),
                            }}
                          </VListItem>
                        )
                      })}

                      { slots['append-item']?.() }
                    </VList>
                  )}
                </VMenu>

                { selections.value.map((item, index) => {
                  function onChipClose (e: Event) {
                    e.stopPropagation()
                    e.preventDefault()

                    select(item)
                  }

                  const slotProps = {
                    'onClick:close': onChipClose,
                    onMousedown (e: MouseEvent) {
                      e.preventDefault()
                      e.stopPropagation()
                    },
                    modelValue: true,
                    'onUpdate:modelValue': undefined,
                  }

                  return (
                    <div key={ item.value } class="v-select__selection">
                      { hasChips ? (
                        !slots.chip ? (
                          <VChip
                            key="chip"
                            closable={ props.closableChips }
                            size="small"
                            text={ item.title }
                            { ...slotProps }
                          />
                        ) : (
                          <VDefaultsProvider
                            key="chip-defaults"
                            defaults={{
                              VChip: {
                                closable: props.closableChips,
                                size: 'small',
                                text: item.title,
                              },
                            }}
                          >
                            { slots.chip?.({ item, index, props: slotProps }) }
                          </VDefaultsProvider>
                        )
                      ) : (
                        slots.selection?.({ item, index }) ?? (
                          <span class="v-select__selection-text">
                            { item.title }
                            { props.multiple && (index < selections.value.length - 1) && (
                              <span class="v-select__selection-comma">,</span>
                            )}
                          </span>
                        )
                      )}
                    </div>
                  )
                })}
              </>
            ),
            'append-inner': (...args) => (
              <>
                { slots['append-inner']?.(...args) }
                { props.menuIcon ? (
                  <VIcon
                    class="v-select__menu-icon"
                    icon={ props.menuIcon }
                  />
                ) : undefined }
              </>
            ),
          }}
        </VTextField>
      )
    })

    return forwardRefs({
      isFocused,
      menu,
      select,
    }, vTextFieldRef)
  },
})

export type VSelect = InstanceType<typeof VSelect>
