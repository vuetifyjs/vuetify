// Styles
import './VDateField.sass'

// Components
import { VDialog } from '@/components/VDialog'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VDateCard, VDatePicker } from '../VDatePicker'

// Composables
import { useDisplay } from '@/composables'
import { createDateField, dateEmits, makeDateProps } from './composables'

// Utilities
import { ref, watch } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VDateField = defineComponent({
  name: 'VDateField',

  props: {
    prependInnerIcon: {
      type: String,
      default: '$calendar',
    },
    placeholder: {
      type: String,
      default: 'mm/dd/yyyy',
    },
    label: String,
    mobile: Boolean,
    ...makeDateProps(),
    modelValue: {
      type: null as unknown as PropType<any>,
    },
    displayDate: {
      type: null as unknown as PropType<any>,
    },
    format: {
      type: String,
    },
  },

  emits: {
    ...dateEmits,
  },

  setup (props) {
    const { adapter, model, inputMode, viewMode, displayDate, parseKeyboardDate } = createDateField(props, false)
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
      const activator = ({ props: slotProps }: any) => (
        <div { ...slotProps }>
          <VTextField
            v-model={ inputModel.value }
            onBlur={ handleBlur }
            prependInnerIcon={ props.prependInnerIcon }
            placeholder={ props.placeholder }
            label={ props.label }
          />
        </div>
      )

      if (mobile.value) {
        return (
          <VDialog
            contentClass="v-date-field__dialog-content"
            v-slots={{
              activator,
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
          />
        )
      }

      return (
        <VDefaultsProvider defaults={{ VOverlay: { minWidth: '100%' } }}>
          <VMenu
            closeOnContentClick={ false }
            offset={[-30, 0]}
            v-slots={{
              activator,
              default: ({ isActive }) => (
                <VDateCard
                  modelValue={ model.value }
                  onUpdate:modelValue={ (value: any) => {
                    model.value = value
                  }}
                  v-model:displayDate={ displayDate.value }
                  v-model:viewMode={ viewMode.value }
                  v-model:inputMode={ inputMode.value }
                />
              ),
            }}
          />
        </VDefaultsProvider>
      )
    })
  },
})
