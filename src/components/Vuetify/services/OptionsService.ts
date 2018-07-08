// Libs
import Vue from 'vue'

// Types
import { VuetifyUseOptions } from 'types'

const OPTIONS_DEFAULTS = {
  themeVariations: ['primary', 'secondary', 'accent'],
  minifyTheme: null,
  themeCache: null,
  cspNonce: null
}

export default function OptionService (options: VuetifyUseOptions) {
  return Vue.extend({
    data: () => ({
      options: Object.assign(
        {},
        OPTIONS_DEFAULTS,
        options.options
      )
    })
  })
}
