// Styles
import './VSelect.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VAvatar } from '@/components/VAvatar'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { VVirtualScroll } from '@/components/VVirtualScroll'

// Composables
import { useScrolling } from './useScrolling'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { IconValue } from '@/composables/icons'
import { makeItemsProps, useItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { computed, mergeProps, nextTick, ref, shallowRef, watch } from 'vue'
import {
  checkPrintable,
  deepEqual,
  ensureValidVNode,
  genericComponent,
  IN_BROWSER,
  matchesSelector,
  omit,
  propsFactory,
  useRender,
  wrapInArray,
} from '@/util'

// Types
import type { Component, PropType } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps, SelectItemKey } from '@/util'

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
  closeText: {
    type: String,
    default: '$vuetify.close',
  },
  openText: {
    type: String,
    default: '$vuetify.open',
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object as PropType<VList['$props']>,
  },
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
  itemColor: String,

  ...makeItemsProps({ itemChildren: false }),
}, 'Select')

export const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    clearValue: (props: VSelect['$props']) => {
      return props.multiple ? [] : null
    },
    modelValue: null,
    role: 'combobox',
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({ transition: { component: VDialogTransition as Component } }),
}, 'VSelect')

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VSelect = genericComponent<new <
  T extends readonly any[],
  Item = ItemType<T>,
  ReturnObject extends boolean = false,
  Multiple extends boolean = false,
  V extends Value<Item, ReturnObject, Multiple> = Value<Item, ReturnObject, Multiple>
