type OpenStrategyFunction = (data: {
  id: unknown
  value: boolean
  opened: Set<unknown>
  children: Map<unknown, unknown[]>
  parents: Map<unknown, unknown>
  event?: Event
}) => Set<unknown>

type OpenSelectStrategyFunction = (data: {
  id: unknown
  value: boolean
  opened: Set<unknown>
  selected: Map<unknown, 'on' | 'off' | 'indeterminate'>
  children: Map<unknown, unknown[]>
  parents: Map<unknown, unknown>
  event?: Event
}) => Set<unknown> | null

export type OpenStrategy = {
  open: OpenStrategyFunction
  select: OpenSelectStrategyFunction
}
