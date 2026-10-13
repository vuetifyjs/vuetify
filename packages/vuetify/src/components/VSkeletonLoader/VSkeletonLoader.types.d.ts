// Types
import type { VSkeletonLoaderType } from '@/components/VSkeletonLoader/VSkeletonLoader'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VSkeletonLoaderProps {
  boilerplate?: boolean
  color?: string
  elevation?: string | number
  height?: string | number
  hoverElevation?: string | number
  loading?: boolean
  loadingText?: string
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  theme?: string
  type?: | VSkeletonLoaderType | (string & {}) | ReadonlyArray<VSkeletonLoaderType | (string & {})>
  types?: Record<string, string>
  width?: string | number
}

export type VSkeletonLoaderDefaultKeys =
  | 'boilerplate'
  | 'loading'
  | 'loadingText'
  | 'type'

export declare const VSkeletonLoader: VuetifyComponent<
  VSkeletonLoaderProps,
  VSkeletonLoaderDefaultKeys,
  Record<string, any>
>
export type VSkeletonLoader = InstanceType<typeof VSkeletonLoader>
