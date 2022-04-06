import { ref } from 'vue'

import type { LocaleAdapter, LocaleInstance } from '@/composables/locale'
import type { RtlOptions } from '@/composables/rtl'
import type { createIntl, IntlShape } from '@formatjs/intl'

type VueIntlAdapterOptions = {
  createIntl: typeof createIntl
  useIntl: any
  provideIntl: any
  locale: string
  defaultLocale: string
  messages: Record<string, Record<string, string>>
} & RtlOptions

function wrapScope (scope: IntlShape<string>): LocaleInstance {
  const current = ref(scope.locale)
  const fallback = ref(scope.defaultLocale)
  const messages = ref(scope.messages)

  return {
    current,
    fallback,
    messages: messages as any,
    t: (id, ...params) => {
      return scope.formatMessage({ id }, params.reduce<Record<string, unknown>>((obj, value, index) => ({ ...obj, [index]: value }), {}))
    },
    n: value => scope.formatNumber(value),
  }
}

/**
 * There is no reactivity in this adapter, because vue-intl package does not seem to support it
 */
export function createVueIntlAdapter ({
  createIntl,
  useIntl,
  provideIntl,
  locale,
  defaultLocale,
  messages,
  ...rest
}: VueIntlAdapterOptions): (LocaleAdapter & RtlOptions) {
  return {
    createRoot: () => {
      return wrapScope(createIntl({
        locale,
        defaultLocale,
        messages: messages[locale],
      }))
    },
    getScope: () => {
      const scope = useIntl()
      return wrapScope(scope)
    },
    createScope: (props = {}) => {
      const newScope = createIntl({
        locale: props.locale ?? locale,
        defaultLocale: props.fallbackLocale ?? defaultLocale,
        messages: messages[props.locale ?? locale],
      })

      provideIntl(newScope)

      return wrapScope(newScope)
    },
    ...rest,
  }
}
