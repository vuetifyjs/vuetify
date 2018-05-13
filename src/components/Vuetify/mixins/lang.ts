import en from '../../../locale/en'
import { getObjectValueByPath } from '../../../util/helpers'
import { VuetifyLanguage } from 'types'

const LANG_PREFIX = '$vuetify.lang.'

export default function lang (config: VuetifyLanguage = {}) {
  return {
    locales: Object.assign({ en }, config.locales),
    current: config.current || 'en',
    t: function (key: string, ...params: (string|number)[]): string {
      const translation = getObjectValueByPath(this.locales[this.current], key.replace(LANG_PREFIX, ''), key)
      return translation.replace(/\{(\d+)\}/g, (match: string, index: string) => {
        return params[Number(index)]
      })
    }
  }
}
