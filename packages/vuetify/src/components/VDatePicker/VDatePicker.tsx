// Styles
import './VDatePicker.sass'

// Components
import { makeVDatePickerControlsProps, VDatePickerControls } from './VDatePickerControls'
import { VDatePickerHeader } from './VDatePickerHeader'
import { makeVDatePickerMonthProps, VDatePickerMonth } from './VDatePickerMonth'
import { makeVDatePickerMonthsProps, VDatePickerMonths } from './VDatePickerMonths'
import { makeVDatePickerYearsProps, VDatePickerYears } from './VDatePickerYears'
import { VFadeTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { useDate } from '@/composables/date'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { VPickerSlots } from '@/labs/VPicker/VPicker'
import type { GenericProps } from '@/util'

// Types
export type VDatePickerSlots = Omit<VPickerSlots, 'header'> & {
  header: {
    header: string
    transition: string
  }
}

export const makeVDatePickerProps = propsFactory({
  // TODO: implement in v3.5
  // calendarIcon: {
  //   type: String,
  //   default: '$calendar',
  // },
  // keyboardIcon: {
  //   type: String,
  //   default: '$edit',
  // },
  // inputMode: {
  //   type: String as PropType<'calendar' | 'keyboard'>,
  //   default: 'calendar',
  // },
  // inputText: {
  //   type: String,
  //   default: '$vuetify.datePicker.input.placeholder',
  // },
  // inputPlaceholder: {
  //   type: String,
  //   default: 'dd/mm/yyyy',
  // },
  header: {
    type: String,
    default: '$vuetify.datePicker.header',
  },

  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps({
    weeksInMonth: 'static' as const,
  }),
  ...omit(makeVDatePickerMonthsProps(), ['modelValue']),
  ...omit(makeVDatePickerYearsProps(), ['modelValue']),
  ...makeVPickerProps({ title: '$vuetify.datePicker.title' }),

  modelValue: null,
}, 'VDatePicker')

export const VDatePicker = genericComponent<new <
  T,
  Multiple extends boolean | 'range' | number | (string & {}) = false,
  TModel = Multiple extends true | number | string
    ? T[]
    : T,
> (
  props: {
    modelValue?: TModel
    'onUpdate:modelValue'?: (value: TModel) => void
    multiple?: Multiple
  },
  slots: VDatePickerSlots
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDatePicker',

  props: makeVDatePickerProps(),

  emits: {
    'update:modelValue': (date: any) => true,
    'update:month': (date: any) => true,
    'update:year': (date: any) => true,
    // 'update:inputMode': (date: any) => true,
    'update:viewMode': (date: any) => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const { t } = useLocale()

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      v => wrapInArray(v).map(i => adapter.date(i)),
      v => props.multiple ? v : v[0],
    )

    const viewMode = useProxiedModel(props, 'viewMode')
    // const inputMode = useProxiedModel(props, 'inputMode')

    const minDate = computed(() => {
      const date = adapter.date(props.min)

      return props.min && adapter.isValid(date) ? date : null
    })
    const maxDate = computed(() => {
      const date = adapter.date(props.max)

      return props.max && adapter.isValid(date) ? date : null
    })

    const internal = computed(() => {
      const today = adapter.date()
      let value = today
      if (model.value?.[0]) {
        value = adapter.date(model.value[0])
      } else if (minDate.value && adapter.isBefore(today, minDate.value)) {
        value = minDate.value
      } else if (maxDate.value && adapter.isAfter(today, maxDate.value)) {
        value = maxDate.value
      }

      return value && adapter.isValid(value) ? value : today
    })

    const month = ref(Number(props.month ?? adapter.getMonth(adapter.startOfMonth(internal.value))))
    const year = ref(Number(props.year ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))))

    const isReversing = shallowRef(false)
    const header = computed(() => {
      if (props.multiple && model.value.length > 1) {
        return t('$vuetify.datePicker.itemsSelected', model.value.length)
      }

      return (model.value[0] && adapter.isValid(model.value[0]))
        ? adapter.format(adapter.date(model.value[0]), 'normalDateWithWeekday')
        : t(props.header)
    })
    const text = computed(() => {
      let date = adapter.date()

      date = adapter.setDate(date, 1)
      date = adapter.setMonth(date, month.value)
      date = adapter.setYear(date, year.value)

      return adapter.format(date, 'monthAndYear')
    })
    // const headerIcon = computed(() => props.inputMode === 'calendar' ? props.keyboardIcon : props.calendarIcon)
    const headerTransition = computed(() => `date-picker-header${isReversing.value ? '-reverse' : ''}-transition`)

    const disabled = computed(() => {
      if (props.disabled) return true

      const targets = []

      if (viewMode.value !== 'month') {
        targets.push(...['prev', 'next'])
      } else {
        let _date = adapter.date()

        _date = adapter.startOfMonth(_date)
        _date = adapter.setMonth(_date, month.value)
        _date = adapter.setYear(_date, year.value)

        if (minDate.value) {
          const date = adapter.addDays(adapter.startOfMonth(_date), -1)

          adapter.isAfter(minDate.value, date) && targets.push('prev')
        }

        if (maxDate.value) {
          const date = adapter.addDays(adapter.endOfMonth(_date), 1)

          adapter.isAfter(date, maxDate.value) && targets.push('next')
        }
      }

      return targets
    })

    // function onClickAppend () {
    //   inputMode.value = inputMode.value === 'calendar' ? 'keyboard' : 'calendar'
    // }

    function onClickNext () {
      if (month.value < 11) {
        month.value++
      } else {
        year.value++
        month.value = 0
        onUpdateYear(year.value)
      }
      onUpdateMonth(month.value)
    }

    function onClickPrev () {
      if (month.value > 0) {
        month.value--
      } else {
        year.value--
        month.value = 11
        onUpdateYear(year.value)
      }
      onUpdateMonth(month.value)
    }

    function onClickDate () {
      viewMode.value = 'month'
    }

    function onClickMonth () {
      viewMode.value = viewMode.value === 'months' ? 'month' : 'months'
    }

    function onClickYear () {
      viewMode.value = viewMode.value === 'year' ? 'month' : 'year'
    }

    function onUpdateMonth (value: number) {
      if (viewMode.value === 'months') onClickMonth()

      emit('update:month', value)
    }

    function onUpdateYear (value: number) {
      if (viewMode.value === 'year') onClickYear()

      emit('update:year', value)
    }

    watch(model, (val, oldVal) => {
      const arrBefore = wrapInArray(oldVal)
      const arrAfter = wrapInArray(val)

      if (!arrAfter.length) return

      const before = adapter.date(arrBefore[arrBefore.length - 1])
      const after = adapter.date(arrAfter[arrAfter.length - 1])
      const newMonth = adapter.getMonth(after)
      const newYear = adapter.getYear(after)

      if (newMonth !== month.value) {
        month.value = newMonth
        onUpdateMonth(month.value)
      }

      if (newYear !== year.value) {
        year.value = newYear
        onUpdateYear(year.value)
      }

      isReversing.value = adapter.isBefore(before, after)
    })

    useRender(() => {
      const pickerProps = VPicker.filterProps(props)
      const datePickerControlsProps = VDatePickerControls.filterProps(props)
      const datePickerHeaderProps = VDatePickerHeader.filterProps(props)
      const datePickerMonthProps = VDatePickerMonth.filterProps(props)
      const datePickerMonthsProps = omit(VDatePickerMonths.filterProps(props), ['modelValue'])
      const datePickerYearsProps = omit(VDatePickerYears.filterProps(props), ['modelValue'])

      const headerProps = {
        header: header.value,
        transition: headerTransition.value,
      }

      return (
        <VPicker
          { ...pickerProps }
          class={[
            'v-date-picker',
            `v-date-picker--${viewMode.value}`,
            {
              'v-date-picker--show-week': props.showWeek,
            },
            props.class,
          ]}
          style={ props.style }
          v-slots={{
            title: () => slots.title?.() ?? (
              <div class="v-date-picker__title">
                { t(props.title) }
              </div>
            ),
            header: () => slots.header ? (
              <VDefaultsProvider
                defaults={{
                  VDatePickerHeader: { ...headerProps },
                }}
              >
                { slots.header?.(headerProps) }
              </VDefaultsProvider>
            ) : (
              <VDatePickerHeader
                key="header"
                { ...datePickerHeaderProps }
                { ...headerProps }
                onClick={ viewMode.value !== 'month' ? onClickDate : undefined }
                v-slots={{
                  ...slots,
                  default: undefined,
                }}
              />
            ),
            default: () => (
              <>
                <VDatePickerControls
                  { ...datePickerControlsProps }
                  disabled={ disabled.value }
                  text={ text.value }
                  onClick:next={ onClickNext }
                  onClick:prev={ onClickPrev }
                  onClick:month={ onClickMonth }
                  onClick:year={ onClickYear }
                />

                <VFadeTransition hideOnLeave>
                  { viewMode.value === 'months' ? (
                    <VDatePickerMonths
                      key="date-picker-months"
                      { ...datePickerMonthsProps }
                      v-model={ month.value }
                      onUpdate:modelValue={ onUpdateMonth }
                      min={ minDate.value }
                      max={ maxDate.value }
                      year={ year.value }
                    />
                  ) : viewMode.value === 'year' ? (
                    <VDatePickerYears
                      key="date-picker-years"
                      { ...datePickerYearsProps }
                      v-model={ year.value }
                      onUpdate:modelValue={ onUpdateYear }
                      min={ minDate.value }
                      max={ maxDate.value }
                    />
                  ) : (
                    <VDatePickerMonth
                      key="date-picker-month"
                      { ...datePickerMonthProps }
                      v-model={ model.value }
                      v-model:month={ month.value }
                      v-model:year={ year.value }
                      onUpdate:month={ onUpdateMonth }
                      onUpdate:year={ onUpdateYear }
                      min={ minDate.value }
                      max={ maxDate.value }
                    />
                  )}
                </VFadeTransition>
              </>
            ),
            actions: slots.actions,
          }}
        />
      )
    })

    return {}
  },
})

export type VDatePicker = InstanceType<typeof VDatePicker>
