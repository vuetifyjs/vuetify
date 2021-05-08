import { computed, inject, provide } from 'vue'
import { consoleError, consoleWarn, getObjectValueByPath, wrapInRef } from '@/util'

import en from '@/locale/en'

// Types
import type { App, InjectionKey, Ref } from 'vue'
import type { MaybeRef } from '@/util'

export interface LocaleMessages {
  [key: string]: LocaleMessages | string
}

export interface LocaleOptions {
  defaultLocale?: string
  fallbackLocale?: string
  messages?: LocaleMessages
}

export interface LocaleProps {
  locale?: string
  fallbackLocale?: string
  messages?: LocaleMessages
}

export interface LocaleInstance {
  current: Ref<string>
  fallback: Ref<string>
  messages: Ref<LocaleMessages>
  t: (key: string, ...params: unknown[]) => string
  n: (value: number) => string
}

export interface LocaleAdapter {
  createRoot: (app: App) => LocaleInstance
  getScope: () => LocaleInstance
  createScope: (options?: LocaleProps) => LocaleInstance
}

export const VuetifyLocaleAdapterSymbol: InjectionKey<LocaleAdapter> = Symbol.for('vuetify:locale-adapter')
export const VuetifyLocaleSymbol: InjectionKey<LocaleInstance> = Symbol.for('vuetify:locale')

export function provideLocale (props?: LocaleProps) {
  const adapter = inject(VuetifyLocaleAdapterSymbol)

  if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter')

  return adapter.createScope(props)
}

export function useLocale () {
  const adapter = inject(VuetifyLocaleAdapterSymbol)

  if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter')

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
  messages: Ref<LocaleMessages>,
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

function createNumberFunction (current: Ref<string>, fallback: Ref<string>) {
  return (value: number, options?: Intl.NumberFormatOptions) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options)

    return numberFormat.format(value)
  }
}

export function createDefaultLocaleAdapter (options?: LocaleOptions): LocaleAdapter {
  const createScope = (options: {
    current: MaybeRef<string>
    fallback: MaybeRef<string>
    messages: MaybeRef<LocaleMessages>
  }) => {
    const current = wrapInRef(options.current)
    const fallback = wrapInRef(options.fallback)
    const messages = wrapInRef(options.messages)

    return {
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
    }
  }

  return {
    createRoot: app => {
      const rootScope = createScope({
        current: options?.defaultLocale ?? 'en',
        fallback: options?.fallbackLocale ?? 'en',
        messages: options?.messages ?? { en },
      })

      app.provide(VuetifyLocaleSymbol, rootScope)

      return rootScope
    },
    getScope: () => {
      const currentScope = inject(VuetifyLocaleSymbol)

      if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance')

      return currentScope
    },
    createScope: options => {
      const currentScope = inject(VuetifyLocaleSymbol)

      if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance')

      const newScope = createScope({
        current: computed(() => options?.locale ?? currentScope.current.value),
        fallback: computed(() => options?.locale ?? currentScope.fallback.value),
        messages: computed(() => options?.messages ?? currentScope.messages.value),
      })

      provide(VuetifyLocaleSymbol, newScope)

      return newScope
    },
  }
}
