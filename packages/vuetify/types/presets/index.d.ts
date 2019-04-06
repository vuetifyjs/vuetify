import { VuetifyBreakpointOptions } from 'vuetify/types/services/breakpoint'
import { VuetifyIconOptions } from 'vuetify/types/services/icons'
import { VuetifyLangOptions } from 'vuetify/types/services/lang'
import { VuetifyThemeOptions } from 'vuetify/types/services/theme'

export interface VuetifyPreset {
  [name: string]: any

  breakpoint?: VuetifyBreakpointOptions
  locale?: VuetifyLangOptions
  icons?: VuetifyIconOptions
  theme?: VuetifyThemeOptions
}
