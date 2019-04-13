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
  parseHex,
  Hexa
} from '../../../util/colorUtils'

export interface VColorPickerColor {
  alpha: number
  hex: Hex
  hexa: Hexa
  hsla: HSLA
  hsva: HSVA
  hue: number
  rgba: RGBA
}

export function fromHsva (hsva: HSVA) {
  hsva = { ...hsva }
  const hexa = HSVAtoHex(hsva)
  return {
    alpha: hsva.a,
    hex: hexa.substr(0, 6),
    hexa,
    hsla: HSVAtoHSLA(hsva),
    hsva,
    hue: hsva.h,
    rgba: HSVAtoRGBA(hsva)
  }
}

export function fromHsla (hsla: HSLA) {
  const hsva = HSLAtoHSVA(hsla)
  const hexa = HSVAtoHex(hsva)
  return {
    alpha: hsva.a,
    hex: hexa.substr(0, 6),
    hexa,
    hsla,
    hsva,
    hue: hsva.h,
    rgba: HSVAtoRGBA(hsva)
  }
}

export function fromRgba (rgba: RGBA) {
  const hsva = RGBAtoHSVA(rgba)
  const hexa = RGBAtoHex(rgba)
  return {
    alpha: hsva.a,
    hex: hexa.substr(0, 6),
    hexa,
    hsla: HSVAtoHSLA(hsva),
    hsva,
    hue: hsva.h,
    rgba
  }
}

export function fromHexa (hexa: Hexa) {
  const hsva = HexToHSVA(hexa)
  return {
    alpha: hsva.a,
    hex: hexa.substr(0, 6),
    hexa,
    hsla: HSVAtoHSLA(hsva),
    hsva,
    hue: hsva.h,
    rgba: HSVAtoRGBA(hsva)
  }
}

function has (obj: object, key: string[]) {
  return key.every(k => obj.hasOwnProperty(k))
}

export function parseColor (color: any) {
  if (!color) return fromRgba({ r: 255, g: 0, b: 0, a: 1 })

  if (typeof color === 'string') {
    return fromHexa(parseHex(color))
  }

  if (typeof color === 'object') {
    if (color.hasOwnProperty('alpha')) return color

    const a = color.hasOwnProperty('a') ? parseFloat(color.a) : 1

    if (has(color, ['r', 'g', 'b'])) {
      return fromRgba({ ...color, a })
    } else if (has(color, ['h', 's', 'l'])) {
      return fromHsla({ ...color, a })
    } else if (has(color, ['h', 's', 'v'])) {
      return fromHsva({ ...color, a })
    }
  }

  return fromRgba({ r: 255, g: 0, b: 0, a: 1 })
}
