// Types
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VDataTableFooterProps {
  color?: string
  firstIcon?: IconValue
  firstPageLabel?: string
  itemsPerPageOptions?: readonly (number | { title: string, value: number })[]
  itemsPerPageText?: string
  lastIcon?: IconValue
  lastPageLabel?: string
  nextIcon?: IconValue
  nextPageLabel?: string
  pageText?: string
  prevIcon?: IconValue
  prevPageLabel?: string
  showCurrentPage?: boolean
  showFirstLastPage?: boolean | 'only-first'
}

export type VDataTableFooterDefaultKeys =
  | 'firstIcon'
  | 'firstPageLabel'
  | 'itemsPerPageOptions'
  | 'itemsPerPageText'
  | 'lastIcon'
  | 'lastPageLabel'
  | 'nextIcon'
  | 'nextPageLabel'
  | 'pageText'
  | 'prevIcon'
  | 'prevPageLabel'
  | 'showCurrentPage'
  | 'showFirstLastPage'

export declare const VDataTableFooter: VuetifyComponent<
  VDataTableFooterProps,
  VDataTableFooterDefaultKeys,
  Record<string, any>,
  { prepend: never }
>
export type VDataTableFooter = InstanceType<typeof VDataTableFooter>
