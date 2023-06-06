// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, omit, propsFactory } from '@/util'

// Types
import { dateEmits, makeDateProps } from '../VDateInput/composables'
import { useDate } from '@/labs/date'

export const makeVDatePickerMonthViewProps = propsFactory({
  color: String,
  showAdjacentMonths: Boolean,
  hideWeekdays: Boolean,
  showWeek: Boolean,
  hoverDate: null,
  multiple: Boolean,
  side: {
    type: String,
  },

  ...omit(makeDateProps(), ['inputMode', 'viewMode']),
}, 'VDatePickerMonthView')

export const VDatePickerMonthView = genericComponent()({
  name: 'VDatePickerMonthView',

  props: makeVDatePickerMonthViewProps({ color: 'surface-variant' }),

  emits: {
    ...omit(dateEmits, ['update:inputMode', 'update:viewMode']),
    'update:hoverDate': (date: any) => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const month = computed(() => props.displayDate)

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
      const validDates = [props.modelValue].filter(v => !!v)
      const isRange = validDates.length > 1

      const days = weeksInMonth.value.flat()
      const today = adapter.date()

      const startDate = validDates[0]
      const endDate = validDates[1]

      return days.map((date, index) => {
        const isStart = startDate && adapter.isSameDay(date, startDate)
        const isEnd = endDate && adapter.isSameDay(date, endDate)
        const isAdjacent = !adapter.isSameMonth(date, month.value)
        const isSame = validDates.length === 2 && adapter.isSameDay(startDate, endDate)

        return {
          date,
          isoDate: adapter.toIso(date),
          formatted: adapter.format(date, 'keyboardDate'),
          year: adapter.getYear(date),
          month: adapter.getMonth(date),
          isWeekStart: index % 7 === 0,
          isWeekEnd: index % 7 === 6,
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isToday: adapter.isSameDay(date, today),
          isAdjacent,
          isHidden: isAdjacent && !props.showAdjacentMonths,
          inRange: isRange &&
            !isSame &&
            (isStart || isEnd || (validDates.length === 2 && adapter.isWithinRange(date, validDates as [any, any]))),
          // isHovered: props.hoverDate === date,
          // inHover: hoverRange.value && isWithinRange(date, hoverRange.value),
          isHovered: false,
          inHover: false,
          localized: adapter.format(date, 'dayOfMonth'),
        }
      })
    })

    const weeks = computed(() => {
      return weeksInMonth.value.map(week => {
        return adapter.getWeek(week[0])
      })
    })
    const days = computed(() => {
      return !props.hideWeekdays ? adapter.getWeekdays() : []
    })

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const daysRef = ref()

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
                v-text={ week }
              />
            ))}
          </div>
        )}

        <div
          ref={ daysRef }
          class="v-date-picker-month__days"
        >
          { days.value.map(day => (
            <div
              class={[
                'v-date-picker-month__day',
                'v-date-picker-month__weekday',
              ]}
            >
              { slots.day?.({ day }) ?? day.charAt(0) }
            </div>
          ))}

          { daysInMonth.value.map((item, index) => (
            <div
              class={[
                'v-date-picker-month__day',
                {
                  'v-date-picker-month__day--selected': item.isSelected,
                  'v-date-picker-month__day--start': item.isStart,
                  'v-date-picker-month__day--end': item.isEnd,
                  'v-date-picker-month__day--adjacent': item.isAdjacent,
                  'v-date-picker-month__day--hide-adjacent': item.isHidden,
                  'v-date-picker-month__day--week-start': item.isWeekStart,
                  'v-date-picker-month__day--week-end': item.isWeekEnd,
                  'v-date-picker-month__day--hovered': item.isHovered,
                },
              ]}
              data-v-date={ !item.isHidden ? item.isoDate : undefined }
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
              )}

              { item.inHover && !item.isStart && !item.isEnd && !item.isHovered && !item.inRange && (
                <div
                  key="in-hover"
                  class="v-date-picker-month__day--hover"
                />
              )}

              { (!item.isHidden) && (
                <VBtn
                  icon
                  ripple={ false } /* ripple not working correctly since we preventDefault in touchend */
                  variant={ (item.isToday || item.isHovered) && !item.isSelected ? 'outlined' : 'flat' }
                  active={ item.isSelected }
                  color={ item.isSelected ? props.color : (item.isToday || item.isHovered) ? undefined : 'transparent' }
                  text={ item.localized }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    )
  },
})

export type VDatePickerMonthView = InstanceType<typeof VDatePickerMonthView>
