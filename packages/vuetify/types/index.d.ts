import Vue, { Component, PluginFunction, VueConstructor, DirectiveOptions } from 'vue'
import './lib'
import './alacarte'
import './colors'

// Types
import { Application } from './services/application'
import { GoToOptions } from './services/goto'
import {
  Breakpoint,
  BreakpointOptions,
} from 'vuetify/types/services/breakpoint'
import {
  Icons,
  IconsOptions,
} from 'vuetify/types/services/icons'
import {
  Lang,
  LangOptions,
} from 'vuetify/types/services/lang'
import {
  Theme,
  ThemeOptions,
} from 'vuetify/types/services/theme'

declare const Vuetify: Vuetify
export default Vuetify
export interface Vuetify {
  framework: Framework
  install: PluginFunction<GlobalVuetifyPreset>
  version: string
  new (preset?: Partial<UserVuetifyPreset>): Vuetify
}

export type ComponentOrPack = Component & {
  // eslint-disable-next-line camelcase
  $_vuetify_subcomponents?: Record<string, ComponentOrPack>
}

export interface Framework {
  readonly breakpoint: Breakpoint
  readonly goTo: <T extends string | number | HTMLElement | Vue>(target: T, options?: GoToOptions) => Promise<T>
  application: Application
  theme: Theme
  icons: Icons
  lang: Lang
  presets: Presets
  rtl: boolean
}

export interface VuetifyPreset {
  breakpoint: {
    scrollBarWidth: Breakpoint['scrollBarWidth']
    thresholds: Breakpoint['thresholds']
  }
  icons: {
    iconfont: Icons['iconfont']
    // TODO: Remove partial for v3
    values: Partial<Icons['values']>
  }
  lang: {
    current: Lang['current']
    locales: Lang['locales']
    t: Lang['t']
  }
  theme: {
    dark: Theme['dark']
    default: Theme['default']
    disable: Theme['disable']
    options: Theme['options']
    themes: Theme['themes']
  }

  [name: string]: any
}

export interface UserVuetifyPreset extends GlobalVuetifyPreset {
  preset?: GlobalVuetifyPreset

  [name: string]: any
}

export interface GlobalVuetifyPreset {
  breakpoint?: BreakpointOptions
  components?: Dictionary<ComponentOrPack>
  directives?: Dictionary<DirectiveOptions>
  icons?: IconsOptions
  lang?: LangOptions
  theme?: ThemeOptions
  transitions?: Dictionary<VueConstructor>

  [name: string]: any
}

export interface Presets {
  preset: UserVuetifyPreset
}

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: Framework
  }
}

declare module 'vue/types/options' {
  export interface ComponentOptions<
    V extends Vue,
    Data=DefaultData<V>,
    Methods=DefaultMethods<V>,
    Computed=DefaultComputed,
    PropsDef=PropsDefinition<DefaultProps>,
    Props=DefaultProps> {
    vuetify?: Vuetify
  }
}

// Public types
export type TreeviewItemFunction = (item: object, search: string, textKey: string) => boolean

export type SelectItemKey = string | (string | number)[] | ((item: object, fallback?: any) => any)

export interface DataOptions {
  page: number
  itemsPerPage: number
  sortBy: string[]
  sortDesc: boolean[]
  groupBy: string[]
  groupDesc: boolean[]
  multiSort: boolean
  mustSort: boolean
}

export interface DataPagination {
  page: number
  itemsPerPage: number
  pageStart: number
  pageStop: number
  pageCount: number
  itemsLength: number
}

export interface DataScopeProps {
  originalItemsLength: number
  items: any[]
  pagination: DataPagination
  options: DataOptions
  updateOptions: (obj: any) => void
  sort: (value: string) => void
  group: (value: string) => void
  groupedItems: Record<string, any[]> | null
}

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number

export type DataSortFunction<T extends any = any> = (
  items: T[],
  sortBy: string[],
  sortDesc: boolean[],
  locale: string,
  customSorters?: Record<string, DataTableCompareFunction<T>>
) => T[];

