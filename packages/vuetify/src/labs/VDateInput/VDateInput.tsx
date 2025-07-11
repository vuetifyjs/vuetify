// Components
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { makeVDatePickerProps, VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useDate } from '@/composables/date'
import { createDateRange } from '@/composables/date/date'
import { makeDateFormatProps, useDateFormat } from '@/composables/dateFormat'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { makeFocusProps } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

// Types
export type VDateInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VDateInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VDateInputActionsSlot
  default: never
}

export const makeVDateInputProps = propsFactory({
  displayFormat: [Function, String],
  location: {
    type: String as PropType<StrategyProps['location']>,
    default: 'bottom start',
  },
  menu: Boolean,
  updateOn: {
    type: Array as PropType<('blur' | 'enter')[]>,
    default: () => ['blur', 'enter'],
  },

  ...makeDateFormatProps(),
  ...makeDisplayProps({
    mobile: null,
  }),
  ...makeFocusProps(),
  ...makeVConfirmEditProps({
    hideActions: true,
  }),
  ...makeVTextFieldProps({
    prependIcon: '$calendar',
  }),
  ...omit(makeVDatePickerProps({
    hideHeader: true,
    showAdjacentMonths: true,
  }), ['active', 'location', 'rounded']),
}, 'VDateInput')

