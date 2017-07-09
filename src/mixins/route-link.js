export default {
  props: {
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    router: Boolean,
    ripple: Boolean,
    tag: String,
    target: String,
    download: String
  },

  methods: {
    click () {},
    generateRouteLink () {
      let exact = this.exact
      let tag
      const options = this.to || this.href

      const data = {
        attrs: { disabled: this.disabled },
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple || false
        }]
      }

      if (!this.exact) {
        exact = this.href === '/' ||
          this.to === '/' ||
          (this.href === Object(this.href) && this.href.path === '/') ||
          (this.to === Object(this.to) && this.to.path === '/')
      }

      if (this.to) {
        this.router && console.warn('The <router> prop is deprecated, use <to> for router-links (with <nuxt> if applicable) and <href> for regular links.')

        tag = this.nuxt ? 'nuxt-link' : 'router-link'
        data.props.to = options
        data.props.exact = exact
        data.props.activeClass = this.activeClass
        data.props.append = this.append
        data.props.replace = this.replace
        data.nativeOn = { click: this.click }
        data.attrs.tag = this.tag
      } else {
        tag = this.href && 'a' || this.tag || 'a'

        if (tag === 'a') {
          data.attrs.href = this.href || 'javascript:;'
          if (this.target) data.attrs.target = this.target

          data.attrs.download = this.download
        }

        data.on = { click: this.click }
      }

      return { tag, data }
    }
  }
}
