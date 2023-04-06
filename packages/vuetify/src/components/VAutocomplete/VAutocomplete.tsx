// Styles
import './VAutocomplete.sass'

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
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeTransitionProps } from '@/composables/transition'
import { useForm } from '@/composables/form'
import { useItems } from '@/composables/items'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, mergeProps, nextTick, ref, watch } from 'vue'
import { genericComponent, omit, useRender, wrapInArray } from '@/util'
import { makeVTextFieldProps } from '@/components/VTextField/VTextField'

// Types
import type { FilterMatch } from '@/composables/filter'
import type { InternalItem } from '@/composables/items'
import type { MakeSlots, SlotsToProps } from '@/util'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

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

type Val <T, ReturnObject extends boolean> = T extends Primitive
  ? T
  : (ReturnObject extends true ? T : any)

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject>

export const VAutocomplete = genericComponent<new <
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
  name: 'VAutocomplete',

  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    search: String,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null,
    }), ['validationValue', 'dirty', 'appendInnerIcon']),
    ...makeTransitionProps({ transition: false }),
  },

  emits: {
    'update:search': (val: any) => true,
    'update:modelValue': (val: any) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const isFocused = ref(false)
    const isPristine = ref(true)
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
    const search = useProxiedModel(props, 'search', '')
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
    const listRef = ref<VList>()

    function onClear (e: MouseEvent) {
      if (props.openOnClear) {
        menu.value = true
      }

      search.value = ''
    }
    function onMousedownControl () {
      if (
        (props.hideNoData && !items.value.length) ||
        props.readonly || form?.isReadonly.value
      ) return

      menu.value = true
    }
    function onKeydown (e: KeyboardEvent) {
      if (props.readonly || form?.isReadonly.value) return

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
        isPristine.value = true
      }

      if (e.key === 'ArrowDown') {
        listRef.value?.focus('next')
      } else if (e.key === 'ArrowUp') {
        listRef.value?.focus('prev')
      }
    }

    function onInput (e: InputEvent) {
      search.value = (e.target as HTMLInputElement).value
    }

    function onAfterLeave () {
      if (isFocused.value) isPristine.value = true
    }

    function onFocusin (e: FocusEvent) {
      isFocused.value = true
    }

    function onFocusout (e: FocusEvent) {
      if (e.relatedTarget == null) {
        vTextFieldRef.value?.focus()
      }
    }

    const isSelecting = ref(false)

    function select (item: InternalItem) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => props.valueComparator(selection, item.value))

        if (index === -1) {
          model.value = [...model.value, item]
          search.value = ''
        } else {
          const value = [...model.value]
          value.splice(index, 1)
          model.value = value
        }
      } else {
        model.value = [item]

        isSelecting.value = true

        if (!slots.selection) {
          search.value = item.title
        }

        menu.value = false
        isPristine.value = true

        nextTick(() => (isSelecting.value = false))
      }
    }

    watch(isFocused, val => {
      if (val) {
        isSelecting.value = true
        search.value = props.multiple || !!slots.selection ? '' : String(selections.value.at(-1)?.props.title ?? '')
        isPristine.value = true

        nextTick(() => isSelecting.value = false)
      } else {
        menu.value = false
        search.value = ''
      }
    })

    watch(search, val => {
      if (!isFocused.value || isSelecting.value) return

      if (val) menu.value = true

      isPristine.value = !val
    })

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)
      const hasList = !!((!props.hideNoData || displayItems.value.length) || slots.prepend || slots.append || slots['no-data'])
      const [textFieldProps] = VTextField.filterProps(props)

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          modelValue={ search.value }
          onUpdate:modelValue={ v => { if (v == null) model.value = [] } }
          validationValue={ model.externalValue }
          dirty={ model.value.length > 0 }
          onInput={ onInput }
          class={[
            'v-autocomplete',
            {
              'v-autocomplete--active-menu': menu.value,
              'v-autocomplete--chips': !!props.chips,
              [`v-autocomplete--${props.multiple ? 'multiple' : 'single'}`]: true,
              'v-autocomplete--selection-slot': !!slots.selection,
            },
          ]}
          appendInnerIcon={ props.menuIcon }
          readonly={ props.readonly }
          onClick:clear={ onClear }
          onMousedown:control={ onMousedownControl }
          onFocus={ () => isFocused.value = true }
          onBlur={ () => isFocused.value = false }
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
                      ))}

                      { slots['prepend-item']?.() }

                      { displayItems.value.map(item => slots.item?.({
                        item,
                        props: mergeProps(item.props, { onClick: () => select(item) }),
                      }) ?? (
                        <VListItem
                          key={ item.value }
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
                                : highlightResult(item.title, getMatches(item)?.title, search.value?.length ?? 0)
                            },
                          }}
                        </VListItem>
                      ))}

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
                    modelValue: true,
                    'onUpdate:modelValue': undefined,
                  }

                  return (
                    <div key={ item.value } class="v-autocomplete__selection">
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
                          <span class="v-autocomplete__selection-text">
                            { item.title }
                            { props.multiple && (index < selections.value.length - 1) && (
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
