// Utilities
import { computed, inject, provide, ref, unref } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { MaybeRef } from '@/util'

export type DefaultsInstance = undefined | {
  [key: string]: undefined | Record<string, unknown>
  global?: Record<string, unknown>
}

export type DefaultsOptions = Partial<DefaultsInstance>

export const DefaultsSymbol: InjectionKey<Ref<DefaultsInstance>> = Symbol.for('vuetify:defaults')

export function createDefaults (options?: DefaultsInstance): Ref<DefaultsInstance> {
  return ref(options)
}

export function useDefaults () {
  const defaults = inject(DefaultsSymbol)

  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance')

  return defaults
}

export function provideDefaults (
  defaults?: MaybeRef<DefaultsInstance | undefined>,
  options?: {
    reset?: MaybeRef<number | string | undefined>
    root?: MaybeRef<boolean | undefined>
    scoped?: MaybeRef<boolean | undefined>
  }
) {
  const injectedDefaults = useDefaults()
  const providedDefaults = ref(defaults)

  const newDefaults = computed(() => {
    const scoped = unref(options?.scoped)
    const reset = unref(options?.reset)
    const root = unref(options?.root)

    let properties = mergeDeep(providedDefaults.value, { prev: injectedDefaults.value })

    if (scoped) return properties

    if (reset || root) {
      const len = Number(reset || Infinity)

      for (let i = 0; i <= len; i++) {
        if (!properties || !('prev' in properties)) {
          break
        }

        properties = properties.prev
      }

      return properties
    }

    return mergeDeep(properties.prev, properties)
  }) as ComputedRef<DefaultsInstance>

  provide(DefaultsSymbol, newDefaults)

  return newDefaults
}
