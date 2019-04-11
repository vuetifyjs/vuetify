// Components
import VSlider from '../VSlider/VSlider'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { HSVAtoRGBA, HSVA } from '../../util/colorUtils'

export default Vue.extend({
  name: 'v-color-picker-preview',

  props: {
    alpha: Number,
    color: Array as PropValidator<HSVA>,
    hue: Number
  },

  computed: {
    hsva (): HSVA {
      return HSVAtoRGBA(this.color)
    },
    rgb (): string {
      return `rgb(${this.hsva.slice(0, 3).join(', ')})`
    },
    rgba (): string {
      return `rgba(${this.hsva.join(', ')})`
    }
  },

  methods: {
    genAlpha (): VNode {
      return this.genTrack({
        staticClass: 'v-color-picker__alpha',
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true,
          value: this.alpha * 100,
          min: 0,
          max: 100
        },
        style: {
          backgroundImage: `linear-gradient(to right, transparent, ${this.rgb})`
        },
        on: {
          input: (val: number) => this.$emit('update:alpha', val / 100)
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
          background: this.rgba
        }
      })
    },
    genHue (): VNode {
      return this.genTrack({
        staticClass: 'v-color-picker__hue',
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true,
          value: this.hue,
          step: 0,
          min: 0,
          max: 360
        },
        on: {
          input: (val: number) => this.$emit('update:hue', val)
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
