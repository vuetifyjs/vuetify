import { ref, inject, provide, computed } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { LocaleInstance } from './locale'

export interface RtlOptions {
  rtl: Record<string, boolean>
  isRtl?: boolean
}

export interface RtlProps {
  rtl?: boolean
}

export interface RtlInstance {
  rtl: Record<string, boolean>
  isRtl: Ref<boolean>
}

export const VuetifyRtlSymbol: InjectionKey<RtlInstance> = Symbol.for('vuetify:rtl')

export function createRtl (localeScope: LocaleInstance, options?: RtlOptions) {
  return createRtlScope({
    rtl: options?.rtl ?? {}, // TODO: default rtl map
    isRtl: ref(options?.isRtl ?? false),
  }, localeScope)
}

export function createRtlScope (currentScope: RtlInstance, localeScope: LocaleInstance, options?: RtlProps): RtlInstance {
  return {
    isRtl: computed(() => {
      if (!!options && typeof options.rtl === 'boolean') return options.rtl
      if (localeScope.locale.value && currentScope.rtl.hasOwnProperty(localeScope.locale.value)) {
        return currentScope.rtl[localeScope.locale.value]
      }

      return currentScope.isRtl.value
    }),
    rtl: currentScope.rtl,
  }
}

export function provideRtl (localeScope: LocaleInstance, props: RtlProps) {
  const currentScope = inject(VuetifyRtlSymbol)

  if (!currentScope) throw new Error('Could not find injected rtl')

  const newScope = createRtlScope(currentScope, localeScope, props)

  provide(VuetifyRtlSymbol, newScope)

  return newScope
}

export function useRtl () {
  const currentScope = inject(VuetifyRtlSymbol)

  if (!currentScope) throw new Error('Could not find injected rtl')

  return currentScope
}
