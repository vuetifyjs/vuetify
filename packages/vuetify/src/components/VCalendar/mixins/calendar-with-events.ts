// Styles
import './calendar-with-events.sass'

// Types
import { VNode, VNodeData } from 'vue'

// Directives
import ripple from '../../../directives/ripple'

// Mixins
import CalendarBase from './calendar-base'

// Helpers
import { escapeHTML } from '../../../util/helpers'

// Util
import props from '../util/props'
import {
  VTimestamp,
  getDayIdentifier,
  parseTime,
} from '../util/timestamp'
import {
  VEventParsed,
  VEventInput,
  parseEvent,
  isEventOn,
} from '../util/events'

// Types
type VColorFunction = (event: VEventInput) => string

type VNameFunction = (event: VEventParsed, timedEvent: boolean) => string

type VTimeToY = (time: VTimestamp | number | string) => number

type VEventResetCheck = (date: VTimestamp) => void

type VEventVisualGetOffset = (visual: VEventVisual, visuals: VEventVisual[]) => number

type VEventGetter = (day: VTimestamp) => VEventParsed[]

type VEventVisualGetter = (events: VEventParsed[], timed: boolean) => VEventVisual[]

type VEventVisualToNode<D> = (visual: VEventVisual, index: number, day: D) => VNode

type VDailyEventsMap = {
  [date: string]: {
    parent: HTMLElement
    more: HTMLElement | null
    events: HTMLElement[]
  }
}

interface VEventVisual {
  offset: number
  event: VEventParsed
  columnCount: number
  column: number
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

  directives: {
    ripple,
  },

  props: props.events,

  computed: {
    noEvents (): boolean {
      return this.events.length === 0
    },
    parsedEvents (): VEventParsed[] {
      return this.events.map((input, index) => parseEvent(input, index, this.eventStart, this.eventEnd))
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
        : (event, timedEvent) => {
          const name = escapeHTML(event.input[this.eventName as string] as string)
          if (event.start.hasTime) {
            if (timedEvent) {
              const showStart = event.start.hour < 12 && event.end.hour >= 12
              const start = this.formatTime(event.start, showStart)
              const end = this.formatTime(event.end, true)
              return `<strong>${name}</strong><br>${start} - ${end}`
            } else {
              const time = this.formatTime(event.start, true)
              return `<strong>${time}</strong> ${name}`
            }
          }
          return name
        }
    },
  },

