// Styles
import './calendarWithEvents.sass'

// Composables
import { useCalendarBase } from './calendarBase'

// Utilities
import { computed, ref } from 'vue'
import { CalendarEventOverlapModes } from '../modes'
import {
  isEventHiddenOn,
  isEventOn,
  isEventOverlapping,
  isEventStart,
  parseEvent,
} from '../util/events'
import { diffMinutes, getDayIdentifier } from '../util/timestamp'
import { getPrefixedEventHandlers, propsFactory } from '@/util'

// Types
import type { PropType, VNode } from 'vue'
import type { CalendarBaseProps } from './calendarBase'
import type {
  CalendarCategory,
  CalendarDayBodySlotScope,
  CalendarDaySlotScope,
  CalendarEvent,
  CalendarEventCategoryFunction,
  CalendarEventColorFunction,
  CalendarEventNameFunction,
  CalendarEventOverlapMode,
  CalendarEventParsed,
  CalendarEventTimedFunction,
  CalendarEventVisual,
  CalendarTimestamp,
} from '../types'

// Constants
const WIDTH_FULL = 100
const WIDTH_START = 95
const MINUTES_IN_DAY = 1440

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

export interface VEventScopeInput {
  eventParsed: CalendarEventParsed
  day: CalendarDaySlotScope
  start: boolean
  end: boolean
  timed: boolean
}

export const makeCalendarWithEventsProps = propsFactory({
  events: {
    type: Array as PropType<CalendarEvent[]>,
    default: () => [],
  },
  eventStart: {
    type: String,
    default: 'start',
  },
  eventEnd: {
    type: String,
    default: 'end',
  },
  eventTimed: {
    type: [String, Function] as PropType<string | CalendarEventTimedFunction>,
    default: 'timed',
  },
  eventCategory: {
    type: [String, Function] as PropType<string | CalendarEventCategoryFunction>,
    default: 'category',
  },
  eventHeight: {
    type: Number,
    default: 20,
  },
  eventColor: {
    type: [String, Function] as PropType<string | CalendarEventColorFunction>,
    default: 'primary',
  },
  eventTextColor: {
    type: [String, Function] as PropType<string | CalendarEventColorFunction>,
  },
  eventName: {
    type: [String, Function] as PropType<string | CalendarEventNameFunction>,
    default: 'name',
  },
  eventOverlapThreshold: {
    type: [String, Number],
    default: 60,
  },
  eventOverlapMode: {
    type: [String, Function] as PropType<'stack' | 'column' | CalendarEventOverlapMode>,
    default: 'stack',
    validate: (mode: any) => mode in CalendarEventOverlapModes || typeof mode === 'function',
  },
  eventMore: {
    type: Boolean,
    default: true,
  },
  eventMoreText: {
    type: String,
    default: '$vuetify.calendar.moreEvents',
  },
  eventRipple: {
    type: [Boolean, Object],
    default: null,
  },
  eventMarginBottom: {
    type: Number,
    default: 1,
  },
}, 'VCalendar-events')

interface CalendarWithEventsProps extends CalendarBaseProps {
  events: CalendarEvent[]
  eventStart: string
  eventEnd: string
  eventTimed: string | CalendarEventTimedFunction
  eventCategory: string | CalendarEventCategoryFunction
  eventHeight: number
  eventColor: string | CalendarEventColorFunction
  eventTextColor: string | CalendarEventColorFunction | undefined
  eventName: string | CalendarEventNameFunction
  eventOverlapThreshold: string | number
  eventOverlapMode: string | CalendarEventOverlapMode
  eventMore: boolean
  eventMoreText: string
  eventRipple: boolean | object | null | undefined
  eventMarginBottom: number
  type: 'month' | 'week' | 'day' | '4day' | 'custom-weekly' | 'custom-daily' | 'category'
}

