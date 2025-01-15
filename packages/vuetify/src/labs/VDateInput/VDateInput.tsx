// Components
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { makeVDatePickerProps, VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useDate } from '@/composables/date'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, shallowRef } from 'vue'
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

    const display = computed(() => {
      const value = wrapInArray(model.value)

      if (!value.length) return null

      if (props.multiple === true) {
        return t('$vuetify.datePicker.itemsSelected', value.length)
      }

      if (props.multiple === 'range') {
        const start = value[0]
        const end = value[value.length - 1]

        return adapter.isValid(start) && adapter.isValid(end)
          ? `${adapter.format(start, 'keyboardDate')} - ${adapter.format(end, 'keyboardDate')}`
          : ''
      }

      return adapter.isValid(model.value) ? adapter.format(model.value, 'keyboardDate') : ''
    })

    const isInteractive = computed(() => !props.disabled && !props.readonly)

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) {
        menu.value = true

        return
      }

      const target = e.target as HTMLInputElement

      model.value = adapter.date(target.value)
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
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          class={ props.class }
          style={ props.style }
          modelValue={ display.value }
          onKeydown={ isInteractive.value ? onKeydown : undefined }
          focused={ menu.value || isFocused.value }
          onFocus={ focus }
          onBlur={ blur }
          onClick:control={ isInteractive.value ? onClick : undefined }
          onClick:prepend={ isInteractive.value ? onClick : undefined }
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
                        actions: !props.hideActions ? actions : undefined,
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
