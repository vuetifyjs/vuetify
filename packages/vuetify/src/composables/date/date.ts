// Utilities
import { createDate as createV0Date } from '@vuetify/v0/composables'
import { V0DateAdapter } from '@vuetify/v0/date'
import { isUndefined } from '@vuetify/v0/utilities'
import { inject, watch } from 'vue'
import { isString } from '@/util'

// Adapters
import { VuetifyDateBridge } from './bridge'
import { LegacyDateAdapterCompat } from './compat'
import { withWeekFallback } from './adapters/week'

// Types
import type { DateAdapter as V0BaseAdapter } from '@vuetify/v0/composables'
import type { App, InjectionKey } from 'vue'
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
  formats?: Record<string, any>
  locale?: Record<string, any>
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
  ar: 'ar-DZ', // bare 'ar' would resolve to Argentina in weekInfo
  bg: 'bg-BG',
  ca: 'ca-ES',
  ckb: 'ckb-IQ',
  cs: 'cs-CZ',
  da: 'da-DK',
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
  km: 'km-KH',
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
  srCyrl: 'sr-Cyrl-RS',
  srLatn: 'sr-Latn-RS',
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
 * v0 adapters have `getCurrentLocaleCode`, `isNullish`, `parse` as own methods.
 * Old Vuetify-style adapters lack these methods.
 */
function isV0Adapter (adapter: any): adapter is V0BaseAdapter<any> {
  return (
    typeof adapter.getCurrentLocaleCode === 'function' &&
    typeof adapter.isNullish === 'function' &&
    typeof adapter.parse === 'function'
  )
}

// Map values can be adapter locale objects (e.g. date-fns `Locale`); v0 needs the code
function toLocaleCode (value: any, fallback: string): string {
  return isString(value) ? value : value?.code ?? fallback
}

export function createDate (options: DateOptions | undefined, locale: LocaleInstance) {
  const userAdapter = options?.adapter
  const userLocaleMap = options?.locale ?? {}

  // Merge Vuetify's comprehensive locale map with any user overrides
  const localeMap: Record<string, any> = { ...defaultLocaleMap, ...userLocaleMap }
  const localeCodes = Object.fromEntries(
    Object.entries(localeMap).map(([key, value]) => [key, toLocaleCode(value, key)])
  )

  function resolveLocale (value: string): string {
    return localeCodes[value] ?? value
  }

  // 1. Classify adapter and resolve to a v0-compatible DateAdapter
  let adapter: V0BaseAdapter<any>
  let legacy: any

  if (isUndefined(userAdapter)) {
    // No adapter provided — use v0's Temporal-based default
    adapter = new V0DateAdapter()
  } else if (isV0Adapter(userAdapter)) {
    // Already a v0 DateAdapter instance — use directly
    adapter = userAdapter
  } else if (typeof userAdapter === 'function' && isV0Adapter(userAdapter.prototype)) {
    // v0 adapter class (V0DateAdapter subclass, StringDateAdapter) — createV0Date sets the locale
    // eslint-disable-next-line new-cap
    adapter = new userAdapter()
  } else if (typeof userAdapter === 'function') {
    // Old Vuetify-style adapter class — instantiate then wrap
    // eslint-disable-next-line new-cap
    legacy = withWeekFallback(new userAdapter({
      locale: localeMap[locale.current.value] ?? locale.current.value,
      formats: options?.formats,
    }), localeCodes)
    adapter = new LegacyDateAdapterCompat(legacy)
  } else {
    // Old Vuetify-style adapter instance — wrap
    legacy = withWeekFallback(userAdapter, localeCodes)
    adapter = new LegacyDateAdapterCompat(legacy)
  }

  // 2. Create the v0 date context
  const context = createV0Date({
    adapter,
    locales: localeCodes,
    locale: resolveLocale(locale.current.value),
  })

  // 3. Watch Vuetify's locale for changes and sync to v0's adapter
  watch(locale.current, value => {
    const resolved = resolveLocale(value)
    if (context.adapter.locale !== resolved) {
      context.adapter.locale = resolved
    }
    // the compat setter only knows the code; legacy adapters get the original value back
    if (legacy) legacy.locale = localeMap[value] ?? value
  })

  // 4. Wrap in bridge for Vuetify's DateAdapter interface
  // legacy adapters receive `formats` in their constructor and resolve them themselves
  const instance = new VuetifyDateBridge(context.adapter, legacy ? {} : options?.formats)

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

export function daysDiff (adapter: DateInstance, start: unknown, stop?: unknown): number {
  const iso = [
    `${adapter.toISO(stop ?? start).split('T')[0]}T00:00:00Z`,
    `${adapter.toISO(start).split('T')[0]}T00:00:00Z`,
  ]
  return isString(adapter.date())
    ? adapter.getDiff(iso[0], iso[1], 'days') // for StringDateAdapter
    : adapter.getDiff(adapter.date(iso[0]), adapter.date(iso[1]), 'days')
}
