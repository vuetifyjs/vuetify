// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VLocaleProviderProps {
  class?: any
  fallbackLocale?: string
  locale?: string
  messages?: Record<string, any>
  rtl?: boolean
  style?: StyleValue
}

type VLocaleProviderDefaultKeys =
  | 'rtl'
  | 'style'

export declare const VLocaleProvider: VuetifyComponent<
  VLocaleProviderProps,
  VLocaleProviderDefaultKeys,
  Record<string, any>
>
export type VLocaleProvider = InstanceType<typeof VLocaleProvider>

export {}
