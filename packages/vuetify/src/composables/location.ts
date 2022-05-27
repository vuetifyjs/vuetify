import type { MaybeRef } from '@/util'
import { propsFactory } from '@/util'
import { computed, unref } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import type { Anchor } from '@/components/VOverlay/util/anchor'
import { parseAnchor } from '@/components/VOverlay/util/anchor'
import { useRtl } from '@/composables/rtl'

const oppositeMap = {
  center: 'center',
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const

export interface LocationProps {
  location: Anchor | undefined
}

export const makeLocationProps = propsFactory({
  location: String as PropType<Anchor>,
}, 'location')

export function useLocation (props: LocationProps, opposite = false, offset: MaybeRef<number> = 0) {
  const { isRtl } = useRtl()

  function toPhysical (side: string) {
    return (
      side === 'start' ? (isRtl.value ? 'right' : 'left')
      : side === 'end' ? (isRtl.value ? 'left' : 'right')
      : side
    ) as 'right' | 'left' | 'top' | 'bottom' | 'center'
  }

  const locationStyles = computed(() => {
    if (!props.location) return {}

    const anchor = parseAnchor(
      props.location.split(' ').length > 1
        ? props.location
        : `${props.location} center` as Anchor
    )

    const side = toPhysical(anchor.side)
    const align = toPhysical(anchor.align)

    const styles = {} as CSSProperties

    if (side !== 'center') {
      if (opposite) styles[oppositeMap[side]] = `calc(100% - ${unref(offset)}px)`
      else styles[side] = 0
    }
    if (align !== 'center') {
      if (opposite) styles[oppositeMap[align]] = `calc(100% - ${unref(offset)}px)`
      else styles[align] = 0
    } else {
      if (side === 'center') styles.top = styles.left = '50%'
      else {
        styles[({
          top: 'left',
          bottom: 'left',
          left: 'top',
          right: 'top',
        } as const)[side]] = '50%'
      }
      styles.transform = {
        top: 'translateX(-50%)',
        bottom: 'translateX(-50%)',
        left: 'translateY(-50%)',
        right: 'translateY(-50%)',
        center: 'translate(-50%, -50%)',
      }[side]
    }

    return styles
  })

  return { locationStyles }
}
