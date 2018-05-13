import en from '../../../locale/en'
import { getObjectValueByPath } from '../../../util/helpers'
import { VuetifyUseOptions as Options } from 'types'
import { VuetifyLanguage } from 'types/lang'

const LANG_PREFIX = '$vuetify.lang.'

export default function lang (config: Options['lang'] = {}): VuetifyLanguage {
  return {
    locales: Object.assign({ en }, config.locales),
    current: config.current || 'en',
    t (key, ...params) {
      const translation: string = getObjectValueByPath(this.locales[this.current], key.replace(LANG_PREFIX, ''), key)
      return translation.replace(/\{(\d+)\}/g, (match: string, index: string) => {
        return String(params[+index])
      })
    }
  }
}
