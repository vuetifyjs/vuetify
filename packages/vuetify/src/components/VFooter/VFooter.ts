// Styles
import './VFooter.sass'

// Components
import VSheet from '../VSheet/VSheet'

// Mixins
import Applicationable from '../../mixins/applicationable'
import SSRBootable from '../../mixins/ssr-bootable'

// Utilities
import mixins from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

// Types
import { VNode } from 'vue/types/vnode'

/* @vue/component */
export default mixins(
  VSheet,
  Applicationable('footer', [
    'height',
    'inset',
  ]),
  SSRBootable
).extend({
  name: 'v-footer',

  props: {
    height: {
      default: 'auto',
      type: [Number, String],
    },
    inset: Boolean,
    padless: Boolean,
    tag: {
      type: String,
      default: 'footer',
    },
  },

  computed: {
    applicationProperty (): string {
      return this.inset ? 'insetFooter' : 'footer'
    },
    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-footer--absolute': this.absolute,
        'v-footer--fixed': !this.absolute && (this.app || this.fixed),
        'v-footer--padless': this.padless,
        'v-footer--inset': this.inset,
      }
    },
    computedBottom (): number | undefined {
      if (!this.isPositioned) return undefined

      return this.app
        ? this.$vuetify.application.bottom
        : 0
    },
    computedLeft (): number | undefined {
      if (!this.isPositioned) return undefined

      return this.app && this.inset
        ? this.$vuetify.application.left
        : 0
    },
    computedRight (): number | undefined {
      if (!this.isPositioned) return undefined

      return this.app && this.inset
        ? this.$vuetify.application.right
        : 0
    },
    isPositioned (): boolean {
      return Boolean(
        this.absolute ||
        this.fixed ||
        this.app
      )
    },
    styles (): object {
      const height = parseInt(this.height)

      return {
        ...VSheet.options.computed.styles.call(this),
        height: isNaN(height) ? height : convertToUnit(height),
        left: convertToUnit(this.computedLeft),
        right: convertToUnit(this.computedRight),
        bottom: convertToUnit(this.computedBottom),
      }
    },
  },

  methods: {
    updateApplication () {
      const height = parseInt(this.height)

      return isNaN(height)
        ? this.$el ? this.$el.clientHeight : 0
        : height
    },
  },

  render (h): VNode {
    const data = this.setBackgroundColor(this.color, {
      staticClass: 'v-footer',
      class: this.classes,
      style: this.styles,
    })

    return h(this.tag, data, this.$slots.default)
  },
})
