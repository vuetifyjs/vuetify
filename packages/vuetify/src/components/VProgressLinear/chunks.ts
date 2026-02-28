// Utilities
import { computed, toRef, toValue } from 'vue'
import { clamp, convertToUnit, propsFactory } from '@/util'

// Types
import type { MaybeRefOrGetter } from 'vue'

export interface ChunksProps {
  chunkCount: number | string
  chunkWidth: number | string
  chunkGap: number | string
}

// Composables
export const makeChunksProps = propsFactory({
  chunkCount: {
    type: [Number, String],
    default: null,
  },
  chunkWidth: {
    type: [Number, String],
    default: null,
  },
  chunkGap: {
    type: [Number, String],
    default: 4,
  },
}, 'chunks')

export function useChunks (
  props: ChunksProps,
  containerWidth: MaybeRefOrGetter<number | undefined>,
  value: MaybeRefOrGetter<number>,
  bufferValue: MaybeRefOrGetter<number>,
  height: MaybeRefOrGetter<number>,
  rounded: MaybeRefOrGetter<boolean>,
) {
  const isSplit = toRef(() => props.chunkCount === 'split')
  const hasChunks = toRef(() => !isSplit.value && (!!props.chunkCount || !!props.chunkWidth))

  const chunkWidth = computed(() => {
    const containerSize = toValue(containerWidth)
    if (!containerSize) return 0

    if (props.chunkCount) {
      const count = Number(props.chunkCount)
      const availableWidth = containerSize - Number(props.chunkGap) * (count - 1)
      return availableWidth / count
    }

    return Number(props.chunkWidth)
  })

  const chunkGap = toRef(() => Number(props.chunkGap))

  const chunksMaskStyles = computed(() => {
    if (!hasChunks.value) return {}

    const chunkGapPx = convertToUnit(chunkGap.value)
    const chunkWidthPx = convertToUnit(chunkWidth.value)

    return {
      maskRepeat: 'repeat-x',
      maskImage: `linear-gradient(90deg, #000, #000 ${chunkWidthPx}, transparent ${chunkWidthPx}, transparent)`,
      maskSize: `calc(${chunkWidthPx} + ${chunkGapPx}) 100%`,
    }
  })

  const splitStyles = computed(() => {
    if (!isSplit.value) return undefined

    const h = toValue(height)
    const isRounded = toValue(rounded)
    const halfGap = convertToUnit(chunkGap.value / 2)
    const r = isRounded ? convertToUnit(h / 2) : undefined

    const val = toValue(value)
    if (val <= 0 || val >= 100) return undefined

    const buf = toValue(bufferValue)
    const split = convertToUnit(val, '%')
    const hasBuffer = buf > val && buf < 100
    const bufSplit = convertToUnit(buf, '%')

    return {
      bar: {
        width: `calc(${split} - ${halfGap})`,
        borderRadius: r,
      },
      buffer: hasBuffer ? {
        left: `calc(${split} + ${halfGap})`,
        width: `calc(${bufSplit} - ${split} - ${convertToUnit(chunkGap.value)})`,
        borderRadius: r,
      } : undefined,
      background: {
        left: `calc(${hasBuffer ? bufSplit : split} + ${halfGap})`,
        width: `calc(100% - ${hasBuffer ? bufSplit : split} - ${halfGap})`,
        borderRadius: r,
      },
    }
  })

  function snapValueToChunk (val: number) {
    if (isSplit.value) return val

    const containerSize = toValue(containerWidth)
    if (!containerSize) return val

    const gapRelativeSize = 100 * chunkGap.value / containerSize
    const chunkRelativeSize = 100 * (chunkWidth.value + chunkGap.value) / containerSize
    const filledChunks = Math.floor((val + gapRelativeSize) / chunkRelativeSize)
    return clamp(0, filledChunks * chunkRelativeSize - gapRelativeSize / 2, 100)
  }

  return {
    hasChunks: toRef(() => hasChunks.value || isSplit.value),
    isSplit,
    chunksMaskStyles,
    splitStyles,
    snapValueToChunk,
  }
}
