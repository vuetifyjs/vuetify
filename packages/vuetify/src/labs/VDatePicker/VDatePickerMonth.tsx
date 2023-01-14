// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useDatePicker } from './composables'

// Utilities
import { computed, ref } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export const VDatePickerMonth = defineComponent({
  name: 'VDatePickerMonth',

  props: {
    color: {
      type: String,
      default: 'primary',
    },
    hideAdjacentMonths: Boolean,
    hideWeekdays: Boolean,
    showWeek: Boolean,
    range: {
      default: false,
      type: [String, Boolean] as PropType<'start' | 'end' | boolean>,
      validator: (v: any) => typeof v === 'boolean' || ['start', 'end'].includes(v),
    },
    displayDate: null,
    hoverDate: null,
  },

  emits: {
    'update:displayDate': (date: any) => true,
    'update:modelValue': (date: any) => true,
    'update:hoverDate': (date: any) => true,
  },

  setup (props, { emit, slots }) {
    const { adapter, model } = useDatePicker()

    const month = computed(() => props.displayDate)

    const findClosestDate = (date: any, dates: readonly any[]) => {
      if (!dates?.length) return null

      return dates.reduce((prev, curr) => {
        const distCurr = Math.abs(adapter.value.getDiff(date, curr, 'days'))
        const distPrev = Math.abs(adapter.value.getDiff(date, prev, 'days'))

        return distCurr < distPrev ? curr : prev
      })
    }

    const hoverRange = computed<[any, any] | null>(() => {
      if (!props.hoverDate) return null

      const closestDate = findClosestDate(props.hoverDate, model.value)

      if (!closestDate) return null

      return adapter.value.isAfter(props.hoverDate, closestDate) ? [closestDate, props.hoverDate] : [props.hoverDate, closestDate]
    })

    const weeksInMonth = computed(() => {
      const weeks = adapter.value.getWeekArray(month.value)

      const days = weeks.flat()

      // Make sure there's always 6 weeks in month (6 * 7 days)
      // But only do it if we're not hiding adjacent months?
      const daysInMonth = 6 * 7
      if (days.length < daysInMonth && !props.hideAdjacentMonths) {
        const lastDay = days[days.length - 1]

        let week = []
        for (let day = 1; day <= daysInMonth - days.length; day++) {
          week.push(adapter.value.addDays(lastDay, day))

          if (day % 7 === 0) {
            weeks.push(week)
            week = []
          }
        }
      }

      return weeks
    })

    const isSameCalendarDate = (a: any, b: any) => {
      const { isSameYear, isSameDay, isSameMonth } = adapter.value
      return isSameYear(a, b) && isSameMonth(a, b) && isSameDay(a, b)
    }

    const daysInMonth = computed(() => {
      const { format, getYear, getMonth, isWithinRange, isSameMonth } = adapter.value
      const validDates = model.value.filter(v => !!v)
      const isRange = validDates.length > 1

      const days = weeksInMonth.value.flat()
      const today = adapter.value.date()

      return days.map((date, index) => {
        const modelIndex = model.value.findIndex(modelDate => isSameCalendarDate(date, modelDate))

        const isAdjacent = !isSameMonth(date, month.value)

        return {
          date,
          year: getYear(date),
          month: getMonth(date),
          isWeekStart: index % 7 === 0,
          isWeekEnd: index % 7 === 6,
          isSelected: modelIndex > -1 && !isAdjacent,
          isStart: modelIndex === 0,
          isEnd: modelIndex === 1,
          isToday: adapter.value.isSameDay(date, today),
          isAdjacent,
          inRange: isRange && (modelIndex === 0 || (validDates.length === 2 && isWithinRange(date, validDates as [any, any]))),
          isHovered: props.hoverDate === date,
          inHover: hoverRange.value && isWithinRange(date, hoverRange.value),
          localized: format(date, 'dayOfMonth'),
        }
      })
    })

    const weeks = computed(() => {
      return weeksInMonth.value.map(week => {
        return adapter.value.getWeek(week[0])
      })
    })

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    function selectDate (date: any) {
      const value = model.value.slice()

      if (props.range) {
        if (value.find(d => isSameCalendarDate(d, date))) {
          model.value = model.value.filter(v => !isSameCalendarDate(v, date))
        } else if (value.length === 2) {
          const closest = findClosestDate(date, value)

          const index = value.indexOf(closest)

          model.value = value.map((v, i) => i === index ? date : v)
        } else {
          if (adapter.value.isBefore(value[0], date)) {
            model.value = [value[0], date]
          } else {
            model.value = [date, value[0]]
          }
        }
      } else {
        if (!adapter.value.isSameMonth(month.value, date)) {
          emit('update:displayDate', date)
        }

        model.value = [date]
      }
    }

    let hoverTimeout: NodeJS.Timeout

    return () => (
      <div class="v-date-picker-month">
        { props.showWeek && (
          <div key="weeks" class="v-date-picker-month__weeks">
            { !props.hideWeekdays && (
              <div key="hide-week-days" class="v-date-picker-month__day">&nbsp;</div>
            ) }
            { weeks.value.map(week => (
              <div
                class={[
                  'v-date-picker-month__day',
                  'v-date-picker-month__day--adjacent',
                ]}
              >{ week }</div>
            )) }
          </div>
        ) }

        <div class="v-date-picker-month__days">
          { !props.hideWeekdays && adapter.value.getWeekdays().map(weekDay => (
            <div
              class={[
                'v-date-picker-month__day',
                'v-date-picker-month__weekday',
              ]}
            >{ weekDay }</div>
          )) }

          { daysInMonth.value.map(item => (
            <div
              class={[
                'v-date-picker-month__day',
                {
                  'v-date-picker-month__day--selected': item.isSelected,
                  'v-date-picker-month__day--start': item.isStart,
                  'v-date-picker-month__day--end': item.isEnd,
                  'v-date-picker-month__day--adjacent': item.isAdjacent,
                  'v-date-picker-month__day--hide-adjacent': item.isAdjacent && props.hideAdjacentMonths,
                  'v-date-picker-month__day--week-start': item.isWeekStart,
                  'v-date-picker-month__day--week-end': item.isWeekEnd,
                  'v-date-picker-month__day--hovered': item.isHovered,
                },
              ]}
            >
              { item.inRange && (
                <div
                  key="in-range"
                  class={[
                    'v-date-picker-month__day--range',
                    backgroundColorClasses.value,
                  ]}
                  style={ backgroundColorStyles.value }
                />
              ) }

              { item.inHover && !item.isStart && !item.isEnd && !item.isHovered && !item.inRange && (
                <div
                  key="in-hover"
                  class="v-date-picker-month__day--hover"
                />
              ) }

              { (!props.hideAdjacentMonths || (props.hideAdjacentMonths && !item.isAdjacent)) && (
                <VBtn
                  icon
                  variant={ (item.isToday || item.isHovered) && !item.isSelected ? 'outlined' : 'flat' }
                  color={ item.isSelected ? props.color : (item.isToday || item.isHovered) ? undefined : 'transparent' }
                  onClick={ () => selectDate(item.date) }
                  onMouseenter={ () => {
                    clearTimeout(hoverTimeout)
                    emit('update:hoverDate', item.date)
                  }}
                  onMouseleave={ () => {
                    hoverTimeout = setTimeout(() => {
                      emit('update:hoverDate', null)
                    }, 200)
                  }}
                >
                  { item.localized }
                </VBtn>
              ) }
            </div>
          ))}
        </div>
      </div>
    )
  },
})
