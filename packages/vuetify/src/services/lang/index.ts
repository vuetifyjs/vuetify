// Extensions
import { Service } from '../service'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'
import { consoleError, consoleWarn } from '../../util/console'

// Types
import { VuetifyPreset } from 'vuetify/types/services/presets'
import {
  VuetifyLocale,
  Lang as ILang,
} from 'vuetify/types/services/lang'

const LANG_PREFIX = '$vuetify.'
const fallback = Symbol('Lang fallback')

function getTranslation (
  locale: VuetifyLocale,
  key: string,
  usingDefault = false,
  defaultLocale: VuetifyLocale
): string {
  const shortKey = key.replace(LANG_PREFIX, '')
  let translation = getObjectValueByPath(locale, shortKey, fallback) as string | typeof fallback

  if (translation === fallback) {
    if (usingDefault) {
      consoleError(`Translation key "${shortKey}" not found in fallback`)
      translation = key
    } else {
      consoleWarn(`Translation key "${shortKey}" not found, falling back to default`)
      translation = getTranslation(defaultLocale, key, true, defaultLocale)
    }
  }

  return translation
}

export class Lang extends Service implements ILang {
  static property: 'lang' = 'lang'

  public current: ILang['current']

  public defaultLocale = 'en'

  public locales: ILang['locales']

  private translator: ILang['t']

  constructor (preset: VuetifyPreset) {
    super()

    const {
      current,
      locales,
      t,
    } = preset[Lang.property]

    this.current = current
    this.locales = locales
    this.translator = t || this.defaultTranslator
  }

  public currentLocale (key: string) {
    const translation = this.locales[this.current]
    const defaultLocale = this.locales[this.defaultLocale]

    return getTranslation(translation, key, false, defaultLocale)
  }

  public t (key: string, ...params: any[]) {
    if (!key.startsWith(LANG_PREFIX)) return this.replace(key, params)

    return this.translator(key, ...params)
  }

  private defaultTranslator (key: string, ...params: any[]) {
    return this.replace(this.currentLocale(key), params)
  }

  private replace (str: string, params: any[]) {
    return str.replace(/\{(\d+)\}/g, (match: string, index: string) => {
      /* istanbul ignore next */
      return String(params[+index])
    })
  }
}
