import './VDateField.sass'
import { useDisplay } from '@/composables'
import { useDate } from '@/composables/date'
import { provideDefaults } from '@/composables/defaults'
import { useProxiedModel } from '@/composables/proxiedModel'
import { defineComponent, useRender } from '@/util'
import { computed, ref, watch } from 'vue'
import { VDateCard, VDatePicker } from '../VDatePicker'
import { VDialog } from '../VDialog'
import { VMenu } from '../VMenu'
import { VTextField } from '../VTextField'
import { VDefaultsProvider } from '../VDefaultsProvider'

export const VDateField = defineComponent({
  name: 'VDateField',

  props: {
    prependIcon: {
      type: String,
      default: '$calendar',
    },
    placeholder: {
      type: String,
      default: 'mm/dd/yyyy',
    },
    label: String,
    modelValue: null,
    locale: null,
    mobile: Boolean,
  },

  setup (props, { slots, emit }) {
    const locale = computed(() => props.locale)
    const { adapter } = useDate(locale)
    const model = useProxiedModel(props, 'modelValue')
    const inputModel = ref('')
    const textFieldRef = ref<VTextField>()
    const selected = ref()

    watch(inputModel, (newValue, oldValue) => {
      if (!newValue) model.value = null

      if (oldValue === newValue) return

      // TODO: Better valid check here
      if (newValue.length === 10 && adapter.value.isValid(newValue)) {
        model.value = adapter.value.date(newValue)
      }
    })

    watch(model, newValue => {
      if (!newValue) return

      inputModel.value = adapter.value.format(newValue, 'keyboardDate')
    })

    const { mobile } = useDisplay()

    useRender(() => {
      const activator = ({ props: slotProps }: any) => (
        <div { ...slotProps }>
          <VTextField
            v-model={ inputModel.value }
            prependInnerIcon={ props.prependIcon }
            placeholder={ props.placeholder }
            label={ props.label }
            ref={ textFieldRef }
          />
        </div>
      )

      return mobile.value ? (
        <VDialog
          contentClass="v-date-field__dialog-content"
          v-slots={{
            activator,
            default: ({ isActive }) => (
              <VDatePicker
                v-model={ selected.value }
                showActions
                onOk={() => {
                  model.value = selected.value
                  isActive.value = false
                }}
                onCancel={() => isActive.value = false}
              />
            ),
          }}
        />
      ) : (
        <VDefaultsProvider defaults={{ VOverlay: { minWidth: '100%' } }}>
          <VMenu
            closeOnContentClick={ false }
            offset={ [-30, 0] }
            v-slots={{
              activator,
              default: ({ isActive }) => (
                <VDateCard
                  width="328"
                  modelValue={ model.value }
                  onUpdate:modelValue={(value: any) => {
                    isActive.value = false
                    model.value = value
                    textFieldRef.value?.focus()
                  }}
                />
              ),
            }}
          />
        </VDefaultsProvider>
      )
    })
  },
})
