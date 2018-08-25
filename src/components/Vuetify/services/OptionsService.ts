// Libs
import Vue from 'vue'

// Types
import { VuetifyUseOptions } from 'types'

const OPTIONS_DEFAULTS = {
  minifyTheme: null,
  themeCache: null,
  customProperties: false,
  cspNonce: null
}

export default function OptionsService (options: VuetifyUseOptions) {
  return Vue.extend({
    data: () => ({
      options: {
        ...OPTIONS_DEFAULTS,
        ...options.options
      }
    })
  })
}
