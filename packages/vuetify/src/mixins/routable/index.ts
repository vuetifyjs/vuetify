import Vue, { VNodeData, PropType } from 'vue'

// Directives
import Ripple, { RippleOptions } from '../../directives/ripple'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'

export default Vue.extend({
  name: 'routable',

  directives: {
    Ripple,
  },

  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    exactPath: Boolean,
    exactActiveClass: String,
    link: Boolean,
    href: [String, Object],
    to: [String, Object],
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
        this.$listeners.click ||
        this.$listeners['!click'] ||
        this.$attrs.tabindex
      )
    },
    isLink (): boolean {
      return this.to || this.href || this.link
    },
    styles: () => ({}),
  },

  watch: {
    $route: 'onRouteChange',
  },

  mounted () {
    this.onRouteChange()
  },

  methods: {
    generateRouteLink () {
      let exact = this.exact
      let tag

      const data: VNodeData = {
        attrs: {
          tabindex: 'tabindex' in this.$attrs ? this.$attrs.tabindex : undefined,
        },
        class: this.classes,
        style: this.styles,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.computedRipple,
        }],
        [this.to ? 'nativeOn' : 'on']: {
          ...this.$listeners,
          ...('click' in this ? { click: (this as any).click } : undefined), // #14447
        },
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
        Object.assign(data.props, {
          to: this.to,
          exact,
          exactPath: this.exactPath,
          activeClass,
          exactActiveClass,
          append: this.append,
          replace: this.replace,
        })
      } else {
        tag = (this.href && 'a') || this.tag || 'div'

        if (tag === 'a' && this.href) data.attrs!.href = this.href
      }

      if (this.target) data.attrs!.target = this.target

      return { tag, data }
    },
    onRouteChange () {
      if (!this.to || !this.$refs.link || !this.$route) return
      const activeClass = `${this.activeClass || ''} ${this.proxyClass || ''}`.trim()
      const exactActiveClass = `${this.exactActiveClass || ''} ${this.proxyClass || ''}`.trim() || activeClass

      const path = '_vnode.data.class.' + (this.exact ? exactActiveClass : activeClass)

      this.$nextTick(() => {
        /* istanbul ignore else */
        if (!getObjectValueByPath(this.$refs.link, path) === this.isActive) {
          this.toggle()
        }
      })
    },
    toggle () {
      this.isActive = !this.isActive
    },
  },
})
