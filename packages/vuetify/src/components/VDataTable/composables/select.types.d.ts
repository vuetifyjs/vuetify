export interface SelectableItem {
  value: any
  selectable: boolean
}

export type SelectionActions = {
  isSelected: (items: SelectableItem | SelectableItem[]) => boolean
  select: (items: SelectableItem[], value: boolean) => void
  selectAll: (value: boolean) => void
  toggleSelect: (item: SelectableItem, index?: number, event?: MouseEvent) => void
}

export {}
