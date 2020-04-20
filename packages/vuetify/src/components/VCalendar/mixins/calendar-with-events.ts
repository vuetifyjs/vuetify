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
  CalendarEventOverlapModes,
} from '../modes'
import {
  getDayIdentifier, diffMinutes,
} from '../util/timestamp'
import {
  parseEvent,
  isEventStart,
  isEventOn,
  isEventOverlapping,
} from '../util/events'
import {
  CalendarTimestamp,
  CalendarEventParsed,
  CalendarEventVisual,
  CalendarEventColorFunction,
  CalendarEventNameFunction,
  CalendarDaySlotScope,
  CalendarDayBodySlotScope,
  CalendarEventOverlapMode,
} from 'types'

// Types
type VEventGetter = (day: CalendarTimestamp) => CalendarEventParsed[]

type VEventVisualToNode<D> = (visual: CalendarEventVisual, day: D) => VNode

type VEventsToNodes = <D extends CalendarDaySlotScope>(
  day: D,
  getter: VEventGetter,
  mapper: VEventVisualToNode<D>,
  timed: boolean) => VNode[] | undefined

type VDailyEventsMap = {
  [date: string]: {
    parent: HTMLElement
    more: HTMLElement | null
    events: HTMLElement[]
  }
}

const WIDTH_FULL = 100
const WIDTH_START = 95
const MINUTES_IN_DAY = 1440

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
    parsedEvents (): CalendarEventParsed[] {
      return this.events.map((input, index) => parseEvent(input, index, this.eventStart, this.eventEnd))
    },
    parsedEventOverlapThreshold (): number {
      return parseInt(this.eventOverlapThreshold)
    },
    eventColorFunction (): CalendarEventColorFunction {
      return typeof this.eventColor === 'function'
        ? this.eventColor as CalendarEventColorFunction
        : () => (this.eventColor as string)
    },
    eventTextColorFunction (): CalendarEventColorFunction {
      return typeof this.eventTextColor === 'function'
        ? this.eventTextColor as CalendarEventColorFunction
        : () => (this.eventTextColor as string)
    },
    eventNameFunction (): CalendarEventNameFunction {
      return typeof this.eventName === 'function'
        ? this.eventName as CalendarEventNameFunction
        : (event, timedEvent) => {
          const name = escapeHTML(event.input[this.eventName as string] as string)
          if (event.start.hasTime) {
            if (timedEvent) {
              const showStart = event.start.hour < 12 && event.end.hour >= 12
              const start = this.formatTime(event.start, showStart)
              const end = this.formatTime(event.end, true)
              const singline = diffMinutes(event.start, event.end) <= this.parsedEventOverlapThreshold
              const separator = singline ? ', ' : '<br>'
              return `<strong>${name}</strong>${separator}${start} - ${end}`
            } else {
              const time = this.formatTime(event.start, true)
              return `<strong>${time}</strong> ${name}`
            }
          }
          return name
        }
    },
    eventModeFunction (): CalendarEventOverlapMode {
      return typeof this.eventOverlapMode === 'function'
        ? this.eventOverlapMode as CalendarEventOverlapMode
        : CalendarEventOverlapModes[this.eventOverlapMode]
    },
    eventWeekdays (): number[] {
      return this.parsedWeekdays
    },
  },

  methods: {
    formatTime (withTime: CalendarTimestamp, ampm: boolean): string {
      const formatter = this.getFormatter({
        timeZone: 'UTC',
        hour: 'numeric',
        minute: withTime.minute > 0 ? 'numeric' : undefined,
      })

      return formatter(withTime, true)
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
            hide = i === last
              ? (eventBounds.bottom > parentBounds.bottom)
              : (eventBounds.bottom + eventHeight > parentBounds.bottom)
          }
          if (hide) {
            events[i].style.display = 'none'
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
    genDayEvent ({ event }: CalendarEventVisual, day: CalendarDaySlotScope): VNode {
      const eventHeight = this.eventHeight
      const eventMarginBottom = this.eventMarginBottom
      const dayIdentifier = getDayIdentifier(day)
      const week = day.week
      const start = dayIdentifier === event.startIdentifier
      let end = dayIdentifier === event.endIdentifier
      let width = WIDTH_START
      for (let i = day.index + 1; i < week.length; i++) {
        const weekdayIdentifier = getDayIdentifier(week[i])
        if (event.endIdentifier >= weekdayIdentifier) {
          width += WIDTH_FULL
          if (weekdayIdentifier === event.endIdentifier) {
            end = true
          }
        } else {
          end = true
          break
        }
      }
      const scope = { event: event.input, day, outside: day.outside, start, end, timed: false }

      return this.genEvent(event, scope, false, {
        staticClass: 'v-event',
        class: {
          'v-event-start': start,
          'v-event-end': end,
        },
        style: {
          height: `${eventHeight}px`,
          width: `${width}%`,
          'margin-bottom': `${eventMarginBottom}px`,
        },
        attrs: {
          'data-date': day.date,
        },
        key: event.index,
        ref: 'events',
        refInFor: true,
      })
    },
    genTimedEvent ({ event, left, width }: CalendarEventVisual, day: CalendarDayBodySlotScope): VNode {
      const dayIdentifier = getDayIdentifier(day)
      const start = event.startIdentifier >= dayIdentifier
      const end = event.endIdentifier > dayIdentifier
      const top = start ? day.timeToY(event.start) : 0
      const bottom = end ? day.timeToY(MINUTES_IN_DAY) : day.timeToY(event.end)
      const height = Math.max(this.eventHeight, bottom - top)
      const scope = { event: event.input, day, outside: day.outside, start, end, timed: true }

      return this.genEvent(event, scope, true, {
        staticClass: 'v-event-timed',
        style: {
          top: `${top}px`,
          height: `${height}px`,
          left: `${left}%`,
          width: `${width}%`,
        },
      })
    },
    genEvent (event: CalendarEventParsed, scope: object, timedEvent: boolean, data: VNodeData): VNode {
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
          : [this.genName(event, timedEvent)]
      )
    },
    genName (event: CalendarEventParsed, timedEvent: boolean): VNode {
      return this.$createElement('div', {
        staticClass: 'pl-1',
        domProps: {
          innerHTML: this.eventNameFunction(event, timedEvent),
        },
      })
    },
    genPlaceholder (day: CalendarTimestamp): VNode {
      const height = this.eventHeight + this.eventMarginBottom

      return this.$createElement('div', {
        style: {
          height: `${height}px`,
        },
        attrs: {
          'data-date': day.date,
        },
        ref: 'events',
        refInFor: true,
      })
    },
    genMore (day: CalendarDaySlotScope): VNode {
      const eventHeight = this.eventHeight
      const eventMarginBottom = this.eventMarginBottom

      return this.$createElement('div', {
        staticClass: 'v-event-more pl-1',
        class: {
          'v-outside': day.outside,
        },
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
          height: `${eventHeight}px`,
          'margin-bottom': `${eventMarginBottom}px`,
        },
        ref: 'events',
        refInFor: true,
      })
    },
    getVisibleEvents (): CalendarEventParsed[] {
      const start = getDayIdentifier(this.days[0])
      const end = getDayIdentifier(this.days[this.days.length - 1])

      return this.parsedEvents.filter(
        event => isEventOverlapping(event, start, end)
      )
    },
    getEventsForDay (day: CalendarTimestamp): CalendarEventParsed[] {
      const identifier = getDayIdentifier(day)
      const firstWeekday = this.eventWeekdays[0]

      return this.parsedEvents.filter(
        event => isEventStart(event, day, identifier, firstWeekday)
      )
    },
    getEventsForDayAll (day: CalendarTimestamp): CalendarEventParsed[] {
      const identifier = getDayIdentifier(day)
      const firstWeekday = this.eventWeekdays[0]

      return this.parsedEvents.filter(
        event => event.allDay && isEventStart(event, day, identifier, firstWeekday)
      )
    },
    getEventsForDayTimed (day: CalendarTimestamp): CalendarEventParsed[] {
      const identifier = getDayIdentifier(day)

      return this.parsedEvents.filter(
        event => !event.allDay && isEventOn(event, identifier)
      )
    },
    getScopedSlots () {
      if (this.noEvents) {
        return { ...this.$scopedSlots }
      }

      const mode = this.eventModeFunction(
        this.parsedEvents,
        this.eventWeekdays[0],
        this.parsedEventOverlapThreshold
      )

      const getSlotChildren: VEventsToNodes = (day, getter, mapper, timed) => {
        const events = getter(day)

        if (events.length === 0) {
          return
        }

        const visuals = mode(day, events, timed)

        if (timed) {
          return visuals.map(visual => mapper(visual, day))
        }

        const children: VNode[] = []

        visuals.forEach((visual, index) => {
          while (children.length < visual.column) {
            children.push(this.genPlaceholder(day))
          }
          children.push(mapper(visual, day))
        })

        return children
      }

      const slots = this.$scopedSlots
      const slotDay = slots.day
      const slotDayHeader = slots['day-header']
      const slotDayBody = slots['day-body']

      return {
        ...slots,
        day: (day: CalendarDaySlotScope) => {
          let children = getSlotChildren(day, this.getEventsForDay, this.genDayEvent, false)
          if (children && children.length > 0 && this.eventMore) {
            children.push(this.genMore(day))
          }
          if (slotDay) {
            const slot = slotDay(day)
            if (slot) {
              children = children ? children.concat(slot) : slot
            }
          }
          return children
        },
        'day-header': (day: CalendarDaySlotScope) => {
          let children = getSlotChildren(day, this.getEventsForDayAll, this.genDayEvent, false)

          if (slotDayHeader) {
            const slot = slotDayHeader(day)
            if (slot) {
              children = children ? children.concat(slot) : slot
            }
          }
          return children
        },
        'day-body': (day: CalendarDayBodySlotScope) => {
          const events = getSlotChildren(day, this.getEventsForDayTimed, this.genTimedEvent, true)
          let children: VNode[] = [
            this.$createElement('div', {
              staticClass: 'v-event-timed-container',
            }, events),
          ]

          if (slotDayBody) {
            const slot = slotDayBody(day)
            if (slot) {
              children = children.concat(slot)
            }
          }
          return children
        },
      }
    },
  },
})
