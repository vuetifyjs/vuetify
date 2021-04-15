import { computed, watch } from 'vue'

// Types
import type { Composer, I18n, LocaleMessages, useI18n, VueMessageType } from 'vue-i18n'
import type { LocaleAdapter, LocaleInstance } from '@/composables/locale'
import type { RtlOptions } from '@/composables/rtl'

type VueI18nAdapterParams = {
  i18n: I18n<LocaleMessages, unknown, unknown, false>
  useI18n: typeof useI18n
} & RtlOptions

function wrapScope (scope: Composer<LocaleMessages, unknown, unknown, VueMessageType>): LocaleInstance {
  return {
    current: scope.locale,
    fallback: computed(() => {
      // TODO: Handle this better?
      return typeof scope.fallbackLocale.value !== 'string' ? 'en'
        : scope.fallbackLocale.value
    }),
    // TODO: Can this be fixed?
    messages: scope.messages as any,
    t: scope.t,
  }
}

export function createVueI18nAdapter ({ i18n, useI18n, ...rest }: VueI18nAdapterParams): (LocaleAdapter & RtlOptions) {
  return {
    createRoot: () => {
      return wrapScope(i18n.global)
    },
    getScope: () => {
      const scope = useI18n({ legacy: false, useScope: 'parent' }) as Composer<LocaleMessages, unknown, unknown, VueMessageType>

      return wrapScope(scope)
    },
    createScope: (props = {}) => {
      const scope = useI18n({
        legacy: false,
        useScope: 'local',
        messages: (props.messages ?? i18n.global.messages) as any, // TODO: Fix this
        locale: props.locale,
        fallbackLocale: props.fallbackLocale,
        inheritLocale: !props.locale,
      })

      watch(() => props.locale, () => {
        if (props.locale) {
          scope.locale.value = props.locale
        } else {
          scope.inheritLocale = true
        }
      })

      watch(() => props.fallbackLocale, () => {
        if (props.fallbackLocale) {
          scope.fallbackLocale.value = props.fallbackLocale
        }
      })

      return wrapScope(scope)
    },
    ...rest,
  }
}
