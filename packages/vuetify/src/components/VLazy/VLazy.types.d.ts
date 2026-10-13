// Types
import type { Component, StyleValue, TransitionProps } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VLazyProps {
  class?: any
  height?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: boolean
  options?: IntersectionObserverInit
  style?: StyleValue
  tag?: string | JSXComponent
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  width?: string | number
}

export type VLazyDefaultKeys =
  | 'modelValue'
  | 'options'
  | 'style'
  | 'tag'
  | 'transition'

export declare const VLazy: VuetifyComponent<
  VLazyProps,
  VLazyDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
  }
>
export type VLazy = InstanceType<typeof VLazy>
