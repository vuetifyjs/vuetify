// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, shallowRef, toRef, watch } from 'vue'
import { consoleError, createV0Locale, isString } from '@/util'

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

type Bundle = ReturnType<typeof createV0Locale>

function selectLocale (bundle: Bundle, locale: string) {
  if (!bundle.has(locale)) bundle.register({ id: locale })
  if (bundle.selectedId.value !== locale) bundle.select(locale)
}

function createBundle (locale: string, fallbackLocale: string, catalogs: LocaleMessages) {
  const bundle = createV0Locale({
    fallback: fallbackLocale,
    messages: catalogs as Record<string, Record<string, string>>,
  })
  selectLocale(bundle, locale)
  return bundle
}

const createTranslateFunction = (
  current: Ref<string>,
  fallback: Ref<string>,
  messages: Ref<LocaleMessages>,
) => {
  const bundle = shallowRef(createBundle(current.value, fallback.value, messages.value))

  watch(current, value => selectLocale(bundle.value, value), { flush: 'sync' })

  // Fallback is fixed inside createLocale, and the catalogs are copied in at
  // construction. Rebuild when either changes so t() keeps reading them.
  watch([fallback, messages], () => {
    bundle.value = createBundle(current.value, fallback.value, messages.value)
  }, { deep: true, flush: 'sync' })

  return (key: string, ...params: unknown[]) => {
    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params)
    }

    const found = bundle.value.ti(key.slice(LANG_PREFIX.length), ...params)

    if (!isString(found)) {
      consoleError(`Translation key "${key}" not found in fallback`)
      return key
    }

    return found
  }
}

// v0's n() drops Intl options, ignores the fallback locale, and skips Intl
// when there is no window. Pagination renders these numbers on the server.
function createNumberFunction (current: Ref<string>, fallback: Ref<string>) {
  return (value: number, options?: Intl.NumberFormatOptions) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options)

    return numberFormat.format(value)
  }
}

function inferDecimalSeparator (current: Ref<string>, fallback: Ref<string>) {
  const format = createNumberFunction(current, fallback)
  return format(0.1).includes(',') ? ',' : '.'
}

function inferNumericGroupSeparator (current: Ref<string>, fallback: Ref<string>) {
  return new Intl.NumberFormat([current.value, fallback.value], { useGrouping: true })
    .formatToParts(10000)
    .find(p => p.type === 'group')?.value ?? ' '
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
      decimalSeparator: toRef(() => inferDecimalSeparator(current, fallback)),
      numericGroupSeparator: toRef(() => inferNumericGroupSeparator(current, fallback)),
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
    decimalSeparator: toRef(() => options?.decimalSeparator ?? inferDecimalSeparator(current, fallback)),
    numericGroupSeparator: toRef(() => options?.numericGroupSeparator ?? inferNumericGroupSeparator(current, fallback)),
    t: createTranslateFunction(current, fallback, messages),
    n: createNumberFunction(current, fallback),
    provide: createProvideFunction({ current, fallback, messages }),
  }
}
