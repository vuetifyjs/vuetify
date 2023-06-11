// Styles
import './VDatePicker.sass'

// Components
import { makeVDatePickerControlsProps, VDatePickerControls } from './VDatePickerControls'
import { makeVDatePickerHeaderProps, VDatePickerHeader } from './VDatePickerHeader'
import { makeVDatePickerMonthProps, VDatePickerMonth } from './VDatePickerMonth'
import { makeVDatePickerYearsProps, VDatePickerYears } from './VDatePickerYears'
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'
import { dateEmits, makeDateProps } from '@/labs/VDateInput/composables'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { createDatePicker } from './composables'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useDate } from '@/labs/date'

// Utilities
import { computed, ref, watch } from 'vue'
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
  inputText: {
    type: String,
    default: '$vuetify.datePicker.input.placeholder',
  },
  hideActions: Boolean,

  ...makeDateProps(),
  ...makeTransitionProps({ transition: 'fade' }),
  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerHeaderProps(),
  ...makeVDatePickerMonthProps(),
  ...makeVDatePickerYearsProps(),
  ...makeVPickerProps({ title: '$vuetify.datePicker.title' }),
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
    const title = computed(() => t(props.title))

    watch(inputModel, () => {
      const { isValid, date } = adapter

      selected.value = isValid(inputModel.value) ? [date(inputModel.value)] : []
    })

    watch(selected, () => {
      if (props.hideActions) {
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
          class={[
            'v-date-picker',
            props.class,
          ]}
          style={ props.style }
          title={ title.value }
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
                  { viewMode.value === 'month' ? (
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
            actions: !props.hideActions ? () => (
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
            ) : undefined,
          }}
        />
      )
    })

    return {}
  },
})

export type VDatePicker = InstanceType<typeof VDatePicker>
