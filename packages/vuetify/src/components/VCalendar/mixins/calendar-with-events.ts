// Styles
import '../../../stylus/components/_calendar-events.styl'

// Types
import { VNode, VNodeData } from 'vue'

// Mixins
import CalendarBase from './calendar-base'

// Util
import props from '../util/props'
import {
  VTimestamp,
  getDayIdentifier
} from '../util/timestamp'
import {
  VEventParsed,
  VEventInput,
  parseEvent,
  isEventOn
} from '../util/events'

// Types
type VColorFunction = (event: VEventInput) => string

type VNameFunction = (event: VEventInput) => string

type VTimeToY = (time: VTimestamp | number | string) => number

type VEventResetCheck = (date: VTimestamp) => void

type VEventVisualGetOffset = (visual: VEventVisual, visuals: VEventVisual[]) => number

type VEventGetter = (day: VTimestamp) => VEventParsed[]

type VEventVisualGetter = (events: VEventParsed[]) => VEventVisual[]

type VEventVisualToNode<D> = (visual: VEventVisual, index: number, day: D) => VNode

interface VEventVisual {
  offset: number
  event: VEventParsed
}

interface VDaySlotScope extends VTimestamp {
  outside: boolean
  index: number
}

interface VDayBodySlotScope extends VDaySlotScope {
  timeToY: VTimeToY
}

