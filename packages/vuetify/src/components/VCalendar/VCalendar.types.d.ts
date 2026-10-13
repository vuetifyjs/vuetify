// Types
import type { ComponentInternalInstance, ComputedRef, CSSProperties, Ref, RendererElement, RendererNode, ShallowRef, StyleValue, VNode } from 'vue'
import type { VDailyEventsMap, VEventScopeInput } from '@/components/VCalendar/composables/calendarWithEvents.types'
import type {
  CalendarCategory,
  CalendarCategoryTextFunction,
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
  CalendarFormatter,
  CalendarTimestamp,
} from '@/components/VCalendar/types.types'
import type { VTime, VTimestampInput } from '@/components/VCalendar/util/timestamp.types'
import type { ColorValue } from '@/composables/color.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { LocaleInstance, LocaleMessages, LocaleOptions } from '@/composables/locale.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface CalendarDayCategorySlotScope extends CalendarDayBodySlotScope {
  category: CalendarCategory
}

export interface EventSlotScope {
  event: CalendarEvent
  outside: boolean
  singline: boolean
  overlapsNoon: boolean
  formatTime: (withTime: CalendarTimestamp, ampm: boolean) => string
  timeSummary: () => string
  eventSummary: () => JSX.Element
  eventParsed: CalendarEventParsed
  day: CalendarDaySlotScope
  start: boolean
  end: boolean
  timed: boolean
}

export interface DaySlotScope extends CalendarTimestamp {
  outside: boolean
  index: number
  week: CalendarTimestamp[]
}

export interface DayHeaderSlotScope extends CalendarTimestamp {
  index: number
  week: CalendarTimestamp[]
}

export interface VCalendarRenderProps {
  start: CalendarTimestamp
  end: CalendarTimestamp
  component: JSXComponent & { filterProps: <T>(props: T) => Partial<T> }
  maxDays: number
  categories: CalendarCategory[]
}

export interface VCalendarProps {
  categories?: string | CalendarCategory[]
  categoryDays?: string | number
  categoryForInvalid?: string
  categoryHideDynamic?: boolean
  categoryShowAll?: boolean
  categoryText?: string | CalendarCategoryTextFunction
  dayFormat?: CalendarFormatter
  end?: unknown
  eventCategory?: string | CalendarEventCategoryFunction
  eventColor?: string | CalendarEventColorFunction
  eventEnd?: string
  eventHeight?: number
  eventMarginBottom?: number
  eventMore?: boolean
  eventMoreText?: string
  eventName?: string | CalendarEventNameFunction
  eventOverlapMode?: 'stack' | 'column' | CalendarEventOverlapMode
  eventOverlapThreshold?: string | number
  eventRipple?: boolean | Record<string, any>
  events?: CalendarEvent[]
  eventStart?: string
  eventTextColor?: string | CalendarEventColorFunction
  eventTimed?: string | CalendarEventTimedFunction
  firstDayOfWeek?: string | number
  firstDayOfYear?: string | number
  firstInterval?: string | number
  firstTime?: VTime
  format?: 'ampm' | '24hr'
  intervalCount?: string | number
  intervalFormat?: CalendarFormatter
  intervalHeight?: string | number
  intervalHighlight?: string | boolean
  intervalMinutes?: string | number
  intervalStyle?: ((interval: CalendarTimestamp) => StyleValue)
  intervalWidth?: string | number
  locale?: string
  maxDays?: number
  modelValue?: unknown
  now?: unknown
  showIntervalLabel?: ((interval: CalendarTimestamp) => boolean)
  start?: string
  type?: 'month' | 'week' | 'day' | '4day' | 'custom-weekly' | 'custom-daily' | 'category'
  weekdayFormat?: CalendarFormatter
  weekdays?: string | number[]
}

