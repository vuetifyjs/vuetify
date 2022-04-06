// Utilities
import {
  HexToHSVA,
  HSLAtoHSVA,
  HSVAtoHex,
  HSVAtoHSLA,
  HSVAtoRGBA,
  parseHex,
  RGBAtoHSVA,
} from '@/util/colorUtils'

// Types
import type {
  HSLA,
  HSVA,
  RGBA,
} from '@/util/colorUtils'

function has (obj: object, key: string[]) {
  return key.every(k => obj.hasOwnProperty(k))
}

export function parseColor (color: any): HSVA | null {
  if (!color) return null

  let hsva: HSVA | null = null

  if (typeof color === 'string') {
    const hex = parseHex(color)

    hsva = HexToHSVA(hex)
  }

  if (typeof color === 'object') {
    if (has(color, ['r', 'g', 'b'])) {
      hsva = RGBAtoHSVA(color)
    } else if (has(color, ['h', 's', 'l'])) {
      hsva = HSLAtoHSVA(color)
    } else if (has(color, ['h', 's', 'v'])) {
      hsva = color
    }
  }

  return hsva != null ? { ...hsva, a: hsva.a ?? 1 } : null
}

function stripAlpha (color: any, stripAlpha: boolean) {
  if (stripAlpha) {
    const { a, ...rest } = color

    return rest
  }

  return color
}

export function extractColor (color: HSVA, input: any) {
  if (input == null || typeof input === 'string') {
    const hex = HSVAtoHex(color)

    if (color.a === 1) return hex.slice(0, 7)
    else return hex
  }

  if (typeof input === 'object') {
    let converted

    if (has(input, ['r', 'g', 'b'])) converted = HSVAtoRGBA(color)
    else if (has(input, ['h', 's', 'l'])) converted = HSVAtoHSLA(color)
    else if (has(input, ['h', 's', 'v'])) converted = color

    return stripAlpha(converted, !has(input, ['a']))
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
  from: (color: any) => HSVA
  to: (color: HSVA) => any
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
      getValue: (c: RGBA) => Math.round(c.r),
      getColor: (c: RGBA, v: string): RGBA => ({ ...c, r: Number(v) }),
    },
    {
      label: 'G',
      max: 255,
      step: 1,
      getValue: (c: RGBA) => Math.round(c.g),
      getColor: (c: RGBA, v: string): RGBA => ({ ...c, g: Number(v) }),
    },
    {
      label: 'B',
      max: 255,
      step: 1,
      getValue: (c: RGBA) => Math.round(c.b),
      getColor: (c: RGBA, v: string): RGBA => ({ ...c, b: Number(v) }),
    },
    {
      label: 'A',
      max: 1,
      step: 0.01,
      getValue: (c: RGBA) => Math.round(c.a * 100) / 100,
      getColor: (c: RGBA, v: string): RGBA => ({ ...c, a: Number(v) }),
    },
  ],
  to: HSVAtoRGBA,
  from: RGBAtoHSVA,
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
      getValue: (c: HSLA) => Math.round(c.h),
      getColor: (c: HSLA, v: string): HSLA => ({ ...c, h: Number(v) }),
    },
    {
      label: 'S',
      max: 1,
      step: 0.01,
      getValue: (c: HSLA) => Math.round(c.s * 100) / 100,
      getColor: (c: HSLA, v: string): HSLA => ({ ...c, s: Number(v) }),
    },
    {
      label: 'L',
      max: 1,
      step: 0.01,
      getValue: (c: HSLA) => Math.round(c.l * 100) / 100,
      getColor: (c: HSLA, v: string): HSLA => ({ ...c, l: Number(v) }),
    },
    {
      label: 'A',
      max: 1,
      step: 0.01,
      getValue: (c: HSLA) => Math.round(c.a * 100) / 100,
      getColor: (c: HSLA, v: string): HSLA => ({ ...c, a: Number(v) }),
    },
  ],
  to: HSVAtoHSLA,
  from: HSLAtoHSVA,
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
  to: HSVAtoHex,
  from: HexToHSVA,
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

export const modes: Record<string, ColorPickerMode> = {
  rgb,
  rgba,
  hsl,
  hsla,
  hex,
  hexa,
}
