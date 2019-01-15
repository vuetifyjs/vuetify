import Vue, { VNodeData } from 'vue'
import { PropValidator } from 'vue/types/options'

import Ripple, { RippleOptions } from '../directives/ripple'

export default Vue.extend({
  name: 'routable',

  directives: {
    Ripple
  },

  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: {
      type: Boolean,
      default: undefined
    } as PropValidator<boolean | undefined>,
    exactActiveClass: String,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: [Boolean, Object],
    tag: String,
    target: String
  },

  computed: {
    computedRipple (): RippleOptions | boolean {
      return (this.ripple && !this.disabled) ? this.ripple : false
    }
  },

  methods: {
    click (e: MouseEvent): void {
      this.$emit('click', e)
    },
    generateRouteLink (classes: any) {
      let exact = this.exact
      let tag

      const data: VNodeData = {
        attrs: { disabled: this.disabled },
        class: classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.computedRipple
        }],
        [this.to ? 'nativeOn' : 'on']: {
          ...this.$listeners,
          click: this.click
        }
      }

      if (typeof this.exact === 'undefined') {
        exact = this.to === '/' ||
          (this.to === Object(this.to) && this.to.path === '/')
      }

      if (this.to) {
        // Add a special activeClass hook
        // for component level styles
        let activeClass = this.activeClass
        let exactActiveClass = this.exactActiveClass || activeClass

        // TODO: apply only in VListTile
        if ((this as any).proxyClass) {
          activeClass += ' ' + (this as any).proxyClass
          exactActiveClass += ' ' + (this as any).proxyClass
        }

        tag = this.nuxt ? 'nuxt-link' : 'router-link'
        Object.assign(data.props, {
          to: this.to,
          exact,
          activeClass,
          exactActiveClass,
          append: this.append,
          replace: this.replace
        })
      } else {
        tag = (this.href && 'a') || this.tag || 'a'

        if (tag === 'a' && this.href) data.attrs!.href = this.href
      }

      if (this.target) data.attrs!.target = this.target

      return { tag, data }
    }
  }
})
