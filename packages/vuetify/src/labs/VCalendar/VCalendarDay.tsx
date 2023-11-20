// Styles
import './VCalendarDay.sass'

// Composables
import { useDate } from '@/composables/date'

// Utilities
import { computed } from 'vue'
import { VCalendarInterval } from './VCalendarInterval'
import { genericComponent, useRender } from '@/util'

export const VCalendarDay = genericComponent()({
  name: 'VCalendarDay',

  props: {
    day: {
      type: Object,
      required: true,
    },
    dayIndex: {
      type: Number,
      default: 0,
    },
    events: Array<any>,
    hideDayHeader: Boolean,
    intervalDivisions: {
      type: Number,
      required: true,
    },
    intervalDuration: {
      type: Number,
      required: true,
    },
    intervalHeight: Number,
    intervalLabel: [String, Function],
    intervals: {
      type: Number,
      required: true,
    },
    intervalStart: {
      type: Number,
      required: true,
    },
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const intervals = computed(() => [
      ...Array.from({ length: props.intervals }, (v, i) => i)
        .filter((int, index) => (props.intervalDuration * (index + props.intervalStart)) < 1440),
    ])

    useRender(() => {
      return (
        <div class="v-calendar-day__container">
          { !props.hideDayHeader ? (
            <div key="calenderWeekName" class="v-calendar-weekly__head-weekday">
              { adapter.format(props.day.date, 'weekdayShort') }
            </div>
          ) : '' }
          { intervals.value.map((_, index) => (
            <VCalendarInterval
              day={ props.day }
              dayIndex={ props.dayIndex }
              events={ props.events }
              index={ index }
              intervalDivisions={ props.intervalDivisions }
              intervalDuration={ props.intervalDuration }
              intervalHeight={ props.intervalHeight }
              intervalLabel={ props.intervalLabel }
              intervalStart={ props.intervalStart }
            ></VCalendarInterval>
          ))
          }
        </div>
      )
    })

    return { intervals }
  },
})

export type VCalendarDay = InstanceType<typeof VCalendarDay>