  methods: {
    formatTime (withTime: VTimestamp, ampm: boolean): string {
      const suffix = ampm ? (withTime.hour < 12 ? 'a' : 'p') : ''
      const hour = withTime.hour % 12 || 12
      const minute = withTime.minute

      return minute > 0
        ? (minute < 10
          ? `${hour}:0${minute}${suffix}`
          : `${hour}:${minute}${suffix}`)
        : `${hour}${suffix}`
    },
    updateEventVisibility () {
      if (this.noEvents || !this.eventMore) {
        return
      }

      const eventHeight = this.eventHeight
      const eventsMap = this.getEventsMap()

      for (const date in eventsMap) {
        const { parent, events, more } = eventsMap[date]
        if (!more) {
          break
        }
        const parentBounds = parent.getBoundingClientRect()
        const last = events.length - 1
        let hide = false
        let hidden = 0
        for (let i = 0; i <= last; i++) {
          if (!hide) {
            const eventBounds = events[i].getBoundingClientRect()
            hide = (eventBounds.bottom + eventHeight > parentBounds.bottom && i !== last) ||
                   events[i].style.display === 'none'
          }
          if (hide) {
            const id = events[i].getAttribute('data-event') as string
            this.hideEvents(id)
            hidden++
          }
        }

        if (hide) {
          more.style.display = ''
          more.innerHTML = this.$vuetify.lang.t(this.eventMoreText, hidden)
        } else {
          more.style.display = 'none'
        }
      }
    },
    hideEvents (id: string) {
      const elements = this.$refs.events as HTMLElement[]

      elements.forEach(el => {
        if (el.getAttribute('data-event') === id) {
          el.style.display = 'none'
        }
      })
    },
    getEventsMap (): VDailyEventsMap {
      const eventsMap: VDailyEventsMap = {}
      const elements = this.$refs.events as HTMLElement[]

      if (!elements || !elements.forEach) {
        return eventsMap
      }

      elements.forEach(el => {
        const date = el.getAttribute('data-date')
        if (el.parentElement && date) {
          if (!(date in eventsMap)) {
            eventsMap[date] = {
              parent: el.parentElement,
              more: null,
              events: [],
            }
          }
          if (el.getAttribute('data-more')) {
            eventsMap[date].more = el
          } else {
            eventsMap[date].events.push(el)
            el.style.display = ''
          }
        }
      })

      return eventsMap
    },
    genDayEvent ({ offset, event }: VEventVisual, index: number, day: VDaySlotScope): VNode {
      const eventHeight = this.eventHeight
      const eventMarginBottom = this.eventMarginBottom
      const relativeOffset = (offset - index) * (eventHeight + eventMarginBottom) // 1 = margin bottom
      const dayIdentifier = getDayIdentifier(day)
      const start = dayIdentifier === event.startIdentifier
      const end = dayIdentifier === event.endIdentifier
      const scope = { event: event.input, day, outside: day.outside, start, end, timed: false }

      return this.genEvent(event, scope, start || day.index === 0, false, {
        staticClass: 'v-event',
        class: {
          'v-event-start': start,
          'v-event-end': end,
        },
        style: {
          height: `${eventHeight}px`,
          top: `${relativeOffset}px`,
          'margin-bottom': `${eventMarginBottom}px`,
        },
        attrs: {
          'data-date': day.date,
          'data-event': event.index,
        },
        key: event.index,
        ref: 'events',
        refInFor: true,
      })
    },
    genTimedEvent ({ offset, event, columnCount, column }: VEventVisual, index: number, day: VDayBodySlotScope): VNode {
      const dayIdentifier = getDayIdentifier(day)
      const start = event.startIdentifier >= dayIdentifier
      const end = event.endIdentifier > dayIdentifier
      const top = start ? day.timeToY(event.start) : 0
      const bottom = end ? day.timeToY(1440) : day.timeToY(event.end)
      const height = Math.max(this.eventHeight, bottom - top)
      const left = columnCount === -1
        ? offset * 5
        : column * 100 / columnCount
      const right = columnCount === -1
        ? 0
        : Math.max(0, (columnCount - column - 2) * 100 / columnCount + 10)
      const scope = { event: event.input, day, outside: day.outside, start, end, timed: true }

      return this.genEvent(event, scope, true, true, {
        staticClass: 'v-event-timed',
        style: {
          top: `${top}px`,
          height: `${height}px`,
          left: `${left}%`,
          right: `${right}%`,
        },
      })
    },
    genEvent (event: VEventParsed, scope: object, showName: boolean, timedEvent: boolean, data: VNodeData): VNode {
      const slot = this.$scopedSlots.event
      const text = this.eventTextColorFunction(event.input)
      const background = this.eventColorFunction(event.input)

      return this.$createElement('div',
        this.setTextColor(text,
          this.setBackgroundColor(background, {
            on: this.getDefaultMouseEventHandlers(':event', nativeEvent => ({ ...scope, nativeEvent })),
            directives: [{
              name: 'ripple',
              value: this.eventRipple != null ? this.eventRipple : true,
            }],
            ...data,
          })
        ), slot
          ? slot(scope)
          : (showName ? [this.genName(event, timedEvent)] : undefined)
      )
    },
    genName (event: VEventParsed, timedEvent: boolean): VNode {
      return this.$createElement('div', {
        staticClass: 'pl-1',
        domProps: {
          innerHTML: this.eventNameFunction(event, timedEvent),
        },
      })
    },
    genMore (day: VTimestamp): VNode {
      return this.$createElement('div', {
        staticClass: 'v-event-more pl-1',
        attrs: {
          'data-date': day.date,
          'data-more': 1,
        },
        directives: [{
          name: 'ripple',
          value: this.eventRipple != null ? this.eventRipple : true,
        }],
        on: {
          click: () => this.$emit('click:more', day),
        },
        style: {
          display: 'none',
        },
        ref: 'events',
        refInFor: true,
      })
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
    isSameColumn (a: VEventVisual, b: VEventVisual): boolean {
      const astart = parseTime(a.event.start) as number
      const bstart = parseTime(b.event.start) as number
      const diff = astart - bstart
      const abs = diff < 0 ? -diff : diff

      return abs < this.eventOverlapThreshold
    },
    isOverlapping (a: VEventVisual, b: VEventVisual): boolean {
      const astart = parseTime(a.event.start) as number
      const bstart = parseTime(b.event.start) as number

      if (a.offset < b.offset && bstart < astart) {
        const aend = astart + this.eventOverlapThreshold
        const bend = parseTime(b.event.end) as number
        return !(astart >= bend || aend <= bstart)
      }

      return false
    },
    getScopedSlots () {
      if (this.noEvents) {
        return this.$scopedSlots
      }

      /**
       * Over the span of a week (for example) we want to maintain an event in the same row (for weekly and monthly views).
       * We keep track of those rows by indexToOffset. If the value in that array is -1, then we can place an event at that spot.
       * For a daily view with timed events we arrange them based on columns and offsets. If two or more events start at around the
       * same time (eventOverlapThreshold) they go into columns. If one event starts inside another it is indented the appropriate amount.
       * If one event overlaps another after those adjustments are made those events are placed in columns together instead of any defined
       * indents.
       */

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
        let offset = indexToOffset[visual.event.index]
        if (offset === -1) {
          let min = Number.MAX_SAFE_INTEGER
          let max = -1
          visuals.forEach(other => {
            const otherOffset = indexToOffset[other.event.index]
            if (otherOffset !== -1) {
              min = Math.min(min, otherOffset)
              max = Math.max(max, otherOffset)
            }
          })
          offset = min > 0 && max !== -1 ? min - 1 : max + 1
          indexToOffset[visual.event.index] = offset
        }
        return offset
      }

      const getVisuals: VEventVisualGetter = (events, timed) => {
        const visuals: VEventVisual[] = events.map(event => ({ event, offset: 0, columnCount: -1, column: -1 }))
        // sort events by start date/time
        visuals.sort((a, b) => a.event.startTimestampIdentifier - b.event.startTimestampIdentifier)
        if (timed) {
          // timed events can be organized into columns
          visuals.forEach(visual => {
            if (visual.columnCount !== -1) {
              return
            }
            const columns: VEventVisual[] = []
            visuals.forEach(other => {
              if (other.columnCount === -1 && this.isSameColumn(visual, other)) {
                columns.push(other)
              }
            })
            if (columns.length > 1) {
              columns.forEach((visual, visualIndex) => {
                visual.column = visualIndex
                visual.columnCount = columns.length
              })
            }
          })
          // for any not organized into columns, if they overlap another event
          // not in a column they are offset
          visuals.forEach(visual => {
            if (visual.columnCount === -1) {
              visuals.forEach(other => {
                const otherOffset = indexToOffset[other.event.index]
                if (otherOffset !== -1 && other.event.endTimestampIdentifier <= visual.event.startTimestampIdentifier) {
                  indexToOffset[other.event.index] = -1
                }
              })
              visual.offset = getOffset(visual, visuals)
            }
          })
          // for any not organized into columns, if a previous event overlaps this event
          // join them into the columns
          visuals.forEach(visual => {
            if (visual.columnCount === -1) {
              const columns: VEventVisual[] = [visual]
              visuals.forEach(other => {
                if (other !== visual && other.columnCount === -1 && this.isOverlapping(visual, other)) {
                  columns.push(other)
                }
              })
              if (columns.length > 1) {
                columns.forEach((visual, visualIndex) => {
                  visual.column = visualIndex
                  visual.columnCount = columns.length
                })
              }
            }
          })
        } else {
          visuals.forEach(visual => {
            visual.offset = getOffset(visual, visuals)
          })
        }
        visuals.sort((a, b) => (a.offset - b.offset) || (a.column - b.column))
        return visuals
      }

      const getSlotChildren = <D extends VDaySlotScope>(day: D, getter: VEventGetter, mapper: VEventVisualToNode<D>, timed: boolean) => {
        checkReset(day)
        const events = getter(day)
        return events.length === 0
          ? undefined
          : getVisuals(events, timed).map((visual, index) => mapper(visual, index, day))
      }

      return {
        ...this.$scopedSlots,
        day: (day: VDaySlotScope) => {
          const children = getSlotChildren(day, this.getEventsForDay, this.genDayEvent, false)
          if (children && children.length > 0 && this.eventMore) {
            children.push(this.genMore(day))
          }
          return children
        },
        'day-header': (day: VDaySlotScope) => {
          return getSlotChildren(day, this.getEventsForDayAll, this.genDayEvent, false)
        },
        'day-body': (day: VDayBodySlotScope) => {
          return [this.$createElement('div', {
            staticClass: 'v-event-timed-container',
          }, getSlotChildren(day, this.getEventsForDayTimed, this.genTimedEvent, true))]
        },
      }
    },
  },
})
