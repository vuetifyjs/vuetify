// Types
import type { ComponentInternalInstance, Ref } from 'vue'

export interface GroupItem {
  id: string
  value: Ref<unknown>
  disabled: Ref<boolean | undefined>
  useIndexAsValue?: boolean
}

export interface GroupProvide {
  register: (item: GroupItem, cmp: ComponentInternalInstance) => void
  unregister: (id: string) => void
  select: (id: string, value: boolean) => void
  selected: Ref<Readonly<string[]>>
  isSelected: (id: string) => boolean
  prev: () => void
  next: () => void
  selectedClass: Ref<string | undefined>
  items: Readonly<Ref<{
    id: string
    value: unknown
    disabled: boolean | undefined
  }[]>>
  disabled: Ref<boolean | undefined>
  getItemIndex: (value: unknown) => number
}

export interface GroupItemProvide {
  id: string
  isSelected: Ref<boolean>
  isFirst: Ref<boolean>
  isLast: Ref<boolean>
  toggle: () => void
  select: (value: boolean) => void
  selectedClass: Ref<(string | undefined)[] | false>
  value: Ref<unknown>
  disabled: Ref<boolean | undefined>
  group: GroupProvide
  register: () => void
  unregister: () => void
}
