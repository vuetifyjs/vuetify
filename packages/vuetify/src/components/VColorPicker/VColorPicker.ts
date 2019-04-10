// Styles
import './VColorPicker.sass'

// Extensions
import VSheet from '../VSheet/VSheet'

// Components
import VColorPickerPreview from './VColorPickerPreview'
import VColorPickerCanvas from './VColorPickerCanvas'

// Types
import { VNode } from 'vue'
import { HSVA, HSVAtoRGBA, RGBA, RGBAtoHSVA } from '../../util/colorUtils'
import VColorPickerRgba from './VColorPickerRgba'

export default VSheet.extend({
  name: 'v-color-picker',

  props: {
    width: {
      type: [Number, String],
      default: 300
    }
  },

  data: () => ({
    internalValue: [0, 0, 0, 1] as HSVA
  }),

  methods: {
    genControls () {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__controls'
      }, [
        this.$createElement(VColorPickerPreview, {
          props: {
            value: this.internalValue
          },
          on: {
            'update:hue': (v: number) => this.$set(this.internalValue, 0, v),
            'update:alpha': (v: number) => this.$set(this.internalValue, 3, v)
          }
        }),
        this.genEdit()
      ])
    },
    genEdit () {
      return this.$createElement(VColorPickerRgba, {
        props: {
          value: HSVAtoRGBA(this.internalValue)
        },
        on: {
          input: (v: RGBA) => {
            this.internalValue = RGBAtoHSVA(v)
          }
        }
      })
    },
    genCanvas () {
      return this.$createElement(VColorPickerCanvas, {
        props: {
          hue: this.internalValue[0],
          value: this.internalValue.slice(1, 3)
        },
        on: {
          input: (v: any) => {
            this.internalValue = [
              this.internalValue[0],
              v[0],
              v[1],
              this.internalValue[3]
            ]
          }
        }
      })
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker',
      class: this.classes,
      style: this.styles
    }, [
      this.genCanvas(),
      this.genControls()
    ])
  }
})
