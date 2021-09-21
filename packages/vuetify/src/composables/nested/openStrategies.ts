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

export const multipleOpenStrategy: OpenStrategyFn = ({ id, value, opened }: { id: string, value: boolean, opened: Set<string> }) => {
  value ? opened.add(id) : opened.delete(id)
  return opened
}
