// Types
import type { InternalItem } from '@/composables/filter.types'

export interface ListItem<T = any> extends InternalItem<T> {
  title: string
  props: {
    [key: string]: any
    title: string
    value: any
  }
  children: ListItem<T>[] | undefined
  type: string
}
