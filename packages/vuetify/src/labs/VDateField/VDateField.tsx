// Styles
import './VDateField.sass'

// Components
import { VDialog } from '@/components/VDialog'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VDateCard, VDatePicker } from '../VDatePicker'

// Composables
import { useDate } from '@/composables/date'
import { useDisplay } from '@/composables'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { InjectionKey, nextTick, onBeforeMount } from 'vue'
import { computed, provide, ref, watch } from 'vue'
import { defineComponent, useRender, wrapInArray } from '@/util'
import { createDateField } from './composables'

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
    modelValue: null,
    mobile: Boolean,
    displayDate: null,
  },

  emits: {
    'update:modelValue': (date: any) => true,
    'update:displayDate': (date: any) => true,
    'update:inputMode': (mode: string) => true,
  },

  setup (props, { slots, emit }) {
    const { adapter, model, inputMode, viewMode, displayDate } = createDateField(props, false)
    const inputModel = ref('')
    const textFieldRef = ref<VTextField>()

    // watch(inputModel, (newValue, oldValue) => {
    //   if (!newValue) model.value = null

    //   if (oldValue === newValue) return

    //   console.log(newValue)

    //   // TODO: Better valid check here
    //   if (newValue.length === 10 && adapter.value.isValid(newValue)) {
    //     model.value = adapter.value.date(newValue)
    //   }
    // })

    function handleBlur () {
      if (adapter.value.isValid(inputModel.value)) {
        const date = adapter.value.date(inputModel.value)

        if (!adapter.value.isEqual(date, model.value)) {
          model.value = date
          displayDate.value = date
        }
      }
    }

    watch(model, newValue => {
      if (!newValue.length) return

      inputModel.value = adapter.value.format(newValue[0], 'keyboardDate')
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
            ref={ textFieldRef }
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
                  onSave={() => {
                    isActive.value = false
                  }}
                  onCancel={() => {
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
            offset={ [-30, 0] }
            v-slots={{
              activator,
              default: ({ isActive }) => (
                <VDateCard
                  modelValue={ model.value }
                  onUpdate:modelValue={(value: any) => {
                    model.value = value
                    nextTick(() => {
                      textFieldRef.value?.focus()
                    })
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