export const VDateInput = genericComponent<VDateInputSlots>()({
  name: 'VDateInput',

  props: makeVDateInputProps(),

  emits: {
    save: (value: string) => true,
    cancel: () => true,
    'update:focused': (val: boolean) => true,
    'update:modelValue': (val: string) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const { t, current: currentLocale } = useLocale()
    const adapter = useDate()
    const { isValid, parseDate, formatDate, parserFormat } = useDateFormat(props, currentLocale)
    const { mobile } = useDisplay(props)

    const emptyModelValue = () => props.multiple ? [] : null

    const model = useProxiedModel(
      props,
      'modelValue',
      emptyModelValue(),
      val => Array.isArray(val) ? val.map(item => adapter.toJsDate(item)) : val ? adapter.toJsDate(val) : val,
      val => Array.isArray(val) ? val.map(item => adapter.date(item)) : val ? adapter.date(val) : val
    )

    const menu = useProxiedModel(props, 'menu')
    const isEditingInput = shallowRef(false)
    const isFocused = shallowRef(props.focused)
    const vTextFieldRef = ref<VTextField>()
    const disabledActions = ref<typeof VConfirmEdit['props']['disabled']>(['save'])

    function format (date: unknown) {
      if (typeof props.displayFormat === 'function') {
        return props.displayFormat(date)
      }
      if (props.displayFormat) {
        return adapter.format(date, props.displayFormat ?? 'keyboardDate')
      }
      return formatDate(date)
    }

    const display = computed(() => {
      const value = wrapInArray(model.value)

      if (!value.length) return null

      if (props.multiple === true) {
        return t('$vuetify.datePicker.itemsSelected', value.length)
      }

      if (props.multiple === 'range') {
        const start = value[0]
        const end = value[value.length - 1]

        if (!adapter.isValid(start) || !adapter.isValid(end)) return ''

        return `${format(adapter.date(start))} - ${format(adapter.date(end))}`
      }

      return adapter.isValid(model.value) ? format(adapter.date(model.value)) : ''
    })

    const inputmode = computed(() => {
      if (!mobile.value) return undefined
      if (isEditingInput.value) return 'text'

      return 'none'
    })

    const isInteractive = computed(() => !props.disabled && !props.readonly)

    const isReadonly = computed(() => {
      if (!props.updateOn.length) return true

      return !(mobile.value && isEditingInput.value) && props.readonly
    })

    watch(menu, val => {
      if (val) return

      isEditingInput.value = false
      disabledActions.value = ['save']
    })

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) {
        menu.value = true
      }

      if (props.updateOn.includes('enter')) {
        onUserInput(e.target as HTMLInputElement)
      }
    }

    function onClick (e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()

      if (menu.value && mobile.value) {
        isEditingInput.value = true
      } else {
        menu.value = true
      }
    }

    function onCancel () {
      emit('cancel')
      menu.value = false
      isEditingInput.value = false
    }

    function onSave (value: string) {
      emit('save', value)
      menu.value = false
    }

    function onUpdateDisplayModel (value: unknown) {
      if (value != null) return

      model.value = emptyModelValue()
    }

    function onBlur (e: FocusEvent) {
      if (props.updateOn.includes('blur')) {
        onUserInput(e.target as HTMLInputElement)
      }

      // When in mobile mode and editing is done (due to keyboard dismissal), close the menu
      if (mobile.value && isEditingInput.value && !isFocused.value) {
        menu.value = false
        isEditingInput.value = false
      }
    }

    function onUserInput ({ value }: HTMLInputElement) {
      if (!value.trim()) {
        model.value = emptyModelValue()
      } else if (!props.multiple) {
        if (isValid(value)) {
          model.value = parseDate(value)
        }
      } else {
        const parts = value.trim().split(/\D+-\D+|[^\d\-/.]+/)
        if (parts.every(isValid)) {
          if (props.multiple === 'range') {
            const [start, stop] = parts.map(parseDate).toSorted((a, b) => adapter.isAfter(a, b) ? 1 : -1)
            model.value = createDateRange(adapter, start, stop)
          } else {
            model.value = parts.map(parseDate)
          }
        }
      }
    }

    useRender(() => {
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const datePickerProps = VDatePicker.filterProps(omit(props, ['active', 'location', 'rounded']))
      const textFieldProps = VTextField.filterProps(omit(props, ['placeholder']))

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          class={ props.class }
          style={ props.style }
          modelValue={ display.value }
          inputmode={ inputmode.value }
          placeholder={ props.placeholder ?? parserFormat.value }
          readonly={ isReadonly.value }
          onKeydown={ isInteractive.value ? onKeydown : undefined }
          focused={ menu.value || isFocused.value }
          onBlur={ onBlur }
          validationValue={ model.value }
          onClick:control={ isInteractive.value ? onClick : undefined }
          onClick:prepend={ isInteractive.value ? onClick : undefined }
          onUpdate:modelValue={ onUpdateDisplayModel }
          onUpdate:focused={ event => isFocused.value = event }
        >
          {{
            ...slots,
            default: () => [
              <>
                <VMenu
                  v-model={ menu.value }
                  activator="parent"
                  minWidth="0"
                  eager={ isFocused.value }
                  location={ props.location }
                  closeOnContentClick={ false }
                  openOnClick={ false }
                >
                  <VConfirmEdit
                    { ...confirmEditProps }
                    v-model={ model.value }
                    disabled={ disabledActions.value }
                    onSave={ onSave }
                    onCancel={ onCancel }
                  >
                    {{
                      default: ({ actions, model: proxyModel, save, cancel, isPristine }) => {
                        function onUpdateModel (value: string) {
                          if (!props.hideActions) {
                            proxyModel.value = value
                          } else {
                            model.value = value

                            if (!props.multiple) {
                              menu.value = false
                            }
                          }

                          emit('save', value)

                          disabledActions.value = []
                        }

                        return [
                          <VDatePicker
                            { ...datePickerProps }
                            modelValue={ props.hideActions ? model.value : proxyModel.value }
                            onUpdate:modelValue={ value => onUpdateModel(value) }
                            onMousedown={ (e: MouseEvent) => e.preventDefault() }
                          >
                            {{
                              actions: !props.hideActions ? () => slots.actions?.({ save, cancel, isPristine }) ?? actions() : undefined,
                            }}
                          </VDatePicker>,
                        ]
                      },
                    }}
                  </VConfirmEdit>
                </VMenu>

                { slots.default?.() }
              </>,
            ],
          }}
        </VTextField>
      )
    })

    return forwardRefs({}, vTextFieldRef)
  },
})

export type VDateInput = InstanceType<typeof VDateInput>
