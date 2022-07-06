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
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeTransitionProps } from '@/composables/transition'
import { transformItem, useItems } from '@/composables/items'
import { useForwardRef } from '@/composables/forwardRef'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTextColor } from '@/composables/color'

// Utility
import { computed, mergeProps, nextTick, ref, watch } from 'vue'
import { genericComponent, useRender, wrapInArray } from '@/util'

// Types
import type { FilterMatch } from '@/composables/filter'
import type { InternalItem } from '@/composables/items'
import type { MakeSlots } from '@/util'
import type { PropType } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

function highlightResult (text: string, matches: FilterMatch, length: number) {
  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented')

  return typeof matches === 'number' && ~matches
    ? (
      <>
        <span class="v-combobox__unmask">{ text.substr(0, matches) }</span>
        <span class="v-combobox__mask">{ text.substr(matches, length) }</span>
        <span class="v-combobox__unmask">{ text.substr(matches + length) }</span>
      </>
    )
    : text
}

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = T extends Primitive
  ? T
  : (ReturnObject extends true ? T : any)

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? Val<T, ReturnObject>[]
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
    modelValue?: Readonly<V>
    'onUpdate:modelValue'?: (val: V) => void
  }
  $slots: VInputSlots & VFieldSlots & MakeSlots<{
    item: [{ item: T, index: number, props: Record<string, unknown> }]
    chip: [{ item: T, index: number, props: Record<string, unknown> }]
    selection: [{ item: T, index: number }]
    'no-data': []
  }>
}>()({
  name: 'VCombobox',

  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    delimiters: Array as PropType<string[]>,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps({ hideNoData: true, returnObject: true }),
    ...makeTransitionProps({ transition: false }),
  },

  emits: {
    'update:modelValue': (val: any) => true,
    'update:searchInput': (val: string) => true,
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
    const _search = ref('')
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
      emit('update:searchInput', value)
    })

    const { filteredItems } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value))

    const selections = computed(() => {
      return model.value.map(v => {
        return items.value.find(item => item.value === v.value) || v
      })
    })
    const selected = computed(() => selections.value.map(selection => selection.props.value))
    const selection = computed(() => selections.value[selectionIndex.value])

    function onClear (e: MouseEvent) {
      model.value = []

      if (props.openOnClear) {
        menu.value = true
      }
    }
    function onClickControl () {
      if (props.hideNoData && !filteredItems.value.length) return

      menu.value = true
    }
    function onKeydown (e: KeyboardEvent) {
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

      if (e.key === 'Enter') {
        select(transformItem(props, search.value))
        search.value = ''
      }
    }
    function onAfterLeave () {
      if (isFocused.value) isPristine.value = true
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

        search.value = ''
      } else {
        search.value = item.title

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false
          isPristine.value = true
        })
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

      return (
        <VTextField
          ref={ vTextFieldRef }
          v-model={ search.value }
          onUpdate:modelValue={ v => { if (v == null) model.value = [] } }
          validationValue={ props.modelValue }
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
                  openOnClick={ false }
                  closeOnContentClick={ false }
                  transition={ props.transition }
                  onAfterLeave={ onAfterLeave }
                  { ...props.menuProps }
                >
                  <VList
                    selected={ selected.value }
                    selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                    onMousedown={ (e: MouseEvent) => e.preventDefault() }
                  >
                    { !filteredItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                      <VListItem title={ t(props.noDataText) } />
                    )) }

                    { filteredItems.value.map(({ item, matches }, index) => slots.item?.({
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
                          prepend: ({ isSelected }) => props.multiple ? (
                            <VCheckboxBtn modelValue={ isSelected } ripple={ false } />
                          ) : undefined,
                          title: () => {
                            return isPristine.value
                              ? item.title
                              : highlightResult(item.title, matches.title, search.value?.length ?? 0)
                          },
                        }}
                      </VListItem>
                    )) }
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
                    <div
                      key={ index }
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

    return useForwardRef({
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
