// Styles
import './VDatePicker.sass'

// Components
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerHeader } from './VDatePickerHeader'
import { VDatePickerMonth } from './VDatePickerMonth'
import { VDatePickerYears } from './VDatePickerYears'
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'
import { dateEmits, makeDateProps } from '@/labs/VDateInput/composables'
import { VPicker } from '@/labs/VPicker'

// Composables
import { createDatePicker } from './composables'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useDate } from '@/labs/date'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVDatePickerProps = propsFactory({
  cancelText: {
    type: String,
    default: '$vuetify.datePicker.cancel',
  },
  okText: {
    type: String,
    default: '$vuetify.datePicker.ok',
  },
  color: String,
  inputText: {
    type: String,
    default: '$vuetify.datePicker.input.placeholder'
  },
  showActions: Boolean,

  ...makeDateProps(),
  ...makeTransitionProps({ transition: 'fade' }),
}, 'VDatePicker')

export const VDatePicker = genericComponent()({
  name: 'VDatePicker',

  props: makeVDatePickerProps(),

  emits: {
    'click:cancel': () => true,
    'click:save': () => true,
    ...dateEmits,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const { t } = useLocale()

    createDatePicker(props)

    const displayDate = useProxiedModel(props, 'displayDate', props.displayDate)
    const inputMode = useProxiedModel(props, 'inputMode', props.inputMode)
    const viewMode = useProxiedModel(props, 'viewMode', props.viewMode)
    const inputModel = ref(props.modelValue?.length ? adapter.format(props.modelValue[0], 'keyboardDate') : '')
    const selected = ref<any[]>(props.modelValue ?? [])

    watch(inputModel, () => {
      const { isValid, date } = adapter

      selected.value = isValid(inputModel.value) ? [date(inputModel.value)] : []
    })

    watch(selected, () => {
      if (!props.showActions) {
        emit('update:modelValue', selected.value)
      }
    })

    function onClickCancel () {
      emit('click:cancel')
    }
    function onClickSave () {
      emit('click:save')
      emit('update:modelValue', selected.value)
    }

    useRender(() => {
      const [pickerProps] = VPicker.filterProps(props)
      const [datePickerHeaderProps] = VDatePickerHeader.filterProps(props)
      const [datePickerControlsProps] = VDatePickerControls.filterProps(props)
      const [datePickerMonthProps] = VDatePickerMonth.filterProps(props)
      const [datePickerYearsProps] = VDatePickerYears.filterProps(props)

      return (
        <VPicker
          { ...pickerProps }
          class="v-date-picker"
          v-slots={{
            header: () => (
              <VDatePickerHeader
                { ...datePickerHeaderProps }
                v-model:displayDate={ displayDate.value }
                v-model:inputMode={ inputMode.value }
                modelValue={ selected.value }
              />
            ),
            default: () => inputMode.value === 'calendar' ? (
              <>
                <VDatePickerControls
                  { ...datePickerControlsProps }
                  v-model:displayDate={ displayDate.value }
                  v-model:viewMode={ viewMode.value }
                />

                <MaybeTransition transition={ props.transition } mode="out-in">
                  { props.viewMode === 'month' ? (
                    <VDatePickerMonth
                      { ...datePickerMonthProps }
                      v-model={ selected.value }
                      v-model:displayDate={ displayDate.value }
                    />
                  ) : (
                    <VDatePickerYears
                      { ...datePickerYearsProps }
                      v-model:displayDate={ displayDate.value }
                      v-model:viewMode={ viewMode.value }
                      height="300"
                    />
                  )}
                </MaybeTransition>
              </>
            ) : (
              <div class="v-date-picker__input">
                <VTextField
                  v-model={ inputModel.value }
                  label={ t(props.inputText) }
                  placeholder="dd/mm/yyyy"
                />
              </div>
            ),
            actions: props.showActions ? (() => (
              <div>
                <VBtn
                  variant="text"
                  color={ props.color }
                  onClick={ onClickCancel }
                  text={ t(props.cancelText) }
                />

                <VBtn
                  variant="text"
                  color={ props.color }
                  onClick={ onClickSave }
                  text={ t(props.okText) }
                />
              </div>
            )) : undefined,
          }}
        />
      )
    })

    return {}
  },
})

export type VDatePicker = InstanceType<typeof VDatePicker>
