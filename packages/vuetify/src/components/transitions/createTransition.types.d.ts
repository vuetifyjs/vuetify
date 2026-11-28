// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface CssTransitionProps {
  disabled?: boolean
  group?: boolean
  hideOnLeave?: boolean
  leaveAbsolute?: boolean
  mode?: string
  origin?: string
}

type CssTransitionDefaultKeys =
  | 'disabled'
  | 'group'
  | 'hideOnLeave'
  | 'leaveAbsolute'
  | 'mode'
  | 'origin'

export type CssTransition = VuetifyComponent<
  CssTransitionProps,
  CssTransitionDefaultKeys,
  Record<string, any>
>

export interface JavascriptTransitionProps {
  disabled?: boolean
  group?: boolean
  hideOnLeave?: boolean
  mode?: 'in-out' | 'out-in' | 'default'
}

type JavascriptTransitionDefaultKeys =
  | 'disabled'
  | 'group'
  | 'hideOnLeave'
  | 'mode'

export type JavascriptTransition = VuetifyComponent<
  JavascriptTransitionProps,
  JavascriptTransitionDefaultKeys,
  Record<string, any>
>

export {}
