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
  const cssColor = !isCssColor(color) ? classToHex(color, colors) : color

  el.style.color = cssColor
  el.style.caretColor = cssColor
}

function setBackgroundColor (el: HTMLElement, color: string) {
  const cssColor = !isCssColor(color) ? classToHex(color, colors) : color

  el.style.backgroundColor = cssColor
  el.style.borderColor = cssColor
}

function setBorderColor (
  el: HTMLElement,
  color: string,
  modifiers?: BorderModifiers
) {
  const hasModifiers = modifiers ? Object.keys(modifiers).length > 0 : false
  const cssColor = !isCssColor(color) ? classToHex(color, colors) : color

  if (hasModifiers && modifiers) {
    if (modifiers.top) el.style.borderTopColor = cssColor
    if (modifiers.right) el.style.borderRightColor = cssColor
    if (modifiers.bottom) el.style.borderBottomColor = cssColor
    if (modifiers.left) el.style.borderLeftColor = cssColor
  } else {
    el.style.borderColor = cssColor
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