>(
  props: {
    items?: T
    itemTitle?: SelectItemKey<ItemType<T>>
    itemValue?: SelectItemKey<ItemType<T>>
    itemProps?: SelectItemKey<ItemType<T>>
    returnObject?: ReturnObject
    multiple?: Multiple
    modelValue?: V | null
    'onUpdate:modelValue'?: (value: V) => void
  },
  slots: Omit<VInputSlots & VFieldSlots, 'default'> & {
    item: { item: Item, internalItem: ListItem<Item>, index: number, props: Record<string, unknown> }
    chip: { item: Item, internalItem: ListItem<Item>, index: number, props: Record<string, unknown> }
    selection: { item: Item, internalItem: ListItem<Item>, index: number }
    'prepend-item': never
    'append-item': never
    'no-data': never
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSelect',

  props: makeVSelectProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:menu': (ue: boolean) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const vMenuRef = ref<VMenu>()
    const vVirtualScrollRef = ref<VVirtualScroll>()
    const _menu = useProxiedModel(props, 'menu')
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren.size) return
        _menu.value = v
      },
    })
    const { items, transformIn, transformOut } = useItems(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => transformIn(v === null ? [null] : wrapInArray(v)),
      v => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : (transformed[0] ?? null)
      }
    )
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value)
        : typeof props.counterValue === 'number' ? props.counterValue
        : model.value.length
    })
    const form = useForm(props)
    const selectedValues = computed(() => model.value.map(selection => selection.value))
    const isFocused = shallowRef(false)
    const label = computed(() => menu.value ? props.closeText : props.openText)

    let keyboardLookupPrefix = ''
    let keyboardLookupLastTime: number

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter(item => !model.value.some(s => (props.valueComparator || deepEqual)(s, item)))
      }
      return items.value
    })

    const menuDisabled = computed(() => (
      (props.hideNoData && !displayItems.value.length) ||
      form.isReadonly.value || form.isDisabled.value
    ))

    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...(props.menuProps?.activatorProps || {}),
          'aria-haspopup': 'listbox', // Set aria-haspopup to 'listbox'
        },
      }
    })

    const listRef = ref<VList>()
    const listEvents = useScrolling(listRef, vTextFieldRef)
    function onClear (e: MouseEvent) {
      if (props.openOnClear) {
        menu.value = true
      }
    }
    function onMousedownControl () {
      if (menuDisabled.value) return

      menu.value = !menu.value
    }
    function onListKeydown (e: KeyboardEvent) {
      if (checkPrintable(e)) {
        onKeydown(e)
      }
    }
    function onKeydown (e: KeyboardEvent) {
      if (!e.key || form.isReadonly.value) return

      if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
        e.preventDefault()
      }

      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false
      }

      if (e.key === 'Home') {
        listRef.value?.focus('first')
      } else if (e.key === 'End') {
        listRef.value?.focus('last')
      }

      // html select hotkeys
      const KEYBOARD_LOOKUP_THRESHOLD = 1000 // milliseconds

      if (!checkPrintable(e)) return

      const now = performance.now()
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = ''
      }
      keyboardLookupPrefix += e.key.toLowerCase()
      keyboardLookupLastTime = now

      const item = items.value.find(item => item.title.toLowerCase().startsWith(keyboardLookupPrefix))
      if (item !== undefined) {
        model.value = [item]
        const index = displayItems.value.indexOf(item)
        IN_BROWSER && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index)
        })
      }
    }

    /** @param set - null means toggle */
    function select (item: ListItem, set: boolean | null = true) {
      if (item.props.disabled) return

      if (props.multiple) {
        const index = model.value.findIndex(selection => (props.valueComparator || deepEqual)(selection.value, item.value))
        const add = set == null ? !~index : set

        if (~index) {
          const value = add ? [...model.value, item] : [...model.value]
          value.splice(index, 1)
          model.value = value
        } else if (add) {
          model.value = [...model.value, item]
        }
      } else {
        const add = set !== false
        model.value = add ? [item] : []

        nextTick(() => {
          menu.value = false
        })
      }
    }
    function onBlur (e: FocusEvent) {
      if (!listRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
        menu.value = false
      }
    }
    function onAfterEnter () {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems()
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
    function onModelUpdate (v: any) {
      if (v == null) model.value = []
      else if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
        const item = items.value.find(item => item.title === v)
        if (item) {
          select(item)
        }
      } else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = ''
      }
    }

    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex(
          item => model.value.some(s => (props.valueComparator || deepEqual)(s.value, item.value))
        )
        IN_BROWSER && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index)
        })
      }
    })

    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return

      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true
      }
    })

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)
      const hasList = !!(
        (!props.hideNoData || displayItems.value.length) ||
        slots['prepend-item'] ||
        slots['append-item'] ||
        slots['no-data']
      )
      const isDirty = model.value.length > 0
      const textFieldProps = VTextField.filterProps(props)

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
          onUpdate:modelValue={ onModelUpdate }
          v-model:focused={ isFocused.value }
          validationValue={ model.externalValue }
          counterValue={ counterValue.value }
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
          inputmode="none"
          placeholder={ placeholder }
          onClick:clear={ onClear }
          onMousedown:control={ onMousedownControl }
          onBlur={ onBlur }
          onKeydown={ onKeydown }
          aria-label={ t(label.value) }
          title={ t(label.value) }
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
                  disabled={ menuDisabled.value }
                  eager={ props.eager }
                  maxHeight={ 310 }
                  openOnClick={ false }
                  closeOnContentClick={ false }
                  transition={ props.transition }
                  onAfterEnter={ onAfterEnter }
                  onAfterLeave={ onAfterLeave }
                  { ...computedMenuProps.value }
                >
                  { hasList && (
                    <VList
                      ref={ listRef }
                      selected={ selectedValues.value }
                      selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                      onMousedown={ (e: MouseEvent) => e.preventDefault() }
                      onKeydown={ onListKeydown }
                      onFocusin={ onFocusin }
                      tabindex="-1"
                      aria-live="polite"
                      color={ props.itemColor ?? props.color }
                      { ...listEvents }
                      { ...props.listProps }
                    >
                      { slots['prepend-item']?.() }

                      { !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                        <VListItem key="no-data" title={ t(props.noDataText) } />
                      ))}

                      <VVirtualScroll ref={ vVirtualScrollRef } renderless items={ displayItems.value } itemKey="value">
                        { ({ item, index, itemRef }) => {
                          const itemProps = mergeProps(item.props, {
                            ref: itemRef,
                            key: item.value,
                            onClick: () => select(item, null),
                          })

                          return slots.item?.({
                            item: item.raw,
                            internalItem: item,
                            index,
                            props: itemProps,
                          }) ?? (
                            <VListItem { ...itemProps } role="option">
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

                                    { item.props.prependAvatar && (
                                      <VAvatar image={ item.props.prependAvatar } />
                                    )}

                                    { item.props.prependIcon && (
                                      <VIcon icon={ item.props.prependIcon } />
                                    )}
                                  </>
                                ),
                              }}
                            </VListItem>
                          )
                        }}
                      </VVirtualScroll>

                      { slots['append-item']?.() }
                    </VList>
                  )}
                </VMenu>

                { model.value.map((item, index) => {
                  function onChipClose (e: Event) {
                    e.stopPropagation()
                    e.preventDefault()

                    select(item, false)
                  }

                  const slotProps = {
                    'onClick:close': onChipClose,
                    onKeydown (e: KeyboardEvent) {
                      if (e.key !== 'Enter' && e.key !== ' ') return

                      e.preventDefault()
                      e.stopPropagation()

                      onChipClose(e)
                    },
                    onMousedown (e: MouseEvent) {
                      e.preventDefault()
                      e.stopPropagation()
                    },
                    modelValue: true,
                    'onUpdate:modelValue': undefined,
                  }

                  const hasSlot = hasChips ? !!slots.chip : !!slots.selection
                  const slotContent = hasSlot
                    ? ensureValidVNode(
                      hasChips
                        ? slots.chip!({ item: item.raw, internalItem: item, index, props: slotProps })
                        : slots.selection!({ item: item.raw, internalItem: item, index })
                    )
                    : undefined

                  if (hasSlot && !slotContent) return undefined

                  return (
                    <div key={ item.value } class="v-select__selection">
                      { hasChips ? (
                        !slots.chip ? (
                          <VChip
                            key="chip"
                            closable={ props.closableChips }
                            size="small"
                            text={ item.title }
                            disabled={ item.props.disabled }
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
                            { slotContent }
                          </VDefaultsProvider>
                        )
                      ) : (
                        slotContent ?? (
                          <span class="v-select__selection-text">
                            { item.title }
                            { props.multiple && (index < model.value.length - 1) && (
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
