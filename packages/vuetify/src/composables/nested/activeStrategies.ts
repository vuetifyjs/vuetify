/* eslint-disable sonarjs/no-identical-functions */
// Utilities
import { toRaw } from 'vue'

export type ActiveStrategyFn = (data: {
  id: unknown
  value: boolean
  activated: Set<unknown>
  children: Map<unknown, unknown[]>
  parents: Map<unknown, unknown>
  event?: Event
}) => Set<unknown>

export type ActiveStrategyTransformInFn = (
  v: readonly unknown[] | undefined,
  children: Map<unknown, unknown[]>,
  parents: Map<unknown, unknown>,
) => Set<unknown>

export type ActiveStrategyTransformOutFn = (
  v: Set<unknown>,
  children: Map<unknown, unknown[]>,
  parents: Map<unknown, unknown>,
) => unknown[]

export type ActiveStrategy = {
  activate: ActiveStrategyFn
  in: ActiveStrategyTransformInFn
  out: ActiveStrategyTransformOutFn
}

export const independentActiveStrategy = (mandatory?: boolean): ActiveStrategy => {
  const strategy: ActiveStrategy = {
    activate: ({ id, value, activated }) => {
      id = toRaw(id)

      // When mandatory and we're trying to deselect when id
      // is the only currently selected item then do nothing
      if (mandatory && !value && activated.size === 1 && activated.has(id)) return activated

      if (value) {
        activated.add(id)
      } else {
        activated.delete(id)
      }

      return activated
    },
    in: (v, children, parents) => {
      let set = new Set()

      for (const id of (v || [])) {
        set = strategy.activate({
          id,
          value: true,
          activated: new Set(set),
          children,
          parents,
        })
      }

      return set
    },
    out: v => {
      return Array.from(v)
    },
  }

  return strategy
}

export const independentSingleActiveStrategy = (mandatory?: boolean): ActiveStrategy => {
  const parentStrategy = independentActiveStrategy(mandatory)

  const strategy: ActiveStrategy = {
    activate: ({ activated, id, ...rest }) => {
      id = toRaw(id)
      const singleSelected = activated.has(id) ? new Set([id]) : new Set()
      return parentStrategy.activate({ ...rest, id, activated: singleSelected })
    },
    in: (v, children, parents) => {
      let set = new Set()

      if (v?.length) {
        set = parentStrategy.in(v.slice(0, 1), children, parents)
      }

      return set
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents)
    },
  }

  return strategy
}

export const leafActiveStrategy = (mandatory?: boolean): ActiveStrategy => {
  const parentStrategy = independentActiveStrategy(mandatory)

  const strategy: ActiveStrategy = {
    activate: ({ id, activated, children, ...rest }) => {
      id = toRaw(id)
      if (children.has(id)) return activated

      return parentStrategy.activate({ id, activated, children, ...rest })
    },
    in: parentStrategy.in,
    out: parentStrategy.out,
  }

  return strategy
}

export const leafSingleActiveStrategy = (mandatory?: boolean): ActiveStrategy => {
  const parentStrategy = independentSingleActiveStrategy(mandatory)

  const strategy: ActiveStrategy = {
    activate: ({ id, activated, children, ...rest }) => {
      id = toRaw(id)
      if (children.has(id)) return activated

      return parentStrategy.activate({ id, activated, children, ...rest })
    },
    in: parentStrategy.in,
    out: parentStrategy.out,
  }

  return strategy
}
