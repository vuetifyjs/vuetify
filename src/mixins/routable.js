import Ripple from '../directives/ripple'

export default {
  directives: {
    Ripple
  },

  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: Boolean,
    tag: String,
    target: String
  },

  methods: {
    click () {},
    generateRouteLink () {
      let exact = this.exact
      let tag

      const data = {
        attrs: { disabled: this.disabled },
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple || false
        }],
        on: {
          ...(this.$listeners || {}),
          click: this.click
        }
      }

      if (typeof this.exact === 'undefined') {
        exact = this.to === '/' ||
          (this.to === Object(this.to) && this.to.path === '/')
      }

      if (this.to) {
        tag = this.nuxt ? 'nuxt-link' : 'router-link'
        data.props.to = this.to
        data.props.exact = exact
        data.props.activeClass = this.activeClass
        data.props.append = this.append
        data.props.replace = this.replace
      } else {
        tag = this.href && 'a' || this.tag || 'a'

        if (tag === 'a') {
          data.attrs.href = this.href || 'javascript:;'
          if (this.target) data.attrs.target = this.target
        }
      }

      return { tag, data }
    }
  }
}
