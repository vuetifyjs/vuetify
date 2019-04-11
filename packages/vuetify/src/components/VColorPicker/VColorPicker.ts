// Styles
import './VColorPicker.sass'

// Extensions
import VSheet from '../VSheet/VSheet'

// Components
import VColorPickerPreview from './VColorPickerPreview'
import VColorPickerCanvas from './VColorPickerCanvas'

// Types
import { VNode } from 'vue'
import { HSVA, colorEqual } from '../../util/colorUtils'
import VColorPickerEdit from './VColorPickerEdit'

export default VSheet.extend({
  name: 'v-color-picker',

  props: {
    width: {
      type: [Number, String],
      default: 300
    }
  },

  data: () => ({
    internalValue: [0, 1, 1, 1] as HSVA
  }),

  methods: {
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
    },
    genControls () {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__controls'
      }, [
        this.genPreview(),
        this.genEdit()
      ])
    },
    genEdit () {
      return this.$createElement(VColorPickerEdit, {
        props: {
          color: this.internalValue.slice()
        },
        on: {
          'update:color': (value: HSVA) => {
            // If saturation is zero then we try
            // to reuse old hue value, otherwise
            // the canvas hue will revert to red
            const oldHue = this.internalValue[0]
            if (value[1] === 0) {
              value[0] = value[0] || oldHue
            }
            if (colorEqual(value, this.internalValue)) return
            this.internalValue = value
          }
        }
      })
    },
    genPreview () {
      return this.$createElement(VColorPickerPreview, {
        props: {
          hue: this.internalValue[0],
          alpha: this.internalValue[3],
          color: this.internalValue.slice()
        },
        on: {
          'update:hue': (v: number) => this.$set(this.internalValue, 0, v),
          'update:alpha': (v: number) => this.$set(this.internalValue, 3, v)
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
