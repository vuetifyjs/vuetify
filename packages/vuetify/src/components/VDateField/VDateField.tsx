import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'
import { defineComponent, useRender } from '@/util'
import { computed, ref, watch } from 'vue'
import { VDateCard, VDatePicker } from '../VDatePicker'
import { VMenu } from '../VMenu'
import { VTextField } from '../VTextField'

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

    watch(inputModel, (newValue, oldValue) => {
      if (!newValue) model.value = null

      if (oldValue === newValue) return

      if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(newValue)) {
        model.value = adapter.value.date(newValue)
      }
    })

    watch(model, newValue => {
      if (!newValue) return

      inputModel.value = adapter.value.format(newValue, 'keyboardDate')
    })

    useRender(() => {
      return (
        <VMenu
          v-slots={{
            activator: ({ props: slotProps }) => (
              <VTextField
                v-model={ inputModel.value }
                prependIcon={ props.prependIcon }
                placeholder={ props.placeholder }
                label={ props.label }
                { ...slotProps }
              />
            ),
            default: () => (
              <VDateCard
                v-model={ model.value }
              />
            ),
          }}
        />
      )
    })
  },
})