/* @vue/component */
export default CalendarBase.extend({
  name: 'calendar-with-events',

  props: props.events,

  computed: {
    parsedEvents (): VEventParsed[] {
      return this.events.map(parseEvent)
    },
    eventColorFunction (): VColorFunction {
      return typeof this.eventColor === 'function'
        ? this.eventColor as VColorFunction
        : () => (this.eventColor as string)
    },
    eventTextColorFunction (): VColorFunction {
      return typeof this.eventTextColor === 'function'
        ? this.eventTextColor as VColorFunction
        : () => (this.eventTextColor as string)
    },
    eventNameFunction (): VNameFunction {
      return typeof this.eventName === 'function'
        ? this.eventName as VNameFunction
        : event => (event[this.eventName as string] as string)
    }
  },

  methods: {
    genDayEvent ({ offset, event }: VEventVisual, index: number, day: VDaySlotScope): VNode {
      const eventHeight = this.eventHeight
      const relativeOffset = (offset - index) * (eventHeight + 1) // 1 = margin bottom
      const dayIdentifier = getDayIdentifier(day)
      const start = dayIdentifier === event.startIdentifier
      const end = dayIdentifier === event.endIdentifier
      const scope = { event: event.input, day, outside: day.outside, start, end, timed: false }

      return this.genEvent(event, scope, start || day.index === 0, {
        staticClass: 'v-event ' + 'v-event-offset' + offset + '-index' + index,
        class: {
          'v-event-start': start,
          'v-event-end': end
        },
        style: {
          height: `${eventHeight}px`,
          top: `${relativeOffset}px`
        }
      })
    },
    genTimedEvent ({ offset, event }: VEventVisual, index: number, day: VDayBodySlotScope): VNode {
      const { eventOffset, eventSpacing, eventWidth } = this
      const dayIdentifier = getDayIdentifier(day)
      const start = event.startIdentifier >= dayIdentifier
      const end = event.endIdentifier > dayIdentifier
      const top = start ? day.timeToY(event.start) : 0
      const bottom = end ? day.timeToY(1440) : day.timeToY(event.end)
      const height = Math.max(this.eventHeight, bottom - top)
      const left = eventOffset + eventSpacing * offset
      const right = eventWidth ? 'auto' : '0px'
      const width = eventWidth ? `${eventWidth}px` : 'auto'
      const scope = { event: event.input, day, outside: day.outside, start, end, timed: true }

      return this.genEvent(event, scope, true, {
        staticClass: 'v-event-timed',
        style: {
          right,
          width,
          top: `${top}px`,
          height: `${height}px`,
          left: `${left}px`
        }
      })
    },
    genEvent (event: VEventParsed, scope: object, showName: boolean, data: VNodeData): VNode {
      const slot = this.$scopedSlots.event
      const text = this.eventTextColorFunction(event.input)
      const background = this.eventColorFunction(event.input)

      return this.$createElement('div',
        this.setTextColor(text,
          this.setBackgroundColor(background, {
            on: this.getDefaultMouseEventHandlers(':event', nativeEvent => ({ ...scope, nativeEvent })),
            ...data
          })
        ), slot
          ? slot(scope)
          : (showName ? [this.genName(event)] : undefined)
      )
    },
    genName (event: VEventParsed): VNode {
      return this.$createElement('span', {
        staticClass: 'pa-1'
      }, this.eventNameFunction(event.input))
    },
    getEventsForDay (day: VTimestamp): VEventParsed[] {
      const identifier = getDayIdentifier(day)

      return this.parsedEvents.filter(
        event => isEventOn(event, identifier)
      )
    },
    getEventsForDayAll (day: VTimestamp): VEventParsed[] {
      const identifier = getDayIdentifier(day)

      return this.parsedEvents.filter(
        event => event.allDay && isEventOn(event, identifier)
      )
    },
    getEventsForDayTimed (day: VTimestamp): VEventParsed[] {
      const identifier = getDayIdentifier(day)

      return this.parsedEvents.filter(
        event => !event.allDay && isEventOn(event, identifier)
      )
    },
    getScopedSlots () {
      if (this.events.length === 0) {
        return this.$scopedSlots
      }

      const parsedEvents = this.parsedEvents
      const indexToOffset: number[] = parsedEvents.map(event => -1)
      const resetOnWeekday = this.weekdays[0]

      const checkReset: VEventResetCheck = day => {
        if (day.weekday === resetOnWeekday) {
          for (let i = 0; i < indexToOffset.length; i++) {
            indexToOffset[i] = -1
          }
        }
      }

      const getOffset: VEventVisualGetOffset = (visual, visuals) => {
        let offset = indexToOffset[ visual.event.index ]
        if (offset === -1) {
          let min = Number.MAX_SAFE_INTEGER
          let max = -1
          visuals.forEach(other => {
            const otherOffset = indexToOffset[ other.event.index ]
            if (otherOffset !== -1) {
              min = Math.min(min, otherOffset)
              max = Math.max(max, otherOffset)
            }
          })
          offset = min > 0 && max !== -1 ? min - 1 : max + 1
          indexToOffset[ visual.event.index ] = offset
        }
        return offset
      }

      const getVisuals: VEventVisualGetter = events => {
        const visuals: VEventVisual[] = events.map(event => ({ event, offset: 0 }))
        visuals.sort((a, b) => a.event.startTimestampIdentifier - b.event.startTimestampIdentifier)
        visuals.forEach(visual => {
          visual.offset = getOffset(visual, visuals)
        })
        visuals.sort((a, b) => a.offset - b.offset)
        return visuals
      }

      const getSlotChildren = <D extends VDaySlotScope>(day: D, getter: VEventGetter, mapper: VEventVisualToNode<D>) => {
        checkReset(day)
        const events = getter(day)
        return events.length === 0
          ? undefined
          : getVisuals(events).map((visual, index) => mapper(visual, index, day))
      }

      return {
        ...this.$scopedSlots,
        day: (day: VDaySlotScope) => {
          return getSlotChildren(day, this.getEventsForDay, this.genDayEvent)
        },
        dayHeader: (day: VDaySlotScope) => {
          return getSlotChildren(day, this.getEventsForDayAll, this.genDayEvent)
        },
        dayBody: (day: VDayBodySlotScope) => {
          return getSlotChildren(day, this.getEventsForDayTimed, this.genTimedEvent)
        }
      }
    }
  }
})
