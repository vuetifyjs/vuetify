// Components
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { makeVDatePickerProps, VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useDate } from '@/composables/date'
import { dateFromLocalizedValue } from '@/composables/date/date'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, shallowRef, watch, watchEffect } from 'vue'
import { genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
export interface VDateInputSlots {
  default: never
}

export const makeVDateInputProps = propsFactory({
  hideActions: Boolean,

  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps({
    placeholder: 'mm/dd/yyyy',
    prependIcon: '$calendar',
  }),
  ...omit(makeVDatePickerProps({
    weeksInMonth: 'dynamic' as const,
    hideHeader: true,
  }), ['active']),
}, 'VDateInput')

export const VDateInput = genericComponent()({
  name: 'VDateInput',

  props: makeVDateInputProps(),

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const adapter = useDate()
    const { isFocused, focus, blur } = useFocus(props)
    const model = useProxiedModel(props, 'modelValue', props.multiple ? [] : null)
    const menu = shallowRef(false)

    const display = ref<string | null>(null)

    watch(isFocused, isFocusedValue => {
      if (isFocusedValue) return

      setModelValueFromDisplayValue()
    })

    watchEffect(() => {
      const value = wrapInArray(model.value)

      if (!value.length) {
        display.value = null
        return
      }

      if (props.multiple === true) {
        display.value = t('$vuetify.datePicker.itemsSelected', value.length)
        return
      }

      if (props.multiple === 'range') {
        const start = value[0]
        const end = value[value.length - 1]

        display.value = adapter.isValid(start) && adapter.isValid(end)
          ? `${formatValueForTextField(start)} - ${formatValueForTextField(end)}`
          : ''

        return
      }

      display.value = formatValueForTextField(model.value)
    })

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) {
        menu.value = true
        return
      }

      setModelValueFromDisplayValue()
    }

    function setModelValueFromDisplayValue () {
      if (props.multiple === true) {
        // here the e.target will be in format "1 selected", so that cannot be parsed back to date
        return
      }

      if (props.multiple === 'range') {
        if (display.value == null || display.value === '') {
          model.value = []
          return
        }

        // NOTE: split by ' - ', so value "2024-06-04 - 2024-06-05" will be split into array of ["2024-06-04", "2024-06-05"]
        const [fromValue, toValue] = display.value.split(' - ').map(i => i?.trim())
        if (fromValue == null || fromValue.length === 0 || toValue == null || toValue.length === 0) {
          model.value = []
          return
        }

        const fromParsed = parseValueFromTextField(fromValue)
        const toParsed = parseValueFromTextField(toValue)

        if (adapter.isValid(fromParsed) && adapter.isValid(toParsed)) {
          model.value = [fromParsed, toParsed]
          return
        }

        model.value = []
        return
      }

      model.value = parseValueFromTextField(display.value)
    }

    function parseValueFromTextField (value: string | null) {
      const parsedValue = dateFromLocalizedValue(adapter, value, 'keyboardDate')
      if (parsedValue) return parsedValue

      return adapter.date(value)
    }

    function formatValueForTextField (value: any) {
      return adapter.isValid(value) ? adapter.format(value, 'keyboardDate') : ''
    }

    function onClick (e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()

      menu.value = true
    }

    function onSave () {
      menu.value = false
    }

    useRender(() => {
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const datePickerProps = VDatePicker.filterProps(omit(props, ['active']))
      const textFieldProps = VTextField.filterProps(omit(props, ['readonly']))

      return (
        <VTextField
          { ...textFieldProps }
          v-model={ display.value }
          onKeydown={ onKeydown }
          focused={ menu.value || isFocused.value }
          readonly={ props.readonly || props.multiple === true }
          onFocus={ focus }
          onBlur={ blur }
          onClick:control={ onClick }
          onClick:prepend={ onClick }
        >
          <VMenu
            v-model={ menu.value }
            activator="parent"
            min-width="0"
            closeOnContentClick={ false }
            openOnClick={ false }
          >
            <VConfirmEdit
              { ...confirmEditProps }
              v-model={ model.value }
              onSave={ onSave }
            >
              {{
                default: ({ actions, model: proxyModel }) => {
                  return (
                    <VDatePicker
                      { ...datePickerProps }
                      modelValue={ props.hideActions ? model.value : proxyModel.value }
                      onUpdate:modelValue={ val => {
                        if (!props.hideActions) {
                          proxyModel.value = val
                        } else {
                          model.value = val

                          if (!props.multiple) menu.value = false
                        }
                      }}
                      onMousedown={ (e: MouseEvent) => e.preventDefault() }
                    >
                      {{
                        actions: !props.hideActions ? () => actions : undefined,
                      }}
                    </VDatePicker>
                  )
                },
              }}
            </VConfirmEdit>
          </VMenu>

          { slots.default?.() }
        </VTextField>
      )
    })
  },
})

export type VDateInput = InstanceType<typeof VDateInput>
