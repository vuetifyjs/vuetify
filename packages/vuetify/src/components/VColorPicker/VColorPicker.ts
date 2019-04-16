// Styles
import './VColorPicker.sass'

// Components
import VSheet from '../VSheet/VSheet'
import VColorPickerPreview from './VColorPickerPreview'
import VColorPickerCanvas from './VColorPickerCanvas'
import VColorPickerEdit, { Mode, modes } from './VColorPickerEdit'
import VColorPickerSwatches from './VColorPickerSwatches'

// Helpers
import { VColorPickerColor, parseColor, fromRGBA } from './util'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'v-color-picker',

  props: {
    canvasHeight: {
      type: [String, Number],
      default: 150
    },
    disabled: Boolean,
    flat: Boolean,
    hideCanvas: Boolean,
    hideInputs: Boolean,
    hideModeSwitch: Boolean,
    mode: {
      type: String,
      default: 'rgba',
      validator: (v: string) => Object.keys(modes).includes(v)
    },
    showSwatches: Boolean,
    swatches: Array as PropValidator<string[][]>,
    value: {
      type: [Object, String]
    } as PropValidator<VColorPickerColor>,
    width: {
      type: [Number, String],
      default: 300
    },
    dotSize: {
      type: Number,
      default: 10
    }
  },

  data: () => ({
    internalValue: fromRGBA({ r: 255, g: 0, b: 0, a: 1 })
  }),

  watch: {
    value: {
      handler (v: VColorPickerColor) {
        this.internalValue = parseColor(v)
      },
      immediate: true
    },
    internalValue: {
      handler (v: VColorPickerColor) {
        this.$emit('input', v)
      },
      deep: true
    }
  },

  methods: {
    updateColor (v: VColorPickerColor) {
      this.internalValue = v
    },
    genCanvas (): VNode {
      return this.$createElement(VColorPickerCanvas, {
        props: {
          color: this.internalValue,
          disabled: this.disabled,
          dotSize: this.dotSize,
          width: this.width,
          height: this.canvasHeight
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
          color: this.internalValue,
          disabled: this.disabled,
          hideModeSwitch: this.hideModeSwitch,
          mode: this.mode
        },
        on: {
          'update:color': this.updateColor,
          'update:mode': (v: Mode) => this.$emit('update:mode', v)
        }
      })
    },
    genPreview (): VNode {
      return this.$createElement(VColorPickerPreview, {
        props: {
          color: this.internalValue,
          disabled: this.disabled
        },
        on: {
          'update:color': this.updateColor
        }
      })
    },
    genSwatches (): VNode {
      return this.$createElement(VColorPickerSwatches, {
        props: {
          swatches: this.swatches,
          color: this.internalValue,
          height: 150
        },
        on: {
          'update:color': (v: VColorPickerColor) => this.internalValue = v
        }
      })
    }
  },

  render (h): VNode {
    return h(VSheet, {
      staticClass: 'v-color-picker',
      class: {
        'v-color-picker--flat': this.flat
      },
      props: {
        maxWidth: this.width
      }
    }, [
      !this.hideCanvas && this.genCanvas(),
      this.genControls(),
      this.showSwatches && this.genSwatches()
    ])
  }
})
