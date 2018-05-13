import en from '../../../locale/en'
import { getObjectValueByPath } from '../../../util/helpers'

const LANG_PREFIX = '$vuetify.lang.'

export default function lang (config = {}) {
  return {
    locales: Object.assign({ en }, config.locales),
    current: config.current || 'en',
    t: function (key, ...params) {
      const translation = getObjectValueByPath(this.locales[this.current], key.replace(LANG_PREFIX, ''), key)
      return translation.replace(/\{(\d+)\}/g, (match, group) => {
        return params[group]
      })
    }
  }
}
