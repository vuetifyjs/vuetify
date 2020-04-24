// Utilities
import {
  classToHex,
  isCssColor,
} from '../../util/colorUtils'
import colors from '../../util/colors'

// Types
import { VNode, VNodeDirective } from 'vue'

function updateBorder (
  el: HTMLElement,
  binding: VNodeDirective,
  node: VNode
) {
  const modifiers = binding.modifiers
  const value = binding.value
  const { color, ...options } = typeof value === 'object'
    ? value
    : { color: value, ...modifiers }

  if (binding.arg) options[binding.arg] = true

  const styles = ['dotted', 'dashed', 'solid']
  const widths = ['thin', 'medium', 'thick']

  for (const option in options) {
    if (!options[option]) continue

    if (styles.includes(option)) el.style.borderStyle = option
    else if (widths.includes(option)) el.style.borderWidth = option
  }

  if (!color) return
  const currentTheme = node.context!.$vuetify.theme.currentTheme
  const cssColor = !isCssColor(color) ? classToHex(color, colors, currentTheme) : color

  if (!options.top && !options.right && !options.bottom && !options.left) {
    el.style.borderColor = cssColor
    return
  }

  if (options.top) el.style.borderTopColor = cssColor
  if (options.right) el.style.borderRightColor = cssColor
  if (options.bottom) el.style.borderBottomColor = cssColor
  if (options.left) el.style.borderLeftColor = cssColor
}

function update (
  el: HTMLElement,
  binding: VNodeDirective,
  node: VNode
) {
  if (binding.value === binding.oldValue) return

  el.style.removeProperty('border-style')
  el.style.removeProperty('border-width')
  el.style.removeProperty('border-color')
  el.style.removeProperty('border-top-color')
  el.style.removeProperty('border-right-color')
  el.style.removeProperty('border-bottom-color')
  el.style.removeProperty('border-left-color')

  updateBorder(el, binding, node)
}

export const Border = {
  bind: updateBorder,
  update,
}

export default Border
