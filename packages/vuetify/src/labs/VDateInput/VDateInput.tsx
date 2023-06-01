// Styles
import './VDateInput.sass'

// Components
import { VDateCard, VDatePicker } from '../VDatePicker'
import { VDialog } from '@/components/VDialog'
import { VMenu } from '@/components/VMenu'
import { makeVTextFieldProps, VTextField, VTextFieldSlots } from '@/components/VTextField/VTextField'

// Composables
import { createDateInput, dateEmits, makeDateProps } from './composables'
import { useDisplay } from '@/composables'

// Utilities
import { ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
export type VDateInputSlots = VTextFieldSlots

export const makeVDateInputProps = propsFactory({
  mobile: Boolean,

  ...makeDateProps(),
  ...makeVTextFieldProps({
    appendInnerIcon: '$calendar',
    placeholder: 'mm/dd/yyyy',
    dirty: true,
  }),
}, 'VDateInput')

export const VDateInput = genericComponent<VDateInputSlots>()({
  name: 'VDateInput',

  props: makeVDateInputProps(),

  emits: {
    ...dateEmits,
  },

  setup (props, { slots }) {
    const { adapter, model, inputMode, viewMode, displayDate, parseKeyboardDate } = createDateInput(props, false)
    const inputModel = ref(model.value.length ? adapter.format(model.value[0], 'keyboardDate') : '')

    function handleBlur () {
      const { isEqual } = adapter
      const date = parseKeyboardDate(inputModel.value)

      if (date && (!model.value[0] || !isEqual(date, model.value[0]))) {
        model.value = date
        displayDate.value = date
      }
    }

    watch(model, newValue => {
      if (!newValue.length) return

      inputModel.value = adapter.format(newValue[0], 'keyboardDate')
    })

    const { mobile } = useDisplay()

    useRender(() => {
      const [textFieldProps] = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          class="v-date-input"
          v-model={ inputModel.value }
          onBlur={ handleBlur }
        >
          {{
            ...slots,
            default: () => !mobile.value ? (
              <VMenu
                activator="parent"
                closeOnContentClick={ false }
                location="end bottom"
                origin="top end"
              >
                {{
                  default: () => (
                    <VDateCard
                      modelValue={ model.value }
                      onUpdate:modelValue={ (value: any) => {
                        model.value = value
                      }}
                      v-model:displayDate={ displayDate.value }
                      v-model:viewMode={ viewMode.value }
                      v-model:inputMode={ inputMode.value }
                    />
                  )
                }}
              </VMenu>
            ) : (
              <VDialog
                activator="parent"
                contentClass="v-date-input__dialog-content"
              >
                {{
                  default: ({ isActive }) => (
                    <VDatePicker
                      v-model={ model.value }
                      v-model:inputMode={ inputMode.value }
                      v-model:viewMode={ viewMode.value }
                      v-model:displayDate={ displayDate.value }
                      showActions
                      onSave={ () => {
                        isActive.value = false
                      }}
                      onCancel={ () => {
                        isActive.value = false
                      }}
                    />
                  ),
                }}
              </VDialog>
            )
          }}
        </VTextField>
      )
    })
  },
})

export type VDateInput = InstanceType<typeof VDateInput>
