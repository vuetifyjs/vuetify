// Utilities
import { inject, watch } from 'vue'
import { isUndefined } from '@vuetify/v0/utilities'
import { createDate as createV0Date } from '@vuetify/v0/composables'
import { Vuetify0DateAdapter } from '@vuetify/v0/date'

// Adapters
import { VuetifyDateBridge } from './bridge'
import { LegacyDateAdapterCompat } from './compat'

// Types
import type { App, InjectionKey } from 'vue'
import type { DateAdapter as V0DateAdapter } from '@vuetify/v0/composables'
import type { DateAdapter } from './bridge'
import type { LocaleInstance } from '@/composables/locale'

export interface DateInstance extends DateModule.InternalAdapter {
  locale?: any
}

/** Supports module augmentation to specify date adapter types */
export namespace DateModule {
  interface Adapter {}

  export type InternalAdapter = {} extends Adapter ? DateAdapter : Adapter
}

export interface DateOptions {
  adapter?: any
  formats?: Record<string, string>
  locale?: Record<string, string>
}

export const DateSymbol: InjectionKey<VuetifyDateBridge<any>> = Symbol.for('vuetify:date-instance')
/** @deprecated Use DateSymbol and useDate() instead */
export const DateAdapterSymbol: InjectionKey<VuetifyDateBridge<any>> = DateSymbol as any
/** @deprecated Use DateSymbol and useDate() instead */
export const DateOptionsSymbol: InjectionKey<any> = Symbol.for('vuetify:date-options')

/**
 * Default short locale codes mapped to full Intl locale strings.
 * Vuetify's comprehensive map (~35 entries), merged with any user-provided map.
 */
const defaultLocaleMap: Record<string, string> = {
  af: 'af-ZA',
  // ar: '', # not the same value for all variants
  bg: 'bg-BG',
  ca: 'ca-ES',
  ckb: '',
  cs: 'cs-CZ',
  de: 'de-DE',
  el: 'el-GR',
  en: 'en-US',
  // es: '', # not the same value for all variants
  et: 'et-EE',
  fa: 'fa-IR',
  fi: 'fi-FI',
  // fr: '', #not the same value for all variants
  hr: 'hr-HR',
  hu: 'hu-HU',
  he: 'he-IL',
  id: 'id-ID',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  lv: 'lv-LV',
  lt: 'lt-LT',
  nl: 'nl-NL',
  no: 'no-NO',
  pl: 'pl-PL',
  pt: 'pt-PT',
  ro: 'ro-RO',
  ru: 'ru-RU',
  sk: 'sk-SK',
  sl: 'sl-SI',
  srCyrl: 'sr-SP',
  srLatn: 'sr-SP',
  sv: 'sv-SE',
  th: 'th-TH',
  tr: 'tr-TR',
  az: 'az-AZ',
  uk: 'uk-UA',
  vi: 'vi-VN',
  zhHans: 'zh-CN',
  zhHant: 'zh-TW',
}

/**
 * Detect whether an adapter is a v0 DateAdapter.
 *
 * v0 adapters have `getCurrentLocaleCode`, `isNull`, `parse` as own methods.
 * Old Vuetify-style adapters lack these methods.
 */
function isV0Adapter (adapter: any): adapter is V0DateAdapter<any> {
  return (
    typeof adapter.getCurrentLocaleCode === 'function' &&
    typeof adapter.isNull === 'function' &&
    typeof adapter.parse === 'function'
  )
}

function resolveLocale (locale: LocaleInstance, localeMap: Record<string, string>): string {
  const current = locale.current.value
  return localeMap[current] ?? current
}

export function createDate (options: DateOptions | undefined, locale: LocaleInstance) {
  const userAdapter = options?.adapter
  const userLocaleMap = options?.locale ?? {}

  // Merge Vuetify's comprehensive locale map with any user overrides
  const localeMap: Record<string, string> = { ...defaultLocaleMap, ...userLocaleMap }

  // 1. Classify adapter and resolve to a v0-compatible DateAdapter
  let adapter: V0DateAdapter<any>

  if (isUndefined(userAdapter)) {
    // No adapter provided — use v0's Temporal-based default
    adapter = new Vuetify0DateAdapter()
  } else if (isV0Adapter(userAdapter)) {
    // Already a v0 DateAdapter instance — use directly
    adapter = userAdapter
  } else if (typeof userAdapter === 'function') {
    // Old Vuetify-style adapter class — instantiate then wrap
    // eslint-disable-next-line new-cap
    const legacy = new userAdapter({
      locale: resolveLocale(locale, localeMap),
      formats: options?.formats,
    })
    adapter = new LegacyDateAdapterCompat(legacy)
  } else {
    // Old Vuetify-style adapter instance — wrap
    adapter = new LegacyDateAdapterCompat(userAdapter)
  }

  // 2. Create the v0 date context
  const context = createV0Date({
    adapter,
    locales: localeMap,
    locale: resolveLocale(locale, localeMap),
  })

  // 3. Watch Vuetify's locale for changes and sync to v0's adapter
  watch(locale.current, value => {
    const resolved = localeMap[value] ?? value
    if (context.adapter.locale !== resolved) {
      context.adapter.locale = resolved
    }
  })

  // 4. Wrap in bridge for Vuetify's DateAdapter interface
  const instance = new VuetifyDateBridge(context.adapter)

  // 5. Return shape expected by framework.ts
  return {
    instance,
    install (app: App) {
      app.provide(DateSymbol, instance)
      // Backwards compat — provide under the old symbol too
      app.provide(DateOptionsSymbol, options)
    },
  }
}

export function useDate (): VuetifyDateBridge<any> {
  const bridge = inject(DateSymbol)

  if (!bridge) {
    throw new Error('[Vuetify] Could not find injected date instance. Is Vuetify installed?')
  }

  return bridge
}

// ============================================
// Preserved utilities
// ============================================

export function createDateRange (adapter: DateInstance, start: unknown, stop?: unknown) {
  const diff = daysDiff(adapter, start, stop)
  const datesInRange = [start]

  for (let i = 1; i < diff; i++) {
    const nextDate = adapter.addDays(start, i)
    datesInRange.push(nextDate)
  }

  if (stop) {
    datesInRange.push(adapter.endOfDay(stop))
  }

  return datesInRange
}

export function daysDiff (adapter: DateInstance, start: unknown, stop?: unknown): number {
  const iso = [
    `${adapter.toISO(stop ?? start).split('T')[0]}T00:00:00Z`,
    `${adapter.toISO(start).split('T')[0]}T00:00:00Z`,
  ]
  return typeof adapter.date() === 'string'
    ? adapter.getDiff(iso[0], iso[1], 'days') // for StringDateAdapter
    : adapter.getDiff(adapter.date(iso[0]), adapter.date(iso[1]), 'days')
}
