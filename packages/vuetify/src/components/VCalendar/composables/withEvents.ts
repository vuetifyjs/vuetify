// Styles
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  CalendarDayBodySlotScope,
  CalendarDaySlotScope,
  CalendarEventCategoryFunction,
  CalendarEventColorFunction,
  CalendarEventNameFunction,
  CalendarEventOverlapMode,
  CalendarEventTimedFunction,
  diffMinutes,
  getDayIdentifier,
} from '@/composables/calendar/timestamp'

import type {
  CalendarCategory,
  CalendarEvent,
  CalendarEventParsed,
  CalendarEventVisual,
  CalendarTimestamp,
} from '@/composables/calendar/timestamp'

import { escapeHTML } from '@/util'
import { computed } from 'vue'
import type { ComputedRef, VNode } from 'vue'
// import './calendar-with-events.sass'
import { CalendarEventOverlapModes } from './modes'
import { doParseEvent, isEventHiddenOn, isEventOverlapping } from './events'

// Types
type VEventGetter<D> = (day: D) => CalendarEventParsed[]

type VEventVisualToNode<D> = (visual: CalendarEventVisual, day: D) => VNode | false

type VEventsToNodes = <D extends CalendarDaySlotScope>(
  day: D,
  getter: VEventGetter<D>,
  mapper: VEventVisualToNode<D>,
  timed: boolean) => VNode[] | undefined

