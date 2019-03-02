// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Toggleable from '../../mixins/toggleable'
import Themeable from '../../mixins/themeable'

// Directives
import Ripple from '../../directives/ripple'

// Types
import mixins from '../../util/mixins'
import { VNode } from 'vue'

/* @vue/component */
export default mixins(
  Colorable,
  Routable,
  Toggleable,
  Themeable
).extend({
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
    inactive: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  },

  data: () => ({
    proxyClass: 'v-list__item--active'
  }),

  computed: {
    listClasses (): object | undefined {
      return this.disabled
        ? { 'v-list--disabled': true }
        : undefined
    },
    classes (): object {
      return {
        'v-list__item': true,
        'v-list__item--active': !this.to && this.isActive,
        'v-list__item--disabled': this.disabled,
        'v-list__item--link': this.isLink && !this.inactive,
        'v-list__item--three-line': this.threeLine,
        'v-list__item--two-line': this.twoLine,
        ...this.themeClasses,
        [this.activeClass]: this.isActive
      }
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
