// Utilities
import { computed, inject, provide, ref } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface DefaultsInstance {
  [key: string]: undefined | Record<string, unknown>
  global?: Record<string, unknown>
}

export type DefaultsOptions = Partial<DefaultsInstance>

export const DefaultsSymbol: InjectionKey<Ref<DefaultsInstance>> = Symbol.for('vuetify:defaults')

export function createDefaults (options?: DefaultsInstance): Ref<DefaultsInstance> {
  return ref(options ?? {})
}

export function useDefaults () {
  const defaults = inject(DefaultsSymbol)

  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance')

  return defaults
}

export function provideDefaults (props?: {
  defaults?: DefaultsInstance
  reset?: number | string
  root?: boolean
  scoped?: boolean
}) {
  const defaults = useDefaults()

  const newDefaults = computed(() => {
    let properties = mergeDeep(props?.defaults, { prev: defaults.value })

    if (props?.scoped) return properties

    if (props?.reset || props?.root) {
      const len = Number(props.reset ?? Infinity)

      for (let i = 0; i <= len; i++) {
        if (!properties.prev) break

        properties = properties.prev
      }

      return properties
    }

    return mergeDeep(properties, defaults.value)
  }) as ComputedRef<DefaultsInstance>

  provide(DefaultsSymbol, newDefaults)

  return newDefaults
}
