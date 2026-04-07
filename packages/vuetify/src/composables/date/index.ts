export {
  createDate,
  useDate,
  createDateRange,
  daysDiff,
  DateSymbol,
  DateAdapterSymbol, // deprecated compat
  DateOptionsSymbol, // deprecated compat
} from './date'
export type { DateOptions, DateInstance, DateModule } from './date'
export { VuetifyDateBridge } from './bridge'
export { LegacyDateAdapterCompat } from './compat'
export { StringDateAdapter } from './adapters/string'

// Re-export Vuetify's public DateAdapter interface (param-based firstDayOfWeek)
export type { DateAdapter } from './bridge'

// Re-export v0's DateAdapter type for consumers migrating to the new interface
export type { DateAdapter as V0DateAdapter } from '@vuetify/v0/composables'
