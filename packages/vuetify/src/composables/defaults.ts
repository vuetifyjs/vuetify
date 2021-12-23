// Utilities
import { computed, inject, provide, ref } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { MaybeRef } from '@/util'

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

export function provideDefaults (
  defaults?: MaybeRef<DefaultsInstance | undefined>,
  options?: {
    reset?: Ref<number | string | undefined>
    root?: Ref<boolean | undefined>
    scoped?: Ref<boolean | undefined>
  }
) {
  const injectedDefaults = useDefaults()
  const providedDefaults = ref(defaults)

  const newDefaults = computed(() => {
    let properties = mergeDeep(providedDefaults.value, { prev: injectedDefaults.value })

    if (options?.scoped) return properties

    if (options?.reset || options?.root) {
      const len = Number(options.reset ?? Infinity)

      for (let i = 0; i <= len; i++) {
        if (!properties.prev) break

        properties = properties.prev
      }

      return properties
    }

    return mergeDeep(properties, properties.prev)
  }) as ComputedRef<DefaultsInstance>

  provide(DefaultsSymbol, newDefaults)

  return newDefaults
}
