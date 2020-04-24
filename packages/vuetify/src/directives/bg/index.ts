// Utilities
import {
  classToHex,
  isCssColor,
  parseGradient,
} from '../../util/colorUtils'
import colors from '../../util/colors'

// Types
import { VuetifyThemeVariant } from 'types/services/theme'
import { VNode, VNodeDirective } from 'vue'

function setBackgroundColor (
  el: HTMLElement,
  color: string,
  currentTheme: Partial<VuetifyThemeVariant>,
) {
  const cssColor = !isCssColor(color) ? classToHex(color, colors, currentTheme) : color

  el.style.backgroundColor = cssColor
  el.style.borderColor = cssColor
}

function setGradientColor (
  el: HTMLElement,
  gradient: string,
  currentTheme: Partial<VuetifyThemeVariant>,
) {
  el.style.backgroundImage = `linear-gradient(${
    parseGradient(gradient, colors, currentTheme)
  })`
}

function updateBg (
  el: HTMLElement,
  binding: VNodeDirective,
  node: VNode
) {
  const currentTheme = node.context!.$vuetify.theme.currentTheme

  if (binding.arg === undefined) {
    setBackgroundColor(el, binding.value, currentTheme)
  } else if (binding.arg === 'gradient') {
    setGradientColor(el, binding.value, currentTheme)
  }
}

function update (
  el: HTMLElement,
  binding: VNodeDirective,
  node: VNode
) {
  if (binding.value === binding.oldValue) return

  updateBg(el, binding, node)
}

export const Bg = {
  bind: updateBg,
  update,
}

export default Bg
