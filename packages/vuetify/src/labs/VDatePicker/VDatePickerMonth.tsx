// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { getWeek, useDate } from '@/labs/date/date'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

export type VDatePickerMonthSlots = {
  day: {
    props: {
      onClick: () => void
    }
    item: any
    i: number
  }
}

export const makeVDatePickerMonthProps = propsFactory({
  allowedDates: [Array, Function],
  color: String,
  month: [Number, String],
  hideWeekdays: Boolean,
  max: [Number, String, Date],
  min: [Number, String, Date],
  modelValue: null as unknown as PropType<string[] | string>,
  multiple: Boolean,
  showAdjacentMonths: Boolean,
  showWeek: Boolean,
  year: [Number, String],
}, 'VDatePickerMonth')

export const VDatePickerMonth = genericComponent<VDatePickerMonthSlots>()({
  name: 'VDatePickerMonth',

  props: makeVDatePickerMonthProps(),

  emits: {
    'update:modelValue': (date: any) => true,
    'update:month': (date: any) => true,
    'update:year': (date: any) => true,
  },

  setup (props, { emit, slots }) {
    const daysRef = ref()

    const adapter = useDate()
    // model comes in always as array
    // leaves as array if multiple
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => wrapInArray(v),
      v => {
        const array = wrapInArray(v).map(date => adapter.toISO(adapter.date(date)))

        return props.multiple ? array : array[0]
      }
    )
    // shorthand to access the first value in the model or a fresh date
    const _model = computed(() => {
      const value = model.value?.[0]

      return adapter.isValid(value) ? value : adapter.date()
    })
    const year = useProxiedModel(
      props,
      'year',
      undefined,
      v => {
        let date = adapter.date(_model.value)

        if (v != null) date = adapter.setYear(date, Number(v))

        return adapter.startOfYear(date)
      },
      v => adapter.getYear(v)
    )
    const month = useProxiedModel(
      props,
      'month',
      undefined,
      v => {
        let date = adapter.date(_model.value)

        if (v != null) date = adapter.setMonth(date, Number(v))

        date = adapter.setYear(date, adapter.getYear(year.value))

        return date
      },
      v => adapter.getMonth(v)
    )

    const weeksInMonth = computed(() => {
      const weeks = adapter.getWeekArray(month.value)

      const days = weeks.flat()

      // Make sure there's always 6 weeks in month (6 * 7 days)
      // But only do it if we're not hiding adjacent months?
      const daysInMonth = 6 * 7
      if (days.length < daysInMonth && props.showAdjacentMonths) {
        const lastDay = days[days.length - 1]

        let week = []
        for (let day = 1; day <= daysInMonth - days.length; day++) {
          week.push(adapter.addDays(lastDay, day))

          if (day % 7 === 0) {
            weeks.push(week)
            week = []
          }
        }
      }

      return weeks
    })

    const daysInMonth = computed(() => {
      const days = weeksInMonth.value.flat()
      const today = adapter.date()

      return days.map((date, index) => {
        const isoDate = adapter.toISO(date)
        const isAdjacent = !adapter.isSameMonth(date, month.value)

        return {
          date,
          isoDate,
          formatted: adapter.format(date, 'keyboardDate'),
          year: adapter.getYear(date),
          month: adapter.getMonth(date),
          isDisabled: isDisabled(date),
          isWeekStart: index % 7 === 0,
          isWeekEnd: index % 7 === 6,
          isSelected: model.value.includes(isoDate),
          isToday: adapter.isSameDay(date, today),
          isAdjacent,
          isHidden: isAdjacent && !props.showAdjacentMonths,
          isHovered: false,
          localized: adapter.format(date, 'dayOfMonth'),
        }
      })
    })

    const weeks = computed(() => {
      return weeksInMonth.value.map(week => {
        return getWeek(adapter, week[0])
      })
    })

    function isDisabled (value: any) {
      const date = adapter.date(value)

      if (props.min && adapter.isAfter(props.min, date)) return true
      if (props.max && adapter.isAfter(date, props.max)) return true

      if (Array.isArray(props.allowedDates)) {
        return !props.allowedDates.some(d => adapter.isSameDay(adapter.date(d), date))
      }

      if (typeof props.allowedDates === 'function') {
        return !props.allowedDates(date)
      }

      return false
    }

    function onClick (string: any) {
      if (props.multiple) {
        const index = model.value.findIndex(selection => selection === string)

        if (index === -1) {
          model.value = [...model.value, string]
        } else {
          const value = [...model.value]
          value.splice(index, 1)
          model.value = value
        }
      } else {
        model.value = string
      }
    }

    return () => (
      <div class="v-date-picker-month">
        { props.showWeek && (
          <div key="weeks" class="v-date-picker-month__weeks">
            { !props.hideWeekdays && (
              <div key="hide-week-days" class="v-date-picker-month__day">&nbsp;</div>
            )}
            { weeks.value.map(week => (
              <div
                class={[
                  'v-date-picker-month__day',
                  'v-date-picker-month__day--adjacent',
                ]}
              >{ week }</div>
            ))}
          </div>
        )}

        <div
          ref={ daysRef }
          class="v-date-picker-month__days"
        >
          { !props.hideWeekdays && adapter.getWeekdays().map(weekDay => (
            <div
              class={[
                'v-date-picker-month__day',
                'v-date-picker-month__weekday',
              ]}
            >{ weekDay }</div>
          ))}

          { daysInMonth.value.map((item, i) => {
            const slotProps = {
              props: {
                onClick: () => onClick(item.isoDate),
              },
              item,
              i,
            } as const

            return (
              <div
                class={[
                  'v-date-picker-month__day',
                  {
                    'v-date-picker-month__day--adjacent': item.isAdjacent,
                    'v-date-picker-month__day--hide-adjacent': item.isHidden,
                    'v-date-picker-month__day--hovered': item.isHovered,
                    'v-date-picker-month__day--selected': item.isSelected,
                    'v-date-picker-month__day--week-end': item.isWeekEnd,
                    'v-date-picker-month__day--week-start': item.isWeekStart,
                  },
                ]}
                data-v-date={ !item.isDisabled ? item.isoDate : undefined }
              >

                { (props.showAdjacentMonths || !item.isAdjacent) && (
                  <VDefaultsProvider
                    defaults={{
                      VBtn: {
                        color: (item.isSelected || item.isToday) && !item.isDisabled
                          ? props.color
                          : undefined,
                        disabled: item.isDisabled,
                        icon: true,
                        ripple: false,
                        text: item.localized,
                        variant: item.isDisabled
                          ? 'text'
                          : item.isToday && !item.isSelected ? 'outlined' : 'flat',
                        onClick: () => onClick(item.isoDate),
                      },
                    }}
                  >
                    { slots.day?.(slotProps) ?? (
                      <VBtn { ...slotProps.props } />
                    )}
                  </VDefaultsProvider>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
})

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>
