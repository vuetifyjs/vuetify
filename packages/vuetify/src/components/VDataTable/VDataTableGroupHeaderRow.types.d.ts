// Types
import type { Group } from '@/components/VDataTable/composables/group.types'

export type VDataTableGroupHeaderRowSlots = {
  'data-table-group': { item: Group, count: number, props: Record<string, unknown> }
  'data-table-select': { props: Record<string, unknown> }
}

export {}
