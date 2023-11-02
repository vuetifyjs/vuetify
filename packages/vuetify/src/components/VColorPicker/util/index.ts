// Utilities
import {
  HexToHSV,
  HSLtoHSV,
  HSVtoHex,
  HSVtoHSL,
  HSVtoRGB,
  RGBtoHSV,
} from '@/util/colorUtils'
import { has } from '@/util/helpers'

// Types
import type { HSL, HSV, RGB } from '@/util/colorUtils'

function stripAlpha (color: any, stripAlpha: boolean) {
  if (stripAlpha) {
    const { a, ...rest } = color

    return rest
  }

  return color
}

export function extractColor (color: HSV, input: any) {
  if (input == null || typeof input === 'string') {
    const hex = HSVtoHex(color)

    if (color.a === 1) return hex.slice(0, 7)
    else return hex
  }

  if (typeof input === 'object') {
    let converted

    if (has(input, ['r', 'g', 'b'])) converted = HSVtoRGB(color)
    else if (has(input, ['h', 's', 'l'])) converted = HSVtoHSL(color)
    else if (has(input, ['h', 's', 'v'])) converted = color

    return stripAlpha(converted, !has(input, ['a']) && color.a === 1)
  }

  return color
}

export function hasAlpha (color: any) {
  if (!color) return false

  if (typeof color === 'string') {
    return color.length > 7
  }

  if (typeof color === 'object') {
    return has(color, ['a']) || has(color, ['alpha'])
  }

  return false
}

export const nullColor = { h: 0, s: 0, v: 1, a: 1 }

export type ColorPickerMode = {
  inputProps: Record<string, unknown>
  inputs: {
    [key: string]: any
    getValue: (color: any) => number | string
    getColor: (color: any, v: string) => any
  }[]
  from: (color: any) => HSV
  to: (color: HSV) => any
}

const rgba: ColorPickerMode = {
  inputProps: {
    type: 'number',
    min: 0,
  },
  inputs: [
    {
      label: 'R',
      max: 255,
      step: 1,
      getValue: (c: RGB) => Math.round(c.r),
      getColor: (c: RGB, v: string): RGB => ({ ...c, r: Number(v) }),
    },
    {
      label: 'G',
      max: 255,
      step: 1,
      getValue: (c: RGB) => Math.round(c.g),
      getColor: (c: RGB, v: string): RGB => ({ ...c, g: Number(v) }),
    },
    {
      label: 'B',
      max: 255,
      step: 1,
      getValue: (c: RGB) => Math.round(c.b),
      getColor: (c: RGB, v: string): RGB => ({ ...c, b: Number(v) }),
    },
    {
      label: 'A',
      max: 1,
      step: 0.01,
      getValue: ({ a }: RGB) => a != null ? Math.round(a * 100) / 100 : 1,
      getColor: (c: RGB, v: string): RGB => ({ ...c, a: Number(v) }),
    },
  ],
  to: HSVtoRGB,
  from: RGBtoHSV,
}

const rgb = {
  ...rgba,
  inputs: rgba.inputs?.slice(0, 3),
}

const hsla: ColorPickerMode = {
  inputProps: {
    type: 'number',
    min: 0,
  },
  inputs: [
    {
      label: 'H',
      max: 360,
      step: 1,
      getValue: (c: HSL) => Math.round(c.h),
      getColor: (c: HSL, v: string): HSL => ({ ...c, h: Number(v) }),
    },
    {
      label: 'S',
      max: 1,
      step: 0.01,
      getValue: (c: HSL) => Math.round(c.s * 100) / 100,
      getColor: (c: HSL, v: string): HSL => ({ ...c, s: Number(v) }),
    },
    {
      label: 'L',
      max: 1,
      step: 0.01,
      getValue: (c: HSL) => Math.round(c.l * 100) / 100,
      getColor: (c: HSL, v: string): HSL => ({ ...c, l: Number(v) }),
    },
    {
      label: 'A',
      max: 1,
      step: 0.01,
      getValue: ({ a }: HSL) => a != null ? Math.round(a * 100) / 100 : 1,
      getColor: (c: HSL, v: string): HSL => ({ ...c, a: Number(v) }),
    },
  ],
  to: HSVtoHSL,
  from: HSLtoHSV,
}

const hsl = {
  ...hsla,
  inputs: hsla.inputs.slice(0, 3),
}

const hexa: ColorPickerMode = {
  inputProps: {
    type: 'text',
  },
  inputs: [
    {
      label: 'HEXA',
      getValue: (c: string) => c,
      getColor: (c: string, v: string) => v,
    },
  ],
  to: HSVtoHex,
  from: HexToHSV,
}

const hex = {
  ...hexa,
  inputs: [
    {
      label: 'HEX',
      getValue: (c: string) => c.slice(0, 7),
      getColor: (c: string, v: string) => v,
    },
  ],
}

export const modes = {
  rgb,
  rgba,
  hsl,
  hsla,
  hex,
  hexa,
} satisfies Record<string, ColorPickerMode>
