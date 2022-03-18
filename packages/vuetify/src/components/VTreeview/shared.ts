export const VTreeviewSymbol = Symbol.for('vuetify:treeview')

export type TreeviewItem = {
  [key: string]: any
  $children?: TreeviewItem[]
}

export type InternalTreeviewItem = {
  item: Record<string, any>
  props: Record<string, any>
  children?: InternalTreeviewItem[]
}
