
// import './VCalendar.sass'
import './withEvents.sass'
import { useLocale } from '@/composables/locale'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { 
  makeBaseProps,
  makeCalendarProps,
  makeCategoryProps,
  makeEventsProps,
  makeIntervalProps,
  makeTimesProps,
  makeWeeksProps,
} from './composables/props'
import { useBaseCalendar } from './composables/base'

import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
// import { computed, toRef } from 'vue'
import { genericComponent, MakeSlots } from '@/util'

// Types1
import { Component, computed, onMounted, onUpdated, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { useTimes } from './composables/times'
import { CalendarFormatter, CalendarTimestamp, copyTimestamp, DAYS_IN_MONTH_MAX, DAYS_IN_WEEK, DAY_MIN, getEndOfMonth, getStartOfMonth, nextDay, parseTimestamp, prevDay, relativeDays, timestampToDate, updateFormatted, updateRelative, updateWeekday, validateTimestamp } from '@/composables/calendar/timestamp'
import { getParsedCategories } from './composables/parser'
import { VCalendarWeekly } from './VCalendarWeekly'
import { VCalendarMonthly } from './VCalendarMonthly'
import { VCalendarDaily } from './VCalendarDaily'

// Types
interface VCalendarRenderProps {
  start: CalendarTimestamp
  end: CalendarTimestamp
  component: string | Component
  maxDays: number
  weekdays: number[]
  categories: CalendarCategory[]
}

// Events
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
} from '@/composables/calendar/timestamp'

import { escapeHTML } from '@/util'
import type { VNode } from 'vue'
// import './calendar-with-events.sass'
import { CalendarEventOverlapModes } from './composables/modes'
import { doParseEvent, isEventHiddenOn, isEventOn, isEventStart } from './composables/events'

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

