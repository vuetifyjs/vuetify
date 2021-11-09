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
  isEventHiddenOn,
} from '../util/events'
import {
  CalendarTimestamp,
  CalendarEventParsed,
  CalendarEventVisual,
  CalendarEventColorFunction,
  CalendarEventNameFunction,
  CalendarEventTimedFunction,
  CalendarDaySlotScope,
  CalendarDayBodySlotScope,
  CalendarEventOverlapMode,
  CalendarEvent,
  CalendarEventCategoryFunction,
  CalendarCategory,
} from 'vuetify/types'

// Types
type VEventGetter<D> = (day: D) => CalendarEventParsed[]

type VEventVisualToNode<D> = (visual: CalendarEventVisual, day: D) => VNode | false

type VEventsToNodes = <D extends CalendarDaySlotScope>(
  day: D,
  getter: VEventGetter<D>,
  mapper: VEventVisualToNode<D>,
  timed: boolean) => VNode[] | undefined

type VDailyEventsMap = {
  [date: string]: {
    parent: HTMLElement
    more: HTMLElement | null
    events: HTMLElement[]
  }
}

interface VEventScopeInput {
  eventParsed: CalendarEventParsed
  day: CalendarDaySlotScope
  start: boolean
  end: boolean
  timed: boolean
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

  props: {
    ...props.events,
    ...props.calendar,
    ...props.category,
  },

  computed: {
    noEvents (): boolean {
      return this.events.length === 0
    },
    parsedEvents (): CalendarEventParsed[] {
      return this.events.map(this.parseEvent)
    },
    parsedEventOverlapThreshold (): number {
      return parseInt(this.eventOverlapThreshold)
    },
    eventTimedFunction (): CalendarEventTimedFunction {
      return typeof this.eventTimed === 'function'
        ? this.eventTimed
        : event => !!event[this.eventTimed as string]
    },
    eventCategoryFunction (): CalendarEventCategoryFunction {
      return typeof this.eventCategory === 'function'
        ? this.eventCategory
        : event => event[this.eventCategory as string]
    },
    eventTextColorFunction (): CalendarEventColorFunction {
      return typeof this.eventTextColor === 'function'
        ? this.eventTextColor
        : () => this.eventTextColor as string
    },
    eventNameFunction (): CalendarEventNameFunction {
      return typeof this.eventName === 'function'
        ? this.eventName
        : (event, timedEvent) => escapeHTML(event.input[this.eventName as string] as string || '')
    },
    eventModeFunction (): CalendarEventOverlapMode {
      return typeof this.eventOverlapMode === 'function'
        ? this.eventOverlapMode
        : CalendarEventOverlapModes[this.eventOverlapMode]
    },
    eventWeekdays (): number[] {
      return this.parsedWeekdays
    },
    categoryMode (): boolean {
      return this.type === 'category'
    },
  },

