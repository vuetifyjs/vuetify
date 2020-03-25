// Utilities
import { isCssColor, parseHex, HexToRGBA } from '../../util/colorUtils'
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

  let hexColor = ''
  if (colorName && colorName in colors) {
    if (colorModifier && colorModifier in colors[colorName]) {
      hexColor = colors[colorName][colorModifier]
    } else if ('base' in colors[colorName]) {
      hexColor = colors[colorName].base
    }
  } else if (colorName && colorName in currentTheme) {
    hexColor = currentTheme[colorName] as string
  }

  return hexColor
}

function parseGradient (gradient: string) {
  return gradient.replace(/rgba\(#([0-9a-f]{3}|[0-9a-f]{6}),/gi, x => {
    const rgba = HexToRGBA(parseHex(x.slice(5, -1)))
    return `rgba(${rgba.r},${rgba.g},${rgba.b},`
  })
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

function setGradientColor (el: HTMLElement, gradient: string) {
  el.style.backgroundImage = `linear-gradient(${parseGradient(gradient)})`
}

function updateColor (
  el: HTMLElement,
  binding: VNodeDirective,
  node: VNode
) {
  if (binding.arg === undefined) {
    setBackgroundColor(el, binding.value, node)
  } else if (binding.arg === 'text') {
    setTextColor(el, binding.value, node)
  } else if (binding.arg === 'border') {
    setBorderColor(el, binding.value, node, binding.modifiers)
  } else if (binding.arg === 'gradient') {
    setGradientColor(el, binding.value)
  }
}

function update (
  el: HTMLElement,
  binding: VNodeDirective,
  node: VNode
) {
  if (binding.value === binding.oldValue) return

  updateColor(el, binding, node)
}

export const Color = {
  bind: updateColor,
  update,
}

export default Color
