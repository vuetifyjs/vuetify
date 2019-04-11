// Components
import VSlider from '../VSlider/VSlider'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { HSVAtoRGBA, HSVA } from '../../util/colorUtils'

export default Vue.extend({
  name: 'v-color-picker-preview',

  props: {
    value: Array as PropValidator<HSVA>
  },

  data: () => ({
    alphaValue: 0,
    hueValue: 0
  }),

  watch: {
    alphaValue (val: number) {
      this.$emit('update:alpha', val)
    },
    hueValue (val: number) {
      this.$emit('update:hue', val)
    },
    value: {
      handler (v: HSVA) {
        this.hueValue = v[0]
        this.alphaValue = v[3]
      },
      immediate: true
    }
  },

  methods: {
    genAlpha (): VNode {
      return this.genTrack({
        staticClass: 'v-color-picker__alpha',
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true,
          value: this.alphaValue * 100,
          min: 0,
          max: 100
        },
        on: {
          input: (val: number) => {
            this.alphaValue = val / 100
          }
        }
      })
    },
    genColor (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__color'
      }, [
        this.genHue(),
        this.genAlpha()
      ])
    },
    genDot (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__dot',
        style: {
          background: `rgba(${HSVAtoRGBA(this.value).join(', ')})`
        }
      })
    },
    genHue (): VNode {
      return this.genTrack({
        staticClass: 'v-color-picker__hue',
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true,
          value: this.hueValue,
          min: 0,
          max: 360
        },
        on: {
          input: (val: number) => {
            this.hueValue = val
          }
        }
      })
    },
    genTrack (options: object): VNode {
      return this.$createElement(VSlider, {
        class: 'v-color-picker__track',
        ...options
      })
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker__preview'
    }, [
      this.genDot(),
      this.genColor()
    ])
  }
})
