// Styles
import './VCalendarIntervalEvent.sass'

// Components
import { VSheet } from '@/components/VSheet'

// Composables
import { useDate } from '@/composables/date'

// Utilities
import { convertToUnit, genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'
import { withModifiers } from 'vue'

export type VCalendarIntervalEventSlots = {
  intervalEvent: { height: string, margin: string, eventClass: string, event: any, interval: any }
}

export const makeVCalendarIntervalEventProps = propsFactory({
  allDay: Boolean,
  interval: Object,
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
  event: Object,
}, 'VCalendarIntervalEvent')

export const VCalendarIntervalEvent = genericComponent<VCalendarIntervalEventSlots>()({
  name: 'VCalendarIntervalEvent',

  props: makeVCalendarIntervalEventProps(),

  emits: {
    'contextmenu:event': null
  },

  setup (props, { attrs, emit, slots }) {
    const adapter = useDate()
    const calcHeight = () => {
      if ((!props.event?.first && !props.event?.last) || adapter.isEqual(props.event?.end, props.interval?.end)) {
        return { height: `${props.intervalHeight}px`, margin: convertToUnit(0) }
      } else {
        const { height, margin } = Array.from({ length: props.intervalDivisions },
          (_, x: number) => (x + 1) * (props.intervalDuration / props.intervalDivisions)
        )
          .reduce((total, div, index) => {
            if (adapter.isBefore(adapter.addMinutes(props.interval?.start, div), props.event?.end)) {
              return {
                height: convertToUnit((props.intervalHeight / props.intervalDivisions) * index),
                margin: convertToUnit((props.intervalHeight / props.intervalDivisions) * index),
              }
            }
            return { height: total.height, margin: total.margin }
          }, { height: '', margin: '' })
        return { height, margin }
      }
    }

    const contextmenuEvent = (mouseEvent: any, date: any, event: any) => {
      emit('contextmenu:event', mouseEvent, date, event)
    }

    useRender(() => {
      return (
        <div>
          {
            slots.intervalEvent?.({
              height: calcHeight().height,
              margin: calcHeight().margin,
              eventClass: 'v-calendar-internal-event',
              event: props.event,
              interval: props.interval,
            }) ?? (
              <VSheet
                height={ calcHeight().height }
                density="comfortable"
                style={ `margin-top: ${calcHeight().margin}` }
                class="v-calendar-internal-event"
                color={ props.event?.color ?? undefined }
                rounded={
                  props.event?.first && props.event?.last ? true
                  : props.event?.first ? 't'
                  : props.event?.last ? 'b'
                  : false
                }
                onContextmenu={ withModifiers((event: any) => contextmenuEvent(event, props.interval?.start, props.event), ['stop'])  }
                { ...getPrefixedEventHandlers(attrs, ':intervalEvent', () => props) }
              >
                { props.event?.first ? props.event?.title : '' }
              </VSheet>
            )
          }
        </div>
      )
    })

    return {}
  },

})

export type VCalendarIntervalEvent = InstanceType<typeof VCalendarIntervalEvent>
