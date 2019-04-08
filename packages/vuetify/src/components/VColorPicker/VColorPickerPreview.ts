// Components
import VSlider from '../VSlider/VSlider'

// Types
import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'v-color-picker-preview',

  data: () => ({
    alphaValue: 0,
    hueValue: 0
  }),

  methods: {
    genAlpha () {
      return this.genTrack({
        class: {
          'v-color-picker__alpha': true
        },
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true
        },
        on: {
          change: (val: number) => {
            this.alphaValue = val
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
        staticClass: 'v-color-picker__dot'
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
          value: this.hueValue
        },
        on: {
          change: (val: number) => {
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
