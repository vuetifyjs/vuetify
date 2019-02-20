// Extensions
import { Service } from '../service'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'
import { consoleError, consoleWarn } from '../../util/console'

// Types
import {
  VuetifyLangOptions,
  VuetifyLocale
} from 'vuetify/types/services/lang'

const LANG_PREFIX = '$vuetify.'
const fallback = Symbol('Lang fallback')

export class Lang extends Service {
  static property = 'lang'

  public current: string
  public fallback: VuetifyLocale
  public locales: Record<string, VuetifyLocale>
  private translator: ((key: string, ...params: any[]) => string) | undefined

  constructor (
    options: Partial<VuetifyLangOptions> = {},
    defaultOptions: VuetifyLangOptions
  ) {
    super()
    this.current = options.current || defaultOptions.current
    this.locales = {
      ...defaultOptions.locales,
      ...options.locales
    }
    this.fallback = defaultOptions.locales[defaultOptions.current]
    this.translator = options.t
  }

  public t (key: string, ...params: any[]) {
    if (!key.startsWith(LANG_PREFIX)) return key

    if (this.translator) return this.translator(key, ...params)

    const translation = this.getTranslation(this.locales[this.current], key)

    return translation.replace(/\{(\d+)\}/g, (match: string, index: string) => {
      return String(params[+index])
    })
  }

  private getTranslation (
    locale: VuetifyLocale,
    key: string,
    usingFallback = false
  ): string {
    const shortKey = key.replace(LANG_PREFIX, '')
    let translation = getObjectValueByPath(locale, shortKey, fallback) as string | typeof fallback

    if (translation === fallback) {
      if (usingFallback) {
        consoleError(`Translation key "${shortKey}" not found in fallback`)
        translation = key
      } else {
        consoleWarn(`Translation key "${shortKey}" not found, falling back to default`)
        translation = this.getTranslation(this.fallback, key, true)
      }
    }

    return translation
  }
}
