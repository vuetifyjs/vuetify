// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, shallowRef, watch } from 'vue'
import { consoleError, consoleWarn, getObjectValueByPath } from '@/util'

// Locales
import en from '@/locale/en'

// Types
import type { Ref } from 'vue'
import type { LocaleInstance, LocaleMessages, LocaleOptions } from '@/composables/locale'

const LANG_PREFIX = '$vuetify.'

const replace = (str: string, params: unknown[]) => {
  return str.replace(/\{(\d+)\}/g, (match: string, index: string) => {
    return String(params[Number(index)])
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

function useProvided <T> (props: any, prop: string, provided: Ref<T>) {
  const internal = useProxiedModel(props, prop, props[prop] ?? provided.value)

  // TODO: Remove when defaultValue works
  internal.value = props[prop] ?? provided.value

  watch(provided, v => {
    if (props[prop] == null) {
      internal.value = provided.value
    }
  })

  return internal as Ref<T>
}

function createProvideFunction (state: { current: Ref<string>, fallback: Ref<string>, messages: Ref<LocaleMessages> }) {
  return (props: LocaleOptions): LocaleInstance => {
    const current = useProvided(props, 'locale', state.current)
    const fallback = useProvided(props, 'fallback', state.fallback)
    const messages = useProvided(props, 'messages', state.messages)

    return {
      name: 'vuetify',
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: createProvideFunction({ current, fallback, messages }),
    }
  }
}

export function createVuetifyAdapter (options?: LocaleOptions): LocaleInstance {
  const current = shallowRef(options?.locale ?? 'en')
  const fallback = shallowRef(options?.fallback ?? 'en')
  const messages = ref({ en, ...options?.messages })

  return {
    name: 'vuetify',
    current,
    fallback,
    messages,
    t: createTranslateFunction(current, fallback, messages),
    n: createNumberFunction(current, fallback),
    provide: createProvideFunction({ current, fallback, messages }),
  }
}
