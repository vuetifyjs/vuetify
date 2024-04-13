// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { useLocale } from '@/composables/locale'

// Types
import type { IconValue } from '@/composables/icons'

type names = 'clear' | 'prepend' | 'append' | 'appendInner' | 'prependInner'

type EventProp<T = (...args: any[]) => any> = T | T[]
type InputIconProps<T extends names> = {
  label: string | undefined
} & {
  [K in `${T}Icon`]: IconValue | undefined
} & {
  [K in `onClick:${T}`]: EventProp | undefined
}

type Listeners<T extends {}, U = keyof T> = U extends `onClick:${infer V extends names}` ? V : never

export function useInputIcon<T extends {}, K extends names = Listeners<T>> (props: T & InputIconProps<K>) {
  const { t } = useLocale()

  function InputIcon ({ name }: { name: Extract<names, K> }) {
    const localeKey = {
      prepend: 'prependAction',
      prependInner: 'prependAction',
      append: 'appendAction',
      appendInner: 'appendAction',
      clear: 'clear',
    }[name]
    const listener = props[`onClick:${name}`]
    const label = listener && localeKey
      ? t(`$vuetify.input.${localeKey}`, props.label ?? '')
      : undefined

    return (
      <VIcon
        icon={ props[`${name}Icon`] }
        aria-label={ label }
        onClick={ listener }
      />
    )
  }

  return { InputIcon }
}
