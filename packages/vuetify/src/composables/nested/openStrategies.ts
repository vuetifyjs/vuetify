export type OpenStrategyFn = (data: {
  id: string
  value: boolean
  opened: Set<string>
  children: Map<string, string[]>
  parents: Map<string, string>
  event?: Event
}) => Set<string>

export type OpenSelectStrategyFn = (data: {
  id: string
  value: boolean
  opened: Set<string>
  selected: Map<string, 'on' | 'off' | 'indeterminate'>
  children: Map<string, string[]>
  parents: Map<string, string>
  event?: Event
}) => Set<string> | null

export type OpenStrategy = {
  open: OpenStrategyFn
  select: OpenSelectStrategyFn
}

export const singleOpenStrategy: OpenStrategy = {
  open: ({ id, value, opened, parents }) => {
    if (value) {
      const newOpened = new Set<string>()
      newOpened.add(id)

      let parent = parents.get(id)

      while (parent != null) {
        newOpened.add(parent)
        parent = parents.get(parent)
      }

      return newOpened
    } else {
      opened.delete(id)
      return opened
    }
  },
  select: () => null,
}

export const multipleOpenStrategy: OpenStrategy = {
  open: ({ id, value, opened, parents }) => {
    if (value) {
      let parent = parents.get(id)
      opened.add(id)

      while (parent != null && parent !== id) {
        opened.add(parent)
        parent = parents.get(parent)
      }

      return opened
    } else {
      opened.delete(id)
    }
    return opened
  },
  select: () => null,
}

export const listOpenStrategy: OpenStrategy = {
  open: multipleOpenStrategy.open,
  select: ({ id, value, opened, parents }) => {
    if (!value) return opened

    const path: string[] = []

    let parent = parents.get(id)

    while (parent != null) {
      path.push(parent)
      parent = parents.get(parent)
    }

    return new Set(path)
  },
}
