// Styles
import './VColorPicker.sass'

// Extensions
import VSheet from '../VSheet/VSheet'

// Components
import VColorPickerPreview from './VColorPickerPreview'

// Types
import { VNode } from 'vue'

export default VSheet.extend({
  name: 'v-color-picker',

  props: {
    width: {
      type: [Number, String],
      default: 300
    }
  },

  methods: {
    genControls () {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__controls'
      }, [
        this.$createElement(VColorPickerPreview),
        this.genEdit()
      ])
    },
    genEdit () {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__edit'
      }, [
        this.genInput('r'),
        this.genInput('g'),
        this.genInput('b'),
        this.genInput('a')
      ])
    },
    genInput (target: string) {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__input'
      }, [
        this.$createElement('input'),
        this.$createElement('span', target.toUpperCase())
      ])
    },
    genPreview () {
      return this.$createElement
    },
    genSaturation () {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__saturation'
      })
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker',
      class: this.classes,
      style: this.styles
    }, [
      this.genSaturation(),
      this.genControls()
    ])
  }
})
