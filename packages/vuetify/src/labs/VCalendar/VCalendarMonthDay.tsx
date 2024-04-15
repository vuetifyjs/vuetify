// Styles
import './VCalendarMonthDay.sass'

// Components
import { VCalendarEvent } from './VCalendarEvent'
import { VBtn } from '@/components/VBtn'

// Utilities
import { genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CalendarDay } from '@/composables/calendar'

export type VCalendarMonthDaySlots = {
  default: never
  day: { day?: CalendarDay, events: Array<any> }
  dayBody: { day?: CalendarDay, events?: Array<any> }
  title: { title?: number | string }
  event: { day?: CalendarDay, allDay: boolean, event: Record<string, unknown> }
}

export const makeVCalendarMonthDayProps = propsFactory({
  active: Boolean,
  color: String,
  day: {
    type: Object as PropType<CalendarDay>,
  },
  disabled: Boolean,
  events: Array<any>,
  title: [Number, String],
}, 'VCalendarMonthDay')

export const VCalendarMonthDay = genericComponent<VCalendarMonthDaySlots>()({
  name: 'VCalendarMonthDay',

  props: makeVCalendarMonthDayProps(),

  setup (props, { emit, attrs, slots }) {
    useRender(() => {
      const hasTitle = !!(props.title || slots.title?.({ title: props.title }))

      return (
        <div
          class={[
            'v-calendar-month__day',
          ]}
        >
          { !props.day?.isHidden && hasTitle && (
            <div key="title" class="v-calendar-weekly__day-label">
              { slots.title ? slots.title?.({ title: props.title }) : (
                <VBtn
                { ...getPrefixedEventHandlers(attrs, ':date', () => props) }
                  class={ props.day?.isToday ? 'v-calendar-weekly__day-label__today' : undefined }
                  color={ props.color }
                  disabled={ props.disabled }
                  icon
                  size="x-small"
                  variant={ props.day?.isToday ? undefined : 'flat' }
                >
                  { props.title }
                </VBtn>

              )
            }
            </div>
          )}

          { !props.day?.isHidden && (
            <div key="content" class="v-calendar-weekly__day-content">
              { slots.dayBody ? slots.dayBody?.({ day: props.day, events: props.events }) : (
                <div
                  { ...getPrefixedEventHandlers(attrs, ':day', () => ({
                    day: props.day,
                    events: props.events,
                  }))}
                >
                  <div class="v-calendar-weekly__day-alldayevents-container">
                    { props.events?.filter(event => event.allDay).map(event => slots.event
                      ? slots.event({ day: props.day, allDay: true, event })
                      : (
                        <VCalendarEvent day={ props.day } event={ event } allDay />
                      ))}
                  </div>

                  <div class="v-calendar-weekly__day-events-container">
                    { props.events?.filter(event => !event.allDay).map(event => slots.event
                      ? slots.event({ day: props.day, event, allDay: false })
                      : (
                        <VCalendarEvent day={ props.day } event={ event } />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          { !props.day?.isHidden && slots.default?.() }
        </div>
      )
    })

    return {}
  },
})

export type VCalendarMonthDay = InstanceType<typeof VCalendarMonthDay>
