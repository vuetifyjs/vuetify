// Styles
import './VColorPicker.sass'

// Components
import VSheet from '../VSheet/VSheet'
import VColorPickerPreview from './VColorPickerPreview'
import VColorPickerCanvas from './VColorPickerCanvas'
import VColorPickerEdit, { Mode, modes } from './VColorPickerEdit'
import VColorPickerSwatches from './VColorPickerSwatches'

// Helpers
import { VColorPickerColor, parseColor, fromRGBA, extractColor, hasAlpha } from './util'
import mixins from '../../util/mixins'
import Themeable from '../../mixins/themeable'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

export default mixins(Themeable).extend({
  name: 'v-color-picker',

  props: {
    canvasHeight: {
      type: [String, Number],
      default: 150,
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10,
    },
    flat: Boolean,
    hideCanvas: Boolean,
    hideInputs: Boolean,
    hideModeSwitch: Boolean,
    mode: {
      type: String,
      default: 'rgba',
      validator: (v: string) => Object.keys(modes).includes(v),
    },
    showSwatches: Boolean,
    swatches: Array as PropValidator<string[][]>,
    swatchesMaxHeight: {
      type: [Number, String],
      default: 150,
    },
    value: {
      type: [Object, String],
    },
    width: {
      type: [Number, String],
      default: 300,
    },
  },

  data: () => ({
    internalValue: fromRGBA({ r: 255, g: 0, b: 0, a: 1 }),
  }),

  computed: {
    hideAlpha (): boolean {
      return this.value && !hasAlpha(this.value)
    },
  },

  watch: {
    value: {
      handler (color: any) {
        this.updateColor(parseColor(color, this.internalValue))
      },
      immediate: true,
    },
  },

  methods: {
    updateColor (color: VColorPickerColor) {
      this.internalValue = color
      const value = extractColor(this.internalValue, this.value)

      if (value !== this.value) {
        this.$emit('input', value)
        this.$emit('update:color', this.internalValue)
      }
    },
    genCanvas (): VNode {
      return this.$createElement(VColorPickerCanvas, {
        props: {
          color: this.internalValue,
          disabled: this.disabled,
          dotSize: this.dotSize,
          width: this.width,
          height: this.canvasHeight,
        },
        on: {
          'update:color': this.updateColor,
        },
      })
    },
    genControls (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__controls',
      }, [
        this.genPreview(),
        !this.hideInputs && this.genEdit(),
      ])
    },
    genEdit (): VNode {
      return this.$createElement(VColorPickerEdit, {
        props: {
          color: this.internalValue,
          disabled: this.disabled,
          hideAlpha: this.hideAlpha,
          hideModeSwitch: this.hideModeSwitch,
          mode: this.mode,
        },
        on: {
          'update:color': this.updateColor,
          'update:mode': (v: Mode) => this.$emit('update:mode', v),
        },
      })
    },
    genPreview (): VNode {
      return this.$createElement(VColorPickerPreview, {
        props: {
          color: this.internalValue,
          disabled: this.disabled,
          hideAlpha: this.hideAlpha,
        },
        on: {
          'update:color': this.updateColor,
        },
      })
    },
    genSwatches (): VNode {
      return this.$createElement(VColorPickerSwatches, {
        props: {
          dark: this.dark,
          light: this.light,
          swatches: this.swatches,
          color: this.internalValue,
          maxHeight: this.swatchesMaxHeight,
        },
        on: {
          'update:color': this.updateColor,
        },
      })
    },
  },

  render (h): VNode {
    return h(VSheet, {
      staticClass: 'v-color-picker',
      class: {
        'v-color-picker--flat': this.flat,
        ...this.themeClasses,
      },
      props: {
        maxWidth: this.width,
      },
    }, [
      !this.hideCanvas && this.genCanvas(),
      this.genControls(),
      this.showSwatches && this.genSwatches(),
    ])
  },
})
