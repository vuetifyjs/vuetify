// Styles
import './VColorPicker.sass'

// Extensions
import VSheet from '../VSheet/VSheet'

// Components
import VColorPickerPreview from './VColorPickerPreview'
import VColorPickerCanvas from './VColorPickerCanvas'
import VColorPickerEdit, { Mode, modes } from './VColorPickerEdit'

// Helpers
import { VColorPickerColor, parseColor, fromRgba } from './util'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

export default VSheet.extend({
  name: 'v-color-picker',

  props: {
    disabled: Boolean,
    flat: Boolean,
    hideCanvas: Boolean,
    hideInputs: Boolean,
    hideModeSwitch: Boolean,
    mode: {
      type: String,
      default: 'hex',
      validator: (v: string) => Object.keys(modes).includes(v)
    },
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

  computed: {
    pickerClasses (): object {
      return {
        ...this.classes,
        'v-color-picker--flat': this.flat
      }
    }
  },

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
          color: this.internalValue,
          disabled: this.disabled
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
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker',
      class: this.pickerClasses,
      style: this.styles
    }, [
      !this.hideCanvas && this.genCanvas(),
      this.genControls()
    ])
  }
})
