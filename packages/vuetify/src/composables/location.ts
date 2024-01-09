// Composables
import { useRtl } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import { parseAnchor, propsFactory } from '@/util'

// Types
import type { CSSProperties, PropType } from 'vue'
import type { Anchor } from '@/util'

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

export function useLocation (props: LocationProps, opposite = false, offset?: (side: string) => number) {
  const { isRtl } = useRtl()

  const locationStyles = computed(() => {
    if (!props.location) return {}

    const { side, align } = parseAnchor(
      props.location.split(' ').length > 1
        ? props.location
        : `${props.location} center` as Anchor,
      isRtl.value
    )

    function getOffset (side: string) {
      return offset
        ? offset(side)
        : 0
    }

    const styles = {} as CSSProperties

    if (side !== 'center') {
      if (opposite) styles[oppositeMap[side]] = `calc(100% - ${getOffset(side)}px)`
      else styles[side] = 0
    }
    if (align !== 'center') {
      if (opposite) styles[oppositeMap[align]] = `calc(100% - ${getOffset(align)}px)`
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
