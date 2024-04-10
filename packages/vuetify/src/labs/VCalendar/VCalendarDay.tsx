// Styles
import './VCalendarDay.sass'

// Components
import { makeVCalendarIntervalProps, VCalendarInterval } from './VCalendarInterval'
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/composables/date'

// Utilities
import { computed } from 'vue'
import { genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'

export type VCalendarDaySlots = {
  default: never
  interval: any
}

export const makeVCalendarDayProps = propsFactory({
  hideDayHeader: Boolean,
  intervals: {
    type: Number,
    default: 24,
  },

  ...makeVCalendarIntervalProps(),
}, 'VCalendarDay')

export const VCalendarDay = genericComponent< VCalendarDaySlots >()({
  name: 'VCalendarDay',

  props: makeVCalendarDayProps(),

  setup (props, { attrs, slots }) {
    const adapter = useDate()
    const intervals = computed(() => [
      ...Array.from({ length: props.intervals }, (v, i) => i)
        .filter((int, index) => (props.intervalDuration * (index + props.intervalStart)) < 1440),
    ])

    useRender(() => {
      const calendarIntervalProps = VCalendarInterval.filterProps(props)

      return (
        <div class="v-calendar-day__container">
          { !props.hideDayHeader && (
            <div
              key="calender-week-name"
              class="v-calendar-weekly__head-weekday"
            >
              { adapter.format(props.day.date, 'weekdayShort') }

              <div>
                <VBtn
                  icon
                  text={ adapter.format(props.day.date, 'dayOfMonth') }
                  variant="text"
                />
              </div>
            </div>
          )}

          { intervals.value.map((_, index) =>
            slots.interval?.(calendarIntervalProps) ?? (
              <VCalendarInterval
                index={ index }
                { ...calendarIntervalProps }
                { ...getPrefixedEventHandlers(attrs, ':interval', () => calendarIntervalProps) }
              ></VCalendarInterval>
            )
          )}
        </div>
      )
    })

    return { intervals }
  },
})

export type VCalendarDay = InstanceType<typeof VCalendarDay>
