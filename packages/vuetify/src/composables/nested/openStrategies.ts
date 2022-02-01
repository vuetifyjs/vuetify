export type OpenStrategyFn = (data: {
  id: string
  value: boolean
  opened: Set<string>
  children: Map<string, string[]>
  parents: Map<string, string>
  event?: Event
}) => Set<string>

export const singleOpenStrategy: OpenStrategyFn = ({ id, value, opened, parents }) => {
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
}

export const multipleOpenStrategy: OpenStrategyFn = ({ id, value, opened, parents }) => {
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
}
