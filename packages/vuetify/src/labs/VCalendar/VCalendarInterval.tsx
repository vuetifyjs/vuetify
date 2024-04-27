// Styles
import './VCalendarInterval.sass'

// Components
import { VCalendarIntervalEvent } from './VCalendarIntervalEvent'

// Composables
import { useDate } from '@/composables/date'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CalendarDay } from '@/composables/calendar'

export interface CalendarDayInterval {
  label: string
  start: unknown
  end: unknown
  events: any[]
}

export type VCalendarIntervalSlots = {
  default: never
  intervalEvent: {
    event: any
    day: CalendarDay
    interval: CalendarDayInterval
    intervalDivisions: number
    intervalDuration: number
    intervalHeight: number
  }
  intervalBody: { interval: CalendarDayInterval }
  intervalFormat: { interval: CalendarDayInterval }
}

export const makeVCalendarIntervalProps = propsFactory({
  day: {
    type: Object as PropType<CalendarDay>,
    default: () => ({}), // TODO: This should be required instead, but filterProps messes that up
  },
  showLabel: Boolean,
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

export const VCalendarInterval = genericComponent<VCalendarIntervalSlots>()({
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
    const interval = computed<CalendarDayInterval>(() => {
      const start = adapter.addMinutes(adapter.startOfDay(props.day.date), (props.intervalDuration * (props.index + props.intervalStart)))
      const end = adapter.addMinutes(
        adapter.startOfDay(props.day.date),
        (props.intervalDuration * (props.index + props.intervalStart + 1)) - 1
      )
      return {
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
      const intervalContent = (
        <div class={[
          'v-calendar-day__row-content',
          interval.value.events.some(e => !e.last) ? 'v-calendar-day__row-content-through' : '',
        ]}
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
                    slots.intervalEvent?.({
                      event,
                      day: props.day,
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
      )

      return (
        props.showLabel ? (
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
              { intervalContent }
          </div>
        ) : (
          <div class="v-calendar-day__row-without-label" style={ `height: ${convertToUnit(props.intervalHeight)}` }>
            { intervalContent }
          </div>
        )
      )
    })

    return { interval }
  },
})

export type VCalendarInterval = InstanceType<typeof VCalendarInterval>
