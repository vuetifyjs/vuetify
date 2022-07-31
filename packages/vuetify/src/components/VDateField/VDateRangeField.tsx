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
import { VDialog } from '../VDialog'
import { VDateRangePicker } from '../VDatePicker/VDateRangePicker'
import { useDisplay } from '@/composables'
import { VDefaultsProvider } from '../VDefaultsProvider'

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
    fromLabel: String,
    toLabel: String,
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
    const selected = ref()
    const input = ref('calendar')

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

    const { mobile } = useDisplay()

    useRender(() => {
      return mobile.value ? (
        <VDialog
          fullscreen={ input.value === 'calendar' }
          v-slots={{
            activator: ({ props: slotProps }) => (
              <div class="v-date-range-field" { ...slotProps }>
                <VTextField
                  v-model={ startInput.value }
                  prependInnerIcon={ props.prependIcon }
                  placeholder={ props.placeholder }
                  label={ props.fromLabel }
                />
                <div class="v-date-range-field__divider">to</div>
                <VTextField
                  v-model={ endInput.value }
                  prependInnerIcon={ props.prependIcon }
                  placeholder={ props.placeholder }
                  label={ props.toLabel }
                />
              </div>
            ),
            default: ({ isActive }) => (
              <VDateRangePicker
                onUpdate:input={ v => input.value = v }
                v-model={ selected.value }
                onSave={() => {
                  isActive.value = false
                  model.value = selected.value
                }}
                onCancel={() => {
                  isActive.value = false
                }}
              />
            ),
          }}
        />
      ) : (
        <VDefaultsProvider defaults={{ VOverlay: { minWidth: '100%' } }}>
          <VMenu
            offset={ [-30, 0] }
            v-slots={{
              activator: ({ props: slotProps }) => (
                <div class="v-date-range-field" { ...slotProps }>
                  <VTextField
                    v-model={ startInput.value }
                    prependInnerIcon={ props.prependIcon }
                    placeholder={ props.placeholder }
                    label={ props.fromLabel }
                  />
                  <div class="v-date-range-field__divider">to</div>
                  <VTextField
                    v-model={ endInput.value }
                    prependInnerIcon={ props.prependIcon }
                    placeholder={ props.placeholder }
                    label={ props.toLabel }
                  />
                </div>
              ),
              default: () => (
                <VDateRangeCard v-model={ model.value } />
              ),
            }}
          />
        </VDefaultsProvider>
      )
    })
  },
})
