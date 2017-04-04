export default {
  props: {
    append: Boolean,
    disabled: Boolean,
    exact: {
      type: Boolean,
      default () {
        return this.href === '/'
      }
    },
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: Boolean,
    router: Boolean,
    tag: String
  },

  methods: {
    click () {},
    generateRouteLink () {
      let tag
      const options = this.to || this.href

      const data = {
        attrs: {},
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple || false
        }]
      }

      if (options && this.router) {
        tag = this.nuxt ? 'nuxt-link' : 'router-link'
        data.props.to = options
        data.props.exact = this.exact
        data.props.activeClass = this.activeClass
        data.props.append = this.append
        data.props.replace = this.replace
        data.nativeOn = { click: this.click }
      } else {
        tag = this.tag || 'a'

        if (tag === 'a') {
          data.attrs.href = options || 'javascript:;'
        }

        data.on = { click: this.click }
      }

      return { tag, data }
    }
  }
}
