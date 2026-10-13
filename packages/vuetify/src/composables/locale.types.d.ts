// Types
import type { Ref, ShallowRef } from 'vue'

export interface LocaleMessages {
  [key: string]: LocaleMessages | string
}

export interface LocaleOptions {
  decimalSeparator?: string
  numericGroupSeparator?: string
  messages?: LocaleMessages
  locale?: string
  fallback?: string
  adapter?: LocaleInstance
}

export interface LocaleInstance {
  name: string
  decimalSeparator: ShallowRef<string>
  numericGroupSeparator: ShallowRef<string>
  messages: Ref<LocaleMessages>
  current: Ref<string>
  fallback: Ref<string>
  t: (key: string, ...params: unknown[]) => string
  n: (value: number) => string
  provide: (props: LocaleOptions) => LocaleInstance
}
