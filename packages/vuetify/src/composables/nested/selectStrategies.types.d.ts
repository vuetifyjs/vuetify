type SelectStrategyFunction = (data: {
  id: unknown
  value: boolean
  selected: Map<unknown, 'on' | 'off' | 'indeterminate'>
  children: Map<unknown, unknown[]>
  parents: Map<unknown, unknown>
  disabled: Set<unknown>
  event?: Event
}) => Map<unknown, 'on' | 'off' | 'indeterminate'>

type SelectStrategyTransformInFunction = (
  v: readonly unknown[] | undefined,
  children: Map<unknown, unknown[]>,
  parents: Map<unknown, unknown>,
  disabled: Set<unknown>,
) => Map<unknown, 'on' | 'off' | 'indeterminate'>

type SelectStrategyTransformOutFunction = (
  v: Map<unknown, 'on' | 'off' | 'indeterminate'>,
  children: Map<unknown, unknown[]>,
  parents: Map<unknown, unknown>,
) => unknown[]

export type SelectStrategy = {
  select: SelectStrategyFunction
  in: SelectStrategyTransformInFunction
  out: SelectStrategyTransformOutFunction
}
