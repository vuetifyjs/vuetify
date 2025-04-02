// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { inject, reactive, watch } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { InjectionKey } from 'vue'
import type { DateAdapter } from './DateAdapter'
import type { LocaleInstance } from '@/composables/locale'

// Adapters
import { VuetifyDateAdapter } from './adapters/vuetify'

export interface DateInstance extends DateModule.InternalAdapter {
  locale?: any
}

/** Supports module augmentation to specify date adapter types */
export namespace DateModule {
  interface Adapter {}

  export type InternalAdapter = {} extends Adapter ? DateAdapter : Adapter
}

export type InternalDateOptions = {
  adapter: (new (options: { locale: any, formats?: any }) => DateInstance) | DateInstance
  formats?: Record<string, any>
  locale: Record<string, any>
}

export type DateOptions = Partial<InternalDateOptions>

export const DateOptionsSymbol: InjectionKey<InternalDateOptions> = Symbol.for('vuetify:date-options')
export const DateAdapterSymbol: InjectionKey<DateInstance> = Symbol.for('vuetify:date-adapter')

export function createDate (options: DateOptions | undefined, locale: LocaleInstance) {
  const _options = mergeDeep({
    adapter: VuetifyDateAdapter,
    locale: {
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
    },
  }, options) as InternalDateOptions

  return {
    options: _options,
    instance: createInstance(_options, locale),
  }
}

function createInstance (options: InternalDateOptions, locale: LocaleInstance) {
  const instance = reactive(
    typeof options.adapter === 'function'
      // eslint-disable-next-line new-cap
      ? new options.adapter({
        locale: options.locale[locale.current.value] ?? locale.current.value,
        formats: options.formats,
      })
      : options.adapter
  )

  watch(locale.current, value => {
    instance.locale = options.locale[value] ?? value ?? instance.locale
  })

  return instance
}

export function useDate (): DateInstance {
  const options = inject(DateOptionsSymbol)

  if (!options) throw new Error('[Vuetify] Could not find injected date options')

  const locale = useLocale()

  return createInstance(options, locale)
}

function firstWeekSize (adapter: DateAdapter<any>, year: number, startOfWeek = 0) {
  const yearStart = adapter.startOfYear(adapter.date(`${year}-01-01`))
  return {
    yearStart,
    size: 7 - adapter.getDiff(yearStart, adapter.startOfWeek(yearStart, startOfWeek), 'days')
  }
}

type WeekCalculationOptions = { startOfWeek?: number, firstWeekMinSize?: number }
export function getWeek (adapter: DateAdapter<any>, value: any, { startOfWeek = 0, firstWeekMinSize = 4 }: WeekCalculationOptions = {}) {
  let year = adapter.getYear(value)
  const currentWeekEnd = adapter.addDays(adapter.startOfWeek(value, startOfWeek), 6)
  if (year < adapter.getYear(currentWeekEnd)) {
    const { size } = firstWeekSize(adapter, year + 1, startOfWeek)
    if (size >= firstWeekMinSize) {
      year++
    }
  }

  const { yearStart, size } = firstWeekSize(adapter, year, startOfWeek)
  const d1w1 = size >= firstWeekMinSize
    ? adapter.addDays(yearStart, size - 7)
    : adapter.addDays(yearStart, size)

  return 1 + adapter.getDiff(value, d1w1, 'weeks')
}