type VDailyEventsMap = {
  [ date: string ]: {
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

export function useWithEvents (props) {
  // Computeds
  const noEvents: ComputedRef<boolean> = computed(() => {
    return props.events.length === 0
  })

  const parsedEvents: ComputedRef<CalendarEventParsed[]> = computed(() => {
    return props.events.map(doParseEvent)
  })

  const parsedEventOverlapThreshold: ComputedRef<number> = computed(() => {
    return parseInt(props.eventOverlapThreshold)
  })

  const eventTimedFunction: ComputedRef<CalendarEventTimedFunction> = computed(() => {
    return typeof props.eventTimed === 'function'
      ? props.eventTimed
      : event => !!event[ props.eventTimed as string ]
  })

  const eventCategoryFunction: ComputedRef<CalendarEventCategoryFunction> = computed(() => {
    return typeof props.eventCategory === 'function'
      ? props.eventCategory
      : event => event[ props.eventCategory as string ]
  })

  const eventTextColorFunction: ComputedRef<CalendarEventColorFunction> = computed(() => {
    return typeof props.eventTextColor === 'function'
      ? props.eventTextColor
      : () => props.eventTextColor as string
  })

  const eventNameFunction: ComputedRef<CalendarEventNameFunction> = computed(() => {
    return typeof props.eventName === 'function'
      ? props.eventName
      : (event, timedEvent) => escapeHTML(event.input[ props.eventName as string ] as string || '')
  })

  const eventModeFunction: ComputedRef<CalendarEventOverlapMode> = computed(() => {
    return typeof props.eventOverlapMode === 'function'
      ? props.eventOverlapMode
      : CalendarEventOverlapModes[ props.eventOverlapMode ]
  })

  const eventWeekdays: ComputedRef<number[]> = computed(() => {
    return props.parsedWeekdays
  })

  const categoryMode: ComputedRef<boolean> = computed(() => {
    return props.type === 'category'
  })

  // methods
  const eventColorFunction = (e: CalendarEvent): string => {
    return typeof props.eventColor === 'function'
      ? props.eventColor(e)
      : e.color || props.eventColor
  }

  const parseEvent = (input: CalendarEvent, index = 0): CalendarEventParsed => {
    return doParseEvent(
      input,
      index,
      props.eventStart,
      props.eventEnd,
      eventTimedFunction.value(input),
      categoryMode.value ? eventCategoryFunction.value(input) : false,
    )
  }

  const formatTime = (withTime: CalendarTimestamp, ampm: boolean): string => {
    const formatter = getFormatter({
      timeZone: 'UTC',
      hour: 'numeric',
      minute: withTime.minute > 0 ? 'numeric' : undefined,
    })

    return formatter(withTime, true)
  }

  const getEventsMap = (): VDailyEventsMap => {
    const eventsMap: VDailyEventsMap = {}
    // const elements = this.$refs.events as HTMLElement[]

    // if (!elements || !elements.forEach) {
    //   return eventsMap
    // }

    // elements.forEach(el => {
    //   const date = el.getAttribute('data-date')
    //   if (el.parentElement && date) {
    //     if (!(date in eventsMap)) {
    //       eventsMap[ date ] = {
    //         parent: el.parentElement,
    //         more: null,
    //         events: [],
    //       }
    //     }
    //     if (el.getAttribute('data-more')) {
    //       eventsMap[ date ].more = el
    //     } else {
    //       eventsMap[ date ].events.push(el)
    //       el.style.display = ''
    //     }
    //   }
    // })

    return eventsMap
  }

  const updateEventVisibility = () => {
    if (noEvents.value || !props.eventMore) {
      return
    }

    const eventsMap = getEventsMap()

    for (const date in eventsMap) {
      const { parent, events, more } = eventsMap[ date ]
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
        const bottom = eventsSorted[ i ].bottom
        const hide = i === last
          ? (bottom > parentBounds.bottom)
          : (bottom + props.eventHeight > parentBounds.bottom)

        if (hide) {
          eventsSorted[ i ].event.style.display = 'none'
          hidden++
        }
      }

      if (hidden) {
        more.style.display = ''
        more.innerHTML = this.$vuetify.lang.t(props.eventMoreText, hidden)
      } else {
        more.style.display = 'none'
      }
    }
  }

  const genName = (eventSummary: () => string): VNode => {
    return this.$createElement('div', {
      staticClass: 'pl-1',
      domProps: {
        innerHTML: eventSummary(),
      },
    })
  }

  const genEvent = (event: CalendarEventParsed, scopeInput: VEventScopeInput, timedEvent: boolean, data: VNodeData): VNode => {
    const slot = slots.event
    const text = eventTextColorFunction.value(event.input)
    const background = eventColorFunction(event.input)
    const overlapsNoon = event.start.hour < 12 && event.end.hour >= 12
    const singline = diffMinutes(event.start, event.end) <= parsedEventOverlapThreshold.value
    const timeSummary = () => `${ formatTime(event.start, overlapsNoon) } - ${ formatTime(event.end, true) }`
    const eventSummary = () => {
      const name = eventNameFunction.value(event, timedEvent)
      if (event.start.hasTime) {
        const eventSummaryClass = 'v-event-summary'
        if (timedEvent) {
          const time = timeSummary()
          const delimiter = singline ? ', ' : '<br>'

          return `<span class="${ eventSummaryClass }"><strong>${ name }</strong>${ delimiter }${ time }</span>`
        } else {
          const time = formatTime(event.start, true)

          return `<span class="${ eventSummaryClass }"><strong>${ time }</strong> ${ name }</span>`
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

    const eventComponents = genericComponent<new <T>() => {
      $props: {},
      $slots: MakeSlots<{}>
    }>()({
      name: 'VCalendarEvent',
      setup (props, ctx) {
        return () => (
          <div

          >
          </div>
        )
      }
    })
  }
  return this.$createElement('div',
    this.setTextColor(text,
      this.setBackgroundColor(background, {
        on: this.getDefaultMouseEventHandlers(':event', nativeEvent => ({ ...scope, nativeEvent })),
        directives: [ {
          name: 'ripple',
          value: props.eventRipple ?? true,
        } ],
        ...data,
      })
    ), slot
    ? slot(scope)
    : [ genName(eventSummary) ]
  )
}

const genDayEvent = ({ event }: CalendarEventVisual, day: CalendarDaySlotScope): VNode => {
  const dayIdentifier = getDayIdentifier(day)
  const week = day.week
  const start = dayIdentifier === event.startIdentifier
  let end = dayIdentifier === event.endIdentifier
  let width = WIDTH_START

  if (!categoryMode.value) {
    for (let i = day.index + 1; i < week.length; i++) {
      const weekdayIdentifier = getDayIdentifier(week[ i ])
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
    staticClass: 'v-event',
    class: {
      'v-event-start': start,
      'v-event-end': end,
    },
    style: {
      height: `${ props.eventHeight }px`,
      width: `${ width }%`,
      'margin-bottom': `${ props.eventMarginBottom }px`,
    },
    attrs: {
      'data-date': day.date,
    },
    key: event.index,
    ref: 'events',
    refInFor: true,
  })
}

const genTimedEvent = ({ event, left, width }: CalendarEventVisual, day: CalendarDayBodySlotScope): VNode | false => {
  if (day.timeDelta(event.end) < 0 || day.timeDelta(event.start) >= 1 || isEventHiddenOn(event, day)) {
    return false
  }

  const dayIdentifier = getDayIdentifier(day)
  const start = event.startIdentifier >= dayIdentifier
  const end = event.endIdentifier > dayIdentifier
  const top = start ? day.timeToY(event.start) : 0
  const bottom = end ? day.timeToY(MINUTES_IN_DAY) : day.timeToY(event.end)
  const height = Math.max(eventHeight, bottom - top)
  const scope = { eventParsed: event, day, start, end, timed: true }

  return genEvent(event, scope, true, {
    staticClass: 'v-event-timed',
    style: {
      top: `${ top }px`,
      height: `${ height }px`,
      left: `${ left }%`,
      width: `${ width }%`,
    },
  })
}

const genPlaceholder = (day: CalendarTimestamp): VNode => {
  const height = eventHeight + eventMarginBottom

  return this.$createElement('div', {
    style: {
      height: `${ height }px`,
    },
    attrs: {
      'data-date': day.date,
    },
    ref: 'events',
    refInFor: true,
  })
}

const genMore = (day: CalendarDaySlotScope): VNode => {
  return this.$createElement('div', {
    staticClass: 'v-event-more pl-1',
    class: {
      'v-outside': day.outside,
    },
    attrs: {
      'data-date': day.date,
      'data-more': 1,
    },
    directives: [ {
      name: 'ripple',
      value: eventRipple ?? true,
    } ],
    on: {
      click: (e: MouseEvent) => this.$emit('click:more', day, e),
    },
    style: {
      display: 'none',
      height: `${ eventHeight }px`,
      'margin-bottom': `${ eventMarginBottom }px`,
    },
    ref: 'events',
    refInFor: true,
  })
}
const getVisibleEvents = (): CalendarEventParsed[] => {
  const start = getDayIdentifier(this.days[ 0 ])
  const end = getDayIdentifier(this.days[ this.days.length - 1 ])

  return this.parsedEvents.filter(
    event => isEventOverlapping(event, start, end)
  )
}

const isEventForCategory = (event: CalendarEventParsed, category: CalendarCategory): boolean => {
  return !this.categoryMode ||
    (typeof category === 'object' && category.categoryName &&
      category.categoryName === event.category) ||
    (typeof event.category === 'string' && category === event.category) ||
    (typeof event.category !== 'string' && category === null)
}

const getEventsForDay = (day: CalendarDaySlotScope): CalendarEventParsed[] => {
  const identifier = getDayIdentifier(day)
  const firstWeekday = this.eventWeekdays[ 0 ]

  return this.parsedEvents.filter(
    event => isEventStart(event, day, identifier, firstWeekday)
  )
}

const getEventsForDayAll = (day: CalendarDaySlotScope): CalendarEventParsed[] => {
  const identifier = getDayIdentifier(day)
  const firstWeekday = this.eventWeekdays[ 0 ]

  return this.parsedEvents.filter(
    event => event.allDay &&
      (this.categoryMode ? isEventOn(event, identifier) : isEventStart(event, day, identifier, firstWeekday)) &&
      this.isEventForCategory(event, day.category)
  )
}

const getEventsForDayTimed = (day: CalendarDaySlotScope): CalendarEventParsed[] => {
  const identifier = getDayIdentifier(day)
  return this.parsedEvents.filter(
    event => !event.allDay &&
      isEventOn(event, identifier) &&
      this.isEventForCategory(event, day.category)
  )
}

const getScopedSlots = () => {
  if (props.noEvents) {
    return { ...slots }
  }

  const mode = props.eventModeFunction(
    parsedEvents,
    eventWeekdays[ 0 ],
    parsedEventOverlapThreshold
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
  console.log(slots)
  // const slots = this.$scopedSlots
  const slotDay = slots.day
  const slotDayHeader = slots[ 'day-header' ]
  const slotDayBody = slots[ 'day-body' ]

  return {
    ...slots,
    day: (day: CalendarDaySlotScope) => {
      let children = getSlotChildren(day, getEventsForDay, genDayEvent, false)
      if (children && children.length > 0 && props.eventMore) {
        children.push(genMore(day))
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
}

return {
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
  parseEvent,
  formatTime,
  updateEventVisibility,
  getEventsMap,
  genEvent,
  genDayEvent,
  genTimedEvent,
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
