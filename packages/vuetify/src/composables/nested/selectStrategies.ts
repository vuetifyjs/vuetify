export type SelectStrategyFn = (data: {
  id: string
  value: boolean
  selected: Map<string, 'on' | 'off' | 'indeterminate'>
  children: Map<string, string[]>
  parents: Map<string, string>
  event?: Event
  mandatory?: boolean
}) => Map<string, 'on' | 'off' | 'indeterminate'>

export type SelectStrategyTransformInFn = (
  v: string[] | undefined,
  children: Map<string, string[]>,
  parents: Map<string, string>
) => Map<string, 'on' | 'off' | 'indeterminate'>

export type SelectStrategyTransformOutFn = (
  v: Map<string, 'on' | 'off' | 'indeterminate'>,
  children: Map<string, string[]>,
  parents: Map<string, string>
) => any[]

export type SelectStrategy = {
  select: SelectStrategyFn
  in: SelectStrategyTransformInFn
  out: SelectStrategyTransformOutFn
}

export const independentSelectStrategy: SelectStrategy = {
  select: ({ id, value, mandatory, selected }) => {
    selected.set(id, value ? 'on' : (
      mandatory &&
      !Array.from(selected.entries()).find(([key, value]) => value === 'on' && key !== id)
    ) ? 'on' : 'off')

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
  select: ({ id, value, ...rest }) => {
    return independentSelectStrategy.select({ ...rest, id, value, selected: new Map() })
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

export const leafSelectStrategy = (single = false): SelectStrategy => {
  const strategy: SelectStrategy = {
    select: ({ id, value, selected, children }) => {
      if (children.has(id)) return selected

      if (single) return new Map([[id, value ? 'on' : 'off']])

      selected.set(id, value ? 'on' : 'off')

      return selected
    },
    in: (v, children, parents) => {
      let map = new Map()

      for (const id of (v ?? [])) {
        map = strategy.select({
          id,
          value: true,
          selected: new Map(map),
          children,
          parents,
        })
      }

      return map
    },
    out: independentSelectStrategy.out,
  }

  return strategy
}

export const classicSelectStrategy: SelectStrategy = {
  select: ({ id, value, selected, children, parents }) => {
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
      if (value === 'on' && !children.has(key)) arr.push(key)
    }

    return arr
  },
}
