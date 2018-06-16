import en from '../../../locale/en'
import { getObjectValueByPath } from '../../../util/helpers'
import { VuetifyUseOptions as Options } from 'types'
import { VuetifyLanguage, VuetifyLocale } from 'types/lang'
import { consoleError, consoleWarn } from '../../../util/console'

const LANG_PREFIX = '$vuetify.'
const fallback = Symbol('Lang fallback')

function getTranslation (locale: VuetifyLocale, key: string, usingFallback = false): string {
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

export default function lang (config: Options['lang'] = {}): VuetifyLanguage {
  return {
    locales: Object.assign({ en }, config.locales),
    current: config.current || 'en',
    t (key, ...params) {
      if (!key.startsWith(LANG_PREFIX)) return key

      if (config.t) return config.t(key, ...params)

      const translation = getTranslation(this.locales[this.current], key)

      return translation.replace(/\{(\d+)\}/g, (match: string, index: string) => {
        return String(params[+index])
      })
    }
  }
}
