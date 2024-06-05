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
import { getDateTimeFormatOptions, VuetifyDateAdapter } from './adapters/vuetify'

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

// https://stackoverflow.com/questions/274861/how-do-i-calculate-the-week-number-given-a-date/275024#275024
export function getWeek (adapter: DateAdapter<any>, value: any) {
  const date = adapter.toJsDate(value)
  let year = date.getFullYear()
  let d1w1 = new Date(year, 0, 1)

  if (date < d1w1) {
    year = year - 1
    d1w1 = new Date(year, 0, 1)
  } else {
    const tv = new Date(year + 1, 0, 1)
    if (date >= tv) {
      year = year + 1
      d1w1 = tv
    }
  }

  const diffTime = Math.abs(date.getTime() - d1w1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.floor(diffDays / 7) + 1
}

/**
 * This is an arbitrary date used parse a formatted date needed for parsing an user provided date into Date objects.
 * Each date part (year, month and day) should be of max length for each part. For example, max value for month
 * is a two digit number, so the arbitrary date must have two digit number for month. Similarly for other parts.
 */
const arbitraryDate = new Date(2000, 10, 10)

/**
 * Try to parse the provided value into a Date object in a locale aware way.
 * @param adapter date instance adapter value
 * @param value value that should be parsed into a Date object
 * @param formatString string format in which the value should be given (currently only `keyboardDate` is supported)
 * @returns null if parsing is not possible for current locale and provided formatString, otherwise the parsed Date
*/
export function dateFromLocalizedValue (adapter: DateInstance, value: any, formatString: string): Date | null {
  if (value == null) return null
  if (value instanceof Date) return value

  if (typeof value !== 'string') return null

  value = value.trim()
  if (value === '') return null

  const options = getDateTimeFormatOptions(formatString)
  if (options == null) return null

  // NOTE: currently only simple date parsing is supported
  // Implement other formats when required
  if (formatString !== 'keyboardDate') return null

  let regexString = ''
  let nextGroupIndex = 0
  let yearGroupIndex = -1
  let monthGroupIndex = -1
  let dayGroupIndex = -1
  let anyNotSupportedPart = false

  new Intl.DateTimeFormat(adapter.locale, options)
    .formatToParts(arbitraryDate)
    .forEach(part => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#date-time_component_options
      // Currently only "literal | year | month | day" types are parsed, as they are required for keyboardDate formatString
      // Extend this if other formats are required
      if (part.type === 'literal') {
        regexString += part.value
        return
      }

      if (part.type === 'year') {
        if (options.year !== '2-digit' && options.year !== 'numeric') return

        // make a group that catches any number of length 1 to max length of the year part
        regexString += `(\\d{1,${part.value.length}})`
        yearGroupIndex = nextGroupIndex
        nextGroupIndex++
        return
      }

      if (part.type === 'month') {
        if (options.month !== '2-digit' && options.month !== 'numeric') return

        // make a group that catches any number of length 1 to max length of the month part
        regexString += `(\\d{1,${part.value.length}})`

        monthGroupIndex = nextGroupIndex
        nextGroupIndex++
        return
      }

      if (part.type === 'day') {
        if (options.day !== '2-digit' && options.day !== 'numeric') return

        // make a group that catches any number of length 1 to max length of the day part
        regexString += `(\\d{1,${part.value.length}})`

        dayGroupIndex = nextGroupIndex
        nextGroupIndex++
        return
      }

      anyNotSupportedPart = true
    })

  if (anyNotSupportedPart) return null
  if (yearGroupIndex === -1 || monthGroupIndex === -1 || dayGroupIndex === -1) return null

  // Try to match the provided value into the generated regex string
  const matchResult = value.match(new RegExp(regexString))

  // If at least one group not matched, then matchResult will be null
  if (matchResult == null) return null

  // '+ 1', because first element in matchResult is the matched text, and later are the groups
  const parsedYear = Number(matchResult[yearGroupIndex + 1])
  const parsedMonth = Number(matchResult[monthGroupIndex + 1])
  const parsedDay = Number(matchResult[dayGroupIndex + 1])

  let finalDate = adapter.date() as Date
  finalDate = adapter.setYear(finalDate, parsedYear) as Date

  // month are indexed from 0 so '- 1` is required
  finalDate = adapter.setMonth(finalDate, parsedMonth - 1) as Date

  finalDate = adapter.setDate(finalDate, parsedDay) as Date

  return adapter.isValid(finalDate) ? finalDate : null
}
