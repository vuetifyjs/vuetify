// Types
import type { Component, Ref, ShallowRef, StyleValue, TransitionProps } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface srcObject {
  src?: string
  srcset?: string
  lazySrc?: string
  aspect: number
}

export type VImgSlots = {
  default: never
  placeholder: never
  error: never
  sources: never
}

export interface VImgProps {
  absolute?: boolean
  alt?: string
  aspectRatio?: string | number
  class?: any
  color?: string
  contentClass?: any
  cover?: boolean
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  draggable?: boolean | 'true' | 'false'
  eager?: boolean
  gradient?: string
  height?: string | number
  imageClass?: any
  inline?: boolean
  lazySrc?: string
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  options?: IntersectionObserverInit
  position?: string
  referrerpolicy?: 'origin' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
  rounded?: string | number | boolean
  sizes?: string
  src?: string | srcObject
  srcset?: string
  style?: StyleValue
  tile?: boolean
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  width?: string | number
}

export type VImgDefaultKeys =
  | 'absolute'
  | 'cover'
  | 'draggable'
  | 'eager'
  | 'inline'
  | 'options'
  | 'rounded'
  | 'src'
  | 'style'
  | 'tile'

export declare const VImg: VuetifyComponent<
  VImgProps,
  VImgDefaultKeys,
  {
    loadstart: (value: string | undefined) => true
    load: (value: string | undefined) => true
    error: (value: string | undefined) => true
  },
  VImgSlots,
  { currentSrc: ShallowRef<string, string>, image: Ref<HTMLImageElement | undefined, HTMLImageElement | undefined>, state: ShallowRef<'error' | 'loading' | 'idle' | 'loaded', 'error' | 'loading' | 'idle' | 'loaded'>, naturalWidth: ShallowRef<number | undefined, number | undefined>, naturalHeight: ShallowRef<number | undefined, number | undefined> }
>
export type VImg = InstanceType<typeof VImg>
