import { BreakpointOptions } from 'vuetify/types/services/breakpoint'
import { Icons } from 'vuetify/types/services/icons'
import { Lang } from 'vuetify/types/services/lang'
import { Theme } from 'vuetify/types/services/theme'

export interface VuetifyPreset {
  [name: string]: any

  breakpoint: BreakpointOptions
  icons: Icons
  lang: Lang
  theme: { [P in keyof Theme]?: Partial<Theme[P]> }
}
