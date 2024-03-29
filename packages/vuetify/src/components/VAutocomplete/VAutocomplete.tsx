// Styles
import './VAutocomplete.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { makeSelectProps } from '@/components/VSelect/VSelect'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { VVirtualScroll } from '@/components/VVirtualScroll'

// Composables
import { useScrolling } from '../VSelect/useScrolling'
import { useTextColor } from '@/composables/color'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { computed, mergeProps, nextTick, ref, shallowRef, watch } from 'vue'
import {
  ensureValidVNode,
  genericComponent,
  IN_BROWSER,
  matchesSelector,
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
import type { FilterMatch } from '@/composables/filter'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps, SelectItemKey } from '@/util'

function highlightResult (text: string, matches: FilterMatch | undefined, length: number) {
  if (matches == null) return text

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

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = [T] extends [Primitive]
  ? T
  : (ReturnObject extends true ? T : any)

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject> | null

export const makeVAutocompleteProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String] as PropType<boolean | 'exact'>,
  },
  clearOnSelect: Boolean,
  search: String,

  ...makeFilterProps({ filterKeys: ['title'] }),
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox',
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({ transition: false }),
}, 'VAutocomplete')

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VAutocomplete = genericComponent<new <
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
    item: { item: ListItem<Item>, index: number, props: Record<string, unknown> }
    chip: { item: ListItem<Item>, index: number, props: Record<string, unknown> }
    selection: { item: ListItem<Item>, index: number }
    'prepend-item': never
    'append-item': never
    'no-data': never
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VAutocomplete',

  props: makeVAutocompleteProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:search': (value: any) => true,
    'update:modelValue': (value: any) => true,
    'update:menu': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const isFocused = shallowRef(false)
    const isPristine = shallowRef(true)
    const listHasFocus = shallowRef(false)
    const vMenuRef = ref<VMenu>()
    const vVirtualScrollRef = ref<VVirtualScroll>()
    const _menu = useProxiedModel(props, 'menu')
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return
        _menu.value = v
      },
    })
    const selectionIndex = shallowRef(-1)
    const color = computed(() => vTextFieldRef.value?.color)
    const label = computed(() => menu.value ? props.closeText : props.openText)
    const { items, transformIn, transformOut } = useItems(props)
    const { textColorClasses, textColorStyles } = useTextColor(color)
    const search = useProxiedModel(props, 'search', '')
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
    const form = useForm()
    const { filteredItems, getMatches } = useFilter(props, items, () => isPristine.value ? '' : search.value)

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value))
      }
      return filteredItems.value
    })

    const hasChips = computed(() => !!(props.chips || slots.chip))
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection)

    const selectedValues = computed(() => model.value.map(selection => selection.props.value))

    const highlightFirst = computed(() => {
      const selectFirst = props.autoSelectFirst === true ||
        (props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title)
      return selectFirst &&
        displayItems.value.length > 0 &&
        !isPristine.value &&
        !listHasFocus.value
    })

    const menuDisabled = computed(() => (
      (props.hideNoData && !displayItems.value.length) ||
      props.readonly || form?.isReadonly.value
    ))

    const listRef = ref<VList>()
    const { onListScroll, onListKeydown } = useScrolling(listRef, vTextFieldRef)
    function onClear (e: MouseEvent) {
      if (props.openOnClear) {
        menu.value = true
      }

      search.value = ''
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
    function onKeydown (e: KeyboardEvent) {
      if (props.readonly || form?.isReadonly.value) return

      const selectionStart = vTextFieldRef.value.selectionStart
      const length = model.value.length

      if (
        selectionIndex.value > -1 ||
        ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)
      ) {
        e.preventDefault()
      }

      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false
      }

      if (highlightFirst.value && ['Enter', 'Tab'].includes(e.key)) {
        select(displayItems.value[0])
      }

      if (e.key === 'ArrowDown' && highlightFirst.value) {
        listRef.value?.focus('next')
      }

      if (['Backspace', 'Delete'].includes(e.key)) {
        if (
          !props.multiple &&
          hasSelectionSlot.value &&
          model.value.length > 0
        ) return select(model.value[0], false)

        if (selectionIndex.value < 0) {
          if (e.key === 'Backspace' && !search.value) {
            selectionIndex.value = length - 1
          }

          return
        }

        const originalSelectionIndex = selectionIndex.value
        select(model.value[selectionIndex.value], false)

        selectionIndex.value = originalSelectionIndex >= length - 1 ? (length - 2) : originalSelectionIndex
      }

      if (!props.multiple) return

      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && selectionStart > 0) return

        const prev = selectionIndex.value > -1
          ? selectionIndex.value - 1
          : length - 1

        if (model.value[prev]) {
          selectionIndex.value = prev
        } else {
          selectionIndex.value = -1
          vTextFieldRef.value.setSelectionRange(search.value?.length, search.value?.length)
        }
      }

      if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return

        const next = selectionIndex.value + 1

        if (model.value[next]) {
          selectionIndex.value = next
        } else {
          selectionIndex.value = -1
          vTextFieldRef.value.setSelectionRange(0, 0)
        }
      }
    }

    function onChange (e: Event) {
      if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
        const item = items.value.find(item => item.title === (e.target as HTMLInputElement).value)
        if (item) {
          select(item)
        }
      }
    }

    function onAfterLeave () {
      if (isFocused.value) {
        isPristine.value = true
        vTextFieldRef.value?.focus()
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
      if (v == null || (v === '' && !props.multiple)) model.value = []
    }

    const isSelecting = shallowRef(false)

    /** @param set - null means toggle */
    function select (item: ListItem | undefined, set: boolean | null = true) {
      if (!item || item.props.disabled) return

      if (props.multiple) {
        const index = model.value.findIndex(selection => props.valueComparator(selection.value, item.value))
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
        search.value = add && !hasSelectionSlot.value ? item.title : ''

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false
          isPristine.value = true
        })
      }
    }

    watch(isFocused, (val, oldVal) => {
      if (val === oldVal) return

      if (val) {
        isSelecting.value = true
        search.value = (props.multiple || hasSelectionSlot.value) ? '' : String(model.value.at(-1)?.props.title ?? '')
        isPristine.value = true

        nextTick(() => isSelecting.value = false)
      } else {
        if (!props.multiple && search.value == null) model.value = []
        else if (
          highlightFirst.value &&
          !listHasFocus.value &&
          !model.value.some(({ value }) => value === displayItems.value[0].value)
        ) {
          select(displayItems.value[0])
        }
        menu.value = false
        search.value = ''
        selectionIndex.value = -1
      }
    })

    watch(search, val => {
      if (!isFocused.value || isSelecting.value) return

      if (val) menu.value = true

      isPristine.value = !val
    })

    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex(
          item => model.value.some(s => item.value === s.value)
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
          onChange={ onChange }
          class={[
            'v-autocomplete',
            `v-autocomplete--${props.multiple ? 'multiple' : 'single'}`,
            {
              'v-autocomplete--active-menu': menu.value,
              'v-autocomplete--chips': !!props.chips,
              'v-autocomplete--selection-slot': !!hasSelectionSlot.value,
              'v-autocomplete--selecting-index': selectionIndex.value > -1,
            },
            props.class,
          ]}
          style={ props.style }
          readonly={ props.readonly }
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
                  contentClass="v-autocomplete__content"
                  disabled={ menuDisabled.value }
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
                      selected={ selectedValues.value }
                      selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                      onMousedown={ (e: MouseEvent) => e.preventDefault() }
                      onKeydown={ onListKeydown }
                      onFocusin={ onFocusin }
                      onFocusout={ onFocusout }
                      onScrollPassive={ onListScroll }
                      tabindex="-1"
                      aria-live="polite"
                      color={ props.itemColor ?? props.color }
                      { ...props.listProps }
                    >
                      { slots['prepend-item']?.() }

                      { !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                        <VListItem title={ t(props.noDataText) } />
                      ))}

                      <VVirtualScroll ref={ vVirtualScrollRef } renderless items={ displayItems.value }>
                        { ({ item, index, itemRef }) => {
                          const itemProps = mergeProps(item.props, {
                            ref: itemRef,
                            key: index,
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
                                  : highlightResult(item.title, getMatches(item)?.title, search.value?.length ?? 0)
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
                        'v-autocomplete__selection',
                        index === selectionIndex.value && [
                          'v-autocomplete__selection--selected',
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
                          <span class="v-autocomplete__selection-text">
                            { item.title }
                            { props.multiple && (index < model.value.length - 1) && (
                              <span class="v-autocomplete__selection-comma">,</span>
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
                    class="v-autocomplete__menu-icon"
                    icon={ props.menuIcon }
                    onMousedown={ onMousedownMenuIcon }
                    onClick={ noop }
                    aria-label={ t(label.value) }
                    title={ t(label.value) }
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
      filteredItems,
      select,
    }, vTextFieldRef)
  },
})

export type VAutocomplete = InstanceType<typeof VAutocomplete>
