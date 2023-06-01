// Styles
import './VDateInput.sass'

// Components
import { VDateCard, VDatePicker } from '@/labs/VDatePicker'
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
    dirty: true,
    placeholder: 'mm/dd/yyyy',
  }),
}, 'VDateInput')

export const VDateInput = genericComponent<VDateInputSlots>()({
  name: 'VDateInput',

  props: makeVDateInputProps(),

  emits: {
    ...dateEmits,
  },

  setup (props, { slots }) {
    const { mobile } = useDisplay()
    const { adapter, model, inputMode, viewMode, displayDate, parseKeyboardDate } = createDateInput(props, false)

    const dialog = ref(false)
    const inputModel = ref(model.value.length ? adapter.format(model.value[0], 'keyboardDate') : '')

    function onBlur () {
      const { isEqual } = adapter
      const date = parseKeyboardDate(inputModel.value)

      if (date && (!model.value[0] || !isEqual(date, model.value[0]))) {
        model.value = date
        displayDate.value = date
      }
    }

    watch(model.value, val => {
      if (!val.length) return

      inputModel.value = adapter.format(val[0], 'keyboardDate')
    })

    function onSave () {
      dialog.value = false
    }

    function onCancel () {
      dialog.value = false
    }

    useRender(() => {
      const [textFieldProps] = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          class="v-date-input"
          v-model={ inputModel.value }
          onBlur={ onBlur }
        >
          {{
            ...slots,
            default: () => !mobile.value ? (
              <VMenu
                activator="parent"
                closeOnContentClick={ false }
                location="bottom end"
              >
                <VDateCard
                  v-model={ model.value }
                  v-model:displayDate={ displayDate.value }
                  v-model:inputMode={ inputMode.value }
                  v-model:viewMode={ viewMode.value }
                />
              </VMenu>
            ) : (
              <VDialog
                v-model={ dialog.value }
                activator="parent"
                contentClass="v-date-input__dialog-content"
              >
                {{
                  default: ({ isActive }) => (
                    <VDatePicker
                      key="date-picker"
                      v-model={ model.value }
                      v-model:displayDate={ displayDate.value }
                      v-model:inputMode={ inputMode.value }
                      v-model:viewMode={ viewMode.value }
                      onSave={ onSave }
                      onCancel={ onCancel }
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
