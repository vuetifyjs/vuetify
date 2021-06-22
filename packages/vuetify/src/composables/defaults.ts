import { computed, inject, provide, ref } from 'vue'
import { mergeDeep } from '@/util'

import type { InjectionKey, Ref } from 'vue'

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

export function provideDefaults (props?: { defaults?: DefaultsInstance }) {
  const defaults = useDefaults()

  const newDefaults = computed(() => mergeDeep(defaults.value, props?.defaults) as any as DefaultsInstance)

  provide(DefaultsSymbol, newDefaults)

  return newDefaults
}
