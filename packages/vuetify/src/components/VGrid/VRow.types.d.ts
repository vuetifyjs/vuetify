// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type Gap = number | string | (string | number)[]

export interface VRowProps {
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
  alignContentLg?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
  alignContentMd?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
  alignContentSm?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
  alignContentXl?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
  alignContentXxl?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
  alignLg?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  alignMd?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  alignSm?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  alignXl?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  alignXxl?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  class?: any
  dense?: boolean
  density?: Density
  gap?: Gap
  gapLg?: Gap
  gapMd?: Gap
  gapSm?: Gap
  gapXl?: Gap
  gapXxl?: Gap
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  justifyLg?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  justifyMd?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  justifySm?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  justifyXl?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  justifyXxl?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  noGutters?: boolean
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
}

type VRowDefaultKeys =
  | 'align'
  | 'alignContent'
  | 'alignContentLg'
  | 'alignContentMd'
  | 'alignContentSm'
  | 'alignContentXl'
  | 'alignContentXxl'
  | 'alignLg'
  | 'alignMd'
  | 'alignSm'
  | 'alignXl'
  | 'alignXxl'
  | 'dense'
  | 'density'
  | 'justify'
  | 'justifyLg'
  | 'justifyMd'
  | 'justifySm'
  | 'justifyXl'
  | 'justifyXxl'
  | 'noGutters'
  | 'style'
  | 'tag'

export declare const VRow: VuetifyComponent<
  VRowProps,
  VRowDefaultKeys,
  Record<string, any>
>
export type VRow = InstanceType<typeof VRow>

export {}
