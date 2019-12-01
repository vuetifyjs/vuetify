import Vue, { Component, PluginFunction, VueConstructor, DirectiveOptions } from 'vue'
import './lib'
import './alacarte'
import './colors'

// Services
import { Application } from './services/application'
import { Breakpoint } from './services/breakpoint'
import { Icons } from './services/icons'
import { Lang } from './services/lang'
import { Theme } from './services/theme'

// Service Options
import { GoToOptions } from './services/goto'
import { VuetifyPreset } from './presets'

declare const Vuetify: Vuetify
export default Vuetify
export interface Vuetify {
  install: PluginFunction<VuetifyUseOptions>
  version: string
  framework: Framework
  new (preset?: Partial<VuetifyPreset>): Vuetify
}

export type ComponentOrPack = Component & {
  $_vuetify_subcomponents?: Record<string, ComponentOrPack>
}

export interface VuetifyUseOptions {
  transitions?: Record<string, VueConstructor>
  directives?: Record<string, DirectiveOptions>
  components?: Record<string, ComponentOrPack>
}

export interface Framework {
  readonly breakpoint: Breakpoint
  readonly goTo: <T extends string | number | HTMLElement | Vue>(target: T, options?: GoToOptions) => Promise<T>
  application: Application
  theme: Theme
  icons: Icons
  lang: Lang
  rtl: boolean
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
export type FilterTreeItemFunction = (item: object, search: string, textKey: string) => boolean

export type ItemKey = string | (string | number)[] | ((item: object, fallback?: any) => any)

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

export interface DataProps {
  originalItemsLength: number
  items: any[]
  pagination: DataPagination
  options: DataOptions
  updateOptions: (obj: any) => void
  sort: (value: string) => void
  group: (value: string) => void
  groupedItems: Record<string, any[]> | null
}

export type compareFn<T = any> = (a: T, b: T) => number

export type SortItemsFn<T extends any[] = any[]> = (
  items: T,
  sortBy: string[],
  sortDesc: boolean[],
  locale: string,
  customSorters?: Record<string, compareFn>
) => T;

export type DatePickerFormatter = (date: string) => string

export type AllowedDateFunction = (date: string) => boolean

export type DateEventColorValue = string | string[]

export type DateEvents = string[] | ((date: string) => boolean | DateEventColorValue) | Record<string, DateEventColorValue>

export type DateEventColors = DateEventColorValue | Record<string, DateEventColorValue> | ((date: string) => DateEventColorValue)

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

export type TouchValues = TouchHandlers & {
  parent?: boolean
  options?: AddEventListenerOptions
}

export type VuetifyRuleValidator = (value: any) => string | boolean

export type VuetifyMessage = string | string[]

export type VuetifyRuleValidations = (VuetifyRuleValidator | string)[]

export interface VTimestamp {
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

export interface VTimeObject {
  hour: number
  minute: number
}

export type VTime = number | string | VTimeObject

export type VTimestampFormatter = (timestamp: VTimestamp, short: boolean) => string

export type VTimestampFormatOptions = (timestamp: VTimestamp, short: boolean) => object

export type VTimestampOperation = (timestamp: VTimestamp) => VTimestamp

export interface VEventInput {
  [prop: string]: any
}

export type FilterFn = (value: any, search: string | null, item: any) => boolean

export interface TableHeader {
  text: string
  value: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  filterable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  filter?: (value: any, search: string | null, item: any) => boolean
  sort?: compareFn
}
