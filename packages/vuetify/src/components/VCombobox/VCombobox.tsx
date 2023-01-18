// Styles
import './VCombobox.sass'

// Components
import { makeSelectProps } from '@/components/VSelect/VSelect'
import { VCheckboxBtn } from '@/components/VCheckbox'
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { highlightResult, makeFilterProps, useFilter } from '@/composables/filter'
import { makeTransitionProps } from '@/composables/transition'
import { transformItem, useItems } from '@/composables/items'
import { useForm } from '@/composables/form'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTextColor } from '@/composables/color'

// Utility
import { computed, mergeProps, nextTick, ref, watch } from 'vue'
import { genericComponent, omit, useRender, wrapInArray } from '@/util'
import { filterVTextFieldProps, makeVTextFieldProps } from '../VTextField/VTextField'

// Types
import type { PropType } from 'vue'
import type { MakeSlots, SlotsToProps } from '@/util'
import type { InternalItem } from '@/composables/items'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = string | (T extends Primitive
  ? T
  : (ReturnObject extends true ? T : any))

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject>

export const VCombobox = genericComponent<new <
  T,
  ReturnObject extends boolean = true,
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
  name: 'VCombobox',

  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    delimiters: Array as PropType<string[]>,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps({ hideNoData: true, returnObject: true }),
    ...omit(makeVTextFieldProps({
      modelValue: null,
    }), ['validationValue', 'dirty', 'appendInnerIcon']),
    ...makeTransitionProps({ transition: false }),
  },

  emits: {
    'update:modelValue': (val: any) => true,
    'update:search': (val: string) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const isFocused = ref(false)
    const isPristine = ref(true)
    const menu = useProxiedModel(props, 'menu')
    const selectionIndex = ref(-1)
    const color = computed(() => vTextFieldRef.value?.color)
    const { items, transformIn, transformOut } = useItems(props)
    const { textColorClasses, textColorStyles } = useTextColor(color)
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => transformIn(wrapInArray(v || [])),
      v => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : (transformed[0] ?? null)
      }
    )
    const form = useForm()
    const _search = ref(!props.multiple ? model.value[0]?.title ?? '' : '')
    const search = computed<string>({
      get: () => {
        return _search.value
      },
      set: val => {
        _search.value = val
        if (!props.multiple) {
          model.value = [transformItem(props, val)]
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
        if (isFocused.value) menu.value = true

        isPristine.value = !val
      },
    })
    watch(_search, value => {
      emit('update:search', value)
    })
    watch(model, value => {
      if (!props.multiple) {
        _search.value = value[0]?.title ?? ''
      }
    })

    const { filteredItems, getMatches } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value))

    const selections = computed(() => {
      return model.value.map(v => {
        return items.value.find(item => props.valueComparator(item.value, v.value)) || v
      })
    })

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter(filteredItem => !selections.value.some(s => s.value === filteredItem.value))
      }
      return filteredItems.value
    })

    const selected = computed(() => selections.value.map(selection => selection.props.value))
    const selection = computed(() => selections.value[selectionIndex.value])
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
        props.readonly || form?.isReadonly.value
      ) return

      menu.value = true
    }
    function onKeydown (e: KeyboardEvent) {
      if (props.readonly || form?.isReadonly.value) return

      const selectionStart = vTextFieldRef.value.selectionStart
      const length = selected.value.length

      if (selectionIndex.value > -1) e.preventDefault()

      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false
      }

      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        isPristine.value = true
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        listRef.value?.focus('next')
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        listRef.value?.focus('prev')
      }

      if (!props.multiple) return

      if (['Backspace', 'Delete'].includes(e.key)) {
        if (selectionIndex.value < 0) {
          if (e.key === 'Backspace' && !search.value) {
            selectionIndex.value = length - 1
          }

          return
        }

        select(selection.value)

        nextTick(() => !selection.value && (selectionIndex.value = length - 2))
      }

      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && selectionStart > 0) return

        const prev = selectionIndex.value > -1
          ? selectionIndex.value - 1
          : length - 1

        if (selections.value[prev]) {
          selectionIndex.value = prev
        } else {
          selectionIndex.value = -1
          vTextFieldRef.value.setSelectionRange(search.value.length, search.value.length)
        }
      }

      if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return

        const next = selectionIndex.value + 1

        if (selections.value[next]) {
          selectionIndex.value = next
        } else {
          selectionIndex.value = -1
          vTextFieldRef.value.setSelectionRange(0, 0)
        }
      }

      if (e.key === 'Enter' && search.value) {
        select(transformItem(props, search.value))
        search.value = ''
      }
    }
    function onAfterLeave () {
      if (isFocused.value) isPristine.value = true
    }
    function select (item: InternalItem) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => props.valueComparator(selection, item.value))

        if (index === -1) {
          model.value = [...model.value, item]
        } else {
          const value = [...model.value]
          value.splice(index, 1)
          model.value = value
        }

        search.value = ''
      } else {
        model.value = [item]
        _search.value = item.title

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false
          isPristine.value = true
        })
      }
    }

    function onFocusin (e: FocusEvent) {
      isFocused.value = true
    }

    function onFocusout (e: FocusEvent) {
      if (e.relatedTarget == null) {
        vTextFieldRef.value?.focus()
      }
    }

    watch(filteredItems, val => {
      if (!val.length && props.hideNoData) menu.value = false
    })

    watch(isFocused, val => {
      if (val) {
        selectionIndex.value = -1
      } else {
        menu.value = false

        if (!props.multiple || !search.value) return

        model.value = [...model.value, transformItem(props, search.value)]
        search.value = ''
      }
    })

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)
      const hasList = !!((!props.hideNoData || displayItems.value.length) || slots.prepend || slots.append || slots['no-data'])
      const [textFieldProps] = filterVTextFieldProps(props)

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          v-model={ search.value }
          onUpdate:modelValue={ v => { if (v == null) model.value = [] } }
          validationValue={ model.externalValue }
          dirty={ model.value.length > 0 }
          class={[
            'v-combobox',
            {
              'v-combobox--active-menu': menu.value,
              'v-combobox--chips': !!props.chips,
              'v-combobox--selecting-index': selectionIndex.value > -1,
              [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true,
            },
          ]}
          appendInnerIcon={ props.items.length ? props.menuIcon : undefined }
          readonly={ props.readonly }
          onClick:clear={ onClear }
          onClick:control={ onClickControl }
          onClick:input={ onClickControl }
          onFocus={ () => isFocused.value = true }
          onBlur={ () => isFocused.value = false }
          onKeydown={ onKeydown }
        >
          {{
            ...slots,
            default: () => (
              <>
                <VMenu
                  v-model={ menu.value }
                  activator="parent"
                  contentClass="v-combobox__content"
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
                      onFocusout={ onFocusout }
                    >
                      { !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                        <VListItem title={ t(props.noDataText) } />
                      )) }

                      { slots['prepend-item']?.() }

                      { displayItems.value.map((item, index) => slots.item?.({
                        item,
                        index,
                        props: mergeProps(item.props, { onClick: () => select(item) }),
                      }) ?? (
                        <VListItem
                          key={ index }
                          { ...item.props }
                          onClick={ () => select(item) }
                        >
                          {{
                            prepend: ({ isSelected }) => props.multiple && !props.hideSelected ? (
                              <VCheckboxBtn modelValue={ isSelected } ripple={ false } />
                            ) : undefined,
                            title: () => {
                              return isPristine.value
                                ? item.title
                                : highlightResult('v-combobox', item.title, getMatches(item)?.title)
                            },
                          }}
                        </VListItem>
                      )) }

                      { slots['append-item']?.() }
                    </VList>
                  ) }
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
                            <span class="v-combobox__selection-text">
                              { item.title }
                              { props.multiple && (index < selections.value.length - 1) && (
                                <span class="v-combobox__selection-comma">,</span>
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
