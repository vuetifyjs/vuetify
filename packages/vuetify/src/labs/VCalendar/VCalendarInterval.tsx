// Styles
import './VCalendarInterval.sass'

// Utilities
import { computed } from 'vue'
import { useDate } from '@/labs/date'
import { genericComponent, useRender } from '@/util'

export const VCalendarInterval = genericComponent()({
  name: 'VCalendarInterval',

  props: {
    day: {
      type: Object,
      required: true,
    },
    dayIndex: Number,
    events: Array<any>,
    index: {
      type: Number,
      required: true,
    },
    intervalDuration: {
      type: Number,
      required: true,
    },
    intervalHeight: Number,
    intervalStart: {
      type: Number,
      required: true,
    },
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const interval = computed(() => ({
      ...props.day,
      start: adapter.addMinutes(adapter.startOfDay(props.day.date), (props.intervalDuration * (props.index + props.intervalStart))),
      end: adapter.addMinutes(adapter.startOfDay(props.day.date), (props.intervalDuration * (props.index + props.intervalStart + 1)) - 1),
    }))

    useRender(() => {
      return (
        props.dayIndex === 0 ? (
          <div class="v-calendar-day__row-with-label" style={ `height: ${props.intervalHeight}px` }>
            <div class="v-calendar-day__row-label">{ props.index ? adapter.format(interval.value.start, 'fullTime24h') : '' }</div>
            <div class="v-calendar-day__row-hairline"></div>
            <div class="v-calendar-day__row-content">
              Events
            </div>
          </div>
        ) : (
          <div class="v-calendar-day__row-without-label" style={ `height: ${props.intervalHeight}px` }>
            <div class="v-calendar-day__row-content">
              Events
            </div>
          </div>
        )
      )
    })
    return { interval }
  },
})

export type VCalendarInterval = InstanceType<typeof VCalendarInterval>
