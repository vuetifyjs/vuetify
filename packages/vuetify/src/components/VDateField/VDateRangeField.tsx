import './VDateRangeField.sass'
import { useDate } from '@/composables/date'
import { provideDefaults } from '@/composables/defaults'
import { useProxiedModel } from '@/composables/proxiedModel'
import { defineComponent, useRender } from '@/util'
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'
import { VDateRangeCard } from '../VDatePicker'
import { VMenu } from '../VMenu'
import { VTextField } from '../VTextField'

export const VDateRangeField = defineComponent({
  name: 'VDateRangeField',

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
    modelValue: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
    locale: null,
    mobile: Boolean,
  },

  emits: {
    'update:modelValue': (dates: any[]) => true,
  },

  setup (props, { slots, emit }) {
    const locale = computed(() => props.locale)
    const { adapter } = useDate(locale)
    const model = useProxiedModel(props, 'modelValue')

    const startInput = ref('')
    const endInput = ref('')

    watch([startInput, endInput], ([newStart, newEnd], [oldStart, oldEnd]) => {
      if (newStart != null && newStart !== oldStart && /\d{1,2}\/\d{1,2}\/\d{4}/.test(newStart)) {
        model.value = [adapter.value.date(newStart), model.value[1] ?? null]
      }

      if (newEnd != null && newEnd !== oldEnd && /\d{1,2}\/\d{1,2}\/\d{4}/.test(newEnd)) {
        model.value = [model.value[0] ?? null, adapter.value.date(newEnd)]
      }
    })

    watch(model, newValue => {
      if (!newValue.length) return

      if (newValue[0]) {
        startInput.value = adapter.value.format(newValue[0], 'keyboardDate')
      }

      if (newValue[1]) {
        endInput.value = adapter.value.format(newValue[1], 'keyboardDate')
      }
    })

    provideDefaults({
      VOverlay: {
        minWidth: '100%',
      },
    })

    useRender(() => {
      return (
        <VMenu
          v-slots={{
            activator: ({ props: slotProps }) => (
              <div class="v-date-range-field" { ...slotProps }>
                <VTextField
                  v-model={ startInput.value }
                  prependInnerIcon={ props.prependIcon }
                  placeholder={ props.placeholder }
                  label={ props.label }
                />
                <div class="v-date-range-field__divider">to</div>
                <VTextField
                  v-model={ endInput.value }
                  prependInnerIcon={ props.prependIcon }
                  placeholder={ props.placeholder }
                  label={ props.label }
                />
              </div>
            ),
            default: () => (
              <VDateRangeCard v-model={ model.value } />
            ),
          }}
        />
      )
    })
  },
})
