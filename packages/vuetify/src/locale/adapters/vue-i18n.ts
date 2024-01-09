// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { watch } from 'vue'

// Types
import type { Ref } from 'vue'
import type { I18n, useI18n } from 'vue-i18n'
import type { LocaleInstance, LocaleMessages, LocaleOptions } from '@/composables/locale'

type VueI18nAdapterParams = {
  i18n: I18n<any, {}, {}, string, false>
  useI18n: typeof useI18n
}

function useProvided <T> (props: any, prop: string, provided: Ref<T>) {
  const internal = useProxiedModel(props, prop)

  internal.value = props[prop] ?? provided.value

  watch(provided, v => {
    if (props[prop] == null) {
      internal.value = v
    }
  })

  return internal as Ref<T>
}

function createProvideFunction (data: {
  current: Ref<string>
  fallback: Ref<string>
  messages: Ref<LocaleMessages>
  useI18n: typeof useI18n
}) {
  return (props: LocaleOptions): LocaleInstance => {
    const current = useProvided(props, 'locale', data.current)
    const fallback = useProvided(props, 'fallback', data.fallback)
    const messages = useProvided(props, 'messages', data.messages)

    const i18n = data.useI18n({
      locale: current.value,
      fallbackLocale: fallback.value,
      messages: messages.value as any,
      useScope: 'local',
      legacy: false,
      inheritLocale: false,
    })

    watch(current, v => {
      i18n.locale.value = v
    })

    return {
      name: 'vue-i18n',
      current,
      fallback,
      messages,
      t: (key: string, ...params: unknown[]) => i18n.t(key, params),
      n: i18n.n,
      provide: createProvideFunction({ current, fallback, messages, useI18n: data.useI18n }),
    }
  }
}

export function createVueI18nAdapter ({ i18n, useI18n }: VueI18nAdapterParams): LocaleInstance {
  const current = i18n.global.locale
  const fallback = i18n.global.fallbackLocale as Ref<any>
  const messages = i18n.global.messages

  return {
    name: 'vue-i18n',
    current,
    fallback,
    messages,
    // @ts-expect-error Type instantiation is excessively deep and possibly infinite
    t: (key: string, ...params: unknown[]) => i18n.global.t(key, params),
    n: i18n.global.n,
    provide: createProvideFunction({ current, fallback, messages, useI18n }),
  }
}
