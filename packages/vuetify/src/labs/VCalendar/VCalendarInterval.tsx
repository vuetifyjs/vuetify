// Styles
import './VCalendarInterval.sass'

// Composables
import { useDate } from '@/composables/date'

// Utilities
import { computed } from 'vue'
import { VCalendarIntervalEvent } from './VCalendarIntervalEvent'
import { convertToUnit, genericComponent, useRender } from '@/util'

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
    intervalDivisions: {
      type: Number,
      required: true,
    },
    intervalDuration: {
      type: Number,
      required: true,
    },
    intervalHeight: {
      type: Number,
      required: true,
    },
    intervalLabel: [String, Function],
    intervalStart: {
      type: Number,
      required: true,
    },
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const interval = computed(() => {
      const start = adapter.addMinutes(adapter.startOfDay(props.day.date), (props.intervalDuration * (props.index + props.intervalStart)))
      const end = adapter.addMinutes(
        adapter.startOfDay(props.day.date),
        (props.intervalDuration * (props.index + props.intervalStart + 1)) - 1
      )
      return {
        ...props.day,
        label: adapter.format(start, 'fullTime24h'),
        start,
        end,
        events: props.events
          ? props.events
            .filter(e => !e.allDay &&
              (adapter.isEqual(start, e.start) ||
              adapter.isWithinRange(e.start, [start, end]) ||
              adapter.isWithinRange(start, [e.start, e.end]) ||
              adapter.isEqual(end, e.end))
            )
            .map(e => {
              return {
                ...e,
                first: adapter.isEqual(start, e.start) || adapter.isWithinRange(e.start, [start, end]),
                last: adapter.isEqual(end, e.end) || adapter.isWithinRange(e.end, [start, end]),
              }
            })
          : [],
      }
    })

    useRender(() => {
      return (
        props.dayIndex === 0 ? (
          <div class="v-calendar-day__row-with-label" style={ `height: ${convertToUnit(props.intervalHeight, 'px')}` }>
            <div class="v-calendar-day__row-label">
              <slot name="intervalLabel" interval={ interval.value }>
                { props.index
                  ? props.intervalLabel
                    ? typeof props.intervalLabel === 'string'
                      ? props.intervalLabel
                      : props.intervalLabel(interval.value)
                    : interval.value.label
                  : ''
                }
              </slot>
            </div>
            <div class="v-calendar-day__row-hairline"></div>
            <div class={['v-calendar-day__row-content', interval.value.events.some(e => !e.last)
              ? 'v-calendar-day__row-content-through'
              : '']}
            >
              <slot name="intervalBody" interval={ interval.value }>
                  { interval.value.events?.map(event => (
                    <VCalendarIntervalEvent
                      event={ event }
                      interval={ interval.value }
                      intervalDivisions={ props.intervalDivisions }
                      intervalDuration={ props.intervalDuration }
                      intervalHeight={ props.intervalHeight }
                    />
                  ))}
              </slot>
            </div>
          </div>
        ) : (
          <div class="v-calendar-day__row-without-label" style={ `height: ${convertToUnit(props.intervalHeight, 'px')}` }>
            <div class={['v-calendar-day__row-content', interval.value.events.some(e => !e.last)
              ? 'v-calendar-day__row-content-through'
              : '']}
            >
              <slot name="intervalBody" interval={ interval.value }>
                  { interval.value.events?.filter(event => !event.allDay).map(event => (
                    <VCalendarIntervalEvent
                      event={ event }
                      interval={ interval.value }
                      intervalDivisions={ props.intervalDivisions }
                      intervalDuration={ props.intervalDuration }
                      intervalHeight={ props.intervalHeight }
                    />
                  ))}
              </slot>
            </div>
          </div>
        )
      )
    })
    return { interval }
  },
})

export type VCalendarInterval = InstanceType<typeof VCalendarInterval>
