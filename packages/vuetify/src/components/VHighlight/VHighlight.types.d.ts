// Types
import type { IgnoreAccents } from '@vuetify/v0'
import type { FilterMatchArrayMultiple } from '@/composables/filter.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VHighlightProps {
  color?: string
  ignoreAccents?: IgnoreAccents
  ignoreCase?: boolean
  markClass?: string
  matchAll?: boolean
  matches?: FilterMatchArrayMultiple
  opacity?: string | number
  query?: string | string[]
  tag?: string | JSXComponent
  text?: string
}

export type VHighlightDefaultKeys =
  | 'ignoreCase'
  | 'matchAll'
  | 'tag'
  | 'text'

export declare const VHighlight: VuetifyComponent<
  VHighlightProps,
  VHighlightDefaultKeys,
  {},
  null
>
export type VHighlight = InstanceType<typeof VHighlight>
