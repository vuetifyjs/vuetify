import { getObjectValueByPath } from '../../../util/helpers'

export type FilterTreeItemFunction = (item: object, search: string, textKey: string) => boolean

export function filterTreeItems (
  filter: FilterTreeItemFunction,
  item: any,
  search: string,
  idKey: string,
  textKey: string,
  childrenKey: string,
  excluded: Set<string | number>
): boolean {
  if (filter(item, search, textKey)) {
    return true
  }

  const children = getObjectValueByPath(item, childrenKey)

  if (children) {
    let match = false
    for (let i = 0; i < children.length; i++) {
      if (filterTreeItems(filter, children[i], search, idKey, textKey, childrenKey, excluded)) {
        match = true
      }
    }

    if (match) return true
  }

  excluded.add(getObjectValueByPath(item, idKey))

  return false
}
