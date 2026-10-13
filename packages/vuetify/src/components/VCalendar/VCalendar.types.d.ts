// Types
import type { ComputedRef, CSSProperties, Ref, RendererElement, RendererNode, ShallowRef, StyleValue, VNode } from 'vue'
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
import type { VTime } from '@/components/VCalendar/util/timestamp.types'
import type { VCalendarCategory } from '@/components/VCalendar/VCalendarCategory'
import type { VCalendarDaily } from '@/components/VCalendar/VCalendarDaily'
import type { VCalendarWeekly } from '@/components/VCalendar/VCalendarWeekly'
import type { ColorValue } from '@/composables/color.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { LocaleInstance, LocaleMessages, LocaleOptions } from '@/composables/locale.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { EventProp } from '@/util/helpers'
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
  end?: string | number | Date
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
  modelValue?: string | number | Date
  now?: string
  showIntervalLabel?: ((interval: CalendarTimestamp) => boolean)
  start?: string | number | Date
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

export declare const VCalendar: VuetifyComponent<
  VCalendarProps,
  VCalendarDefaultKeys,
  Record<string, any>,
  new (
    props: {
      [key: `on${Capitalize<string>}:date`]: EventProp<[Event, CalendarTimestamp]>
      [key: `on${Capitalize<string>}:dayCategory`]: EventProp<[Event, CalendarDayCategorySlotScope]>
      [key: `on${Capitalize<string>}:day`]: EventProp<[Event, CalendarDayBodySlotScope]>
      [key: `on${Capitalize<string>}:event`]: EventProp<[Event, EventSlotScope]>
      [key: `on${Capitalize<string>}:interval`]: EventProp<[Event, CalendarTimestamp]>
      [key: `on${Capitalize<string>}:more`]: EventProp<[Event, CalendarDaySlotScope]>
      [key: `on${Capitalize<string>}:timeCategory`]: EventProp<[Event, CalendarDayCategorySlotScope]>
      [key: `on${Capitalize<string>}:time`]: EventProp<[Event, CalendarDayBodySlotScope]>
    },
    slots: {
      'category': CalendarDayCategorySlotScope
      'day': DaySlotScope
      'day-body': CalendarDayBodySlotScope
      'day-header': DayHeaderSlotScope
      'day-label': CalendarTimestamp
      'day-label-header': CalendarTimestamp
      'day-month': CalendarTimestamp
      'event': EventSlotScope
      'interval': CalendarDayCategorySlotScope
      'interval-header': never
    },
  ) => GenericProps<typeof props, typeof slots>,
  ForwardRefs<{ lastStart: Ref<{ date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: string | { [x: string]: any, name?: string | undefined, categoryName?: string | undefined } | undefined } | null, CalendarTimestamp | { date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: string | { [x: string]: any, name?: string | undefined, categoryName?: string | undefined } | undefined } | null>, lastEnd: Ref<{ date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: string | { [x: string]: any, name?: string | undefined, categoryName?: string | undefined } | undefined } | null, CalendarTimestamp | { date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: string | { [x: string]: any, name?: string | undefined, categoryName?: string | undefined } | undefined } | null>, parsedCategoryDays: ComputedRef<number>, renderProps: ComputedRef<VCalendarRenderProps>, eventWeekdays: ComputedRef<number[]>, categoryMode: ComputedRef<boolean>, title: ComputedRef<string>, monthLongFormatter: ComputedRef<CalendarFormatter>, monthShortFormatter: ComputedRef<CalendarFormatter>, parsedCategories: ComputedRef<CalendarCategory[]>, checkChange: () => void, move: (amount?: number) => void, next: (amount?: number) => void, prev: (amount?: number) => void, getCategoryList: (categories: CalendarCategory[]) => CalendarCategory[], noEvents: ComputedRef<boolean>, parsedEvents: ComputedRef<CalendarEventParsed[]>, parsedEventOverlapThreshold: ComputedRef<number>, eventTimedFunction: ComputedRef<CalendarEventTimedFunction>, eventCategoryFunction: ComputedRef<CalendarEventCategoryFunction>, eventTextColorFunction: ComputedRef<CalendarEventColorFunction>, eventNameFunction: ComputedRef<CalendarEventNameFunction>, eventModeFunction: ComputedRef<CalendarEventOverlapMode>, eventColorFunction: (e: CalendarEvent) => string | undefined, eventsRef: Ref<HTMLElement[], HTMLElement[]>, updateEventVisibility: () => void, getEventsMap: () => VDailyEventsMap, genDayEvent: ({ event }: CalendarEventVisual, day: CalendarDaySlotScope) => VNode<RendererNode, RendererElement, { [key: string]: any }>, genTimedEvent: ({ event, left, width }: CalendarEventVisual, day: CalendarDayBodySlotScope) => false | VNode<RendererNode, RendererElement, { [key: string]: any }>, genEvent: (event: CalendarEventParsed, scopeInput: VEventScopeInput, timedEvent: boolean, data: Record<string, unknown>) => VNode<RendererNode, RendererElement, { [key: string]: any }>, genName: (eventSummary: () => string | VNode<RendererNode, RendererElement, { [key: string]: any }>) => VNode<RendererNode, RendererElement, { [key: string]: any }>, genPlaceholder: (day: CalendarTimestamp) => VNode<RendererNode, RendererElement, { [key: string]: any }>, genMore: (day: CalendarDaySlotScope) => VNode<RendererNode, RendererElement, { [key: string]: any }>, getVisibleEvents: () => CalendarEventParsed[], isEventForCategory: (event: CalendarEventParsed, category: CalendarCategory) => boolean, getEventsForDay: (day: CalendarDaySlotScope) => CalendarEventParsed[], getEventsForDayAll: (day: CalendarDaySlotScope) => CalendarEventParsed[], getEventsForDayTimed: (day: CalendarDaySlotScope) => CalendarEventParsed[], getScopedSlots: () => any, times: { now: { date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: string | { [x: string]: any, name?: string | undefined, categoryName?: string | undefined } | undefined }, today: { date: string, time: string, year: number, month: number, day: number, weekday: number, hour: number, minute: number, hasDay: boolean, hasTime: boolean, past: boolean, present: boolean, future: boolean, category?: string | { [x: string]: any, name?: string | undefined, categoryName?: string | undefined } | undefined } }, locale: { isRtl: Readonly<Ref<boolean, boolean>>, rtl: Ref<Record<string, boolean>, Record<string, boolean>>, rtlClasses: Ref<string, string>, name: string, decimalSeparator: ShallowRef<string>, numericGroupSeparator: ShallowRef<string>, messages: Ref<LocaleMessages, LocaleMessages>, current: Ref<string, string>, fallback: Ref<string, string>, t: (key: string, ...params: unknown[]) => string, n: (value: number) => string, provide: (props: LocaleOptions) => LocaleInstance }, parsedValue: ComputedRef<CalendarTimestamp>, parsedWeekdays: ComputedRef<number[]>, effectiveWeekdays: ComputedRef<number[]>, weekdaySkips: ComputedRef<number[]>, parsedStart: ComputedRef<CalendarTimestamp>, parsedEnd: ComputedRef<CalendarTimestamp>, days: ComputedRef<CalendarTimestamp[]>, dayFormatter: ComputedRef<CalendarFormatter>, weekdayFormatter: ComputedRef<CalendarFormatter>, getColorProps: (colors: { background?: ColorValue, text?: ColorValue }) => { class: string[], style: CSSProperties }, getRelativeClasses: (timestamp: CalendarTimestamp, outside?: boolean) => { 'v-present': boolean, 'v-past': boolean, 'v-future': boolean, 'v-outside': boolean }, getWeekNumber: (timestamp: CalendarTimestamp) => number, getStartOfWeek: (timestamp: CalendarTimestamp) => CalendarTimestamp, getEndOfWeek: (timestamp: CalendarTimestamp) => CalendarTimestamp, getFormatter: (options: Intl.DateTimeFormatOptions) => CalendarFormatter, updateTimes: () => void }, [VCalendarWeekly | VCalendarDaily | VCalendarCategory]>
>
export type VCalendar = InstanceType<typeof VCalendar>
