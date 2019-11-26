// Components
import { VThemeProvider } from '../components/VThemeProvider'

// Utilities
import { deprecate } from './console'

/* @vue/component */
export default VThemeProvider.extend({
  created () {
    deprecate(
      '<theme-provider></theme-provider>',
      '<v-theme-provider></v-theme-provider>',
      this,
    )
  },
})
