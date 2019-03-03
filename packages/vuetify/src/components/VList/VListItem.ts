// Styles
import './VListItem.sass'

// Components
import VList from './VList'

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Toggleable from '../../mixins/toggleable'
import Themeable from '../../mixins/themeable'

// Directives
import Ripple, { RippleOptions } from '../../directives/ripple'

// Utilities
import { ExtractVue } from './../../util/mixins'

// Types
import mixins from '../../util/mixins'
import { VNode } from 'vue'

const baseMixins = mixins(
  Colorable,
  Routable,
  Toggleable,
  Themeable
)

interface options extends ExtractVue<typeof baseMixins> {
  $el: HTMLElement
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-list-item',

  directives: {
    Ripple
  },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    },
    dense: Boolean,
    inactive: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    threeLine: Boolean,
    twoLine: Boolean
  },

  data: () => ({
    proxyClass: 'v-list-item--active'
  }),

  computed: {
    classes (): object {
      return {
        'v-list-item': true,
        'v-list-item--active': !this.to && this.isActive,
        'v-list-item--dense': this.dense,
        'v-list-item--disabled': this.disabled,
        'v-list-item--link': this.isLink && !this.inactive,
        'v-list-item--three-line': this.threeLine,
        'v-list-item--two-line': this.twoLine,
        ...this.themeClasses,
        [this.activeClass]: this.isActive
      }
    },
    computedRipple (): RippleOptions | boolean {
      const defaultRipple = this.isLink
      if (this.disabled) return false
      else return this.ripple !== null ? this.ripple : defaultRipple
    },
    isLink (): boolean {
      const hasClick = this.$listeners && (this.$listeners.click || this.$listeners['!click'])

      return Boolean(
        this.href ||
        this.to ||
        hasClick
      )
    }
  },

  methods: {
    click (e: MouseEvent | KeyboardEvent) {
      if (e.detail) this.$el.blur()

      this.$emit('click', e)
    }
  },

  render (h): VNode {
    const isRouteLink = !this.inactive && this.isLink
    const { tag, data } = isRouteLink ? this.generateRouteLink(this.classes) : {
      tag: this.tag || 'div',
      data: {
        class: this.classes
      }
    }

    data.attrs = Object.assign({}, data.attrs, this.$attrs)
    data.attrs.disabled = this.disabled
    data.attrs.role = 'listitem'
    if (tag === 'a') data.attrs.tabindex = 0

    return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default)
  }
})
