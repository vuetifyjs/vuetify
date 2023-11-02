// Utilities
import { computed, inject, provide, ref } from 'vue'
import { defaultRtl } from '@/locale'
import { createVuetifyAdapter } from '@/locale/adapters/vuetify'

// Types
import type { InjectionKey, Ref } from 'vue'

export interface LocaleMessages {
  [key: string]: LocaleMessages | string
}

export interface LocaleOptions {
  messages?: LocaleMessages
  locale?: string
  fallback?: string
  adapter?: LocaleInstance
}

export interface LocaleInstance {
  name: string
  messages: Ref<LocaleMessages>
  current: Ref<string>
  fallback: Ref<string>
  t: (key: string, ...params: unknown[]) => string
  n: (value: number) => string
  provide: (props: LocaleOptions) => LocaleInstance
}

export const LocaleSymbol: InjectionKey<LocaleInstance & RtlInstance> = Symbol.for('vuetify:locale')

function isLocaleInstance (obj: any): obj is LocaleInstance {
  return obj.name != null
}

export function createLocale (options?: LocaleOptions & RtlOptions) {
  const i18n = options?.adapter && isLocaleInstance(options?.adapter) ? options?.adapter : createVuetifyAdapter(options)
  const rtl = createRtl(i18n, options)

  return { ...i18n, ...rtl }
}

export function useLocale () {
  const locale = inject(LocaleSymbol)

  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance')

  return locale
}

export function provideLocale (props: LocaleOptions & RtlProps) {
  const locale = inject(LocaleSymbol)

  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance')

  const i18n = locale.provide(props)
  const rtl = provideRtl(i18n, locale.rtl, props)

  const data = { ...i18n, ...rtl }

  provide(LocaleSymbol, data)

  return data
}

// RTL

export interface RtlOptions {
  rtl?: Record<string, boolean>
}

export interface RtlProps {
  rtl?: boolean
}

export interface RtlInstance {
  isRtl: Ref<boolean>
  rtl: Ref<Record<string, boolean>>
  rtlClasses: Ref<string>
}

export const RtlSymbol: InjectionKey<RtlInstance> = Symbol.for('vuetify:rtl')

export function createRtl (i18n: LocaleInstance, options?: RtlOptions): RtlInstance {
  const rtl = ref<Record<string, boolean>>(options?.rtl ?? defaultRtl)
  const isRtl = computed(() => rtl.value[i18n.current.value] ?? false)

  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  }
}

export function provideRtl (locale: LocaleInstance, rtl: RtlInstance['rtl'], props: RtlProps): RtlInstance {
  const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false)

  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  }
}

export function useRtl () {
  const locale = inject(LocaleSymbol)

  if (!locale) throw new Error('[Vuetify] Could not find injected rtl instance')

  return { isRtl: locale.isRtl, rtlClasses: locale.rtlClasses }
}
