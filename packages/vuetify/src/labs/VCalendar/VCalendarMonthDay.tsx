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
  dayBody: { day?: CalendarDay, events?: Array<any> }
  dayEvent: { day?: CalendarDay, allDay: boolean, event: Record<string, unknown> }
  dayTitle: { title?: number | string }
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

  inheritAttrs: false,

  props: makeVCalendarMonthDayProps(),

  setup (props, { attrs, slots }) {
    useRender(() => {
      return (
        <div
          class={[
            'v-calendar-month__day',
          ]}
          { ...getPrefixedEventHandlers(attrs, ':day', () => props) }
        >
          { !props.day?.isHidden ? (
            <div key="title" class="v-calendar-weekly__day-label">
              { slots.dayTitle?.({ title: props.title }) ?? (
                <VBtn
                  class={ props.day?.isToday ? 'v-calendar-weekly__day-label__today' : undefined }
                  color={ props.color }
                  disabled={ props.disabled }
                  icon
                  size="x-small"
                  variant={ props.day?.isToday ? undefined : 'flat' }
                  text={ `${props.title}` }
                  { ...getPrefixedEventHandlers(attrs, ':date', () => props) }
                />
              )
            }
            </div>
          ) : undefined }

          { !props.day?.isHidden ? (
            <div key="content" class="v-calendar-weekly__day-content" >
              { slots.dayBody?.({ day: props.day, events: props.events }) ?? (
                <div>
                  <div class="v-calendar-weekly__day-alldayevents-container">
                    { props.events?.filter(event => event.allDay).map(event => slots.dayEvent
                      ? slots.dayEvent({ day: props.day, allDay: true, event })
                      : (
                        <VCalendarEvent day={ props.day } event={ event } allDay { ...attrs } />
                      ))}
                  </div>

                  <div class="v-calendar-weekly__day-events-container">
                    { props.events?.filter(event => !event.allDay).map(event => slots.dayEvent
                      ? slots.dayEvent({ day: props.day, event, allDay: false })
                      : (
                        <VCalendarEvent day={ props.day } event={ event } { ...attrs } />
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : undefined }
        </div>
      )
    })

    return {}
  },
})

export type VCalendarMonthDay = InstanceType<typeof VCalendarMonthDay>
