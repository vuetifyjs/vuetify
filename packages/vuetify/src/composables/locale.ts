import { computed, inject, isRef, provide, ref } from 'vue'
import { getObjectValueByPath, consoleError, consoleWarn } from '@/util'

import en from '@/locale/en'

// Types
import type { App, InjectionKey, Ref } from 'vue'

export interface LocaleOptions {
  defaultLocale?: string
  fallbackLocale?: string
  messages?: Record<string, any>
}

export interface LocaleProps {
  locale?: string
  fallbackLocale?: string
  messages?: Record<string, any>
}

export interface LocaleInstance {
  locale: Ref<string>
  fallbackLocale: Ref<string>
  messages: Ref<Record<string, any>>
  t: (key: string, ...params: unknown[]) => string
}

export interface LocaleAdapter {
  createRoot: (app: App) => LocaleInstance
  getScope: () => LocaleInstance
  createScope: (options?: LocaleProps) => LocaleInstance
  rtl?: Record<string, boolean>
}

export const VuetifyLocaleAdapterSymbol: InjectionKey<LocaleAdapter> = Symbol.for('vuetify:locale-adapter')
export const VuetifyLocaleSymbol: InjectionKey<LocaleInstance> = Symbol.for('vuetify:locale')

export function provideLocale (props?: LocaleProps) {
  const adapter = inject(VuetifyLocaleAdapterSymbol)

  if (!adapter) throw new Error('Could not find injected locale adapter')

  return adapter.createScope(props)
}

export function useLocale () {
  const adapter = inject(VuetifyLocaleAdapterSymbol)

  if (!adapter) throw new Error('Could not find injected locale adapter')

  return adapter.getScope()
}

function isLocaleAdapter (x: any): x is LocaleAdapter {
  return !!x && x.hasOwnProperty('getScope') && x.hasOwnProperty('createScope') && x.hasOwnProperty('createRoot')
}

export function createLocaleAdapter (app: App, options?: LocaleOptions | LocaleAdapter) {
  const adapter = isLocaleAdapter(options) ? options : createDefaultLocaleAdapter(options)

  const rootInstance = adapter.createRoot(app)

  return { adapter, rootInstance }
}

const LANG_PREFIX = '$vuetify.'

const replace = (str: string, params: unknown[]) => {
  return str.replace(/\{(\d+)\}/g, (match: string, index: string) => {
    /* istanbul ignore next */
    return String(params[+index])
  })
}

const createTranslateFunction = (
  current: Ref<string>,
  fallback: Ref<string>,
  messages: Ref<Record<string, any>>,
) => {
  return (key: string, ...params: unknown[]) => {
    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params)
    }

    const shortKey = key.replace(LANG_PREFIX, '')
    const currentLocale = current.value && messages.value[current.value]
    const fallbackLocale = fallback.value && messages.value[fallback.value]

    let str: string = getObjectValueByPath(currentLocale, shortKey, null)

    if (!str) {
      consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`)
      str = getObjectValueByPath(fallbackLocale, shortKey, null)
    }

    if (!str) {
      consoleError(`Translation key "${key}" not found in fallback`)
      str = key
    }

    if (typeof str !== 'string') {
      consoleError(`Translation key "${key}" has a non-string value`)
      str = key
    }

    return replace(str, params)
  }
}

type MaybeRef<T> = T | Ref<T>

type ExtractMaybeRef<P> = P extends MaybeRef<infer T> ? T : P;

const wrapInRef = <T>(x: T) => {
  return (isRef(x) ? x : ref(x)) as Ref<ExtractMaybeRef<T>>
}

export function createDefaultLocaleAdapter (options?: LocaleOptions): LocaleAdapter {
  const createScope = (options: {
    locale: MaybeRef<string>
    fallbackLocale: MaybeRef<string>
    messages: MaybeRef<Record<string, any>>
  }) => {
    const locale = wrapInRef(options.locale)
    const fallbackLocale = wrapInRef(options.fallbackLocale)
    const messages = wrapInRef(options.messages)

    return { locale, fallbackLocale, messages, t: createTranslateFunction(locale, fallbackLocale, messages) }
  }

  return {
    createRoot: app => {
      const rootScope = createScope({
        locale: options?.defaultLocale ?? 'en',
        fallbackLocale: options?.fallbackLocale ?? 'en',
        messages: options?.messages ?? { en },
      })

      app.provide(VuetifyLocaleSymbol, rootScope)

      return rootScope
    },
    getScope: () => {
      const currentScope = inject(VuetifyLocaleSymbol)

      if (!currentScope) throw new Error('Could not find injected locale')

      return currentScope
    },
    createScope: options => {
      const currentScope = inject(VuetifyLocaleSymbol)

      if (!currentScope) throw new Error('Could not find injected locale')

      const newScope = createScope({
        locale: computed(() => options?.locale ?? currentScope.locale.value),
        fallbackLocale: computed(() => options?.locale ?? currentScope.fallbackLocale.value),
        messages: computed(() => options?.messages ?? currentScope.messages.value),
      })

      provide(VuetifyLocaleSymbol, newScope)

      return newScope
    },
  }
}