export type VCalendarDefaultKeys =
  | 'categories'
  | 'categoryDays'
  | 'categoryForInvalid'
  | 'categoryHideDynamic'
  | 'categoryShowAll'
  | 'dayFormat'
  | 'eventCategory'
  | 'eventColor'
  | 'eventEnd'
  | 'eventHeight'
  | 'eventMarginBottom'
  | 'eventMore'
  | 'eventMoreText'
  | 'eventName'
  | 'eventOverlapMode'
  | 'eventOverlapThreshold'
  | 'eventRipple'
  | 'events'
  | 'eventStart'
  | 'eventTimed'
  | 'firstInterval'
  | 'intervalCount'
  | 'intervalFormat'
  | 'intervalHeight'
  | 'intervalHighlight'
  | 'intervalMinutes'
  | 'intervalStyle'
  | 'intervalWidth'
  | 'maxDays'
  | 'showIntervalLabel'
  | 'start'
  | 'type'
  | 'weekdayFormat'
  | 'weekdays'

export type VCalendarExposed = { times: { now: { date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: CalendarCategory }, today: { date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: CalendarCategory } }, locale: { name: string, decimalSeparator: ShallowRef<string>, numericGroupSeparator: ShallowRef<string>, messages: Ref<LocaleMessages>, current: Ref<string>, fallback: Ref<string>, t: (key: string, ...params: unknown[]) => string, n: (value: number) => string, provide: (props: LocaleOptions) => LocaleInstance, isRtl: Readonly<Ref<boolean>>, rtl: Ref<Record<string, boolean>>, rtlClasses: Ref<string> }, formatLocale: any, toTimestampInput: (value: unknown) => VTimestampInput, parsedValue: ComputedRef<CalendarTimestamp> & CalendarTimestamp, parsedWeekdays: ComputedRef<number[]> & number[], effectiveWeekdays: ComputedRef<number[]> & number[], weekdaySkips: ComputedRef<number[]> & number[], parsedStart: ComputedRef<CalendarTimestamp> & CalendarTimestamp, parsedEnd: ComputedRef<CalendarTimestamp> & CalendarTimestamp, days: ComputedRef<CalendarTimestamp[]> & CalendarTimestamp[], dayFormatter: ComputedRef<CalendarFormatter> & CalendarFormatter, weekdayFormatter: ComputedRef<CalendarFormatter> & CalendarFormatter, getColorProps: (colors: { background?: ColorValue, text?: ColorValue }) => { class: string[], style: CSSProperties }, getRelativeClasses: (timestamp: CalendarTimestamp, outside?: boolean) => { 'v-present': boolean, 'v-past': boolean, 'v-future': boolean, 'v-outside': boolean }, getWeekNumber: (timestamp: CalendarTimestamp) => number, getStartOfWeek: (timestamp: CalendarTimestamp) => CalendarTimestamp, getEndOfWeek: (timestamp: CalendarTimestamp) => CalendarTimestamp, getFormatter: (options: Intl.DateTimeFormatOptions) => CalendarFormatter, updateTimes: () => void, noEvents: ComputedRef<boolean>, parsedEvents: ComputedRef<CalendarEventParsed[]>, parsedEventOverlapThreshold: ComputedRef<number>, eventTimedFunction: ComputedRef<CalendarEventTimedFunction>, eventCategoryFunction: ComputedRef<CalendarEventCategoryFunction>, eventTextColorFunction: ComputedRef<CalendarEventColorFunction>, eventNameFunction: ComputedRef<CalendarEventNameFunction>, eventModeFunction: ComputedRef<CalendarEventOverlapMode>, eventColorFunction: (e: CalendarEvent) => string | undefined, eventsRef: Ref<HTMLElement[], HTMLElement[]>, updateEventVisibility: () => void, getEventsMap: () => VDailyEventsMap, genDayEvent: ({ event }: CalendarEventVisual, day: CalendarDaySlotScope) => VNode, genTimedEvent: ({ event, left, width }: CalendarEventVisual, day: CalendarDayBodySlotScope) => VNode | false, genEvent: (event: CalendarEventParsed, scopeInput: VEventScopeInput, timedEvent: boolean, data: Record<string, unknown>) => VNode, genName: (eventSummary: () => string | VNode) => VNode, genPlaceholder: (day: CalendarTimestamp) => VNode, genMore: (day: CalendarDaySlotScope) => VNode, getVisibleEvents: () => CalendarEventParsed[], isEventForCategory: (event: CalendarEventParsed, category: CalendarCategory) => boolean, getEventsForDay: (day: CalendarDaySlotScope) => CalendarEventParsed[], getEventsForDayAll: (day: CalendarDaySlotScope) => CalendarEventParsed[], getEventsForDayTimed: (day: CalendarDaySlotScope) => CalendarEventParsed[], getScopedSlots: () => any, lastStart: Ref<{ date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: CalendarCategory } | null, CalendarTimestamp | { date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: CalendarCategory } | null>, lastEnd: Ref<{ date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: CalendarCategory } | null, CalendarTimestamp | { date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: CalendarCategory } | null>, parsedCategoryDays: ComputedRef<number>, renderProps: ComputedRef<VCalendarRenderProps>, eventWeekdays: ComputedRef<number[]>, categoryMode: ComputedRef<boolean>, title: ComputedRef<string>, monthLongFormatter: ComputedRef<CalendarFormatter>, monthShortFormatter: ComputedRef<CalendarFormatter>, parsedCategories: ComputedRef<CalendarCategory[]>, checkChange: () => void, move: (amount?: number) => void, next: (amount?: number) => void, prev: (amount?: number) => void, getCategoryList: (categories: CalendarCategory[]) => CalendarCategory[], _: ComponentInternalInstance }

