// Components
import { makeVDatePickerProps, VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { makeVConfirmEditProps, VConfirmEdit } from '@/labs/VConfirmEdit/VConfirmEdit'

// Composables
import { useDate } from '@/composables/date'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, shallowRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
export interface VDateInputSlots {
  default: never
}

export const makeVDateInputProps = propsFactory({
  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps({
    label: 'mm/dd/yyyy',
    prependIcon: 'mdi-calendar',
  }),
  ...makeVDatePickerProps({
    weeksInMonth: 'dynamic',
    hideHeader: true,
  }),
}, 'VDateInput')

export const VDateInput = genericComponent()({
  name: 'VDateInput',

  props: makeVDateInputProps(),

  emits: {
    'update:modelValue': (val: string | null) => val != null && typeof val === 'string',
  },

  setup (props, { slots }) {
    const adapter = useDate()
    const { isFocused, focus, blur } = useFocus(props)
    const model = useProxiedModel(props, 'modelValue')
    const menu = shallowRef(false)

    const display = computed(() => {
      return adapter.isValid(model.value) ? adapter.format(model.value, 'keyboardDate') : ''
    })

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
      const datePickerProps = VDatePicker.filterProps(props)
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          modelValue={ display.value }
          onKeydown={ onKeydown }
          dirty={ menu.value }
          focused={ menu.value || isFocused.value }
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
                      v-model={ proxyModel.value }
                    >
                      {{
                        actions: () => actions,
                      }}
                    </VDatePicker>
                  )
                },
              }}
            </VConfirmEdit>
          </VMenu>
        </VTextField>
      )
    })
  },
})

export type VDateInput = InstanceType<typeof VDateInput>
