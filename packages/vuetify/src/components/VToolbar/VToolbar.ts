// Styles
import './VToolbar.sass'

// Extensions
import VSheet from '../VSheet/VSheet'

// Components
import VImg, { srcObject } from '../VImg/VImg'

// Utilities
import { convertToUnit, getSlot } from '../../util/helpers'
import { breaking } from '../../util/console'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

/* @vue/component */
export default VSheet.extend({
  name: 'v-toolbar',

  props: {
    absolute: Boolean,
    bottom: Boolean,
    collapse: Boolean,
    dense: Boolean,
    extended: Boolean,
    extensionHeight: {
      default: 48,
      type: [Number, String],
    },
    flat: Boolean,
    floating: Boolean,
    prominent: Boolean,
    short: Boolean,
    src: {
      type: [String, Object],
      default: '',
    } as PropValidator<string | srcObject>,
    tag: {
      type: String,
      default: 'header',
    },
    tile: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    isExtended: false,
  }),

  computed: {
    computedHeight (): number {
      const height = this.computedContentHeight

      if (!this.isExtended) return height

      const extensionHeight = parseInt(this.extensionHeight)

      return this.isCollapsed
        ? height
        : height + (!isNaN(extensionHeight) ? extensionHeight : 0)
    },
    computedContentHeight (): number {
      if (this.height) return parseInt(this.height)
      if (this.isProminent && this.dense) return 96
      if (this.isProminent && this.short) return 112
      if (this.isProminent) return 128
      if (this.dense) return 48
      if (this.short || this.$vuetify.breakpoint.smAndDown) return 56
      return 64
    },
    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-toolbar': true,
        'v-toolbar--absolute': this.absolute,
        'v-toolbar--bottom': this.bottom,
        'v-toolbar--collapse': this.collapse,
        'v-toolbar--collapsed': this.isCollapsed,
        'v-toolbar--dense': this.dense,
        'v-toolbar--extended': this.isExtended,
        'v-toolbar--flat': this.flat,
        'v-toolbar--floating': this.floating,
        'v-toolbar--prominent': this.isProminent,
      }
    },
    isCollapsed (): boolean {
      return this.collapse
    },
    isProminent (): boolean {
      return this.prominent
    },
    styles (): object {
      return {
        ...this.measurableStyles,
        height: convertToUnit(this.computedHeight),
      }
    },
  },

  created () {
    const breakingProps = [
      ['app', '<v-app-bar app>'],
      ['manual-scroll', '<v-app-bar :value="false">'],
      ['clipped-left', '<v-app-bar clipped-left>'],
      ['clipped-right', '<v-app-bar clipped-right>'],
      ['inverted-scroll', '<v-app-bar inverted-scroll>'],
      ['scroll-off-screen', '<v-app-bar scroll-off-screen>'],
      ['scroll-target', '<v-app-bar scroll-target>'],
      ['scroll-threshold', '<v-app-bar scroll-threshold>'],
      ['card', '<v-app-bar flat>'],
    ]

    /* istanbul ignore next */
    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) breaking(original, replacement, this)
    })
  },

  methods: {
    genBackground () {
      const props = {
        height: convertToUnit(this.computedHeight),
        src: this.src,
      }

      const image = this.$scopedSlots.img
        ? this.$scopedSlots.img({ props })
        : this.$createElement(VImg, { props })

      return this.$createElement('div', {
        staticClass: 'v-toolbar__image',
      }, [image])
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-toolbar__content',
        style: {
          height: convertToUnit(this.computedContentHeight),
        },
      }, getSlot(this))
    },
    genExtension () {
      return this.$createElement('div', {
        staticClass: 'v-toolbar__extension',
        style: {
          height: convertToUnit(this.extensionHeight),
        },
      }, getSlot(this, 'extension'))
    },
  },

  render (h): VNode {
    this.isExtended = this.extended || !!this.$scopedSlots.extension

    const children = [this.genContent()]
    const data = this.setBackgroundColor(this.color, {
      class: this.classes,
      style: this.styles,
      on: this.$listeners,
    })

    if (this.isExtended) children.push(this.genExtension())
    if (this.src || this.$scopedSlots.img) children.unshift(this.genBackground())

    return h(this.tag, data, children)
  },
})
