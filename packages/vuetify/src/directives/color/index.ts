// Utilities
import {
  classToHex,
  isCssColor,
} from '../../util/colorUtils'
import colors from '../../util/colors'

// Types
import { VNode, VNodeDirective } from 'vue'

function updateColor (
  el: HTMLElement,
  binding: VNodeDirective,
  node: VNode
) {
  const color = binding.value
  const currentTheme = node.context!.$vuetify.theme.currentTheme
  const cssColor = !isCssColor(color) ? classToHex(color, colors, currentTheme) : color

  el.style.color = cssColor
  el.style.caretColor = cssColor
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
