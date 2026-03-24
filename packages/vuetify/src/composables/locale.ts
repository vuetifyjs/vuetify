// Utilities
import { createLocale as createV0Locale, createRtl as createV0Rtl } from '@vuetify/v0'
import { computed, inject, provide, ref, shallowRef, toRef, watch } from 'vue'
import en from '@/locale/en'

// Types
import type { LocaleContext, RtlContext } from '@vuetify/v0'
import type { InjectionKey, Ref } from 'vue'

export interface LocaleMessages {
  [key: string]: LocaleMessages | string
}

export interface LocaleOptions {
  decimalSeparator?: string
  messages?: Record<string, LocaleMessages>
  locale?: string
  fallback?: string
  adapter?: LocaleInstance
}

export interface LocaleInstance {
  current: Ref<string>
  t: (key: string, ...params: unknown[]) => string
  n: (value: number) => string
  decimalSeparator: Ref<string>
}

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

/** @internal */
export interface InternalLocaleData {
  _messages: Record<string, LocaleMessages>
  _fallback: string
}

export const LocaleSymbol: InjectionKey<LocaleInstance & RtlInstance> = Symbol.for('vuetify:locale')
export const RtlSymbol: InjectionKey<RtlInstance> = Symbol.for('vuetify:rtl')

const LANG_PREFIX = '$vuetify.'

function genDefaults () {
  return {
    af: false,
    ar: true,
    bg: false,
    ca: false,
    ckb: false,
    cs: false,
    de: false,
    el: false,
    en: false,
    es: false,
    et: false,
    fa: true,
    fi: false,
    fr: false,
    hr: false,
    hu: false,
    he: true,
    id: false,
    it: false,
    ja: false,
    km: false,
    ko: false,
    lv: false,
    lt: false,
    nl: false,
    no: false,
    pl: false,
    pt: false,
    ro: false,
    ru: false,
    sk: false,
    sl: false,
    srCyrl: false,
    srLatn: false,
    sv: false,
    th: false,
    tr: false,
    az: false,
    uk: false,
    vi: false,
    zhHans: false,
    zhHant: false,
  }
}

function createLocaleInstance (
  v0Locale: LocaleContext,
  options?: { decimalSeparator?: string }
): LocaleInstance {
  const current = computed<string>({
    get: () => String(v0Locale.selectedId.value ?? 'en'),
    set: v => v0Locale.select(v),
  })

  function t (key: string, ...params: unknown[]): string {
    const stripped = key.startsWith(LANG_PREFIX) ? key.slice(LANG_PREFIX.length) : key
    return v0Locale.t(stripped, ...params)
  }

  function n (value: number): string {
    return v0Locale.n(value)
  }

  const decimalSeparator = toRef(() => {
    if (options?.decimalSeparator) return options.decimalSeparator
    const formatted = n(0.1)
    return formatted.includes(',') ? ',' : '.'
  })

  return {
    current,
    t,
    n,
    decimalSeparator,
  }
}

function createRtlInstance (
  locale: LocaleInstance,
  rtlMap: Ref<Record<string, boolean>>,
  v0Rtl: RtlContext
): RtlInstance {
  const isRtl = shallowRef(v0Rtl.isRtl.value)

  watch(() => locale.current.value, current => {
    const value = rtlMap.value[current] ?? false
    v0Rtl.isRtl.value = value
    isRtl.value = value
  }, { immediate: true })

  return {
    isRtl,
    rtl: rtlMap,
    rtlClasses: toRef(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  }
}

export function createLocale (options?: LocaleOptions & RtlOptions) {
  if (options?.adapter) {
    const rtl = createRtlFromAdapter(options.adapter, options)
    return { ...options.adapter, ...rtl }
  }

  const messages = { en, ...options?.messages }
  const defaultLocale = options?.locale ?? 'en'
  const fallback = options?.fallback ?? 'en'

  const v0Locale = createV0Locale({
    default: defaultLocale,
    fallback,
    messages,
  })

  const v0Rtl = createV0Rtl({
    default: false,
    target: null,
  })

  const rtlMap = ref<Record<string, boolean>>(options?.rtl ?? genDefaults())
  const locale = createLocaleInstance(v0Locale, options)
  const rtl = createRtlInstance(locale, rtlMap, v0Rtl)

  return { ...locale, ...rtl, _messages: messages, _fallback: fallback } as LocaleInstance & RtlInstance & InternalLocaleData
}

function createRtlFromAdapter (adapter: LocaleInstance, options?: RtlOptions): RtlInstance {
  const rtl = ref<Record<string, boolean>>(options?.rtl ?? genDefaults())
  const isRtl = computed(() => rtl.value[adapter.current.value] ?? false)

  return {
    isRtl,
    rtl,
    rtlClasses: toRef(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  }
}

export function useLocale () {
  const locale = inject(LocaleSymbol)

  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance')

  return locale
}

export function provideLocale (props: LocaleOptions & RtlProps) {
  const parent = inject(LocaleSymbol)

  if (!parent) throw new Error('[Vuetify] Could not find injected locale instance')

  if ('provide' in parent && typeof (parent as any).provide === 'function') {
    const i18n = (parent as any).provide(props)
    const rtl = provideRtl(i18n, parent.rtl, props)
    const data = { ...i18n, ...rtl }
    provide(LocaleSymbol, data)
    return data
  }

  const parentData = parent as any as Partial<InternalLocaleData>
  const parentMessages = parentData._messages ?? {}
  const parentFallback = parentData._fallback ?? 'en'
  const messages = props.messages
    ? { ...parentMessages, [props.locale ?? parent.current.value]: props.messages }
    : parentMessages
  const fallback = props.fallback ?? parentFallback

  const v0Locale = createV0Locale({
    default: props.locale ?? parent.current.value,
    fallback,
    messages,
  })

  const locale = createLocaleInstance(v0Locale, props)
  const rtl = provideRtl(locale, parent.rtl, props)

  const data = { ...locale, ...rtl, _messages: messages, _fallback: fallback } as LocaleInstance & RtlInstance & InternalLocaleData
  provide(LocaleSymbol, data)
  return data
}

function provideRtl (locale: LocaleInstance, rtl: RtlInstance['rtl'], props: RtlProps): RtlInstance {
  const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false)

  return {
    isRtl,
    rtl,
    rtlClasses: toRef(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  }
}

export function useRtl () {
  const locale = inject(LocaleSymbol)

  if (!locale) throw new Error('[Vuetify] Could not find injected rtl instance')

  return { isRtl: locale.isRtl, rtlClasses: locale.rtlClasses }
}
