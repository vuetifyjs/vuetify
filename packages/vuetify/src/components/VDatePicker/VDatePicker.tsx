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
import * as dateUtil from '@/composables/date/temporal'
import { useLocale, useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, shallowRef, toRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VDatePickerHeaderSlots } from './VDatePickerHeader'
import type { VDatePickerMonthSlots } from './VDatePickerMonth'
import type { VDatePickerMonthsSlots } from './VDatePickerMonths'
import type { VDatePickerYearsSlots } from './VDatePickerYears'
import type { VPickerSlots } from '@/labs/VPicker/VPicker'
import type { GenericProps } from '@/util'

// Types
export type VDatePickerSlots =
  & Omit<VPickerSlots, 'header' | 'default'>
  & Omit<VDatePickerHeaderSlots, 'default'>
  & VDatePickerYearsSlots
  & VDatePickerMonthsSlots
  & VDatePickerMonthSlots
  & {
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
  headerColor: String,

  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps({
    weeksInMonth: 'static' as const,
  }),
  ...omit(makeVDatePickerMonthsProps(), ['modelValue']),
  ...omit(makeVDatePickerYearsProps(), ['modelValue']),
  ...makeVPickerProps({ title: '$vuetify.datePicker.title' }),

  modelValue: [String, Array] as PropType<string | (string | undefined)[]>,
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
    const { t } = useLocale()
    const { rtlClasses } = useRtl()

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      v => wrapInArray(v).map(i => dateUtil.parsePlainDate(i)),
      v => props.multiple ? v.map(i => i?.toString()) : v[0]?.toString(),
    )

    const viewMode = useProxiedModel(props, 'viewMode')
    // const inputMode = useProxiedModel(props, 'inputMode')

    const minDate = computed(() => {
      return dateUtil.parsePlainDate(props.min)
    })
    const maxDate = computed(() => {
      return dateUtil.parsePlainDate(props.max)
    })

    const internal = computed(() => {
      const today = Temporal.Now.plainDateISO()
      let value = today
      if (model.value?.[0]) {
        value = model.value[0]
      } else if (minDate.value && dateUtil.isBefore(today, minDate.value)) {
        value = minDate.value
      } else if (maxDate.value && dateUtil.isAfter(today, maxDate.value)) {
        value = maxDate.value
      }

      return value
    })
    const headerColor = toRef(() => props.headerColor ?? props.color)

    const _month = useProxiedModel(props, 'month')
    const month = computed({
      get: () => Number(_month.value ?? internal.value.month),
      set: v => _month.value = v,
    })

    const _year = useProxiedModel(props, 'year')
    const year = computed({
      get: () => Number(_year.value ?? internal.value.year),
      set: v => _year.value = v,
    })

    const isReversing = shallowRef(false)
    const header = computed(() => {
      if (props.multiple === 'range' && model.value.length === 2) {
        const [startDate, endDate] = model.value
        const daysBetween = startDate!.until(endDate!, { largestUnit: 'day' }).days + 1

        return t('$vuetify.datePicker.itemsSelected', daysBetween)
      }

      if (props.multiple && model.value.length > 1) {
        return t('$vuetify.datePicker.itemsSelected', model.value.length)
      }

      return model.value[0]
        ? dateUtil.format(model.value[0], 'normalDateWithWeekday')
        : t(props.header)
    })
    const text = computed(() => {
      return dateUtil.format(
        Temporal.PlainDate.from({
          year: year.value,
          month: month.value,
          day: 1,
        }),
        'monthAndYear'
      )
    })
    // const headerIcon = toRef(() => props.inputMode === 'calendar' ? props.keyboardIcon : props.calendarIcon)
    const headerTransition = toRef(() => `date-picker-header${isReversing.value ? '-reverse' : ''}-transition`)

    const disabled = computed(() => {
      if (props.disabled) return true

      const targets = []

      if (viewMode.value !== 'month') {
        targets.push(...['prev', 'next'])
      } else {
        const _date = Temporal.PlainDate.from({
          year: year.value,
          month: month.value,
          day: 1,
        })

        if (minDate.value) {
          const date = _date.subtract({ days: 1 })

          dateUtil.isAfter(minDate.value, date) && targets.push('prev')
        }

        if (maxDate.value) {
          const date = _date.with({ day: _date.daysInMonth }).add({ days: 1 })

          dateUtil.isAfter(date, maxDate.value) && targets.push('next')
        }
      }

      return targets
    })

    const allowedYears = computed(() => {
      return props.allowedYears || isYearAllowed
    })

    const allowedMonths = computed(() => {
      return props.allowedMonths || isMonthAllowed
    })

    function isAllowedInRange (start: Temporal.PlainDate, end: Temporal.PlainDate) {
      const allowedDates = props.allowedDates
      if (typeof allowedDates !== 'function') return true
      const days = start.until(end, { largestUnit: 'day' }).days
      for (let i = 0; i < days; i++) {
        if (allowedDates(start.add({ days: i }).toString())) return true
      }
      return false
    }

    function isYearAllowed (year: number) {
      if (typeof props.allowedDates === 'function') {
        const startOfYear = dateUtil.parseISO(`${year}-01-01`)
        return isAllowedInRange(startOfYear, dateUtil.endOfYear(startOfYear))
      }

      if (Array.isArray(props.allowedDates) && props.allowedDates.length) {
        for (const date of props.allowedDates) {
          if (Temporal.PlainDate.from(date).year === year) return true
        }
        return false
      }

      return true
    }

    function isMonthAllowed (month: number) {
      if (typeof props.allowedDates === 'function') {
        const startOfMonth = Temporal.PlainDate.from({
          year: year.value,
          month,
          day: 1,
        })
        return isAllowedInRange(startOfMonth, dateUtil.endOfMonth(startOfMonth))
      }

      if (Array.isArray(props.allowedDates) && props.allowedDates.length) {
        for (const date of props.allowedDates) {
          const _date = Temporal.PlainDate.from(date)
          if (_date.year === year.value && _date.month === month) {
            return true
          }
        }
        return false
      }

      return true
    }

    // function onClickAppend () {
    //   inputMode.value = inputMode.value === 'calendar' ? 'keyboard' : 'calendar'
    // }

    function onClickNext () {
      if (month.value < 11) {
        month.value++
      } else {
        year.value++
        month.value = 0
        onUpdateYear()
      }
      onUpdateMonth()
    }

    function onClickPrev () {
      if (month.value > 0) {
        month.value--
      } else {
        year.value--
        month.value = 11
        onUpdateYear()
      }
      onUpdateMonth()
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

    function onUpdateMonth () {
      if (viewMode.value === 'months') onClickMonth()
    }

    function onUpdateYear () {
      if (viewMode.value === 'year') onClickYear()
    }

    watch(model, (val, oldVal) => {
      const arrBefore = wrapInArray(oldVal)
      const arrAfter = wrapInArray(val)

      if (!arrAfter.length) return

      const before = arrBefore.at(-1)
      const after = arrAfter.at(-1)
      const newMonth = after?.month
      const newYear = after?.year

      if (newMonth && newMonth !== month.value) {
        month.value = newMonth
        onUpdateMonth()
      }

      if (newYear && newYear !== year.value) {
        year.value = newYear
        onUpdateYear()
      }

      if (before && after) {
        isReversing.value = dateUtil.isBefore(before, after)
      }
    })

    useRender(() => {
      const pickerProps = VPicker.filterProps(props)
      const datePickerControlsProps = VDatePickerControls.filterProps(props)
      const datePickerHeaderProps = VDatePickerHeader.filterProps(props)
      const datePickerMonthProps = VDatePickerMonth.filterProps(props)
      const datePickerMonthsProps = omit(VDatePickerMonths.filterProps(props), ['modelValue'])
      const datePickerYearsProps = omit(VDatePickerYears.filterProps(props), ['modelValue'])

      const headerProps = {
        color: headerColor.value,
        header: header.value,
        transition: headerTransition.value,
      }

      return (
        <VPicker
          { ...pickerProps }
          color={ headerColor.value }
          class={[
            'v-date-picker',
            `v-date-picker--${viewMode.value}`,
            {
              'v-date-picker--show-week': props.showWeek,
            },
            rtlClasses.value,
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
                  prepend: slots.prepend,
                  append: slots.append,
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
                      min={ minDate.value }
                      max={ maxDate.value }
                      year={ year.value }
                      allowedMonths={ allowedMonths.value }
                      onUpdate:modelValue={ onUpdateMonth }
                    >
                      {{ month: slots.month }}
                    </VDatePickerMonths>
                  ) : viewMode.value === 'year' ? (
                    <VDatePickerYears
                      key="date-picker-years"
                      { ...datePickerYearsProps }
                      v-model={ year.value }
                      min={ minDate.value }
                      max={ maxDate.value }
                      allowedYears={ allowedYears.value }
                      onUpdate:modelValue={ onUpdateYear }
                    >
                      {{ year: slots.year }}
                    </VDatePickerYears>
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
                    >
                      {{ day: slots.day }}
                    </VDatePickerMonth>
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
