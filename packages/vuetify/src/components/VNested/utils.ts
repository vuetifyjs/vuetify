import { onBeforeUnmount } from 'vue'

export const independentSelectStrategy = {
  select: (data: {
    id: string
    value: boolean
    selected: Map<string, 'on' | 'off' | 'indeterminate'>
    children: Map<string, string[]>
    parents: Map<string, string>
    event?: Event
  }) => {
    const { id, value, selected } = data

    selected.set(id, value ? 'on' : 'off')

    return selected
  },
  in: (v: string[], children: Map<string, string[]>, parents: Map<string, string>) => {
    let map = new Map()

    for (const id of (v || [])) {
      map = independentSelectStrategy.select({
        id,
        value: true,
        selected: new Map(map),
        children,
        parents,
      })
    }

    return map
  },
  out: (v: Map<string, 'on' | 'off' | 'indeterminate'>, children: Map<string, string[]>, parents: Map<string, string>) => {
    const arr = []

    for (const [key, value] of v.entries()) {
      if (value === 'on') arr.push(key)
    }

    return arr
  },
}

export const classicSelectStrategy = {
  select: (data: {
    id: string
    value: boolean
    selected: Map<string, 'on' | 'off' | 'indeterminate'>
    children: Map<string, string[]>
    parents: Map<string, string>
    event?: Event
  }) => {
    const { id, value, selected, children, parents } = data

    const items = [id]

    while (items.length) {
      const item = items.shift()!

      selected.set(item, value ? 'on' : 'off')

      if (children.has(item)) {
        items.push(...children.get(item)!)
      }
    }

    let parent = parents.get(id)

    while (parent) {
      const childrenIds = children.get(parent)!
      const everySelected = childrenIds.every(cid => selected.get(cid) === 'on')
      const noneSelected = childrenIds.every(cid => !selected.has(cid) || selected.get(cid) === 'off')

      selected.set(parent, everySelected ? 'on' : noneSelected ? 'off' : 'indeterminate')

      parent = parents.get(parent)
    }

    return selected
  },
  in: (v: string[], children: Map<string, string[]>, parents: Map<string, string>) => {
    let map = new Map()

    for (const id of (v || [])) {
      map = classicSelectStrategy.select({
        id,
        value: true,
        selected: new Map(map),
        children,
        parents,
      })
    }

    return map
  },
  out: (v: Map<string, 'on' | 'off' | 'indeterminate'>, children: Map<string, string[]>, parents: Map<string, string>) => {
    const arr = []

    for (const [key, value] of v.entries()) {
      if (value === 'on' && !children.has(key)) arr.push(key)
    }

    return arr
  },
}
