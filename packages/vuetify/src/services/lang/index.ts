// Extensions
import { Service } from '../service'

// Language
import en from '../../locale/en'

// Utilities
import { getObjectValueByPath, mergeDeep } from '../../util/helpers'
import { consoleError, consoleWarn } from '../../util/console'

// Types
import { VuetifyPreset } from 'vuetify/types/presets'
import {
  VuetifyLocale,
  Lang as ILang,
} from 'vuetify/types/services/lang'

const LANG_PREFIX = '$vuetify.'
const fallback = Symbol('Lang fallback')

function getTranslation (
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
      translation = getTranslation(en, key, true)
    }
  }

  return translation
}

export class Lang extends Service implements ILang {
  static property: 'lang' = 'lang'

  public current: ILang['current']

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
    this.locales = mergeDeep({ en }, locales)
    this.translator = t
  }

  public t (key: string, ...params: any[]) {
    if (!key.startsWith(LANG_PREFIX)) return this.replace(key, params)

    if (this.translator) return this.translator(key, ...params)

    const translation = getTranslation(this.locales[this.current], key)

    return this.replace(translation, params)
  }

  private replace (str: string, params: any[]) {
    return str.replace(/\{(\d+)\}/g, (match: string, index: string) => {
      /* istanbul ignore next */
      return String(params[+index])
    })
  }
}
