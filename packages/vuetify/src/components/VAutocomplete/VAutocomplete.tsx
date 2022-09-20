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
import { VListChildren } from '../VList/VListChildren'

// Composables
import { highlightResult, makeFilterProps, useFilter } from '@/composables/filter'
import { makeTransitionProps } from '@/composables/transition'
import { forwardRefs } from '@/composables/forwardRefs'
import { useItems } from '@/composables/items'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, mergeProps, nextTick, ref, watch } from 'vue'
import { genericComponent, useRender, wrapInArray } from '@/util'

// Types
import type { InternalItem } from '@/composables/items'
import type { MakeSlots } from '@/util'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = T extends Primitive
  ? T
  : (ReturnObject extends true ? T : any)

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? Val<T, ReturnObject>[]
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
    modelValue?: Readonly<V>
    'onUpdate:modelValue'?: (val: V) => void
  } & Omit<VTextField['$props'], 'modelValue' | 'onUpdate:modelValue'>
  $slots: Omit<VInputSlots & VFieldSlots, 'default'> & MakeSlots<{
    item: [{ item: InternalItem<T>, index: number, props: Record<string, unknown> }]
    chip: [{ item: InternalItem<T>, index: number, props: Record<string, unknown> }]
    selection: [{ item: InternalItem<T>, index: number }]
    'no-data': []
  }>
}>()({
  name: 'VAutocomplete',

  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    search: String,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps(),
    ...makeTransitionProps({ transition: false }),
  },

  emits: {
    'update:search': (val: any) => true,
    'update:modelValue': (val: any) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { slots }) {
    const vTextFieldRef = ref()
    const isFocused = ref(false)
    const isPristine = ref(true)
    const menu = useProxiedModel(props, 'menu')
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
    const { filteredItems, filteredMatches } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value))
    const selections = computed(() => {
      return model.value.map(v => {
        return items.value.find(item => item.value === v.value) || v
      })
    })
    const selected = computed(() => selections.value.map(selection => selection.props.value))

    function onClear (e: MouseEvent) {
      model.value = []

      if (props.openOnClear) {
        menu.value = true
      }

      search.value = ''
    }
    function onClickControl () {
      if (
        (props.hideNoData && !items.value.length) ||
        props.readonly
      ) return

      menu.value = true
    }
    function onKeydown (e: KeyboardEvent) {
      if (props.readonly) return

      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false
      }

      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        isPristine.value = true
      }
    }

    function onInput (e: InputEvent) {
      search.value = (e.target as HTMLInputElement).value
    }

    function onAfterLeave () {
      if (isFocused.value) isPristine.value = true
    }

    const isSelecting = ref(false)

    function select (item: InternalItem<any>) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => selection === item.value)

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

      return (
        <VTextField
          ref={ vTextFieldRef }
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
                  contentClass="v-autocomplete__content"
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
                    opened={ items.value.map(item => item.value) }
                    type="select"
                  >
                    { slots['prepend-item']?.() }

                    <VListChildren
                      noDataText={ !props.hideNoData ? props.noDataText : undefined }
                      items={ filteredItems.value }
                    >
                      {{
                        ...slots,
                        item: ({ item, index }: any) => {
                          const onClick = () => select(item)

                          if (slots.item) return slots.item({ item, props: mergeProps(item.props, { onClick }), index })

                          return (
                            <VListItem
                              key={ index }
                              { ...item.props }
                              onClick={ onClick }
                            >
                              {{
                                prepend: ({ isSelected }) => props.multiple && !props.hideSelected ? (
                                  <VCheckboxBtn modelValue={ isSelected } ripple={ false } />
                                ) : undefined,
                                title: () => {
                                  return isPristine.value
                                    ? item.title
                                    : highlightResult(item.title, filteredMatches.value.get(item.value)?.title, search.value?.length ?? 0)
                                },
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
                    <div key={ index } class="v-autocomplete__selection">
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
                            <span class="v-autocomplete__selection-text">
                              { item.title }
                              { props.multiple && (index < selections.value.length - 1) && (
                                <span class="v-autocomplete__selection-comma">,</span>
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
