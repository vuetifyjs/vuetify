// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, SelectItemKey } from '@/util/shared.types'

export type AvatarGroupItem = string | Record<string, any>

export type VAvatarGroupSlots = {
  default: never
  prepend: never
  append: never
  item: { props: any, index: number }
  overflow: { overflow: number }
}

export interface VAvatarGroupProps {
  border?: string | number | boolean
  class?: any
  gap?: string | number
  hoverable?: boolean
  itemProps?: SelectItemKey
  items?: AvatarGroupItem[]
  limit?: string | number
  overflowText?: string
  reverse?: boolean
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  vertical?: boolean
}

type VAvatarGroupDefaultKeys =
  | 'hoverable'
  | 'itemProps'
  | 'items'
  | 'reverse'
  | 'style'
  | 'tag'
  | 'vertical'

export declare const VAvatarGroup: VuetifyComponent<
  VAvatarGroupProps,
  VAvatarGroupDefaultKeys,
  Record<string, any>,
  VAvatarGroupSlots
>
export type VAvatarGroup = InstanceType<typeof VAvatarGroup>

export {}
