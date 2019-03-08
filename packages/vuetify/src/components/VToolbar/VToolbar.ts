// Styles
import './VToolbar.sass'

// Extensions
import VSheet from '../VSheet/VSheet'

// Types
import { VNode } from 'vue'
import { convertToUnit } from '../../util/helpers'

/* @vue/component */
export default VSheet.extend({
  name: 'v-toolbar',

  props: {
    absolute: Boolean,
    dense: Boolean,
    collapse: Boolean,
    extended: Boolean,
    extensionHeight: {
      default: 48,
      type: [Number, String],
      validator: (v: any) => !isNaN(parseInt(v))
    },
    flat: Boolean,
    floating: Boolean,
    prominent: Boolean,
    short: Boolean,
    tile: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    computedContentHeight (): number {
      if (this.height) return parseInt(this.height)
      if (this.prominent && this.dense) return 96
      if (this.prominent && this.short) return 112
      if (this.prominent) return 128
      if (this.dense) return 48
      if (this.short || this.$vuetify.breakpoint.smAndDown) return 56
      return 64
    },
    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-toolbar': true,
        'v-toolbar--absolute': this.absolute,
        'v-toolbar--collapse': this.collapse,
        'v-toolbar--collapsed': this.isCollapsed,
        'v-toolbar--dense': this.dense,
        'v-toolbar--extended': this.isExtended,
        'v-toolbar--floating': this.floating,
        'v-toolbar--prominent': this.prominent,
        'elevation-0': this.isFlat
      }
    },
    isCollapsed (): boolean {
      return this.collapse
    },
    isExtended (): boolean {
      return this.extended || !!this.$slots.extension
    },
    isFlat (): boolean {
      return this.flat
    },
    styles (): object {
      return this.measurableStyles
    }
  },

  methods: {
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-toolbar__content',
        style: {
          height: convertToUnit(this.computedContentHeight)
        }
      }, this.$slots.default)
    },
    genExtension () {
      return this.$createElement('div', {
        staticClass: 'v-toolbar__extension',
        style: {
          height: convertToUnit(this.extensionHeight)
        }
      }, this.$slots.extension)
    }
  },

  render (h): VNode {
    const children = [this.genContent()]
    const data = this.setBackgroundColor(this.color, {
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    })

    if (this.isExtended) children.push(this.genExtension())

    return h('nav', data, children)
  }
})
