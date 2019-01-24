import Vue from 'vue'
import { VNodeData } from 'vue/types/vnode'
import { PropValidator } from 'vue/types/options'
import { extractCssColor } from '../util/theme'
import { consoleError } from '../util/console'

function isCssColor (color?: string | false): boolean {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default Vue.extend({
  name: 'colorable',

  props: {
    color: [String, Array] as PropValidator<string | string[]>
  },

  methods: {
    setBackgroundColor (color?: string | string[] | false, data: VNodeData = {}): VNodeData {
      if (Array.isArray(color)) {
        const cssColors = color.map(color => isCssColor(color) ? color : extractCssColor(color, this.$vuetify.theme))

        data.style = {
          ...data.style,
          background: `linear-gradient(${cssColors.join(', ')})`
        }
      } else if (isCssColor(color)) {
        data.style = {
          ...data.style,
          'background-color': `${color}`,
          'border-color': `${color}`
        }
      } else if (color) {
        data.class = {
          ...data.class,
          [color]: true
        }
      }

      return data
    },

    setTextColor (color?: string | string[] | false, data: VNodeData = {}): VNodeData {
      if (Array.isArray(color)) {
        consoleError('Gradients can be only applied for backgrounds', this)
        return data
      }

      if (isCssColor(color)) {
        data.style = {
          ...data.style,
          'color': `${color}`,
          'caret-color': `${color}`
        }
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2) as (string | undefined)[]
        data.class = {
          ...data.class,
          [colorName + '--text']: true
        }
        if (colorModifier) {
          data.class['text--' + colorModifier] = true
        }
      }
      return data
    }
  }
})
