import { Prop, defineComponent, withDirectives, h, VNodeChild } from 'vue'

// Directives
import Ripple, { RippleOptions } from '../../directives/ripple'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'
import type { Location } from 'vue-router'

export default defineComponent({
  name: 'routable',

  // TODO
  // directives: {
  //   Ripple,
  // },

  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: {
      type: Boolean,
      default: undefined,
    } as Prop<boolean | undefined>,
    exactActiveClass: String,
    link: Boolean,
    href: String,
    to: [String, Object] as Prop<string | Location>,
    nuxt: Boolean,
    replace: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null,
    },
    tag: String,
    target: String,
  },

  data: () => ({
    isActive: false,
    proxyClass: '',
  }),

  computed: {
    classes (): object {
      const classes: Record<string, boolean> = {}

      if (this.to) return classes

      if (this.activeClass) classes[this.activeClass] = this.isActive
      if (this.proxyClass) classes[this.proxyClass] = this.isActive

      return classes
    },
    computedRipple (): RippleOptions | boolean {
      return this.ripple ?? (!this.disabled && this.isClickable)
    },
    isClickable (): boolean {
      if (this.disabled) return false

      return Boolean(
        this.isLink ||
        this.$attrs.onClick ||
        this.$attrs.onClickCapture ||
        this.$attrs.tabindex
      )
    },
    isLink (): boolean {
      return !!(this.to || this.href || this.link)
    },
    styles: (): object => ({}),
  },

  watch: {
    $route () {
      this.onRouteChange()
    },
  },

  methods: {
    click (e: MouseEvent): void {
      this.$emit('click', e)
    },
    generateRouteLink (children: VNodeChild) {
      let exact = this.exact
      let tag

      const data: Dictionary = {
        tabindex: 'tabindex' in this.$attrs ? this.$attrs.tabindex : undefined,
        class: this.classes,
        style: this.styles,
        onClick: this.click,
        ref: 'link',
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

        if (this.proxyClass) {
          activeClass = `${activeClass} ${this.proxyClass}`.trim()
          exactActiveClass = `${exactActiveClass} ${this.proxyClass}`.trim()
        }

        tag = this.nuxt ? 'nuxt-link' : 'router-link'
        Object.assign(data, {
          to: this.to,
          exact,
          activeClass,
          exactActiveClass,
          append: this.append,
          replace: this.replace,
        })
      } else {
        tag = (this.href && 'a') || this.tag || 'div'

        if (tag === 'a' && this.href) data.href = this.href
      }

      if (this.target) data.attrs!.target = this.target

      return withDirectives(h(tag, data, children), [
        [Ripple, this.computedRipple],
      ])
    },
    onRouteChange () {
      if (!this.to || !this.$refs.link || !this.$route) return
      const activeClass = `${this.activeClass} ${this.proxyClass || ''}`.trim()

      const path = `_vnode.data.class.${activeClass}`

      this.$nextTick(() => {
        /* istanbul ignore else */
        if (getObjectValueByPath(this.$refs.link, path)) {
          this.toggle()
        }
      })
    },
    toggle: () => { /* noop */ },
  },
})
