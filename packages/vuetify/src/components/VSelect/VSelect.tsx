// Styles
import './VSelect.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VAvatar } from '@/components/VAvatar'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VDivider } from '@/components/VDivider'
import { VIcon } from '@/components/VIcon'
import { useInputIcon } from '@/components/VInput/InputIcon'
import { VList, VListItem, VListSubheader } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VSheet } from '@/components/VSheet'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { VVirtualScroll } from '@/components/VVirtualScroll'
import { VHighlight } from '@/labs/VHighlight'

// Composables
import { useFocusRepair } from './useFocusRepair'
import { useScrolling } from './useScrolling'
import { useSelectionMenu } from './useSelectionMenu'
import { useFocusGroups } from '../../composables/focusGroups'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { IconValue } from '@/composables/icons'
import { makeItemsProps, useItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { makeMenuActivatorProps, useMenuActivator } from '@/composables/menuActivator'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTransitionProps } from '@/composables/transition'

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
  isFunction,
  isNumber,
  matchesSelector,
  omit,
  propsFactory,
  useRender,
  wrapInArray,
} from '@/util'

// Types
import type { Component, PropType, Ref } from 'vue'
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
  eager: Boolean,
  form: String,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object as PropType<VList['$props']>,
  },
  menu: Boolean,
  menuElevation: [Number, String],
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
  openOnFocus: Boolean,
  itemColor: String,
  noAutoScroll: Boolean,

  ...makeMenuActivatorProps(),
  ...makeItemsProps({ itemChildren: false }),
}, 'Select')

