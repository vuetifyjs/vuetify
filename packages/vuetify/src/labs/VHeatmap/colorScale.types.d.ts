export type ColorScale = ColorScaleStop[] | LinearColorScale

export interface ColorScaleStop {
  min: number
  color: string
}

export interface LinearColorScale {
  from: ColorScaleStop
  to: ColorScaleStop
  colorSpace?: ColorMixSpace
  hueInterpolation?: HueInterpolation
}

export type ColorMixSpace =
  | 'srgb'
  | 'srgb-linear'
  | 'hsl'
  | 'hwb'
  | 'lab'
  | 'lch'
  | 'oklab'
  | 'oklch'

export type HueInterpolation = 'shorter' | 'longer'

export {}
