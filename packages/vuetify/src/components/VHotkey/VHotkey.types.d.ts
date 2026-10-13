// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type HotkeyVariant = 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain' | 'contained'

export type DisplayMode = 'icon' | 'symbol' | 'text'

export type KeyMapConfig = Record<string, PlatformKeyConfig>

export type PlatformKeyConfig = {
  mac?: KeyConfig
  default: KeyConfig
}

export type KeyConfig = {
  symbol?: string
  icon?: string
  text: string
}

export interface VHotkeyProps {
  border?: string | number | boolean
  class?: any
  color?: string
  disabled?: boolean
  displayMode?: DisplayMode
  elevation?: string | number
  hoverElevation?: string | number
  inline?: boolean
  keyMap?: KeyMapConfig
  keys?: string
  platform?: 'auto' | 'pc' | 'mac'
  prefix?: string
  rounded?: string | number | boolean
  style?: StyleValue
  suffix?: string
  theme?: string
  tile?: boolean
  variant?: HotkeyVariant
}

export type VHotkeyDefaultKeys =
  | 'disabled'
  | 'displayMode'
  | 'inline'
  | 'keyMap'
  | 'platform'
  | 'rounded'
  | 'style'
  | 'tile'
  | 'variant'

export declare const VHotkey: VuetifyComponent<
  VHotkeyProps,
  VHotkeyDefaultKeys,
  Record<string, any>
>
export type VHotkey = InstanceType<typeof VHotkey>
