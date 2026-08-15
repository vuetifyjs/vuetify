// Styles
import './VAutocomplete.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VDivider } from '@/components/VDivider'
import { VIcon } from '@/components/VIcon'
import { useInputIcon } from '@/components/VInput/InputIcon'
import { VList, VListItem, VListSubheader } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { makeSelectProps } from '@/components/VSelect/VSelect'
import { VSheet } from '@/components/VSheet'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { VVirtualScroll } from '@/components/VVirtualScroll'
import { VHighlight } from '@/labs/VHighlight'

// Composables
import { useFocusRepair } from '../VSelect/useFocusRepair'
import { useScrolling } from '../VSelect/useScrolling'
import { useSelectionMenu } from '../VSelect/useSelectionMenu'
import { useTextColor } from '@/composables/color'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useFocusGroups } from '@/composables/focusGroups'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { useMenuActivator } from '@/composables/menuActivator'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, mergeProps, nextTick, ref, shallowRef, toRef, watch } from 'vue'
import {
  camelizeProps,
  checkPrintable,
  deepEqual,
  ensureValidVNode,
  genericComponent,
  getActiveElement,
  IN_BROWSER,
  isComposingIgnoreKey,
  isFunction,
  isNumber,
  matchesSelector,
  noop,
  omit,
  propsFactory,
  useRender,
  wrapInArray,
} from '@/util'

// Types
import type { PropType, Ref } from 'vue'
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

