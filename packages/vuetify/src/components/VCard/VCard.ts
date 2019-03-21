// Styles
import './VCard.sass'

// Extensions
import VSheet from '../VSheet'

// Mixins
import Routable from '../../mixins/routable'

// Helpers
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default mixins(
  Routable,
  VSheet
).extend({
  name: 'v-card',

  props: {
    flat: Boolean,
    hover: Boolean,
    img: String,
    link: Boolean,
    outlined: Boolean,
    raised: Boolean
  },

  computed: {
    classes (): object {
      return {
        'v-card': true,
        'v-card--flat': this.flat,
        'v-card--hover': this.hover,
        'v-card--link': this.isLink,
        'v-card--outlined': this.outlined,
        'v-card--raised': this.raised,
        ...VSheet.options.computed.classes.call(this)
      }
    },
    isLink (): boolean {
      const hasClick = this.$listeners && (this.$listeners.click || this.$listeners['!click'])

      return Boolean(
        this.href ||
        this.to ||
        this.link ||
        hasClick
      )
    },
    styles (): object {
      const style: Dictionary<string> = {
        ...VSheet.options.computed.styles.call(this)
      }

      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`
      }

      return style
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink(this.classes)

    data.style = this.styles

    if (this.isLink) {
      data.attrs = data.attrs || {}
      data.attrs.tabindex = 0
    }

    return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default)
  }
})
