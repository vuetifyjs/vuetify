// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VThemeProviderProps {
  class?: any
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  withBackground?: boolean
}

type VThemeProviderDefaultKeys =
  | 'style'
  | 'tag'
  | 'withBackground'

export declare const VThemeProvider: VuetifyComponent<
  VThemeProviderProps,
  VThemeProviderDefaultKeys,
  Record<string, any>
>
export type VThemeProvider = InstanceType<typeof VThemeProvider>

export {}