export const VCalendar = genericComponent<new <T>() => {
  $props: {
  },
  $slots: MakeSlots<{}>
}>()({
  name: 'VCalendar',
  emits: ['change', 'input', 'moved'],
  props: {
    ...makeBaseProps(),
    ...makeCalendarProps(),
    ...makeCategoryProps(),
    ...makeEventsProps(),
    ...makeIntervalProps(),
    ...makeThemeProps(),
    ...makeTimesProps(),
    ...makeWeeksProps(),
    modelValue: null
  },

  setup(props, { attrs, slots, emit, expose }) {
    const { current, t } = useLocale()
    const { themeClasses } = provideTheme(props)
    const {
      times,
      parsedNow,
      setPresent,
      updateTimes,
    } = useTimes(props)

    const {
      parsedWeekdays,
      parsedStart,
      parsedEnd,
      getStartOfWeek,
      getEndOfWeek,
      getFormatter
    } = useBaseCalendar(props, current.value, null, times, null)
    
    const model = useProxiedModel(props, 'modelValue')
    
    const lastStart = ref({})
    const lastEnd = ref({})
    
    // computeds
    const parsedValue: ComputedRef<CalendarTimestamp> = computed(() => {
      return (validateTimestamp(model.value)
        ? parseTimestamp(model.value, true)
        : (parsedStart.value || times.today))
    })

    const parsedCategories: ComputedRef<CalendarCategory[]> = computed(() => {
      return getParsedCategories(props.categories, props.categoryText)
    })

    const parsedCategoryDays: ComputedRef<number> = computed(() => {
      return parseInt(props.categoryDays) || 1
    })
    
    const renderProps: ComputedRef<VCalendarRenderProps> = computed(() => {
      const around = parsedValue.value
      let component: any = null
      let maxDays = props.maxDays
      let weekdays = parsedWeekdays.value
      let categories = parsedCategories.value
      let start = around
      let end = around
      switch (props.type) {
        case 'month':
          component = VCalendarMonthly
          start = getStartOfMonth(around)
          end = getEndOfMonth(around)
          break
        case 'week':
          component = VCalendarDaily
          start = getStartOfWeek(around)
          end = getEndOfWeek(around)
          maxDays = 7
          break
        case 'day':
          component = VCalendarDaily
          maxDays = 1
          weekdays = [start.weekday]
          break
        case '4day':
          component = VCalendarDaily
          end = relativeDays(copyTimestamp(end), nextDay, 3)
          updateFormatted(end)
          maxDays = 4
          weekdays = [
            start.weekday,
            (start.weekday + 1) % 7,
            (start.weekday + 2) % 7,
            (start.weekday + 3) % 7,
          ]
          break
        case 'custom-weekly':
          component = VCalendarWeekly
          start = parsedStart.value || around
          end = parsedEnd.value
          break
        case 'custom-daily':
          component = VCalendarDaily
          start = parsedStart.value || around
          end = parsedEnd.value
          break
        case 'category':
          const days = parsedCategoryDays.value

          component = VCalendarCategory
          end = relativeDays(copyTimestamp(end), nextDay, days)
          updateFormatted(end)
          maxDays = days
          weekdays = []

          for (let i = 0; i < days; i++) {
            weekdays.push((start.weekday + i) % 7)
          }

          categories = getCategoryList(categories)
          break
        default:
          throw new Error(props.type + ' is not a valid Calendar type')
      }

      return { component, start, end, maxDays, weekdays, categories }
    })

    const categoryMode: ComputedRef<boolean> = computed(() => {
      return props.type === 'category'
    })

    const getCategoryList = (categories: CalendarCategory[]): CalendarCategory[] => {
      if (!noEvents.value) {
        const categoryMap: any = categories.reduce((map: any, category, index) => {
          if (typeof category === 'object' && category.categoryName) map[category.categoryName] = { index, count: 0 }
          else if (typeof category === 'string') map[category] = { index, count: 0 }
          return map
        }, {})

        if (!props.categoryHideDynamic || !props.categoryShowAll) {
          let categoryLength = categories.length

          parsedEvents.value.forEach(ev => {
            let category = ev.category

            if (typeof category !== 'string') {
              category = props.categoryForInvalid
            }

            if (!category) {
              return
            }

            if (category in categoryMap) {
              categoryMap[category].count++
            } else if (!props.categoryHideDynamic) {
              categoryMap[category] = {
                index: categoryLength++,
                count: 1,
              }
            }
          })
        }

        if (!props.categoryShowAll) {
          for (const category in categoryMap) {
            if (categoryMap[category].count === 0) {
              delete categoryMap[category]
            }
          }
        }

        categories = categories.filter((category: CalendarCategory) => {
          if (typeof category === 'object' && category.categoryName) {
            return categoryMap.hasOwnProperty(category.categoryName)
          } else if (typeof category === 'string') {
            return categoryMap.hasOwnProperty(category)
          }
          return false
        })
      }
      return categories
    }
    
    const move = (amount = 1): void => {
      const moved = copyTimestamp(parsedValue.value)
      const forward = amount > 0
      const mover = forward ? nextDay : prevDay
      const limit = forward ? DAYS_IN_MONTH_MAX : DAY_MIN
      let thisTimes = forward ? amount : -amount

      while (--thisTimes >= 0) {
        switch (props.type) {
          case 'month':
            moved.day = limit
            mover(moved)
            break
          case 'week':
            relativeDays(moved, mover, DAYS_IN_WEEK)
            break
          case 'day':
            relativeDays(moved, mover, 1)
            break
          case '4day':
            relativeDays(moved, mover, 4)
            break
          case 'category':
            relativeDays(moved, mover, parsedCategoryDays.value)
            break
        }
      }

      updateWeekday(moved)
      updateFormatted(moved)
      updateRelative(moved, times.now)

      if (props.modelValue instanceof Date) {
        emit('input', timestampToDate(moved))
      } else if (typeof props.modelValue === 'number') {
        emit('input', timestampToDate(moved).getTime())
      } else {
      emit('input', moved.date)
      }

      emit('moved', moved)
    }

    const next = (amount = 1): void => {
      move(amount)
    }

    const prev = (amount = 1): void => {
      move(-amount)
    }

    expose({ next, prev })

    // TODO: Remove: Not used?
    // const title: ComputedRef<string> = computed(() => {
    //   const { start, end } = renderProps.value
    //   const spanYears = start.year !== end.year
    //   const spanMonths = spanYears || start.month !== end.month

    //   if (spanYears) {
    //     return `${monthShortFormatter.value(start, true)} ${start.year} - ${monthShortFormatter.value(end, true)} ${end.year}`
    //   }

    //   if (spanMonths) {
    //     return `${monthShortFormatter.value(start, true)} - ${monthShortFormatter.value(end, true)} ${end.year}`
    //   } else {
    //     return `${monthLongFormatter.value(start, false)} ${start.year}`
    //   }
    // })

    // TODO: Remove: Not used?
    // const monthLongFormatter: ComputedRef<CalendarFormatter> = computed(() => {
    //   return getFormatter({
    //     timeZone: 'UTC', month: 'long',
    //   })
    // })
    // TODO: Remove: Not used?
    // const monthShortFormatter: ComputedRef<CalendarFormatter> = computed(() => {
    //   return getFormatter({
    //     timeZone: 'UTC', month: 'short',
    //   })
    // })

    // Methods
    onMounted (() => {
      updateTimes()
      setPresent()
      updateEventVisibility()
    })

    onUpdated (() => {
      window.requestAnimationFrame(updateEventVisibility)
    })

    const checkChange = () => {
      const { start, end } = renderProps.value
      if (!lastStart.value || !lastEnd.value ||
        start.date !== lastStart.value.date ||
        end.date !== lastEnd.value.date) {
        lastStart.value = start
        lastEnd.value = end
        emit('change', { start, end })
        updateEventVisibility()
      }
    }

    // Events
    // Computeds
    const noEvents: ComputedRef<boolean> = computed(() => {
      return props.events.length === 0
    })

    const parsedEvents: ComputedRef<CalendarEventParsed[]> = computed(() => {
      return props.events.map(parseEvent)
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
        : (event) => escapeHTML(event.input[ props.eventName as string ] as string || '')
    })

    const eventModeFunction: ComputedRef<CalendarEventOverlapMode> = computed(() => {
      return typeof props.eventOverlapMode === 'function'
        ? props.eventOverlapMode
        : CalendarEventOverlapModes[ props.eventOverlapMode ]
    })

    const eventWeekdays: ComputedRef<number[]> = computed(() => {
      return parsedWeekdays.value
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

    const events = ref([])

    const getEventsMap = (): VDailyEventsMap => {
      const eventsMap: VDailyEventsMap = {}
      const elements = events.value

      if (!elements || !elements.forEach) {
        return eventsMap
      }

      elements.forEach((el: HTMLElement) => {
        const date = el.getAttribute('data-date')
        if (el.parentElement && date) {
          if (!(date in eventsMap)) {
            eventsMap[ date ] = {
              parent: el.parentElement,
              more: null,
              events: [],
            }
          }
          if (el.getAttribute('data-more')) {
            eventsMap[ date ].more = el
          } else {
            eventsMap[ date ].events.push(el)
            el.style.display = ''
          }
        }
      })

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
          more.innerHTML = t(props.eventMoreText, hidden)
        } else {
          more.style.display = 'none'
        }
      }
    }

    const genName = (eventSummary: () => Element): JSX.Element => {
      return (
        <div class="pl-1">{ eventSummary }</div>
      )
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
          if (timedEvent) {
            const time = timeSummary()
            const delimiter = singline ? ', ' : ( <br /> )

            return ( <span class="v-event-summary"><strong>{ name }</strong>{ delimiter }{ time }</span> )
          } else {
            const time = formatTime(event.start, true)

            return ( <span class="v-event-summary"><strong>{ time }</strong> { name }</span> )
          }
        }

        return ( <span>{ name }</span> )
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

      return (
        <div {...data} style={{color: text, background }}>{ slot ? slot(scope) : genName( eventSummary() ) }</div>
      )
      // return this.$createElement('div',
      //   this.setTextColor(text,
      //     this.setBackgroundColor(background, {
      //       on: this.getDefaultMouseEventHandlers(':event', nativeEvent => ({ ...scope, nativeEvent })),
      //       directives: [ {
      //         name: 'ripple',
      //         value: props.eventRipple ?? true,
      //       } ],
      //       ...data,
      //     })
      //   ), slot
      //   ? slot(scope)
      //   : [ genName(eventSummary) ]
      // )
    }

    const genDayEvent = ({ event }: CalendarEventVisual, day: CalendarDaySlotScope): VNode => {
      const dayIdentifier = getDayIdentifier(day)
      const week = day.week
      const start = dayIdentifier === event.startIdentifier
      let end = dayIdentifier === event.endIdentifier
      let width = WIDTH_START

      if (!categoryMode.value && week) {
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
        class: {
          'v-event': true,
          'v-event-start': start,
          'v-event-end': end,
        },
        style: {
          height: `${ props.eventHeight }px`,
          width: `${ width }%`,
          'margin-bottom': `${ props.eventMarginBottom }px`,
        },
        'data-date': day.date,
        key: event.index,
        ref: () => ('events'),
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
      const height = Math.max(props.eventHeight, bottom - top)
      const scope = { eventParsed: event, day, start, end, timed: true }

      return genEvent(event, scope, true, {
        class: 'v-event-timed',
        style: {
          top: `${ top }px`,
          height: `${ height }px`,
          left: `${ left }%`,
          width: `${ width }%`,
        },
      })
    }

    const genPlaceholder = (day: CalendarTimestamp): VNode => {
      const height = props.eventHeight + props.eventMarginBottom
      return (
        <div style={`height: ${height}px`} data-date={ day.date } ref="events"></div>
      )
    }

    const genMore = (day: CalendarDaySlotScope): VNode => {
      return (
        <div
          class={['v-event-more', 'pl-1', {'v-outside': day.outside}]}
          data-date={ day.date }
          data-more={ 1 }
          v-ripple={ props.eventRipple ?? true }
          // onClick
          style={`display: none; height: ${ props.eventHeight }px; margin-bottom: ${ props.eventMarginBottom }px`}
          ref="events"
        >
        </div>
      )
    }

    // TODO: Not Used?
    // const getVisibleEvents = (): CalendarEventParsed[] => {
    //   const start = getDayIdentifier(days[ 0 ])
    //   const end = getDayIdentifier(days[ days.length - 1 ])

    //   return parsedEvents.value.filter(
    //     event => isEventOverlapping(event, start, end)
    //   )
    // }

    const isEventForCategory = (event: CalendarEventParsed, category: CalendarCategory): boolean => {
      return !categoryMode.value ||
        (typeof category === 'object' && category.categoryName &&
          category.categoryName === event.category) ||
        (typeof event.category === 'string' && category === event.category) ||
        (typeof event.category !== 'string' && category === null)
    }

    const getEventsForDay = (day: CalendarDaySlotScope): CalendarEventParsed[] => {
      const identifier = getDayIdentifier(day)
      const firstWeekday = eventWeekdays.value[ 0 ]

      return parsedEvents.value.filter(
        event => isEventStart(event, day, identifier, firstWeekday)
      )
    }

    const getEventsForDayAll = (day: CalendarDaySlotScope): CalendarEventParsed[] => {
      const identifier = getDayIdentifier(day)
      const firstWeekday = eventWeekdays.value[ 0 ]

      return parsedEvents.value.filter(
        event => event.allDay &&
          (categoryMode.value ? isEventOn(event, identifier) : isEventStart(event, day, identifier, firstWeekday)) &&
          isEventForCategory(event, day.category)
      )
    }

    const getEventsForDayTimed = (day: CalendarDaySlotScope): CalendarEventParsed[] => {
      const identifier = getDayIdentifier(day)
      return parsedEvents.value.filter(
        event => !event.allDay &&
          isEventOn(event, identifier) &&
          isEventForCategory(event, day.category)
      )
    }

    const getScopedSlots = () => {
      if (noEvents.value) {
        return { ...slots }
      }

      const mode = eventModeFunction.value(
        parsedEvents.value,
        eventWeekdays.value[ 0 ],
        parsedEventOverlapThreshold.value
      )

      const isNode = (input: VNode | false): input is VNode => !!input
      const getSlotChildren: VEventsToNodes = (day, getter, mapper, timed) => {
        console.log(day)
        const events = getter(day)
        const visuals = mode(day, events, timed, categoryMode.value)
        if (timed) {
          return visuals.map((visual: CalendarEventVisual) => mapper(visual, day)).filter(isNode)
        }

        const children: VNode[] = []

        visuals.forEach((visual: CalendarEventVisual, index: any) => {
          while (children.length < visual.column) {
            children.push(genPlaceholder(day))
          }

          const mapped = mapper(visual, day)
          if (mapped) {
            children.push(mapped)
          }
        })

        return children
      }
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
          if (!!slotDay) {
            const slot = slotDay(day)
            if (!!slot) {
              children = children ? children.concat(slot) : slot
            }
          }
          return children
        },
        'day-header': (day: CalendarDaySlotScope) => {
          let children = getSlotChildren(day, getEventsForDayAll, genDayEvent, false)

          if (slotDayHeader) {
            const slot = slotDayHeader(day)
            if (slot) {
              children = children ? children.concat(slot) : slot
            }
          }
          return children
        },
        'day-body': (day: CalendarDayBodySlotScope) => {
          const events = getSlotChildren(day, getEventsForDayTimed, genTimedEvent, true)
          let children: VNode[] = [
            ( <div class="v-event-timed-container">{ events }</div> )
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

    watch(renderProps, checkChange)

    watch(parsedNow, () => {
      updateTimes()
    })

    return () => (
      <div
        class={[
          themeClasses.value
        ]}
      >
        <renderProps.value.component { ...{...renderProps.value, start: renderProps.value.start.date, end: renderProps.value.end.date} } v-slots={ getScopedSlots() }>
        </renderProps.value.component>
      </div>
    )

  }

})

export type VCalendar = InstanceType<typeof VCalendar>