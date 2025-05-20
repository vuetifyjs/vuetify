// Utilities
import { computed, toValue } from 'vue'
import { clamp } from '@/util'
import { roundedArc } from '@/util/svg-arc-corners'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { PieItem, PieSegmentProps } from './types'

export function formatTextTemplate (template: string, item?: PieItem) {
  return item
    ? template
      .replaceAll('[title]', item.title)
      .replaceAll('[value]', String(item.value))
    : undefined
}

export function usePieArc (props: PieSegmentProps, isHovering: Ref<boolean>) {
  const hoverZoomRatio = computed(() => clamp(props.hoverScale ?? 0, 0, 0.25))
  const normalizedValue = computed(() => clamp(props.value - 100 * props.gap / 360, 0.01, 99.99))
  const normalizedInnerCut = computed(() => clamp(props.innerCut, props.rounded > 0 ? 20 : 0, 100))

  const radians = computed(() => (360 * (-normalizedValue.value / 100) + 90) * (Math.PI / 180))
  const x = computed(() => 50 + 50 * Math.cos(radians.value))
  const y = computed(() => 50 - 50 * Math.sin(radians.value))

  const arcWidth = computed(() => (50 - normalizedInnerCut.value / 2) * (isHovering.value ? 1 : (1 - hoverZoomRatio.value)))
  const sliceRadius = computed(() => normalizedInnerCut.value / 4 * (isHovering.value ? 1 : (1 - hoverZoomRatio.value)))

  return {
    hoverZoomRatio,
    normalizedValue,
    normalizedInnerCut,
    x,
    y,
    arcWidth,
    sliceRadius,
  }
}

export function useOuterSlicePath ({
  angle,
  radius,
  size,
  width,
  rounded,
}: {
  angle: MaybeRefOrGetter<number>
  radius: MaybeRefOrGetter<number>
  size: MaybeRefOrGetter<number>
  width: MaybeRefOrGetter<number>
  rounded: MaybeRefOrGetter<number>
}) {
  return computed(() =>
    roundedArc(
      [50, 50],
      toValue(radius),
      toValue(angle),
      toValue(angle) + 360 * toValue(size) / 100, // angle end,
      toValue(width),
      toValue(rounded),
    )
  )
}
