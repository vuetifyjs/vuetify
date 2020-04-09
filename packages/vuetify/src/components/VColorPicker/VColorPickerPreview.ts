// Styles
import './VColorPickerPreview.sass'

// Components
import VSlider from '../VSlider/VSlider'

// Utilities
import { RGBtoCSS, RGBAtoCSS } from '../../util/colorUtils'

// Types
import Vue, { VNode, VNodeData, PropType } from 'vue'
import { VColorPickerColor, fromHSVA } from './util'

export default Vue.extend({
  name: 'v-color-picker-preview',

  props: {
    color: Object as PropType<VColorPickerColor>,
    disabled: Boolean,
    hideAlpha: Boolean,
  },

  methods: {
    genAlpha (): VNode {
      return this.genTrack({
        staticClass: 'v-color-picker__alpha',
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true,
          value: this.color.alpha,
          step: 0,
          min: 0,
          max: 1,
        },
        style: {
          backgroundImage: this.disabled
            ? undefined
            : `linear-gradient(to ${this.$vuetify.rtl ? 'left' : 'right'}, transparent, ${RGBtoCSS(this.color.rgba)})`,
        },
        on: {
          input: (val: number) => this.color.alpha !== val && this.$emit('update:color', fromHSVA({ ...this.color.hsva, a: val })),
        },
      })
    },
    genSliders (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__sliders',
      }, [
        this.genHue(),
        !this.hideAlpha && this.genAlpha(),
      ])
    },
    genDot (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__dot',
      }, [
        this.$createElement('div', {
          style: {
            background: RGBAtoCSS(this.color.rgba),
          },
        }),
      ])
    },
    genHue (): VNode {
      return this.genTrack({
        staticClass: 'v-color-picker__hue',
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true,
          value: this.color.hue,
          step: 0,
          min: 0,
          max: 360,
        },
        on: {
          input: (val: number) => this.color.hue !== val && this.$emit('update:color', fromHSVA({ ...this.color.hsva, h: val })),
        },
      })
    },
    genTrack (options: VNodeData): VNode {
      return this.$createElement(VSlider, {
        class: 'v-color-picker__track',
        ...options,
        props: {
          disabled: this.disabled,
          ...options.props,
        },
      })
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker__preview',
      class: {
        'v-color-picker__preview--hide-alpha': this.hideAlpha,
      },
    }, [
      this.genDot(),
      this.genSliders(),
    ])
  },
})
