// Utilities
import { isCssColor } from '../../util/colorUtils'
import colors from '../../util/colors'

// Types
import { VNode, VNodeDirective } from 'vue'

interface BorderModifiers {
  top?: Boolean
  right?: Boolean
  bottom?: Boolean
  left?: Boolean
}

function classToHex (
  color: string,
  colors: Record<string, Record<string, string>>,
  node: VNode,
): string {
  const [colorName, colorModifier] = color
    .toString().trim().replace('-', '').split(' ', 2) as (string | undefined)[]

  const currentTheme = node.context
    ? node.context.$vuetify.theme.currentTheme : {}

  let hexColor: string = ''
  if (colorName && colorName in colors) {
    if (colorModifier && colorModifier in colors[colorName]) {
      hexColor = colors[colorName][colorModifier]
    } else if ('base' in colors[colorName]) {
      hexColor = colors[colorName].base
    }
  } else if (colorName && colorName in currentTheme) {
    hexColor = <string>currentTheme[colorName]
  }

  return hexColor
}

function setTextColor (el: HTMLElement, color: string, node: VNode) {
  const cssColor = !isCssColor(color) ? classToHex(color, colors, node) : color

  el.style.color = cssColor
  el.style.caretColor = cssColor
}

function setBackgroundColor (el: HTMLElement, color: string, node: VNode) {
  const cssColor = !isCssColor(color) ? classToHex(color, colors, node) : color

  el.style.backgroundColor = cssColor
  el.style.borderColor = cssColor
}

function setBorderColor (
  el: HTMLElement,
  color: string,
  node: VNode,
  modifiers?: BorderModifiers,
) {
  const hasModifiers = modifiers ? Object.keys(modifiers).length > 0 : false
  const cssColor = !isCssColor(color) ? classToHex(color, colors, node) : color

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
    setTextColor(el, binding.value, node)
  },
  update (el: HTMLElement, binding: VNodeDirective, node: VNode) {
    if (binding.value === binding.oldValue) return

    setTextColor(el, binding.value, node)
  },
}

export const BgColor = {
  bind (el: HTMLElement, binding: VNodeDirective, node: VNode) {
    setBackgroundColor(el, binding.value, node)
  },
  update (el: HTMLElement, binding: VNodeDirective, node: VNode) {
    if (binding.value === binding.oldValue) return

    setBackgroundColor(el, binding.value, node)
  },
}

export const BorderColor = {
  bind (el: HTMLElement, binding: VNodeDirective, node: VNode) {
    setBorderColor(el, binding.value, node, binding.modifiers)
  },
  update (el: HTMLElement, binding: VNodeDirective, node: VNode) {
    if (binding.value === binding.oldValue) return

    setBorderColor(el, binding.value, node, binding.modifiers)
  },
}

export default { Color, BgColor, BorderColor }
