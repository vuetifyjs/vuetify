// Styles
import './VSelect.sass'

// Components
import { VChip } from '@/components/VChip'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeItemsProps, useItems } from '@/composables/items'
import { makeTransitionProps } from '@/composables/transition'
import { useForwardRef } from '@/composables/forwardRef'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { InternalItem} from '@/composables/items'
import type { LinkProps } from '@/composables/router'
import type { MakeSlots } from '@/util'

export interface InternalSelectItem extends InternalItem {}

export interface DefaultSelectionSlot {
  selection: InternalSelectItem
}

export interface DefaultChipSlot extends DefaultSelectionSlot {
  props: {
    'onClick:close': (e: Event) => void
    modelValue: any
  }
}

export type SelectItem = string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any) | (LinkProps & {
  text: string
})

export const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menuIcon: {
    type: String,
    default: '$dropdown',
  },
  modelValue: {
    type: [Number, String, Object, Array],
    default: () => ([]),
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  openOnClear: Boolean,

  ...makeItemsProps(),
}, 'select')

export const VSelect = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    chip: [DefaultChipSlot]
    default: []
    selection: [DefaultSelectionSlot]
  }>
}>()({
  name: 'VSelect',

  props: {
    ...makeSelectProps(),
    ...makeTransitionProps({ transition: 'scale-transition' }),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const vTextFieldRef = ref()
    const activator = ref()
    const menu = ref(false)
    const { items, transformIn, transformOut } = useItems(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => transformIn(wrapInArray(v)),
      v => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : transformed[0]
      }
    )
    const selections = computed(() => {
      const array: InternalItem[] = Array(model.value.length)

      const indices = model.value.reduce((obj, value, index) => {
        obj[value] = index
        return obj
      }, {} as Record<any, number>)

      for (const item of items.value) {
        const index = indices[item.props.value]

        if (index != null) array.splice(index, 1, item)
      }

      return array
    })
    const selected = computed(() => selections.value.map(selection => selection.props.value))

    function onClear (e: MouseEvent) {
      model.value = []

      if (props.openOnClear) {
        menu.value = true
      }
    }
    function onClickControl () {
      if (props.hideNoData && !items.value.length) return

      menu.value = true
    }
    function onKeydown (e: KeyboardEvent) {
      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false
      }
    }
    function select (item: InternalItem) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => selection === item.props.value)

        if (index === -1) {
          model.value = [...model.value, item.props.value]
        } else {
          const value = [...model.value]
          value.splice(index, 1)
          model.value = value
        }
      } else {
        model.value = [item.props.value]
        menu.value = false
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control')
    })

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip)

      return (
        <VTextField
          ref={ vTextFieldRef }
          class={[
            'v-select',
            {
              'v-select--active-menu': menu.value,
              'v-select--chips': !!props.chips,
              [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
            },
          ]}
          appendInnerIcon={ props.menuIcon }
          readonly
          onClick:clear={ onClear }
          onClick:input={ onClickControl }
          onClick:control={ onClickControl }
          onBlur={ () => menu.value = false }
          modelValue={ model.value.join(', ') }
          onKeydown={ onKeydown }
        >
          {{
            ...slots,
            default: () => (
              <>
                { activator.value && (
                  <VMenu
                    v-model={ menu.value }
                    activator={ activator.value }
                    contentClass="v-select__content"
                    eager={ props.eager }
                    openOnClick={ false }
                    transition={ props.transition }
                  >
                    <VList
                      selected={ selected.value }
                      selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                    >
                      { !items.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                        <VListItem title={ t(props.noDataText) } />
                      )) }

                      { items.value.map(item => (
                        <VListItem
                          { ...item.props }
                          onMousedown={ (e: MouseEvent) => e.preventDefault() }
                          onClick={ () => select(item) }
                        />
                      )) }
                    </VList>
                  </VMenu>
                ) }

                { selections.value.map((selection, index) => {
                  function onChipClose (e: Event) {
                    e.stopPropagation()
                    e.preventDefault()

                    select(selection)
                  }

                  const slotProps = {
                    'onClick:close': onChipClose,
                    modelValue: true,
                  }

                  return (
                    <div class="v-select__selection">
                      { hasChips && (
                        <VDefaultsProvider
                          defaults={{
                            VChip: {
                              closable: props.closableChips,
                              size: 'small',
                              text: selection.props.title,
                            },
                          }}
                        >
                          { slots.chip
                            ? slots.chip({ props: slotProps, selection })
                            : (<VChip { ...slotProps } />)
                          }
                        </VDefaultsProvider>
                      ) }

                      { !hasChips && (
                        slots.selection
                          ? slots.selection({ selection })
                          : (
                            <span class="v-select__selection-text">
                              { selection.props.title }
                              { props.multiple && (index < selections.value.length - 1) && (
                                <span class="v-select__selection-comma">,</span>
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

    return useForwardRef({}, vTextFieldRef)
  },
})

export type VSelect = InstanceType<typeof VSelect>
