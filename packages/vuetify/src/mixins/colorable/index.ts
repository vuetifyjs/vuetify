import Vue from 'vue'
import { VNodeData } from 'vue/types/vnode'
import { consoleError } from '../../util/console'

function isCssColor (color?: string | false): boolean {
  return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/)
}

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String,
  },

  methods: {
    setBackgroundColor (color?: string | false, data: VNodeData = {}): VNodeData {
      if (typeof data.style === 'string') {
        // istanbul ignore next
        consoleError('style must be an object', this)
        // istanbul ignore next
        return data
      }
      if (typeof data.class === 'string') {
        // istanbul ignore next
        consoleError('class must be an object', this)
        // istanbul ignore next
        return data
      }
      if (isCssColor(color)) {
        data.style = {
          ...data.style as object,
          'background-color': `${color}`,
          'border-color': `${color}`,
        }
      } else if (color) {
        data.class = {
          ...data.class,
          [color]: true,
        }
      }

      return data
    },

    setTextColor (color?: string | false, data: VNodeData = {}): VNodeData {
      if (typeof data.style === 'string') {
        // istanbul ignore next
        consoleError('style must be an object', this)
        // istanbul ignore next
        return data
      }
      if (typeof data.class === 'string') {
        // istanbul ignore next
        consoleError('class must be an object', this)
        // istanbul ignore next
        return data
      }
      if (isCssColor(color)) {
        data.style = {
          ...data.style as object,
          color: `${color}`,
          'caret-color': `${color}`,
        }
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2) as (string | undefined)[]
        data.class = {
          ...data.class,
          [colorName + '--text']: true,
        }
        if (colorModifier) {
          data.class['text--' + colorModifier] = true
        }
      }
      return data
    },
  },
})
