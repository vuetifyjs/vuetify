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
    value: {
      handler (v: HSVA) {
        this.hueValue = v[0]
        this.alphaValue = v[3]
      },
      immediate: true
    },
    hueValue (v: number) {
      this.$emit('update:hue', v)
    },
    alphaValue (v: number) {
      this.$emit('update:alpha', v)
    }
  },

  methods: {
    genAlpha () {
      return this.genTrack({
        class: {
          'v-color-picker__alpha': true
        },
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
    genColor () {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__color'
      }, [
        this.genHue(),
        this.genAlpha()
      ])
    },
    genDot () {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__dot',
        style: {
          background: `rgba(${HSVAtoRGBA(this.value).join(', ')})`
        }
      })
    },
    genHue () {
      return this.genTrack({
        class: {
          'v-color-picker__hue': true
        },
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
    genTrack (options: object) {
      return this.$createElement(VSlider, {
        staticClass: 'v-color-picker__track',
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
