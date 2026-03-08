// Utilities
import { computed, toRef, toValue } from 'vue'
import { clamp, convertToUnit, propsFactory } from '@/util'

// Types
import type { MaybeRefOrGetter, PropType } from 'vue'

export interface ChunksProps {
  chunkCount: number | string
  chunkWidth: number | string
  chunkGap: number | string
  variant: 'split' | undefined
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
  variant: {
    type: String as PropType<'split'>,
    default: undefined,
    validator: (v: string) => ['split'].includes(v),
  },
}, 'chunks')

export function useChunks (
  props: ChunksProps,
  containerWidth: MaybeRefOrGetter<number | undefined>,
  value: MaybeRefOrGetter<number>,
  bufferValue: MaybeRefOrGetter<number>,
  height: MaybeRefOrGetter<number>,
  rounded: MaybeRefOrGetter<boolean>,
  reversed: MaybeRefOrGetter<boolean>,
) {
  const isSplit = toRef(() => props.variant === 'split')
  const chunkCount = toRef(() => isSplit.value ? 2 : Number(props.chunkCount) || 0)
  const hasChunks = toRef(() => !isSplit.value && (!!chunkCount.value || !!props.chunkWidth))

  const chunkWidth = computed(() => {
    const containerSize = toValue(containerWidth)
    if (!containerSize) return 0

    if (chunkCount.value) {
      const availableWidth = containerSize - Number(props.chunkGap) * (chunkCount.value - 1)
      return availableWidth / chunkCount.value
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

    const heightValue = toValue(height)
    const isRounded = toValue(rounded)
    const isReversed = toValue(reversed)
    const halfGap = convertToUnit(chunkGap.value / 2)
    const radius = isRounded ? convertToUnit(heightValue / 2) : undefined
    const position = isReversed ? 'right' : 'left'

    const val = toValue(value)
    if (val <= 0 || val >= 100) return undefined

    const buffer = toValue(bufferValue)
    const split = convertToUnit(val, '%')
    const hasBuffer = buffer > val && buffer < 100
    const bufferSplit = convertToUnit(buffer, '%')

    return {
      bar: {
        width: `calc(${split} - ${halfGap})`,
        borderRadius: radius,
      },
      buffer: hasBuffer ? {
        [position]: `calc(${split} + ${halfGap})`,
        width: `calc(${bufferSplit} - ${split} - ${convertToUnit(chunkGap.value)})`,
        borderRadius: radius,
      } : undefined,
      background: {
        [position]: `calc(${hasBuffer ? bufferSplit : split} + ${halfGap})`,
        width: `calc(100% - ${hasBuffer ? bufferSplit : split} - ${halfGap})`,
        borderRadius: radius,
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
    chunkCount,
    chunksMaskStyles,
    splitStyles,
    snapValueToChunk,
  }
}
