// Extensions
import { Service } from '../service'

// Language
import en from '../../locale/en'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'
import { consoleError, consoleWarn } from '../../util/console'

// Types
import {
  VuetifyLangOptions,
  VuetifyLocale,
} from 'vuetify/types/services/lang'

const fallback = Symbol('Lang fallback')

function getTranslation (
  locale: VuetifyLocale,
  key: string,
  usingFallback = false,
  fallbackLocale = {},
): string {
  let translation = getObjectValueByPath(locale, key, fallback) as string | typeof fallback

  if (translation === fallback) {
    if (usingFallback) {
      consoleError(`Translation key "${key}" not found in fallback`)
      translation = key
    } else {
      consoleWarn(`Translation key "${key}" not found, falling back to default`)
      translation = getTranslation(fallbackLocale, key, true)
    }
  }

  return translation
}

export class Lang extends Service {
  static property = 'lang'

  public locales: Record<string, VuetifyLocale> = {}

  public current: string

  private translator: ((key: string, ...params: any[]) => string) | undefined

  constructor (options: Partial<VuetifyLangOptions> = {}) {
    super()

    let locales = options.locales || { en: {} }

    this.current = options.current || 'en'
    this.translator = options.t

    // If nothing for en is provided
    // can assume default settings
    if (!locales.en) locales.en = en

    // Otherwise, merge the locale.$vuetify object
    // while maintaining any provided properties
    else {
      const { $vuetify = {}, ...params } = locales.en

      locales = {
        ...locales,
        en: {
          ...params,
          $vuetify: {
            ...en as VuetifyLocale,
            ...$vuetify as Record<string, VuetifyLocale>,
          },
        },
      }
    }

    this.locales = locales
  }

  public t (key: string, ...params: any[]) {
    if (this.translator) return this.translator(key, ...params)

    const translation = getTranslation(
      this.locales[this.current],
      key,
      false,
      this.locales.en,
    )

    return translation.replace(/\{(\d+)\}/g, (match: string, index: string) => {
      /* istanbul ignore next */
      return String(params[+index])
    })
  }
}
