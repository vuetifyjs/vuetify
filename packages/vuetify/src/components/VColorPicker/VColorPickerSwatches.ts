// Styles
import './VColorPickerSwatches.sass'

// Components
import VIcon from '../VIcon'

// Helpers
import colors from '../../util/colors'
import { VColorPickerColor, fromHex, parseColor } from './util'
import { convertToUnit, deepEqual } from '../../util/helpers'
import mixins from '../../util/mixins'
import Themeable from '../../mixins/themeable'

// Types
import { VNode, PropType } from 'vue'
import { contrastRatio } from '../../util/colorUtils'

function parseDefaultColors (colors: Record<string, Record<string, string>>) {
  return Object.keys(colors).map(key => {
    const color = colors[key]
    return color.base ? [
      color.base,
      color.darken4,
      color.darken3,
      color.darken2,
      color.darken1,
      color.lighten1,
      color.lighten2,
      color.lighten3,
      color.lighten4,
      color.lighten5,
    ] : [
      color.black,
      color.white,
      color.transparent,
    ]
  })
}

const white = fromHex('#FFFFFF').rgba
const black = fromHex('#000000').rgba

export default mixins(Themeable).extend({
  name: 'v-color-picker-swatches',

  props: {
    swatches: {
      type: Array as PropType<string[][]>,
      default: () => parseDefaultColors(colors),
    },
    color: Object as PropType<VColorPickerColor>,
    maxWidth: [Number, String],
    maxHeight: [Number, String],
  },

  methods: {
    genColor (color: string) {
      const content = this.$createElement('div', {
        style: {
          background: color,
        },
      }, [
        deepEqual(this.color, parseColor(color, null)) && this.$createElement(VIcon, {
          props: {
            small: true,
            dark: contrastRatio(this.color.rgba, white) > 2 && this.color.alpha > 0.5,
            light: contrastRatio(this.color.rgba, black) > 2 && this.color.alpha > 0.5,
          },
        }, '$success'),
      ])

      return this.$createElement('div', {
        staticClass: 'v-color-picker__color',
        on: {
          // TODO: Less hacky way of catching transparent
          click: () => this.$emit('update:color', fromHex(color === 'transparent' ? '#00000000' : color)),
        },
      }, [content])
    },
    genSwatches () {
      return this.swatches.map(swatch => {
        const colors = swatch.map(this.genColor)

        return this.$createElement('div', {
          staticClass: 'v-color-picker__swatch',
        }, colors)
      })
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker__swatches',
      style: {
        maxWidth: convertToUnit(this.maxWidth),
        maxHeight: convertToUnit(this.maxHeight),
      },
    }, [
      this.$createElement('div', this.genSwatches()),
    ])
  },
})
