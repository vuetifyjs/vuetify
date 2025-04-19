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

export function stringInputFormatter (dateString: string, format: string) {
  function countConsecutiveChars (str: string, startIndex: number): number {
    const char = str[startIndex]
    let count = 0
    while (str[startIndex + count] === char) count++
    return count
  }

  function parseDateParts (dateString: string, format: string) {
    const dateParts: Record<string, number> = {}
    let stringIndex = 0
    const upperFormat = format.toUpperCase()

    for (let formatIndex = 0; formatIndex < upperFormat.length;) {
      const formatChar = upperFormat[formatIndex]
      const charCount = countConsecutiveChars(upperFormat, formatIndex)
      const dateValue = dateString.slice(stringIndex, stringIndex + charCount)

      if (['Y', 'M', 'D'].includes(formatChar)) {
        const numValue = parseInt(dateValue)
        if (isNaN(numValue)) return null
        dateParts[formatChar] = numValue
      }

      formatIndex += charCount
      stringIndex += charCount
    }

    return dateParts
  }

  function validateDateParts (dateParts: Record<string, number>) {
    const { Y: year, M: month, D: day } = dateParts
    if (!year || !month || !day) return null
    if (month < 1 || month > 12) return null
    if (day < 1 || day > 31) return null
    return { year, month, day }
  }

  function validateDate (date: Date, year: number, month: number, day: number) {
    return date.getFullYear() === year &&
           date.getMonth() === month - 1 &&
           date.getDate() === day
  }

  const dateParts = parseDateParts(dateString, format)
  if (!dateParts) return null

  const validatedParts = validateDateParts(dateParts)
  if (!validatedParts) return null

  const { year, month, day } = validatedParts
  const date = new Date(year, month - 1, day)

  return validateDate(date, year, month, day) ? { year, month, day } : null
}
