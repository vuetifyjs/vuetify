import { Breakpoint } from 'vuetify/types/services/breakpoint'
import { Icons } from 'vuetify/types/services/icons'
import { Lang } from 'vuetify/types/services/lang'
import { Theme } from 'vuetify/types/services/theme'

export interface VuetifyPreset {
  [name: string]: any

  breakpoint?: Partial<Breakpoint>
  icons?: Partial<Icons>
  locale?: Partial<Lang>
  theme?: { [P in keyof Theme]?: Partial<Theme[P]> }
}
