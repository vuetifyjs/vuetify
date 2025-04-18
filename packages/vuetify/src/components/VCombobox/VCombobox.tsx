// Styles
import './VCombobox.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { makeSelectProps } from '@/components/VSelect/VSelect'
import { VTextField } from '@/components/VTextField'
import { makeVTextFieldProps } from '@/components/VTextField/VTextField'
import { VVirtualScroll } from '@/components/VVirtualScroll'

// Composables
import { useScrolling } from '../VSelect/useScrolling'
import { useTextColor } from '@/composables/color'
import { highlightResult, makeFilterProps, useFilter } from '@/composables/filter'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { transformItem, useItems } from '@/composables/list-items'
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
  isComposingIgnoreKey,
  noop,
  omit,
  propsFactory,
  useRender,
  wrapInArray,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps, SelectItemKey } from '@/util'

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = string | ([T] extends [Primitive]
  ? T
  : (ReturnObject extends true ? T : any))

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject> | null

export const makeVComboboxProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String] as PropType<boolean | 'exact'>,
  },
  clearOnSelect: {
    type: Boolean,
    default: true,
  },
  delimiters: Array as PropType<readonly string[]>,

  ...makeFilterProps({ filterKeys: ['title'] }),
  ...makeSelectProps({ hideNoData: true, returnObject: true }),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox',
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({ transition: false }),
}, 'VCombobox')

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VCombobox = genericComponent<new <
  T extends readonly any[],
  Item = ItemType<T>,
  ReturnObject extends boolean = true,
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
    item: { item: ListItem<Item>, index: number, props: Record<string, unknown> }
    chip: { item: ListItem<Item>, index: number, props: Record<string, unknown> }
    selection: { item: ListItem<Item>, index: number }
    'prepend-item': never
    'append-item': never
    'no-data': never
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VCombobox',

  props: makeVComboboxProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:search': (value: string) => true,
    'update:menu': (value: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref<VTextField>()
    const isFocused = shallowRef(false)
    const isPristine = shallowRef(true)
    const listHasFocus = shallowRef(false)
    const vMenuRef = ref<VMenu>()
    const vVirtualScrollRef = ref<VVirtualScroll>()
    const selectionIndex = shallowRef(-1)
    let cleared = false
    const color = computed(() => vTextFieldRef.value?.color)
    const { items, transformIn, transformOut } = useItems(props)
    const { textColorClasses, textColorStyles } = useTextColor(color)
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
    const form = useForm(props)

    const hasChips = computed(() => !!(props.chips || slots.chip))
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection)

    const _search = shallowRef(!props.multiple && !hasSelectionSlot.value ? model.value[0]?.title ?? '' : '')

    const search = computed<string>({
      get: () => {
        return _search.value
      },
      set: (val: string | null) => {
        _search.value = val ?? ''
        if (!props.multiple && !hasSelectionSlot.value) {
          model.value = [transformItem(props, val)]
          vVirtualScrollRef.value?.scrollToIndex(0)
        }

        if (val && props.multiple && props.delimiters?.length) {
          const values = val.split(new RegExp(`(?:${props.delimiters.join('|')})+`))
          if (values.length > 1) {
            values.forEach(v => {
              v = v.trim()
              if (v) select(transformItem(props, v))
            })
            _search.value = ''
          }
        }

        if (!val) selectionIndex.value = -1

        isPristine.value = !val
      },
    })

    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value)
        : typeof props.counterValue === 'number' ? props.counterValue
        : (props.multiple ? model.value.length : search.value.length)
    })

    const { filteredItems, getMatches } = useFilter(props, items, () => isPristine.value ? '' : search.value)

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value))
      }
      return filteredItems.value
    })

    const menuDisabled = computed(() => (
      (props.hideNoData && !displayItems.value.length) ||
      form.isReadonly.value || form.isDisabled.value
    ))
    const _menu = useProxiedModel(props, 'menu')
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren.size) return
        if (v && menuDisabled.value) return
        _menu.value = v
      },
    })

    const label = computed(() => menu.value ? props.closeText : props.openText)

    watch(_search, value => {
      if (cleared) {
        // wait for clear to finish, VTextField sets _search to null
        // then search computed triggers and updates _search to ''
        nextTick(() => (cleared = false))
      } else if (isFocused.value && !menu.value) {
        menu.value = true
      }

      emit('update:search', value)
    })

    watch(model, value => {
      if (!props.multiple && !hasSelectionSlot.value) {
        _search.value = value[0]?.title ?? ''
      }
    })

    const selectedValues = computed(() => model.value.map(selection => selection.value))

    const highlightFirst = computed(() => {
      const selectFirst = props.autoSelectFirst === true ||
        (props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title)
      return selectFirst &&
        displayItems.value.length > 0 &&
        !isPristine.value &&
        !listHasFocus.value
    })

    const listRef = ref<VList>()
    const listEvents = useScrolling(listRef, vTextFieldRef)
    function onClear (e: MouseEvent) {
      cleared = true

      if (props.openOnClear) {
        menu.value = true
      }
    }
    function onMousedownControl () {
      if (menuDisabled.value) return

      menu.value = true
    }
    function onMousedownMenuIcon (e: MouseEvent) {
      if (menuDisabled.value) return

      if (isFocused.value) {
        e.preventDefault()
        e.stopPropagation()
      }
      menu.value = !menu.value
    }
    function onListKeydown (e: KeyboardEvent) {
      if (e.key !== ' ' && checkPrintable(e)) {
        vTextFieldRef.value?.focus()
      }
    }
    // eslint-disable-next-line complexity
    function onKeydown (e: KeyboardEvent) {
      if (isComposingIgnoreKey(e) || form.isReadonly.value) return

      const selectionStart = vTextFieldRef.value?.selectionStart
      const length = model.value.length

      if (['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
      }

      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false
      }

      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        if (
          highlightFirst.value &&
          ['Enter', 'Tab'].includes(e.key) &&
          !model.value.some(({ value }) => value === displayItems.value[0].value)
        ) {
          select(filteredItems.value[0])
        }

        isPristine.value = true
      }

      if (e.key === 'ArrowDown' && highlightFirst.value) {
        listRef.value?.focus('next')
      }

      if (e.key === 'Enter' && search.value) {
        select(transformItem(props, search.value))
        if (hasSelectionSlot.value) _search.value = ''
      }

      if (['Backspace', 'Delete'].includes(e.key)) {
        if (
          !props.multiple &&
          hasSelectionSlot.value &&
          model.value.length > 0 &&
          !search.value
        ) return select(model.value[0], false)

        if (~selectionIndex.value) {
          e.preventDefault()
          const originalSelectionIndex = selectionIndex.value
          select(model.value[selectionIndex.value], false)

          selectionIndex.value = originalSelectionIndex >= length - 1 ? (length - 2) : originalSelectionIndex
        } else if (e.key === 'Backspace' && !search.value) {
          selectionIndex.value = length - 1
        }

        return
      }

      if (!props.multiple) return

      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && selectionStart && selectionStart > 0) return

        const prev = selectionIndex.value > -1
          ? selectionIndex.value - 1
          : length - 1

        if (model.value[prev]) {
          selectionIndex.value = prev
        } else {
          selectionIndex.value = -1
          vTextFieldRef.value?.setSelectionRange(search.value.length, search.value.length)
        }
      } else if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return

        const next = selectionIndex.value + 1

        if (model.value[next]) {
          selectionIndex.value = next
        } else {
          selectionIndex.value = -1
          vTextFieldRef.value?.setSelectionRange(0, 0)
        }
      } else if (~selectionIndex.value && checkPrintable(e)) {
        selectionIndex.value = -1
      }
    }
    function onAfterEnter () {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems()
      }
    }
    function onAfterLeave () {
      if (isFocused.value) {
        isPristine.value = true
        vTextFieldRef.value?.focus()
      }
    }
    /** @param set - null means toggle */
    function select (item: ListItem | undefined, set: boolean | null = true) {
      if (!item || item.props.disabled) return

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

        if (props.clearOnSelect) {
          search.value = ''
        }
      } else {
        const add = set !== false
        model.value = add ? [item] : []
        _search.value = add && !hasSelectionSlot.value ? item.title : ''

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false
          isPristine.value = true
        })
      }
    }

    function onFocusin (e: FocusEvent) {
      isFocused.value = true
      setTimeout(() => {
        listHasFocus.value = true
      })
    }
    function onFocusout (e: FocusEvent) {
      listHasFocus.value = false
    }
    function onUpdateModelValue (v: any) {
      if (v == null || (v === '' && !props.multiple && !hasSelectionSlot.value)) model.value = []
    }

    watch(isFocused, (val, oldVal) => {
      if (val || val === oldVal) return

      selectionIndex.value = -1
      menu.value = false

      if (search.value) {
        if (props.multiple) {
          select(transformItem(props, search.value))
          return
        }

        if (!hasSelectionSlot.value) return

        if (model.value.some(({ title }) => title === search.value)) {
          _search.value = ''
        } else {
          select(transformItem(props, search.value))
        }
      }
    })

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
      const hasList = !!(
        (!props.hideNoData || displayItems.value.length) ||
        slots['prepend-item'] ||
        slots['append-item'] ||
        slots['no-data']
      )
      const isDirty = model.value.length > 0
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          v-model={ search.value }
          onUpdate:modelValue={ onUpdateModelValue }
          v-model:focused={ isFocused.value }
          validationValue={ model.externalValue }
          counterValue={ counterValue.value }
          dirty={ isDirty }
          class={[
            'v-combobox',
            {
              'v-combobox--active-menu': menu.value,
              'v-combobox--chips': !!props.chips,
              'v-combobox--selection-slot': !!hasSelectionSlot.value,
              'v-combobox--selecting-index': selectionIndex.value > -1,
              [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true,
            },
            props.class,
          ]}
          style={ props.style }
          readonly={ form.isReadonly.value }
          placeholder={ isDirty ? undefined : props.placeholder }
          onClick:clear={ onClear }
          onMousedown:control={ onMousedownControl }
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
                  contentClass="v-combobox__content"
                  disabled={ menuDisabled.value }
                  eager={ props.eager }
                  maxHeight={ 310 }
                  openOnClick={ false }
                  closeOnContentClick={ false }
                  transition={ props.transition }
                  onAfterEnter={ onAfterEnter }
                  onAfterLeave={ onAfterLeave }
                  { ...props.menuProps }
                >
                  { hasList && (
                    <VList
                      ref={ listRef }
                      selected={ selectedValues.value }
                      selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                      onMousedown={ (e: MouseEvent) => e.preventDefault() }
                      onKeydown={ onListKeydown }
                      onFocusin={ onFocusin }
                      onFocusout={ onFocusout }
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
                            active: (highlightFirst.value && index === 0) ? true : undefined,
                            onClick: () => select(item, null),
                          })

                          return slots.item?.({
                            item,
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
                              title: () => {
                                return isPristine.value
                                  ? item.title
                                  : highlightResult('v-combobox', item.title, getMatches(item)?.title)
                              },
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

                  const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection
                  const slotContent = hasSlot
                    ? ensureValidVNode(
                      hasChips.value
                        ? slots.chip!({ item, index, props: slotProps })
                        : slots.selection!({ item, index })
                    )
                    : undefined

                  if (hasSlot && !slotContent) return undefined

                  return (
                    <div
                      key={ item.value }
                      class={[
                        'v-combobox__selection',
                        index === selectionIndex.value && [
                          'v-combobox__selection--selected',
                          textColorClasses.value,
                        ],
                      ]}
                      style={ index === selectionIndex.value ? textColorStyles.value : {} }
                    >
                      { hasChips.value ? (
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
                          <span class="v-combobox__selection-text">
                            { item.title }
                            { props.multiple && (index < model.value.length - 1) && (
                              <span class="v-combobox__selection-comma">,</span>
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
                { (!props.hideNoData || props.items.length) && props.menuIcon ? (
                  <VIcon
                    class="v-combobox__menu-icon"
                    color={ vTextFieldRef.value?.fieldIconColor }
                    icon={ props.menuIcon }
                    onMousedown={ onMousedownMenuIcon }
                    onClick={ noop }
                    aria-label={ t(label.value) }
                    title={ t(label.value) }
                    tabindex="-1"
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
      isPristine,
      menu,
      search,
      selectionIndex,
      filteredItems,
      select,
    }, vTextFieldRef)
  },
})

export type VCombobox = InstanceType<typeof VCombobox>