export function useCalendarWithEvents (props: CalendarWithEventsProps, slots: any, attrs: any) {
  const base = useCalendarBase(props)

  const noEvents = computed((): boolean => {
    return !Array.isArray(props.events) || props.events.length === 0
  })

  const categoryMode = computed((): boolean => {
    return props.type === 'category'
  })

  const eventTimedFunction = computed((): CalendarEventTimedFunction => {
    return typeof props.eventTimed === 'function'
      ? props.eventTimed
      : event => !!event[props.eventTimed as string]
  })

  const eventCategoryFunction = computed((): CalendarEventCategoryFunction => {
    return typeof props.eventCategory === 'function'
      ? props.eventCategory
      : event => event[props.eventCategory as string]
  })

  const parsedEvents = computed((): CalendarEventParsed[] => {
    if (!props.events) return []
    return props.events.map((event, index) => parseEvent(
      event,
      index,
      props.eventStart || '',
      props.eventEnd || '',
      eventTimedFunction.value(event),
      categoryMode.value ? eventCategoryFunction.value(event) : false,
    ))
  })

  const parsedEventOverlapThreshold = computed((): number => {
    return parseInt(String(props.eventOverlapThreshold || 0))
  })

  const eventTextColorFunction = computed((): CalendarEventColorFunction => {
    return typeof props.eventTextColor === 'function'
      ? props.eventTextColor
      : () => props.eventTextColor as string
  })

  const eventNameFunction = computed((): CalendarEventNameFunction => {
    return typeof props.eventName === 'function'
      ? props.eventName
      : (event, timedEvent) => event.input[props.eventName as string] as string || ''
  })

  const eventModeFunction = computed((): CalendarEventOverlapMode => {
    return typeof props.eventOverlapMode === 'function'
      ? props.eventOverlapMode
      : CalendarEventOverlapModes[props.eventOverlapMode as keyof typeof CalendarEventOverlapModes]
  })

  const eventWeekdays = computed((): number[] => {
    return base.parsedWeekdays.value
  })

  function eventColorFunction (e: CalendarEvent): string | undefined {
    return typeof props.eventColor === 'function'
      ? props.eventColor(e)
      : e.color || props.eventColor
  }

  // Reference to track DOM elements
  const eventsRef = ref<HTMLElement[]>([])

  function updateEventVisibility () {
    if (noEvents.value || !props.eventMore) {
      return
    }

    const eventHeight = props.eventHeight || 0
    const eventsMap = getEventsMap()

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
        // Assuming $vuetify is available in the context - this may need to be modified
        more.innerHTML = `${hidden} more` // This would need proper i18n support
      } else {
        more.style.display = 'none'
      }
    }
  }

  function getEventsMap (): VDailyEventsMap {
    const eventsMap: VDailyEventsMap = {}
    const elements = eventsRef.value

    if (!elements || !elements.length) {
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
  }

  function genDayEvent ({ event }: CalendarEventVisual, day: CalendarDaySlotScope): VNode {
    const eventHeight = props.eventHeight || 0
    const eventMarginBottom = props.eventMarginBottom || 0
    const dayIdentifier = getDayIdentifier(day)
    const week = day.week
    const start = dayIdentifier === event.startIdentifier
    let end = dayIdentifier === event.endIdentifier
    let width = WIDTH_START

    if (!categoryMode.value) {
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

    return genEvent(event, scope, false, {
      class: [
        'v-event',
        { 'v-event-start': start, 'v-event-end': end },
      ],
      style: {
        height: `${eventHeight}px`,
        width: `${width}%`,
        marginBottom: `${eventMarginBottom}px`,
      },
      'data-date': day.date,
    })
  }

  function genTimedEvent ({ event, left, width }: CalendarEventVisual, day: CalendarDayBodySlotScope): VNode | false {
    const endDelta = day.timeDelta(event.end)
    const startDelta = day.timeDelta(event.start)
    if (
      endDelta === false ||
      startDelta === false ||
      endDelta < 0 ||
      startDelta >= 1 ||
      isEventHiddenOn(event, day)
    ) {
      return false
    }

    const dayIdentifier = getDayIdentifier(day)
    const start = event.startIdentifier >= dayIdentifier
    const end = event.endIdentifier > dayIdentifier
    const top = start ? day.timeToY(event.start) : 0
    const bottom = end ? day.timeToY(MINUTES_IN_DAY) : day.timeToY(event.end)
    const height = Math.max(props.eventHeight || 0, bottom - top)
    const scope = { eventParsed: event, day, start, end, timed: true }

    return genEvent(event, scope, true, {
      class: 'v-event-timed',
      style: {
        top: `${top}px`,
        height: `${height}px`,
        left: `${left}%`,
        width: `${width}%`,
      },
    })
  }

  function genEvent (
    event: CalendarEventParsed,
    scopeInput: VEventScopeInput,
    timedEvent: boolean,
    data: Record<string, unknown>
  ): VNode {
    const slot = slots.event
    const text = eventTextColorFunction.value(event.input)
    const background = eventColorFunction(event.input)
    const overlapsNoon = event.start.hour < 12 && event.end.hour >= 12
    const singline = diffMinutes(event.start, event.end) <= parsedEventOverlapThreshold.value
    const formatTime = (withTime: CalendarTimestamp, ampm: boolean): string => {
      const formatter = base.getFormatter({
        timeZone: 'UTC',
        hour: 'numeric',
        minute: withTime.minute > 0 ? 'numeric' : undefined,
      })
      return formatter(withTime, true)
    }

    const timeSummary = () => formatTime(event.start, overlapsNoon) + ' - ' + formatTime(event.end, true)

    const eventSummary = () => {
      const name = eventNameFunction.value(event, timedEvent)
      if (event.start.hasTime) {
        if (timedEvent) {
          const time = timeSummary()
          const delimiter = singline ? ', ' : <br />

          return (
            <span class="v-event-summary">
              <strong>{ name }</strong>
              { delimiter }
              { time }
            </span>
          )
        } else {
          const time = formatTime(event.start, true)

          return (
            <span class="v-event-summary">
              <strong>{ time }</strong> { name }
            </span>
          )
        }
      }

      return <span class="v-event-summary">{ name }</span>
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

    const events = getPrefixedEventHandlers(attrs, ':event', (nativeEvent: Event) => ({ ...scope, nativeEvent }))

    return (
      <div
        { ...base.getColorProps({ text, background }) }
        { ...events }
        { ...data }
        ref={ el => {
          if (el) eventsRef.value.push(el as HTMLElement)
        }}
        v-ripple={ props.eventRipple ?? true }
      >
        { slot?.(scope) ?? genName(eventSummary) }
      </div>
    )
  }

  function genName (eventSummary: () => string | VNode): VNode {
    return (
      <div class="pl-1">
        { eventSummary() }
      </div>
    )
  }

  function genPlaceholder (day: CalendarTimestamp): VNode {
    const height = (props.eventHeight || 0) + (props.eventMarginBottom || 0)
    return (
      <div
        style={{ height: `${height}px` }}
        data-date={ day.date }
        ref={ el => {
          if (el) eventsRef.value.push(el as HTMLElement)
        }}
      />
    )
  }

  function genMore (day: CalendarDaySlotScope): VNode {
    const eventHeight = props.eventHeight || 0
    const eventMarginBottom = props.eventMarginBottom || 0
    const events = getPrefixedEventHandlers(attrs, ':more', (nativeEvent: Event) => ({ nativeEvent, ...day }))

    return (
      <div
        class={['v-event-more pl-1', { 'v-outside': day.outside }]}
        data-date={ day.date }
        data-more="1"
        style={{
          display: 'none',
          height: `${eventHeight}px`,
          marginBottom: `${eventMarginBottom}px`,
        }}
        ref={ el => {
          if (el) eventsRef.value.push(el as HTMLElement)
        }}
        v-ripple={ props.eventRipple ?? true }
        { ...events }
      />
    )
  }

  function getVisibleEvents (): CalendarEventParsed[] {
    const days = base.days.value
    const start = getDayIdentifier(days[0])
    const end = getDayIdentifier(days[days.length - 1])

    return parsedEvents.value.filter(
      event => isEventOverlapping(event, start, end)
    )
  }

  function isEventForCategory (event: CalendarEventParsed, category: CalendarCategory): boolean {
    return !categoryMode.value ||
      (typeof category === 'object' && category.categoryName &&
      category.categoryName === event.category) ||
      (typeof event.category === 'string' && category === event.category) ||
      (typeof event.category !== 'string' && category === null)
  }

  function getEventsForDay (day: CalendarDaySlotScope): CalendarEventParsed[] {
    const identifier = getDayIdentifier(day)
    const firstWeekday = eventWeekdays.value[0]

    return parsedEvents.value.filter(
      event => isEventStart(event, day, identifier, firstWeekday)
    )
  }

  function getEventsForDayAll (day: CalendarDaySlotScope): CalendarEventParsed[] {
    const identifier = getDayIdentifier(day)
    const firstWeekday = eventWeekdays.value[0]

    return parsedEvents.value.filter(
      event => event.allDay &&
        (categoryMode.value ? isEventOn(event, identifier) : isEventStart(event, day, identifier, firstWeekday)) &&
        isEventForCategory(event, day.category)
    )
  }

  function getEventsForDayTimed (day: CalendarDaySlotScope): CalendarEventParsed[] {
    const identifier = getDayIdentifier(day)
    return parsedEvents.value.filter(
      event => !event.allDay &&
        isEventOn(event, identifier) &&
        isEventForCategory(event, day.category)
    )
  }

  function getScopedSlots () {
    if (noEvents.value) {
      return { ...slots }
    }

    const mode = eventModeFunction.value(
      parsedEvents.value,
      eventWeekdays.value[0],
      parsedEventOverlapThreshold.value
    )

    const isNode = (input: VNode | false): input is VNode => !!input
    const getSlotChildren: VEventsToNodes = (day, getter, mapper, timed) => {
      const events = getter(day)
      const visuals = mode(day, events, timed, categoryMode.value)

      if (timed) {
        return visuals.map(visual => mapper(visual, day)).filter(isNode)
      }

      const children: VNode[] = []

      visuals.forEach((visual, index) => {
        while (children.length < visual.column) {
          children.push(genPlaceholder(day) as VNode)
        }

        const mapped = mapper(visual, day)
        if (mapped) {
          children.push(mapped)
        }
      })

      return children
    }

    return {
      ...slots,
      day: (day: CalendarDaySlotScope) => {
        let children = getSlotChildren(day, getEventsForDay, genDayEvent, false)
        if (children && children.length > 0 && props.eventMore) {
          children.push(genMore(day) as VNode)
        }
        if (slots.day) {
          const slot = slots.day(day)
          if (slot) {
            children = children ? children.concat(slot) : slot
          }
        }
        return children
      },
      'day-header': (day: CalendarDaySlotScope) => {
        let children = getSlotChildren(day, getEventsForDayAll, genDayEvent, false)

        if (slots['day-header']) {
          const slot = slots['day-header'](day)
          if (slot) {
            children = children ? children.concat(slot) : slot
          }
        }
        return children
      },
      'day-body': (day: CalendarDayBodySlotScope) => {
        const events = getSlotChildren(day, getEventsForDayTimed, genTimedEvent, true)
        let children: VNode[] = [
          <div class="v-event-timed-container">{ events }</div>,
        ]

        if (slots['day-body']) {
          const slot = slots['day-body'](day)
          if (slot) {
            children = children.concat(slot)
          }
        }
        return children
      },
    }
  }

  return {
    ...base,
    noEvents,
    parsedEvents,
    parsedEventOverlapThreshold,
    eventTimedFunction,
    eventCategoryFunction,
    eventTextColorFunction,
    eventNameFunction,
    eventModeFunction,
    eventWeekdays,
    categoryMode,
    eventColorFunction,
    eventsRef,
    updateEventVisibility,
    getEventsMap,
    genDayEvent,
    genTimedEvent,
    genEvent,
    genName,
    genPlaceholder,
    genMore,
    getVisibleEvents,
    isEventForCategory,
    getEventsForDay,
    getEventsForDayAll,
    getEventsForDayTimed,
    getScopedSlots,
  }
}
