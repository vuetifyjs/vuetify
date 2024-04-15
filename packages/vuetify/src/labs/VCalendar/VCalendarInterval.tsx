// Styles
import './VCalendarInterval.sass'

// Components
import { VCalendarIntervalEvent } from './VCalendarIntervalEvent'

// Composables
import { useDate } from '@/composables/date'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'

export type VCalendarIntervalSlots = {
  default: never
  event: any
  intervalBody: any
  intervalFormat: { interval: any }
}

export const makeVCalendarIntervalProps = propsFactory({
  day: {
    type: Object,
    default: () => ({}),
  },
  dayIndex: Number,
  events: Array<any>,
  intervalDivisions: {
    type: Number,
    default: 2,
  },
  intervalDuration: {
    type: Number,
    default: 60,
  },
  intervalHeight: {
    type: Number,
    default: 48,
  },
  intervalFormat: {
    type: [String, Function],
    default: 'fullTime12h',
  },
  intervalStart: {
    type: Number,
    default: 0,
  },
}, 'VCalendarInterval')

export const VCalendarInterval = genericComponent< VCalendarIntervalSlots >()({
  name: 'VCalendarInterval',

  props: {
    index: {
      type: Number,
      required: true,
    },

    ...makeVCalendarIntervalProps(),
  },

  setup (props, { attrs, emit, slots }) {
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
          <div class="v-calendar-day__row-with-label" style={ `height: ${convertToUnit(props.intervalHeight)}` }>
            <div class="v-calendar-day__row-label">{
              slots.intervalFormat?.({ interval: interval.value }) ?? (
                props.index
                  ? props.intervalFormat
                    ? typeof props.intervalFormat === 'string'
                      ? adapter.format(interval.value.start, 'hours12h')
                      : props.intervalFormat(interval.value)
                    : interval.value.label
                  : ''
              )
            }
            </div>
            <div class="v-calendar-day__row-hairline"></div>
            <div class={['v-calendar-day__row-content', interval.value.events.some(e => !e.last)
              ? 'v-calendar-day__row-content-through'
              : '']}
            >
              {
                slots.intervalBody?.({ interval: interval.value }) ?? (
                  <div
                    { ...getPrefixedEventHandlers(attrs, ':interval', () => ({
                      interval: interval.value,
                      intervalDivisions: props.intervalDivisions,
                      intervalDuration: props.intervalDuration,
                      intervalHeight: props.intervalHeight,
                    }))}
                  >
                    {
                      interval.value.events?.map(event =>
                        slots.event?.({
                          event,
                          interval: interval.value,
                          intervalDivisions: props.intervalDivisions,
                          intervalDuration: props.intervalDuration,
                          intervalHeight: props.intervalHeight,
                        }) ?? (
                          <VCalendarIntervalEvent
                            event={ event }
                            interval={ interval.value }
                            intervalDivisions={ props.intervalDivisions }
                            intervalDuration={ props.intervalDuration }
                            intervalHeight={ props.intervalHeight }
                          />
                        )
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
        ) : (
          <div class="v-calendar-day__row-without-label" style={ `height: ${convertToUnit(props.intervalHeight)}` }>
            <div class={['v-calendar-day__row-content', interval.value.events.some(e => !e.last)
              ? 'v-calendar-day__row-content-through'
              : '']}
            >
              {
                slots.intervalBody?.({ interval: interval.value }) ?? (
                  interval.value.events?.map(event =>
                    slots.event ? slots.event?.({
                      event,
                      interval: interval.value,
                      intervalDivisions: props.intervalDivisions,
                      intervalDuration: props.intervalDuration,
                      intervalHeight: props.intervalHeight,
                    }) : (
                      <VCalendarIntervalEvent
                        { ...getPrefixedEventHandlers(attrs, ':event', () => ({
                          event,
                          interval: interval.value,
                          intervalDivisions: props.intervalDivisions,
                          intervalDuration: props.intervalDuration,
                          intervalHeight: props.intervalHeight,
                        }))}
                        event={ event }
                        interval={ interval.value }
                        intervalDivisions={ props.intervalDivisions }
                        intervalDuration={ props.intervalDuration }
                        intervalHeight={ props.intervalHeight }
                      />
                    )
                  )
                )
              }
            </div>
          </div>
        )
      )
    })

    return { interval }
  },
})

export type VCalendarInterval = InstanceType<typeof VCalendarInterval>
