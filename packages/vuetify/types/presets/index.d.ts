import { BreakpointOptions } from 'vuetify/types/services/breakpoint'
import { GoToOptions } from 'vuetify/types/services/goto'
import { IconsOptions } from 'vuetify/types/services/icons'
import { LangOptions } from 'vuetify/types/services/lang'
import { ThemeOptions } from 'vuetify/types/services/theme'

export interface VuetifyPreset {
  breakpoint: BreakpointOptions
  goto: GoToOptions
  icons: IconsOptions
  lang: LangOptions
  theme: { [P in keyof ThemeOptions]?: ThemeOptions[P] }

  [name: string]: any
}

export interface UserVuetifyPreset {
  breakpoint?: Partial<BreakpointOptions>
  goto?: Partial<GoToOptions>
  icons?: Partial<IconsOptions>
  lang?: Partial<LangOptions>
  theme?: { [P in keyof Partial<ThemeOptions>]?: Partial<ThemeOptions[P]> }

  [name: string]: any
}
