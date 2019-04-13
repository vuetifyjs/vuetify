// Styles
import './VColorPicker.sass'

// Extensions
import VSheet from '../VSheet/VSheet'

// Components
import VColorPickerPreview from './VColorPickerPreview'
import VColorPickerCanvas from './VColorPickerCanvas'
import VColorPickerEdit from './VColorPickerEdit'

// Helpers
import { VColorPickerColor, parseColor, fromRgba } from './util'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

export default VSheet.extend({
  name: 'v-color-picker',

  props: {
    hideCanvas: Boolean,
    hideInputs: Boolean,
    value: {
      type: [Object, String]
    } as PropValidator<string | VColorPickerColor>,
    width: {
      type: [Number, String],
      default: 300
    }
  },

  data: () => ({
    internalValue: fromRgba([255, 0, 0, 1])
  }),

  watch: {
    value: {
      handler (v: VColorPickerColor) {
        this.internalValue = parseColor(v)
      },
      immediate: true
    },
    internalValue (v: any[]) {
      this.$emit('input', v)
    }
  },

  methods: {
    updateColor (v: VColorPickerColor) {
      this.internalValue = v
    },
    genCanvas (): VNode {
      return this.$createElement(VColorPickerCanvas, {
        props: {
          color: this.internalValue
        },
        on: {
          'update:color': this.updateColor
        }
      })
    },
    genControls (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__controls'
      }, [
        this.genPreview(),
        !this.hideInputs && this.genEdit()
      ])
    },
    genEdit (): VNode {
      return this.$createElement(VColorPickerEdit, {
        props: {
          color: this.internalValue
        },
        on: {
          'update:color': this.updateColor
        }
      })
    },
    genPreview (): VNode {
      return this.$createElement(VColorPickerPreview, {
        props: {
          color: this.internalValue
        },
        on: {
          'update:color': this.updateColor
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
      !this.hideCanvas && this.genCanvas(),
      this.genControls()
    ])
  }
})
