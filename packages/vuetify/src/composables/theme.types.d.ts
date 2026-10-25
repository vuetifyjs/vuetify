// Types
import type { DeepReadonly, Ref } from 'vue'
import type { Color } from '@/util/colorUtils.types'

export interface ThemeInstance {
  change: (themeName: string, transition?: boolean | ThemeTransitionOptions) => Promise<void>
  cycle: (themeArray?: string[], transition?: boolean | ThemeTransitionOptions) => Promise<void>
  toggle: (themeArray?: [string, string], transition?: boolean | ThemeTransitionOptions) => Promise<void>
  setTransitionOrigin: (e: PointerEvent | Element | null) => void

  readonly isDisabled: boolean
  readonly isSystem: Readonly<Ref<boolean>>
  readonly themes: Ref<Record<string, InternalThemeDefinition>>

  readonly name: Readonly<Ref<string>>
  readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  readonly computedThemes: DeepReadonly<Ref<Record<string, InternalThemeDefinition>>>
  readonly prefix: string

  readonly themeClasses: Readonly<Ref<string | undefined>>
  readonly styles: Readonly<Ref<string>>

  readonly global: {
    readonly name: Ref<string>
    readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  }
}

export interface ThemeTransitionOptions {
  origin?: string
  duration?: string
}

export interface InternalThemeDefinition {
  dark: boolean
  colors: Colors
  variables: Record<string, string | number>
}

export interface Colors extends BaseColors, OnColors {
  [key: string]: Color
}

export interface BaseColors {
  background: Color
  surface: Color
  primary: Color
  secondary: Color
  success: Color
  warning: Color
  error: Color
  info: Color
}

export interface OnColors {
  'on-background': Color
  'on-surface': Color
  'on-primary': Color
  'on-secondary': Color
  'on-success': Color
  'on-warning': Color
  'on-error': Color
  'on-info': Color
}

export {}
