// Utilities
import {
  HSVA,
  HSVAtoRGBA,
  HSVAtoHex,
  RGBA,
  Hex,
  RGBAtoHSVA,
  HexToHSVA,
  HSLA,
  HSVAtoHSLA,
  RGBAtoHex,
  HSLAtoHSVA,
  parseHex
} from '../../../util/colorUtils'

export interface VColorPickerColor {
  alpha: number
  hex: Hex
  hsla: HSLA
  hsva: HSVA
  hue: number
  rgba: RGBA
}

export function fromHsva (hsva: HSVA) {
  return {
    alpha: hsva[3],
    hex: HSVAtoHex(hsva),
    hsla: HSVAtoHSLA(hsva),
    hsva,
    hue: hsva[0],
    rgba: HSVAtoRGBA(hsva)
  }
}

export function fromHsla (hsla: HSLA) {
  const hsva = HSLAtoHSVA(hsla)
  return {
    alpha: hsva[3],
    hex: HSVAtoHex(hsva),
    hsla,
    hsva,
    hue: hsva[0],
    rgba: HSVAtoRGBA(hsva)
  }
}

export function fromRgba (rgba: RGBA) {
  const hsva = RGBAtoHSVA(rgba)
  return {
    alpha: hsva[3],
    hex: RGBAtoHex(rgba),
    hsla: HSVAtoHSLA(hsva),
    hsva,
    hue: hsva[0],
    rgba
  }
}

export function fromHex (hex: Hex) {
  const hsva = HexToHSVA(hex)
  return {
    alpha: hsva[3],
    hex,
    hsla: HSVAtoHSLA(hsva),
    hsva,
    hue: hsva[0],
    rgba: HSVAtoRGBA(hsva)
  }
}

function has (obj: object, key: string[]) {
  return key.every(k => obj.hasOwnProperty(k))
}

export function parseColor (color: any) {
  if (!color) return fromRgba([255, 0, 0, 1])

  if (typeof color === 'string') {
    return fromHex(parseHex(color))
  }

  if (typeof color === 'object') {
    if (color.hasOwnProperty('alpha')) return color

    const a = color.hasOwnProperty('a') ? parseFloat(color.a) : 1

    if (has(color, ['r', 'g', 'b'])) {
      return fromRgba([
        parseInt(color.r, 10),
        parseInt(color.g, 10),
        parseInt(color.b, 10),
        a
      ])
    } else if (has(color, ['h', 's', 'l'])) {
      return fromHsla([
        parseInt(color.h, 10),
        parseFloat(color.s),
        parseFloat(color.l),
        a
      ])
    } else if (has(color, ['h', 's', 'v'])) {
      return fromHsva([
        parseInt(color.h, 10),
        parseFloat(color.s),
        parseFloat(color.v),
        a
      ])
    }
  }

  return fromRgba([255, 0, 0, 1])
}
