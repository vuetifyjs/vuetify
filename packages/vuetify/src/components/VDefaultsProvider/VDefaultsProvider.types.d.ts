// Types
import type { DefaultsOptions } from '@/composables/defaults.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VDefaultsProviderProps {
  defaults?: DefaultsOptions
  disabled?: boolean
  reset?: string | number
  root?: string | boolean
  scoped?: boolean
}

type VDefaultsProviderDefaultKeys =
  | 'disabled'
  | 'scoped'

export declare const VDefaultsProvider: VuetifyComponent<
  VDefaultsProviderProps,
  VDefaultsProviderDefaultKeys,
  Record<string, any>
>
export type VDefaultsProvider = InstanceType<typeof VDefaultsProvider>

export {}
