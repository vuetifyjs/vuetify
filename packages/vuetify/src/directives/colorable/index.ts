import { VNode, VNodeDirective } from 'vue'
import colors from '../../util/colors'

interface BorderModifiers {
  top?: Boolean
  right?: Boolean
  bottom?: Boolean
  left?: Boolean
}

function isCssColor (color?: string | false): boolean {
  return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/)
}

function classToHex (color: string, colors: Record<string, Record<string, string>>): string {
  const [colorName, colorModifier] = color
    .toString().trim().replace('-', '').split(' ', 2) as (string | undefined)[]

  let hexColor = ''
  if (colorName && colorName in colors) {
    if (colorModifier && colorModifier in colors[colorName]) {
      hexColor = colors[colorName][colorModifier]
    } else if ('base' in colors[colorName]) {
      hexColor = colors[colorName].base
    }
  }
  return hexColor
}

function setTextColor (el: HTMLElement, color: string) {
  const setColor = (v: string) => {
    el.style.color = v
    el.style.caretColor = v
  }

  if (isCssColor(color)) setColor(color)
  else if (color) setColor(classToHex(color, colors))
}

function setBackgroundColor (el: HTMLElement, color: string) {
  const setColor = (v: string) => {
    el.style.backgroundColor = v
    el.style.borderColor = v
  }

  if (isCssColor(color)) setColor(color)
  else if (color) setColor(classToHex(color, colors))
}

function setBorderColor (
  el: HTMLElement,
  color: string,
  modifiers?: BorderModifiers
) {
  const hasModifiers = modifiers ? Object.keys(modifiers).length > 0 : false

  const setColor = (v: string) => el.style.borderColor = v
  const setSidesColor = (v: string) => {
    if (modifiers) {
      if (modifiers.top) el.style.borderTopColor = v
      if (modifiers.right) el.style.borderRightColor = v
      if (modifiers.bottom) el.style.borderBottomColor = v
      if (modifiers.left) el.style.borderLeftColor = v
    }
  }

  if (isCssColor(color)) {
    if (hasModifiers) setSidesColor(color)
    else setColor(color)
  } else if (color) {
    const hexColor = classToHex(color, colors)

    if (hasModifiers) setSidesColor(hexColor)
    else setColor(hexColor)
  }
}

export const Color = {
  bind (el: HTMLElement, binding: VNodeDirective, node: VNode) {
    setTextColor(el, binding.value)
  },
  update (el: HTMLElement, binding: VNodeDirective) {
    if (binding.value === binding.oldValue) return

    setTextColor(el, binding.value)
  },
}

export const BgColor = {
  bind (el: HTMLElement, binding: VNodeDirective, node: VNode) {
    setBackgroundColor(el, binding.value)
  },
  update (el: HTMLElement, binding: VNodeDirective) {
    if (binding.value === binding.oldValue) return

    setBackgroundColor(el, binding.value)
  },
}

export const BorderColor = {
  bind (el: HTMLElement, binding: VNodeDirective, node: VNode) {
    setBorderColor(el, binding.value, binding.modifiers)
  },
  update (el: HTMLElement, binding: VNodeDirective) {
    if (binding.value === binding.oldValue) return

    setBorderColor(el, binding.value, binding.modifiers)
  },
}

export default { Color, BgColor, BorderColor }
