// Styles
import './VDateRangeInput.sass'

// Components
import { VDateRangeCard, VDateRangePicker } from '../VDateRangePicker'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VDialog } from '@/components/VDialog'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { createDateInput, dateEmits, makeDateProps } from './composables'
import { useDisplay, useLocale } from '@/composables'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { ref, toRef, watch } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VDateRangeInput = genericComponent()({
  name: 'VDateRangeInput',

  props: {
    color: String,
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
    dividerText: {
      type: String,
      default: '$vuetify.dateRangeInput.divider',
    },
    mobile: Boolean,
    ...makeDateProps(),
    modelValue: {
      type: null as unknown as PropType<any[]>,
    },
    displayDate: {
      type: null as unknown as PropType<any>,
    },
  },

  emits: {
    ...dateEmits,
  },

  setup (props) {
    const { t } = useLocale()
    const { adapter, model, inputMode, viewMode, displayDate } = createDateInput(props, true)

    const startInput = ref(model.value.length ? adapter.format(model.value[0], 'keyboardDate') : '')
    const endInput = ref(model.value.length > 1 ? adapter.format(model.value[1], 'keyboardDate') : '')

    function handleBlur (index: number) {
      const { isValid, isSameDay, date } = adapter

      if (index === 0 && isValid(startInput.value)) {
        const newDate = date(startInput.value)
        if (!isSameDay(newDate, model.value[0])) {
          model.value = [newDate, model.value[1]]
          displayDate.value = newDate
        }
      } else if (index === 1 && isValid(endInput.value)) {
        const newDate = date(endInput.value)
        if (!isSameDay(newDate, model.value[1])) {
          model.value = [model.value[0], newDate]
          displayDate.value = newDate
        }
      }
    }

    watch(model, newValue => {
      if (!newValue.length) return

      if (newValue[0]) {
        startInput.value = adapter.format(newValue[0], 'keyboardDate')
      }

      if (newValue[1]) {
        endInput.value = adapter.format(newValue[1], 'keyboardDate')
      }
    })

    const { mobile } = useDisplay()

    provideDefaults({
      VTextField: {
        color: toRef(props, 'color'),
      },
    })

    useRender(() => {
      if (mobile.value) {
        return (
          <VDialog
            fullscreen={ inputMode.value === 'calendar' }
            contentClass="v-date-range-input__dialog-content"
            v-slots={{
              activator: ({ props: slotProps }) => (
                <div class="v-date-range-input" { ...slotProps }>
                  <VTextField
                    modelValue={ startInput.value }
                    onBlur={ () => handleBlur(0) }
                    prependInnerIcon={ props.prependIcon }
                    placeholder={ props.placeholder }
                    label={ props.fromLabel }
                  />
                  <div class="v-date-range-input__divider">{ t(props.dividerText) }</div>
                  <VTextField
                    modelValue={ endInput.value }
                    onBlur={ () => handleBlur(1) }
                    prependInnerIcon={ props.prependIcon }
                    placeholder={ props.placeholder }
                    label={ props.toLabel }
                  />
                </div>
              ),
              default: ({ isActive }) => (
                <VDateRangePicker
                  v-model={ model.value }
                  v-model:displayDate={ displayDate.value }
                  v-model:viewMode={ viewMode.value }
                  v-model:inputMode={ inputMode.value }
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
          <div class="v-date-range-input">
            <VMenu
              offset={[-28, 0]}
              closeOnContentClick={ false }
              contentClass="foo"
              v-slots={{
                activator: ({ props: slotProps }) => (
                  <div { ...slotProps } style="flex: 1 1 auto;">
                    <VTextField
                      v-model={ startInput.value }
                      onBlur={ () => handleBlur(0) }
                      prependInnerIcon={ props.prependIcon }
                      placeholder={ props.placeholder }
                      label={ props.fromLabel }
                    />
                  </div>
                ),
                default: () => (
                  <VDateRangeCard
                    v-model={ model.value }
                    v-model:displayDate={ displayDate.value }
                    v-model:viewMode={ viewMode.value }
                    v-model:inputMode={ inputMode.value }
                  />
                ),
              }}
            />
            <div class="v-date-range-input__divider">{ t(props.dividerText) }</div>
            <VMenu
              key="bar"
              offset={[-28, 0]}
              closeOnContentClick={ false }
              v-slots={{
                activator: ({ props: slotProps }) => (
                  <div { ...slotProps } style="flex: 1 1 auto;">
                    <VTextField
                      v-model={ endInput.value }
                      onBlur={ () => handleBlur(1) }
                      prependInnerIcon={ props.prependIcon }
                      placeholder={ props.placeholder }
                      label={ props.toLabel }
                    />
                  </div>
                ),
                default: () => (
                  <VDateRangeCard
                    v-model={ model.value }
                    v-model:displayDate={ displayDate.value }
                    v-model:viewMode={ viewMode.value }
                    v-model:inputMode={ inputMode.value }
                  />
                ),
              }}
            />
          </div>
        </VDefaultsProvider>
      )
    })
  },
})

export type VDateRangeInput = InstanceType<typeof VDateRangeInput>
