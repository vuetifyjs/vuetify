// Utilities
import { clamp } from '@/util'

// Types
import type { ColorMixSpace, ColorScale, ColorScaleStop, HueInterpolation, LinearColorScale } from './colorScale.types'

export type { ColorMixSpace, ColorScale, ColorScaleStop, HueInterpolation, LinearColorScale }

export function isLinearColorScale (scale: ColorScale | undefined): scale is LinearColorScale {
  return !!scale && !Array.isArray(scale) && 'from' in scale && 'to' in scale
}

export function getInterpolationMethod (scale: LinearColorScale): string {
  const space = scale.colorSpace ?? 'srgb'
  const hue = scale.hueInterpolation && 'hsl|hwb|lch|oklch'.includes(space)
    ? ` ${scale.hueInterpolation} hue`
    : ''
  return `in ${space}${hue}`
}

export function getColorFromScale (value: number, scale: ColorScale): string | undefined {
  if (isLinearColorScale(scale)) {
    const { from, to } = scale
    const span = to.min - from.min

    if (span === 0) {
      return value >= to.min
        ? to.color
        : from.color
    }

    const percent = Number(clamp((value - from.min) / span).toFixed(2)) * 100

    if (percent <= 0) return from.color
    if (percent >= 100) return to.color

    return `color-mix(${getInterpolationMethod(scale)}, ${to.color} ${percent}%, ${from.color})`
  }

  return scale.findLast(({ min }) => value >= min)?.color
}
