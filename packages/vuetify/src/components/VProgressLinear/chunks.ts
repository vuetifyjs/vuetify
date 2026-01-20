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
) {
  const hasChunks = toRef(() => !!props.chunkCount || !!props.chunkWidth)

  const chunkWidth = computed(() => {
    const containerSize = toValue(containerWidth)
    if (!containerSize) {
      return 0
    }

    if (!props.chunkCount) {
      return Number(props.chunkWidth)
    }

    const count = Number(props.chunkCount)
    const availableWidth = containerSize - Number(props.chunkGap) * (count - 1)
    return availableWidth / count
  })

  const chunkGap = toRef(() => Number(props.chunkGap))
  const chunksMaskStyles = computed(() => {
    if (!hasChunks.value) {
      return {}
    }

    const chunkGapPx = convertToUnit(chunkGap.value)
    const chunkWidthPx = convertToUnit(chunkWidth.value)

    return {
      maskRepeat: 'repeat-x',
      maskImage: `linear-gradient(90deg, #000, #000 ${chunkWidthPx}, transparent ${chunkWidthPx}, transparent)`,
      maskSize: `calc(${chunkWidthPx} + ${chunkGapPx}) 100%`,
    }
  })

  function snapValueToChunk (val: number) {
    const containerSize = toValue(containerWidth)
    if (!containerSize) {
      return val
    }

    const gapRelativeSize = 100 * chunkGap.value / containerSize
    const chunkRelativeSize = 100 * (chunkWidth.value + chunkGap.value) / containerSize
    const filledChunks = Math.floor((val + gapRelativeSize) / chunkRelativeSize)
    return clamp(0, filledChunks * chunkRelativeSize - gapRelativeSize / 2, 100)
  }

  return {
    hasChunks,
    chunksMaskStyles,
    snapValueToChunk,
  }
}
