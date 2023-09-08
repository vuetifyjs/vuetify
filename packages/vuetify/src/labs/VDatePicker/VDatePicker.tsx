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
import { computed, ref, shallowRef, watch } from 'vue'
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
  inputPlaceholder: {
    type: String,
    default: 'dd/mm/yyyy',
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

    const { model, displayDate, viewMode, inputMode, isEqual } = createDatePicker(props)

    const isReversing = shallowRef(false)

    const inputModel = ref(model.value.map(date => adapter.format(date, 'keyboardDate')))
    const temporaryModel = ref(model.value)
    const title = computed(() => t(props.title))
    const header = computed(() => model.value.length ? adapter.format(model.value[0], 'normalDateWithWeekday') : t(props.header))
    const headerIcon = computed(() => inputMode.value === 'calendar' ? props.keyboardIcon : props.calendarIcon)
    const headerTransition = computed(() => `date-picker-header${isReversing.value ? '-reverse' : ''}-transition`)
    const minDate = computed(() => props.min && adapter.isValid(props.min) ? adapter.date(props.min) : null)
    const maxDate = computed(() => props.max && adapter.isValid(props.max) ? adapter.date(props.max) : null)

    const disabled = computed(() => {
      if (!minDate.value && !maxDate.value) return false

      const targets = []

      if (minDate.value) {
        const date = adapter.addDays(adapter.startOfMonth(displayDate.value), -1)

        adapter.isAfter(minDate.value, date) && targets.push('prev')
      }

      if (maxDate.value) {
        const date = adapter.addDays(adapter.endOfMonth(displayDate.value), 1)

        adapter.isAfter(date, maxDate.value) && targets.push('next')
      }

      if (minDate.value?.getFullYear() === maxDate.value?.getFullYear()) {
        targets.push('mode')
      }

      return targets
    })

    watch(model, val => {
      if (!isEqual(val, temporaryModel.value)) {
        temporaryModel.value = val
      }

      inputModel.value = val.map(date => adapter.format(date, 'keyboardDate'))
    })

    watch(temporaryModel, (val, oldVal) => {
      if (props.hideActions && !isEqual(val, model.value)) {
        model.value = val
      }

      if (val[0] && oldVal[0]) {
        isReversing.value = adapter.isBefore(val[0], oldVal[0])
      }
    })

    function updateFromInput (input: string, index: number) {
      const { isValid, date } = adapter

      if (isValid(input)) {
        const newModel = model.value.slice()
        newModel[index] = date(input)

        if (props.hideActions) {
          model.value = newModel
        } else {
          temporaryModel.value = newModel
        }
      }
    }

    function onClickCancel () {
      emit('click:cancel')
    }

    function onClickSave () {
      emit('click:save')

      model.value = temporaryModel.value
    }

    function onClickAppend () {
      inputMode.value = inputMode.value === 'calendar' ? 'keyboard' : 'calendar'
    }

    function onClickNext () {
      displayDate.value = adapter.addMonths(displayDate.value, 1)
    }

    function onClickPrev () {
      displayDate.value = adapter.addMonths(displayDate.value, -1)
    }

    function onClickMode () {
      viewMode.value = viewMode.value === 'month' ? 'year' : 'month'
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
                  disabled={ disabled.value }
                  displayDate={ adapter.format(displayDate.value, 'monthAndYear') }
                  onClick:next={ onClickNext }
                  onClick:prev={ onClickPrev }
                  onClick:mode={ onClickMode }
                />

                <VFadeTransition hideOnLeave>
                  { viewMode.value === 'month' ? (
                    <VDatePickerMonth
                      key="date-picker-month"
                      { ...datePickerMonthProps }
                      v-model={ temporaryModel.value }
                      displayDate={ displayDate.value }
                      min={ minDate.value }
                      max={ maxDate.value }
                    />
                  ) : (
                    <VDatePickerYears
                      key="date-picker-years"
                      { ...datePickerYearsProps }
                      v-model:displayDate={ displayDate.value }
                      min={ minDate.value }
                      max={ maxDate.value }
                      onClick:mode={ onClickMode }
                    />
                  )}
                </VFadeTransition>
              </>
            ) : (
              <div class="v-date-picker__input">
                <VTextField
                  modelValue={ inputModel.value[0] }
                  onUpdate:modelValue={ v => updateFromInput(v, 0) }
                  label={ t(props.inputText) }
                  placeholder={ props.inputPlaceholder }
                />
              </div>
            ),
            actions: () => !props.hideActions ? (
              <div>
                <VBtn
                  color={ props.color }
                  onClick={ onClickCancel }
                  text={ t(props.cancelText) }
                />

                <VBtn
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
