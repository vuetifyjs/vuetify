// Styles
import './VToolbar.sass'

// Extensions
import VSheet from '../VSheet/VSheet'

// Components
import VImg, { srcObject } from '../VImg/VImg'

// Utilities
import { defineComponent, h } from 'vue'
import { convertToUnit } from '../../util/helpers'
import { breaking } from '../../util/console'

// Types
import type { VNode, Prop } from 'vue'

export default defineComponent({
  name: 'v-toolbar',

  extends: VSheet,

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
    } as Prop<string | srcObject>,
    tag: {
      type: String,
      default: 'header',
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
        ...VSheet.computed!.classes.call(this),
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

      const image = this.$slots.img
        ? this.$slots.img({ props })
        : h(VImg, { props })

      return h('div', {
        class: 'v-toolbar__image',
      }, [image])
    },
    genContent () {
      return h('div', {
        class: 'v-toolbar__content',
        style: {
          height: convertToUnit(this.computedContentHeight),
        },
      }, this.$slots.default)
    },
    genExtension () {
      return h('div', {
        class: 'v-toolbar__extension',
        style: {
          height: convertToUnit(this.extensionHeight),
        },
      }, this.$slots.extension)
    },
  },

  render (): VNode {
    this.isExtended = this.extended || !!this.$slots.extension

    const children = [this.genContent()]
    const data = this.setBackgroundColor(this.color, {
      class: this.classes,
      style: this.styles,
    })

    if (this.isExtended) children.push(this.genExtension())
    if (this.src || this.$slots.img) children.unshift(this.genBackground())

    return h(this.tag, data, children)
  },
})
