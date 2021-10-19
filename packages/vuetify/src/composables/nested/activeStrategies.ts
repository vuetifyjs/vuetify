export type ActiveStrategyFn = (data: {
  id: string
  value: boolean
  active: Set<string>
  children: Map<string, string[]>
  parents: Map<string, string>
  event?: Event
}) => Set<string>

export const classicActiveStrategy = (single?: boolean): ActiveStrategyFn => {
  return ({ id, value, active }) => {
    const newActive: Set<string> = single ? new Set() : active

    if (value) {
      newActive.add(id)
    } else {
      newActive.delete(id)
    }

    return newActive
  }
}