export const makeVSelectProps = propsFactory({
  search: String,

  ...makeFilterProps({ filterKeys: ['title'] }),
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox',
  }), ['validationValue', 'dirty']),
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
    subheader: { props: Record<string, unknown>, index: number }
    divider: { props: Record<string, unknown>, index: number }
    'prepend-item': never
    'append-item': never
    'no-data': never
    'menu-header': { search: Ref<string | undefined>, filteredItems: ListItem<Item>[] }
    'menu-footer': { search: Ref<string | undefined>, filteredItems: ListItem<Item>[] }
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSelect',

  props: makeVSelectProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:menu': (ue: boolean) => true,
    'update:search': (value: string) => true,
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

    const { items, transformIn, transformOut } = useItems(props)
    const search = useProxiedModel(props, 'search', '')
    const { filteredItems, getMatches } = useFilter(props, items, () => search.value)
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
    const selectedValues = computed(() => model.value.map(selection => selection.value))
    const isFocused = shallowRef(false)
    const closableChips = toRef(() => props.closableChips && !form.isReadonly.value && !form.isDisabled.value)
    const { InputIcon } = useInputIcon(props)

    let keyboardLookupPrefix = ''
    let keyboardLookupIndex = 0
    let keyboardLookupLastTime: number
    let openedByKeyboard = false

    const displayItems = computed(() => {
      const baseItems = search.value ? filteredItems.value : items.value
      if (props.hideSelected) {
        return baseItems.filter(item => !model.value.some(s => (props.valueComparator || deepEqual)(s, item)))
      }
      return baseItems
    })

    const menuDisabled = computed(() => (
      (props.hideNoData && !displayItems.value.length) ||
      form.isReadonly.value || form.isDisabled.value
    ))
    const { menu, closeOnSelect } = useSelectionMenu(props, { vMenuRef, menuDisabled, isFocused })

    const { menuId, ariaExpanded, ariaControls } = useMenuActivator(props, menu)

    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...(props.menuProps?.activatorProps || {}),
          'aria-haspopup': 'listbox', // Set aria-haspopup to 'listbox'
        },
      }
    })

    const {
      listEvents,
      focusItem,
      focusFirstItem,
      focusLastItem,
      onActivatorKeydown,
      setPendingFocus,
      flushPendingFocus,
    } = useScrolling(
      listRef,
      vTextFieldRef,
      vVirtualScrollRef,
      displayItems,
      {
        selectedIndex: getSelectedIndex,
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

    function onClear (e: MouseEvent | KeyboardEvent) {
      if (props.openOnClear) {
        menu.value = true
      }
    }
    function onMousedownControl () {
      if (menuDisabled.value) return

      openedByKeyboard = false
      setPendingFocus(null)
      menu.value = !menu.value
    }

    function onMenuKeydown (e: KeyboardEvent) {
      if (e.key === 'Tab') {
        onTabKeydown(e)
      }

      if (listRef.value?.$el.contains(e.target) && checkPrintable(e)) {
        onKeydown(e)
      }
    }

    function onKeydown (e: KeyboardEvent) {
      if (!e.key || form.isReadonly.value) return

      switch (e.key) {
        case 'Escape':
        case 'Tab':
          menu.value = false
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          openedByKeyboard = true
          menu.value = true
          break
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault()
          openedByKeyboard = true
          if (onActivatorKeydown(e, menu)) return
          break
        case 'Home':
          e.preventDefault()
          if (menu.value) focusFirstItem()
          break
        case 'End':
          e.preventDefault()
          if (menu.value) focusLastItem()
          break
        case 'Backspace':
          if (!props.clearable) break

          e.preventDefault()
          for (const item of model.value) emit('item:removed', item)
          model.value = []
          onClear(e)
          return
      }

      // html select hotkeys
      const KEYBOARD_LOOKUP_THRESHOLD = 1000 // milliseconds

      if (!checkPrintable(e)) return

      const now = performance.now()
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = ''
        keyboardLookupIndex = 0
      }
      keyboardLookupPrefix += e.key.toLowerCase()
      keyboardLookupLastTime = now

      const items = displayItems.value
      function findItem () {
        let result = findItemBase()
        if (result) return result

        if (keyboardLookupPrefix.at(-1) === keyboardLookupPrefix.at(-2)) {
          // No matches but we have a repeated letter, try the next item with that prefix
          keyboardLookupPrefix = keyboardLookupPrefix.slice(0, -1)
          keyboardLookupIndex++
          result = findItemBase()
          if (result) return result
        }

        // Still nothing, wrap around to the top
        keyboardLookupIndex = 0
        result = findItemBase()
        if (result) return result

        // Still nothing, try just the new letter
        keyboardLookupPrefix = e.key.toLowerCase()
        return findItemBase()
      }
      function findItemBase () {
        for (let i = keyboardLookupIndex; i < items.length; i++) {
          const _item = items[i]
          if (_item.title.toLowerCase().startsWith(keyboardLookupPrefix)) {
            return [_item, i] as const
          }
        }
        return undefined
      }

      const result = findItem()
      if (!result) return

      const [item, index] = result
      keyboardLookupIndex = index
      if (menu.value) {
        if (!props.multiple) select(item, true, false)
        focusItem(index)
      } else if (!props.multiple) {
        select(item, true)
      }
    }

    /** @param set - null means toggle */
    function select (item: ListItem, set: boolean | null = true, closeMenu = true) {
      if (item.props.disabled) return

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

        if (closeMenu) nextTick(() => closeOnSelect())
      }
    }
    let mousedownInsideContentAt = 0
    function onMousedownContent () {
      mousedownInsideContentAt = performance.now()
    }

    function onBlur (e: FocusEvent) {
      const target = e.target as Element
      if (!vTextFieldRef.value?.$el.contains(target)) {
        menu.value = false
      }

      // Clicking dead space in the menu parks focus on body, we still count as focused
      const next = e.relatedTarget as Node | null
      if (
        vMenuRef.value?.contentEl?.contains(next) ||
        (!next && performance.now() - mousedownInsideContentAt < 10)
      ) {
        isFocused.value = true
      }
    }
    function getSelectedIndex () {
      return displayItems.value.findIndex(
        item => model.value.some(s => (props.valueComparator || deepEqual)(s.value, item.value))
      )
    }
    async function onAfterEnter () {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems()
      }
      if (!listRef.value || !isFocused.value) return

      if (flushPendingFocus()) return

      if (listRef.value.$el?.contains(getActiveElement())) return

      const selected = getSelectedIndex()
      if (selected >= 0 && await focusItem(selected, !props.noAutoScroll)) return

      if (openedByKeyboard) {
        focusFirstItem()
      }
    }
    function onAfterLeave () {
      search.value = ''

      if (isFocused.value) {
        if (vMenuRef.value?.contentEl?._clickOutside?.lastMousedownWasOutside) {
          isFocused.value = false
        } else {
          vTextFieldRef.value?.focus()
        }
      }
    }
    function onFocusin (e: FocusEvent) {
      isFocused.value = true
    }
    function onFocusout (e: FocusEvent) {
      if (
        !vTextFieldRef.value?.$el.contains(e.relatedTarget as Node) &&
        !(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)
      ) {
        if (repairOrphanedFocus(e)) return
        isFocused.value = false
      }
    }
    function onModelUpdate (v: any) {
      if (v == null) {
        for (const item of model.value) emit('item:removed', item)
        model.value = []
      } else if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
        const item = items.value.find(item => item.title === v)
        if (item) {
          select(item)
        }
      } else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = ''
      }
    }

    watch(menu, val => {
      if (!val) {
        openedByKeyboard = false
        setPendingFocus(null)
      }

      if (!props.hideSelected && menu.value && model.value.length) {
        const index = getSelectedIndex()
        IN_BROWSER && !props.noAutoScroll && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index, 'center')
        })
      }
    })

    watch(items, (newVal, oldVal) => {
      if (menu.value) return

      if (isFocused.value && props.hideNoData && !oldVal.length && newVal.length) {
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

      const menuSlotProps = {
        search,
        filteredItems: filteredItems.value,
      }

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          modelValue={ model.value.map(v => v.props.title).join(', ') }
          name={ undefined }
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
                  transition={ props.transition }
                  onAfterEnter={ onAfterEnter }
                  onAfterLeave={ onAfterLeave }
                  { ...computedMenuProps.value }
                  contentClass={['v-select__content', computedMenuProps.value.contentClass]}
                >
                  <VSheet
                    elevation={ props.menuElevation }
                    onFocusin={ onFocusin }
                    onFocusout={ onFocusout }
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
                        key="select-list"
                        ref={ listRef }
                        selected={ selectedValues.value }
                        selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
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
                                    return search.value
                                      ? (
                                        <VHighlight
                                          text={ item.title }
                                          matches={ getMatches(item)?.title }
                                          markClass="v-select__mask"
                                          matchAll
                                          ignoreCase
                                        />
                                      )
                                      : item.title
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
                    color={ vTextFieldRef.value?.fieldIconColor }
                    icon={ props.menuIcon }
                    aria-hidden
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
      menu,
      search,
      filteredItems,
      select,
    }, vTextFieldRef)
  },
})

export type VSelect = InstanceType<typeof VSelect>
