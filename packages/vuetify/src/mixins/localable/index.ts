// Utilities
import { getVuetify } from '../../util/helpers'

// Types
import Vue from 'vue'
import { Lang } from 'vuetify/types/services/lang'

export default Vue.extend({
  name: 'localable',

  props: { locale: String },

  computed: {
    currentLocale (): string {
      return this.locale || this.langInstance.current
    },
    langInstance (): Lang {
      return getVuetify(this, 'lang', {
        locales: { en: {} },
        current: 'en',
        t: (text = '') => text,
      })
    },
  },
})