export const makeVAutocompleteProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String] as PropType<boolean | 'exact'>,
  },
  clearOnSelect: Boolean,
  search: String,
  closeOnInputClick: Boolean,

  ...makeFilterProps({ filterKeys: ['title'] }),
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox',
  }), ['validationValue', 'dirty']),
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
    item: { item: Item, internalItem: ListItem<Item>, index: number, props: Record<string, unknown> }
    chip: { item: Item, internalItem: ListItem<Item>, index: number, props: Record<string, unknown> }
    selection: { item: Item, internalItem: ListItem<Item>, index: number }
    subheader: { props: Record<string, unknown>, index: number }
    divider: { props: Record<string, unknown>, index: number }
    'prepend-item': never
    'append-item': never
    'no-data': never
    'menu-header': { search: Ref<string | undefined>, filteredItems: ListItem<Item>[] }
    'menu-footer': { search: Ref<string | undefined>, filteredItems: ListItem<Item>[] }
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VAutocomplete',

  props: makeVAutocompleteProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:search': (value: any) => true,
    'update:modelValue': (value: any) => true,
    'update:menu': (value: boolean) => true,
    'item:added': (item: ListItem) => true,
    'item:removed': (item: ListItem) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()

    const vTextFieldRef = ref<VTextField>()
    const vMenuRef = ref<VMenu>()
    const listRef = ref<VList>()
    const headerRef = ref<HTMLElement>()
    const footerRef = ref<HTMLElement>()
    const vVirtualScrollRef = ref<VVirtualScroll>()

    const isFocused = shallowRef(false)
    const isPristine = shallowRef(true)
    const listHasFocus = shallowRef(false)
    const selectionIndex = shallowRef(-1)
    const _searchLock = shallowRef<string | null>(null)
    const { items, transformIn, transformOut } = useItems(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => vTextFieldRef.value?.color)
    const { InputIcon } = useInputIcon(props)
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
      return isFunction(props.counterValue) ? props.counterValue(model.value)
        : isNumber(props.counterValue) ? props.counterValue
        : model.value.length
    })
    const form = useForm(props)
    const { filteredItems, getMatches } = useFilter(
      props,
      items,
      () => _searchLock.value ?? (isPristine.value ? '' : search.value))

    const displayItems = computed(() => {
      if (props.hideSelected && _searchLock.value === null) {
        return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value))
      }
      return filteredItems.value
    })

    const closableChips = toRef(() => props.closableChips && !form.isReadonly.value && !form.isDisabled.value)
    const hasChips = computed(() => !!(props.chips || slots.chip))
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection)

    const selectedTitle = computed(() => {
      return (props.multiple || hasSelectionSlot.value)
        ? ''
        : String(model.value.at(-1)?.props.title ?? '')
    })

    const selectedValues = computed(() => model.value.map(selection => selection.props.value))

    const firstSelectableItem = computed(() => displayItems.value.find(x => x.type === 'item' && !x.props.disabled))

    const highlightFirst = computed(() => {
      const selectFirst = props.autoSelectFirst === true ||
        (props.autoSelectFirst === 'exact' && search.value === firstSelectableItem.value?.title)
      return selectFirst &&
        displayItems.value.length > 0 &&
        !isPristine.value &&
        !listHasFocus.value
    })

    const menuDisabled = computed(() => (
      (props.hideNoData && !displayItems.value.length) ||
      form.isReadonly.value || form.isDisabled.value
    ))
    const { menu, closeOnSelect } = useSelectionMenu(props, { vMenuRef, menuDisabled, isFocused })

    const { menuId, ariaExpanded, ariaControls } = useMenuActivator(props, menu)

    const {
      listEvents,
      onActivatorKeydown,
      setPendingFocus,
      flushPendingFocus,
    } = useScrolling(
      listRef,
      vTextFieldRef,
      vVirtualScrollRef,
      displayItems,
      {
        selectedIndex: () => isPristine.value ? getSelectedIndex() : -1,
        headerEl: () => headerRef.value,
        menuContentEl: () => vMenuRef.value?.contentEl,
        noAutoScroll: () => props.noAutoScroll,
      }
    )

    const repairOrphanedFocus = useFocusRepair(
      menu,
      () => vMenuRef.value?.contentEl,
      () => vTextFieldRef.value?.controlRef,
    )
    const { onTabKeydown } = useFocusGroups({
      groups: [
        { type: 'element' as const, contentRef: headerRef },
        { type: 'list' as const, contentRef: listRef, displayItemsCount: () => displayItems.value.length },
        { type: 'element' as const, contentRef: footerRef },
      ],
      onLeave: () => {
        menu.value = false
        vTextFieldRef.value?.focus()
      },
    })
    function onClear (e: MouseEvent) {
      if (props.openOnClear) {
        menu.value = true
      }

      search.value = ''
    }
    function onMousedownControl () {
      if (menuDisabled.value) return

      menu.value = props.closeOnInputClick ? !menu.value : true
    }
    function onMousedownMenuIcon (e: MouseEvent) {
      if (menuDisabled.value) return

      if (isFocused.value) {
        e.preventDefault()
        e.stopPropagation()
      }
      menu.value = !menu.value
    }
    function onMenuKeydown (e: KeyboardEvent) {
      if (e.key === 'Tab') {
        onTabKeydown(e)
      }

      if (listRef.value?.$el.contains(e.target) && (checkPrintable(e) || e.key === 'Backspace')) {
        vTextFieldRef.value?.focus()
      }
    }

    function onKeydown (e: KeyboardEvent) {
      if (isComposingIgnoreKey(e) || form.isReadonly.value) return

      switch (e.key) {
        case 'Escape':
          menu.value = false
          break
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault()
          if (onActivatorKeydown(e, menu)) break
          if (e.key === 'ArrowDown' && highlightFirst.value) {
            listRef.value?.focus('next')
          }
          break
        case 'Enter':
          e.preventDefault()
          menu.value = true
          selectHighlighted()
          break
        case 'Tab':
          selectHighlighted()
          menu.value = false
          break
        default:
          onSelectionKeydown(e)
      }
    }

    function selectHighlighted () {
      const item = firstSelectableItem.value
      if (!highlightFirst.value || !item) return
      if (model.value.some(({ value }) => value === item.value)) return

      select(item)
    }

    function onSelectionKeydown (e: KeyboardEvent) {
      const length = model.value.length

      if (['Backspace', 'Delete'].includes(e.key)) {
        if (
          !props.multiple &&
          hasSelectionSlot.value &&
          length > 0 &&
          !search.value
        ) {
          select(model.value[0], false)
          return
        }

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
        if (selectionIndex.value < 0 && (vTextFieldRef.value?.selectionStart ?? 0) > 0) return

        const prev = selectionIndex.value > -1
          ? selectionIndex.value - 1
          : length - 1

        if (model.value[prev]) {
          selectionIndex.value = prev
        } else {
          const searchLength = search.value?.length ?? null
          selectionIndex.value = -1
          vTextFieldRef.value?.setSelectionRange(searchLength, searchLength)
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

    function onChange (e: Event) {
      if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
        const item = items.value.find(item => item.title === (e.target as HTMLInputElement).value)
        if (item) {
          select(item)
        }
      }
    }

    function getSelectedIndex () {
      return displayItems.value.findIndex(
        item => model.value.some(s => (props.valueComparator || deepEqual)(s.value, item.value))
      )
    }

    function onAfterEnter () {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems()
      }
      flushPendingFocus()
    }

    function onAfterLeave () {
      if (isFocused.value) {
        if (vMenuRef.value?.contentEl?._clickOutside?.lastMousedownWasOutside) {
          isFocused.value = false
        } else {
          isPristine.value = true
          vTextFieldRef.value?.focus()
        }
      }
      _searchLock.value = null
    }

    function onFocusin (e: FocusEvent) {
      isFocused.value = true
      setTimeout(() => {
        listHasFocus.value = true
      })
    }
    function onFocusout (e: FocusEvent) {
      listHasFocus.value = false
      if (!vTextFieldRef.value?.$el.contains(e.relatedTarget as Node)) {
        if (repairOrphanedFocus(e)) return
        isFocused.value = false
      }
    }
    function onUpdateModelValue (v: any) {
      if (v == null || (v === '' && !props.multiple && !hasSelectionSlot.value)) {
        for (const item of model.value) emit('item:removed', item)
        model.value = []
      }
    }

    let mousedownInsideContentAt = 0
    function onMousedownContent () {
      mousedownInsideContentAt = performance.now()
    }

    function onBlur (e: FocusEvent) {
      const next = e.relatedTarget as Node | null
      const menuContent = vMenuRef.value?.contentEl
      if (
        menuContent?.contains(next) ||
        (!next && performance.now() - mousedownInsideContentAt < 10)
      ) {
        isFocused.value = true
      }
    }

    /** @param set - null means toggle */
    function select (item: ListItem | undefined, set: boolean | null = true) {
      if (!item || item.props.disabled) return

      const comparator = props.valueComparator || deepEqual

      if (props.multiple) {
        const index = model.value.findIndex(selection => comparator(selection.value, item.value))
        const add = set == null ? !~index : set

        if (~index) {
          const value = add ? [...model.value, item] : [...model.value]
          const [removed] = value.splice(index, 1)
          if (!add) emit('item:removed', removed) // skip if only reordered
          model.value = value
        } else if (add) {
          emit('item:added', item)
          model.value = [...model.value, item]
        }

        if (props.clearOnSelect) {
          search.value = ''
        }
      } else {
        const add = set !== false
        const old = model.value[0]

        if (add) {
          if (old && !comparator(old.value, item.value)) {
            emit('item:removed', old)
            emit('item:added', item)
          } else if (!old) {
            emit('item:added', item)
          }
          model.value = [item]
        } else {
          if (old) emit('item:removed', old)
          model.value = []
        }

        _searchLock.value = isPristine.value ? '' : (search.value ?? '')
        search.value = add && !hasSelectionSlot.value ? item.title : ''

        // watch for search watcher to trigger
        nextTick(() => {
          closeOnSelect()
          isPristine.value = true
        })
      }
    }

    watch(isFocused, (val, oldVal) => {
      if (val === oldVal) return

      if (val) {
        isPristine.value = true
      } else {
        if (!props.multiple && search.value == null) {
          for (const item of model.value) emit('item:removed', item)
          model.value = []
        }
        menu.value = false
        if (!isPristine.value && search.value) {
          _searchLock.value = search.value
        }
        search.value = selectedTitle.value
        isPristine.value = true
        selectionIndex.value = -1
      }
    })

    watch(selectedTitle, val => {
      if (isFocused.value) return
      search.value = val
    }, { immediate: true })

    watch(search, val => {
      if (!isFocused.value) return

      if (val) menu.value = true

      isPristine.value = !val

      if (menu.value) {
        nextTick(() => {
          vVirtualScrollRef.value?.scrollToIndex(0)
          if (listRef.value?.$el?.contains(getActiveElement())) {
            vTextFieldRef.value?.focus()
          }
        })
      }
    })

    watch(menu, val => {
      if (!val) setPendingFocus(null)

      if (!props.hideSelected && val && model.value.length && isPristine.value) {
        const index = getSelectedIndex()
        IN_BROWSER && !props.noAutoScroll && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index, 'center')
        })
      }
      if (val) _searchLock.value = null
    })

    watch(items, (newVal, oldVal) => {
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

      const menuSlotProps = {
        search,
        filteredItems: filteredItems.value,
      }

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          form=""
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
          readonly={ form.isReadonly.value }
          placeholder={ isDirty ? undefined : props.placeholder }
          onClick:clear={ onClear }
          onMousedown:control={ onMousedownControl }
          onKeydown={ onKeydown }
          onBlur={ onBlur }
          aria-expanded={ ariaExpanded.value }
          aria-controls={ ariaControls.value }
        >
          {{
            ...slots,
            default: ({ id }) => (
              <>
                { selectedValues.value.map((value, i) => (
                  <input
                    key={ i }
                    type="hidden"
                    name={ props.name }
                    value={ value }
                    form={ props.form }
                  />
                ))}

                <VMenu
                  id={ menuId.value }
                  ref={ vMenuRef }
                  v-model={ menu.value }
                  activator="parent"
                  captureFocus={ false }
                  openOnArrow={ false }
                  disabled={ menuDisabled.value }
                  eager={ props.eager }
                  maxHeight={ 310 }
                  openOnClick={ false }
                  closeOnContentClick={ false }
                  onAfterEnter={ onAfterEnter }
                  onAfterLeave={ onAfterLeave }
                  { ...props.menuProps }
                  contentClass={['v-autocomplete__content', props.menuProps?.contentClass]}
                >
                  <VSheet
                    elevation={ props.menuElevation }
                    onFocusin={ onFocusin }
                    onKeydown={ onMenuKeydown }
                    onMousedown={ onMousedownContent }
                  >
                    { slots['menu-header'] && (
                      <header ref={ headerRef }>
                        { slots['menu-header'](menuSlotProps) }
                      </header>
                    )}

                    { hasList && (
                      <VList
                        key="autocomplete-list"
                        ref={ listRef }
                        class="v-list--navigable"
                        filterable
                        selected={ selectedValues.value }
                        selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                        onMousedown={ (e: MouseEvent) => e.preventDefault() }
                        onFocusout={ onFocusout }
                        tabindex="-1"
                        selectable={ !!displayItems.value.length }
                        aria-live="polite"
                        aria-labelledby={ `${id.value}-label` }
                        aria-multiselectable={ props.multiple }
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
                          const camelizedProps = camelizeProps(item.props)
                          const itemProps = mergeProps(item.props, {
                            ref: itemRef,
                            key: item.value,
                            active: (highlightFirst.value && item === firstSelectableItem.value) ? true : undefined,
                            onClick: () => select(item, null),
                            'aria-posinset': index + 1,
                            'aria-setsize': displayItems.value.length,
                          })

                          if (item.type === 'divider') {
                            return slots.divider?.({ props: item.raw, index }) ?? (
                              <VDivider { ...item.props } key={ `divider-${index}` } />
                            )
                          }

                          if (item.type === 'subheader') {
                            return slots.subheader?.({ props: item.raw, index }) ?? (
                              <VListSubheader { ...item.props } key={ `subheader-${index}` } />
                            )
                          }

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
                                      aria-hidden
                                      onClick={ (event: MouseEvent) => event.preventDefault() }
                                    />
                                  ) : undefined }

                                  { camelizedProps.prependAvatar && (
                                    <VAvatar image={ camelizedProps.prependAvatar } />
                                  )}

                                  { camelizedProps.prependIcon && (
                                    <VIcon icon={ camelizedProps.prependIcon } />
                                  )}
                                </>
                              ),
                              title: () => {
                                return isPristine.value
                                  ? item.title
                                  : (
                                    <VHighlight
                                      text={ item.title }
                                      matches={ getMatches(item)?.title }
                                      markClass="v-autocomplete__mask"
                                      matchAll
                                      ignoreCase
                                    />
                                  )
                              },
                            }}
                          </VListItem>
                          )
                        }}
                      </VVirtualScroll>

                      { slots['append-item']?.() }
                    </VList>
                    )}

                    { slots['menu-footer'] && (
                      <footer ref={ footerRef }>
                        { slots['menu-footer'](menuSlotProps) }
                      </footer>
                    )}
                  </VSheet>
                </VMenu>

                { model.value.map((item, index) => {
                  function onChipClose (e: Event) {
                    e.stopPropagation()
                    e.preventDefault()

                    select(item, false)
                  }

                  const slotProps = mergeProps(VChip.filterProps(item.props), {
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
                  })

                  const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection
                  const slotContent = hasSlot
                    ? ensureValidVNode(
                      hasChips.value
                        ? slots.chip!({ item: item.raw, internalItem: item, index, props: slotProps })
                        : slots.selection!({ item: item.raw, internalItem: item, index })
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
                            closable={ closableChips.value }
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
                                closable: closableChips.value,
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
                    color={ vTextFieldRef.value?.fieldIconColor }
                    icon={ props.menuIcon }
                    onMousedown={ onMousedownMenuIcon }
                    onClick={ noop }
                    aria-hidden
                    tabindex="-1"
                  />
                ) : undefined }
                { props.appendInnerIcon && (
                  <InputIcon
                    key="append-icon"
                    name="appendInner"
                    color={ args[0].iconColor.value }
                  />
                )}
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
