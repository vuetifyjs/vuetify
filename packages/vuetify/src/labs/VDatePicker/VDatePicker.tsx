// Styles
import './VDatePicker.sass'

// Components
import { makeVDatePickerControlsProps, VDatePickerControls } from './VDatePickerControls'
import { VDatePickerHeader } from './VDatePickerHeader'
import { makeVDatePickerMonthProps, VDatePickerMonth } from './VDatePickerMonth'
import { makeVDatePickerYearsProps, VDatePickerYears } from './VDatePickerYears'
import { VFadeTransition } from '@/components/transitions'
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'
import { dateEmits, makeDateProps } from '@/labs/VDateInput/composables'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { createDatePicker } from './composables'
import { useLocale } from '@/composables/locale'
import { useDate } from '@/labs/date'

// Utilities
import { computed, ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
export type VDatePickerSlots = {
  header: {
    header: string
    appendIcon: string
    'onClick:append': () => void
  }
}

export const makeVDatePickerProps = propsFactory({
  calendarIcon: {
    type: String,
    default: '$calendar',
  },
  keyboardIcon: {
    type: String,
    default: '$edit',
  },
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
  header: {
    type: String,
    default: '$vuetify.datePicker.header',
  },
  hideActions: Boolean,

  ...makeDateProps(),
  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps(),
  ...makeVDatePickerYearsProps(),
  ...makeVPickerProps({ title: '$vuetify.datePicker.title' }),
}, 'VDatePicker')

export const VDatePicker = genericComponent<VDatePickerSlots>()({
  name: 'VDatePicker',

  props: makeVDatePickerProps(),

  emits: {
    'click:cancel': () => true,
    'click:save': () => true,
    ...dateEmits,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const { t } = useLocale()

    const { model, displayDate, viewMode, inputMode } = createDatePicker(props)

    const isReversing = ref(false)

    const inputModel = computed(() => model.value.length ? adapter.format(model.value[0], 'keyboardDate') : '')
    const title = computed(() => t(props.title))
    const header = computed(() => model.value.length ? adapter.format(model.value[0], 'normalDateWithWeekday') : t(props.header))
    const headerIcon = computed(() => inputMode.value === 'calendar' ? props.keyboardIcon : props.calendarIcon)
    const headerTransition = computed(() => `date-picker-header${isReversing.value ? '-reverse' : ''}-transition`)

    watch(inputModel, () => {
      const { isValid, date } = adapter

      model.value = isValid(inputModel.value) ? [date(inputModel.value)] : []
    })

    watch(model, (val, oldVal) => {
      if (props.hideActions) {
        emit('update:modelValue', val)
      }

      if (val[0] && oldVal[0]) {
        isReversing.value = adapter.isBefore(val[0], oldVal[0])
      }
    })

    function onClickCancel () {
      emit('click:cancel')
    }
    function onClickSave () {
      emit('click:save')
      emit('update:modelValue', model.value)
    }
    function onClickAppend () {
      inputMode.value = inputMode.value === 'calendar' ? 'keyboard' : 'calendar'
    }

    const headerSlotProps = computed(() => ({
      header: header.value,
      appendIcon: headerIcon.value,
      transition: headerTransition.value,
      'onClick:append': onClickAppend,
    }))

    useRender(() => {
      const [pickerProps] = VPicker.filterProps(props)
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
          width={ props.showWeek ? 408 : 360 }
          v-slots={{
            header: () => slots.header?.(headerSlotProps.value) ?? (
              <VDatePickerHeader
                key="header"
                { ...headerSlotProps.value }
              />
            ),
            default: () => inputMode.value === 'calendar' ? (
              <>
                <VDatePickerControls
                  { ...datePickerControlsProps }
                  v-model:displayDate={ displayDate.value }
                  v-model:viewMode={ viewMode.value }
                />

                <VFadeTransition hideOnLeave>
                  { viewMode.value === 'month' ? (
                    <VDatePickerMonth
                      key="date-picker-month"
                      { ...datePickerMonthProps }
                      v-model={ model.value }
                      v-model:displayDate={ displayDate.value }
                    />
                  ) : (
                    <VDatePickerYears
                      key="date-picker-years"
                      { ...datePickerYearsProps }
                      v-model:displayDate={ displayDate.value }
                      v-model:viewMode={ viewMode.value }
                    />
                  )}
                </VFadeTransition>
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
