// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VSkeletonLoaderType =
  | 'actions'
  | 'article'
  | 'avatar'
  | 'button'
  | 'card'
  | 'card-avatar'
  | 'chip'
  | 'chip-group'
  | 'date-picker'
  | 'date-picker-options'
  | 'date-picker-days'
  | 'divider'
  | 'heading'
  | 'image'
  | 'list-item'
  | 'list-item-avatar'
  | 'list-item-two-line'
  | 'list-item-avatar-two-line'
  | 'list-item-three-line'
  | 'list-item-avatar-three-line'
  | 'ossein'
  | 'paragraph'
  | 'sentences'
  | 'subtitle'
  | 'table'
  | 'table-heading'
  | 'table-thead'
  | 'table-tbody'
  | 'table-row-divider'
  | 'table-row'
  | 'table-cell'
  | 'table-tfoot'
  | 'text'

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

type VSkeletonLoaderDefaultKeys =
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

export {}
