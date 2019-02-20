import { VuetifyBreakpointOptions } from 'vuetify/types/services/breakpoint'
import { VuetifyIconOptions } from 'vuetify/types/services/icons'
import { VuetifyLangOptions } from 'vuetify/types/services/lang'
import { VuetifyThemeOptions } from 'vuetify/types/services/theme'

export interface VuetifyPreset {
  [name: string]: any

  rtl: boolean
  breakpoint: VuetifyBreakpointOptions
  lang: Partial<VuetifyLangOptions>
  icons: VuetifyIconOptions['values']
  theme: VuetifyThemeOptions
}
