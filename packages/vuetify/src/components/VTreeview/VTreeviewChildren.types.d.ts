// Types
import type { InternalListItem } from '@/components/VList/VList.types'
import type { VTreeviewItemSlots } from '@/components/VTreeview/VTreeviewItem.types'
import type { IndentLineType } from '@/util/indentLines.types'

export type VTreeviewChildrenSlots<T> = {
  [K in keyof Omit<VTreeviewItemSlots, 'default'>]: VTreeviewItemSlots[K] & {
    item: T
    internalItem: InternalListItem<T>
  }
} & {
  default: never
  item: {
    props: InternalListItem['props'] & { indentLines?: IndentLineType[] }
    item: T
    internalItem: InternalListItem<T>
  }
  header: {
    props: InternalListItem['props'] & { indentLines?: IndentLineType[] }
    item: T
    internalItem: InternalListItem<T>
    loading: boolean
  }
  footer: {
    props: { indentLines?: IndentLineType[] }
    item: T
    internalItem: InternalListItem<T>
    loading: boolean
  }
  divider: { props: InternalListItem['props'] }
  subheader: { props: InternalListItem['props'] }
}