export declare const VCalendar: VuetifyComponent<
  VCalendarProps,
  VCalendarDefaultKeys,
  Record<string, any>,
  new (
    props: {
      [key: `on${Capitalize<string>}:date`]: (...args: [Event, CalendarTimestamp]) => void
      [key: `on${Capitalize<string>}:dayCategory`]: (...args: [Event, CalendarDayCategorySlotScope]) => void
      [key: `on${Capitalize<string>}:day`]: (...args: [Event, CalendarDayBodySlotScope]) => void
      [key: `on${Capitalize<string>}:event`]: (...args: [Event, EventSlotScope]) => void
      [key: `on${Capitalize<string>}:interval`]: (...args: [Event, CalendarTimestamp]) => void
      [key: `on${Capitalize<string>}:more`]: (...args: [Event, CalendarDaySlotScope]) => void
      [key: `on${Capitalize<string>}:timeCategory`]: (...args: [Event, CalendarDayCategorySlotScope]) => void
      [key: `on${Capitalize<string>}:time`]: (...args: [Event, CalendarDayBodySlotScope]) => void
    },
    slots: {
      category: CalendarDayCategorySlotScope
      day: DaySlotScope
      'day-body': CalendarDayBodySlotScope
      'day-header': DayHeaderSlotScope
      'day-label': CalendarTimestamp
      'day-label-header': CalendarTimestamp
      'day-month': CalendarTimestamp
      event: EventSlotScope
      interval: CalendarDayCategorySlotScope
      'interval-header': never
    },
  ) => GenericProps<typeof props, typeof slots>,
  VCalendarExposed & { _allExposed: Omit<VCalendarExposed, '_'> | Record<'bodyHeight' | 'firstMinute' | 'getIntervalAtEvent' | 'getScrollPush' | 'getSlotScope' | 'getTimestampAtEvent' | 'init' | 'intervalFormatter' | 'intervalStyleDefault' | 'intervals' | 'isOutside' | 'minutesToPixels' | 'monthFormatter' | 'onResize' | 'pane' | 'parsedFirstInterval' | 'parsedFirstTime' | 'parsedIntervalCount' | 'parsedIntervalHeight' | 'parsedIntervalMinutes' | 'scrollAreaRef' | 'scrollPush' | 'scrollToTime' | 'showIntervalLabelDefault' | 'timeDelta' | 'timeToY' | 'todayWeek', unknown> }
>
export type VCalendar = InstanceType<typeof VCalendar>
