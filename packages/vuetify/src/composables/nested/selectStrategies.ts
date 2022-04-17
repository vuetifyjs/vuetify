/* eslint-disable sonarjs/no-identical-functions */
export type SelectStrategyFn = (data: {
  id: unknown
  value: boolean
  selected: Map<unknown, 'on' | 'off' | 'indeterminate'>
  children: Map<unknown, unknown[]>
  parents: Map<unknown, unknown>
  event?: Event
  mandatory?: boolean
}) => Map<unknown, 'on' | 'off' | 'indeterminate'>

export type SelectStrategyTransformInFn = (
  v: unknown[] | undefined,
  children: Map<unknown, unknown[]>,
  parents: Map<unknown, unknown>,
) => Map<unknown, 'on' | 'off' | 'indeterminate'>

export type SelectStrategyTransformOutFn = (
  v: Map<unknown, 'on' | 'off' | 'indeterminate'>,
  children: Map<unknown, unknown[]>,
  parents: Map<unknown, unknown>,
) => unknown[]

export type SelectStrategy = {
  select: SelectStrategyFn
  in: SelectStrategyTransformInFn
  out: SelectStrategyTransformOutFn
}

export const independentSelectStrategy: SelectStrategy = {
  select: ({ id, value, selected, mandatory }) => {
    // When mandatory and we're trying to deselect when id
    // is the only currently selected item then do nothing
    if (mandatory && !value) {
      const on = Array.from(selected.entries()).reduce((arr, [key, value]) => value === 'on' ? [...arr, key] : arr, [] as unknown[])
      if (on.length === 1 && on[0] === id) return selected
    }

    selected.set(id, value ? 'on' : 'off')

    return selected
  },
  in: (v, children, parents) => {
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
  out: v => {
    const arr = []

    for (const [key, value] of v.entries()) {
      if (value === 'on') arr.push(key)
    }

    return arr
  },
}

export const independentSingleSelectStrategy: SelectStrategy = {
  select: ({ selected, id, ...rest }) => {
    const singleSelected = selected.has(id) ? new Map([[id, selected.get(id)!]]) : new Map()
    return independentSelectStrategy.select({ ...rest, id, selected: singleSelected })
  },
  in: (v, children, parents) => {
    let map = new Map()

    if (v?.length) {
      map = independentSelectStrategy.in(v.slice(0, 1), children, parents)
    }

    return map
  },
  out: (v, children, parents) => {
    return independentSelectStrategy.out(v, children, parents)
  },
}

export const leafSelectStrategy: SelectStrategy = {
  select: ({ id, selected, children, ...rest }) => {
    if (children.has(id)) return selected

    return independentSelectStrategy.select({ id, selected, children, ...rest })
  },
  in: independentSelectStrategy.in,
  out: independentSelectStrategy.out,
}

export const leafSingleSelectStrategy: SelectStrategy = {
  select: ({ id, selected, children, ...rest }) => {
    if (children.has(id)) return selected

    return independentSingleSelectStrategy.select({ id, selected, children, ...rest })
  },
  in: independentSingleSelectStrategy.in,
  out: independentSingleSelectStrategy.out,
}

export const classicSelectStrategy: SelectStrategy = {
  select: ({ id, value, selected, children, parents, mandatory }) => {
    const original = new Map(selected)

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

    // If mandatory and planned deselect results in no selected
    // items then we can't do it, so return original state
    if (mandatory && !value) {
      const on = Array.from(selected.entries()).reduce((arr, [key, value]) => value === 'on' ? [...arr, key] : arr, [] as unknown[])
      if (on.length === 0) return original
    }

    return selected
  },
  in: (v, children, parents) => {
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
  out: (v, children) => {
    const arr = []

    for (const [key, value] of v.entries()) {
      if (value === 'on') arr.push(key)
    }

    return arr
  },
}

export const classicLeafSelectStrategy: SelectStrategy = {
  select: classicSelectStrategy.select,
  in: classicSelectStrategy.in,
  out: (v, children) => {
    const arr = []

    for (const [key, value] of v.entries()) {
      if (value === 'on' && !children.has(key)) arr.push(key)
    }

    return arr
  },
}