export type DataGroupFunction<T extends any = any> = (
  items: T[],
  sortBy: string[],
  sortDesc: boolean[],
  locale?: string,
  customSorters?: Record<string, DataTableCompareFunction<T>>
) => Record<string, T[]>

export type DataSearchFunction<T extends any = any> = (items: T[], search: string) => T[]

export type DatePickerFormatter = (date: string) => string

export type DatePickerAllowedDatesFunction = (date: string) => boolean

export type DatePickerEventColorValue = string | string[]

export type DatePickerEvents = string[] | ((date: string) => boolean | DatePickerEventColorValue) | Record<string, DatePickerEventColorValue>

export type DatePickerEventColors = DatePickerEventColorValue | Record<string, DatePickerEventColorValue> | ((date: string) => DatePickerEventColorValue)

export type DatePickerType = 'date' | 'month'

export type DatePickerMultipleFormatter = (date: string[]) => string

export interface TouchHandlers {
  start?: (wrapperEvent: TouchEvent & TouchWrapper) => void
  end?: (wrapperEvent: TouchEvent & TouchWrapper) => void
  move?: (wrapperEvent: TouchEvent & TouchWrapper) => void
  left?: (wrapper: TouchWrapper) => void
  right?: (wrapper: TouchWrapper) => void
  up?: (wrapper: TouchWrapper) => void
  down?: (wrapper: TouchWrapper) => void
}

export interface TouchWrapper extends TouchHandlers {
  touchstartX: number
  touchstartY: number
  touchmoveX: number
  touchmoveY: number
  touchendX: number
  touchendY: number
  offsetX: number
  offsetY: number
}

export type TouchValue = TouchHandlers & {
  parent?: boolean
  options?: AddEventListenerOptions
}

export type InputValidationRule = (value: any) => string | boolean

export type InputMessage = string | string[]

export type InputValidationRules = (InputValidationRule | string)[]

export interface CalendarTimestamp {
  date: string
  time: string
  year: number
  month: number
  day: number
  weekday: number
  hour: number
  minute: number
  hasDay: boolean
  hasTime: boolean
  past: boolean
  present: boolean
  future: boolean
}

export type CalendarFormatter = (timestamp: CalendarTimestamp, short: boolean) => string

export interface CalendarEvent {
  [prop: string]: any
}

export interface CalendarEventParsed {
  input: CalendarEvent
  start: CalendarTimestamp
  startIdentifier: number
  startTimestampIdentifier: number
  end: CalendarTimestamp
  endIdentifier: number
  endTimestampIdentifier: number
  allDay: boolean
  index: number
}

export interface CalendarEventVisual {
  event: CalendarEventParsed
  columnCount: number
  column: number
  left: number
  width: number
}

export interface CalendarDaySlotScope extends CalendarTimestamp {
  outside: boolean
  index: number
  week: CalendarTimestamp[]
}

export type CalendarTimeToY = (time: CalendarTimestamp | number | string) => number

export interface CalendarDayBodySlotScope extends CalendarDaySlotScope {
  timeToY: CalendarTimeToY
}

export type CalendarEventOverlapMode = (events: CalendarEventParsed[], firstWeekday: number, overlapThreshold: number) => (day: CalendarDaySlotScope, dayEvents: CalendarEventParsed[], timed: boolean) => CalendarEventVisual[]

export type CalendarEventColorFunction = (event: CalendarEvent) => string

export type CalendarEventNameFunction = (event: CalendarEventParsed, timedEvent: boolean) => string

export type DataTableFilterFunction = (value: any, search: string | null, item: any) => boolean

export interface DataTableHeader<T extends any = any> {
  text: string
  value: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  filterable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  filter?: (value: any, search: string | null, item: any) => boolean
  sort?: DataTableCompareFunction<T>
}

export type DataItemsPerPageOption = (number | {
  text: string
  value: number
});
