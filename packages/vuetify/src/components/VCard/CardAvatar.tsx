// Components
import { VAvatar } from '@/components/VAvatar'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { callEvent } from '@/util'

// Types
import type { EventProp } from '@/util'

type names = 'prepend' | 'append'

type CardAvatarProps<T extends names> = {
  title: string | number | undefined
} & {
  [K in `${T}Avatar`]: string | undefined
} & {
  [K in `onClick:${T}`]: EventProp | undefined
}

type Listeners<T extends {}, U = keyof T> = U extends `onClick:${infer V extends names}` ? V : never

export function useCardAvatar<T extends {}, K extends names = Listeners<T>> (props: T & CardAvatarProps<K>) {
  const { t } = useLocale()

  function CardAvatar ({ name }: { name: Extract<names, K> }) {
    const localeKey = {
      prepend: 'prependAction',
      append: 'appendAction',
    }[name]
    const listener = props[`onClick:${name}`] as EventProp | undefined

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return

      e.preventDefault()
      e.stopPropagation()
      callEvent(listener, new PointerEvent('click', e))
    }

    const label = listener && localeKey
      ? t(`$vuetify.card.${localeKey}`, props.title ?? '')
      : undefined

    return (
      <VAvatar
        image={ props[`${name}Avatar`] }
        aria-label={ label }
        onClick={ listener }
        onKeydown={ onKeydown }
      />
    )
  }

  return { CardAvatar }
}