  methods: {
    eventColorFunction (e: CalendarEvent): string {
      return typeof this.eventColor === 'function'
        ? this.eventColor(e)
        : e.color || this.eventColor
    },
    parseEvent (input: CalendarEvent, index = 0): CalendarEventParsed {
      return parseEvent(
        input,
        index,
        this.eventStart,
        this.eventEnd,
        this.eventTimedFunction(input),
        this.categoryMode ? this.eventCategoryFunction(input) : false,
      )
    },
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
        const eventsSorted = events.map(event => ({
          event,
          bottom: event.getBoundingClientRect().bottom,
        })).sort((a, b) => a.bottom - b.bottom)
        let hidden = 0

        for (let i = 0; i <= last; i++) {
          const bottom = eventsSorted[i].bottom
          const hide = i === last
            ? (bottom > parentBounds.bottom)
            : (bottom + eventHeight > parentBounds.bottom)

          if (hide) {
            eventsSorted[i].event.style.display = 'none'
            hidden++
          }
        }

        if (hidden) {
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

      if (!this.categoryMode) {
        for (let i = day.index + 1; i < week.length; i++) {
          const weekdayIdentifier = getDayIdentifier(week[i])
          if (event.endIdentifier >= weekdayIdentifier) {
            width += WIDTH_FULL
            end = end || weekdayIdentifier === event.endIdentifier
          } else {
            end = true
            break
          }
        }
      }
      const scope = { eventParsed: event, day, start, end, timed: false }

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
    genTimedEvent ({ event, left, width }: CalendarEventVisual, day: CalendarDayBodySlotScope): VNode | false {
      if (day.timeDelta(event.end) < 0 || day.timeDelta(event.start) >= 1 || isEventHiddenOn(event, day)) {
        return false
      }

      const dayIdentifier = getDayIdentifier(day)
      const start = event.startIdentifier >= dayIdentifier
      const end = event.endIdentifier > dayIdentifier
      const top = start ? day.timeToY(event.start) : 0
      const bottom = end ? day.timeToY(MINUTES_IN_DAY) : day.timeToY(event.end)
      const height = Math.max(this.eventHeight, bottom - top)
      const scope = { eventParsed: event, day, start, end, timed: true }

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
    genEvent (event: CalendarEventParsed, scopeInput: VEventScopeInput, timedEvent: boolean, data: VNodeData): VNode {
      const slot = this.$scopedSlots.event
      const text = this.eventTextColorFunction(event.input)
      const background = this.eventColorFunction(event.input)
      const overlapsNoon = event.start.hour < 12 && event.end.hour >= 12
      const singline = diffMinutes(event.start, event.end) <= this.parsedEventOverlapThreshold
      const formatTime = this.formatTime
      const timeSummary = () => formatTime(event.start, overlapsNoon) + ' - ' + formatTime(event.end, true)
      const eventSummary = () => {
        const name = this.eventNameFunction(event, timedEvent)
        if (event.start.hasTime) {
          const eventSummaryClass = 'v-event-summary'
          if (timedEvent) {
            const time = timeSummary()
            const delimiter = singline ? ', ' : '<br>'

            return `<span class="${eventSummaryClass}"><strong>${name}</strong>${delimiter}${time}</span>`
          } else {
            const time = formatTime(event.start, true)

            return `<span class="${eventSummaryClass}"><strong>${time}</strong> ${name}</span>`
          }
        }

        return name
      }

      const scope = {
        ...scopeInput,
        event: event.input,
        outside: scopeInput.day.outside,
        singline,
        overlapsNoon,
        formatTime,
        timeSummary,
        eventSummary,
      }

      return this.$createElement('div',
        this.setTextColor(text,
          this.setBackgroundColor(background, {
            on: this.getDefaultMouseEventHandlers(':event', nativeEvent => ({ ...scope, nativeEvent })),
            directives: [{
              name: 'ripple',
              value: this.eventRipple ?? true,
            }],
            ...data,
          })
        ), slot
          ? slot(scope)
          : [this.genName(eventSummary)]
      )
    },
    genName (eventSummary: () => string): VNode {
      return this.$createElement('div', {
        staticClass: 'pl-1',
        domProps: {
          innerHTML: eventSummary(),
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
          value: this.eventRipple ?? true,
        }],
        on: {
          click: (e: MouseEvent) => this.$emit('click:more', day, e),
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
    isEventForCategory (event: CalendarEventParsed, category: CalendarCategory): boolean {
      return !this.categoryMode ||
        (typeof category === 'object' && category.categoryName &&
        category.categoryName === event.category) ||
        (typeof event.category === 'string' && category === event.category) ||
        (typeof event.category !== 'string' && category === null)
    },
    getEventsForDay (day: CalendarDaySlotScope): CalendarEventParsed[] {
      const identifier = getDayIdentifier(day)
      const firstWeekday = this.eventWeekdays[0]

      return this.parsedEvents.filter(
        event => isEventStart(event, day, identifier, firstWeekday)
      )
    },
    getEventsForDayAll (day: CalendarDaySlotScope): CalendarEventParsed[] {
      const identifier = getDayIdentifier(day)
      const firstWeekday = this.eventWeekdays[0]

      return this.parsedEvents.filter(
        event => event.allDay &&
          (this.categoryMode ? isEventOn(event, identifier) : isEventStart(event, day, identifier, firstWeekday)) &&
          this.isEventForCategory(event, day.category)
      )
    },
    getEventsForDayTimed (day: CalendarDaySlotScope): CalendarEventParsed[] {
      const identifier = getDayIdentifier(day)
      return this.parsedEvents.filter(
        event => !event.allDay &&
          isEventOn(event, identifier) &&
          this.isEventForCategory(event, day.category)
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

      const isNode = (input: VNode | false): input is VNode => !!input
      const getSlotChildren: VEventsToNodes = (day, getter, mapper, timed) => {
        const events = getter(day)
        const visuals = mode(day, events, timed, this.categoryMode)

        if (timed) {
          return visuals.map(visual => mapper(visual, day)).filter(isNode)
        }

        const children: VNode[] = []

        visuals.forEach((visual, index) => {
          while (children.length < visual.column) {
            children.push(this.genPlaceholder(day))
          }

          const mapped = mapper(visual, day)
          if (mapped) {
            children.push(mapped)
          }
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
