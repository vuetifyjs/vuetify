import { effectScope, onScopeDispose, watch } from 'vue'
import type { EffectScope, WatchSource } from 'vue'

export function useToggleScope (source: WatchSource<boolean>, cb: () => void) {
  let scope: EffectScope | undefined
  watch(source, active => {
    if (active && !scope) {
      scope = effectScope()
      scope.run(cb)
    } else if (!active) {
      scope?.stop()
      scope = undefined
    }
  }, { immediate: true })

  onScopeDispose(() => {
    scope?.stop()
  })
}
