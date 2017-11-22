require('../../stylus/components/_breadcrumbs.styl')

export default {
  name: 'v-breadcrumbs',

  props: {
    divider: {
      type: String,
      default: '/'
    },
    large: Boolean,
    justifyCenter: Boolean,
    justifyEnd: Boolean
  },

  computed: {
    classes () {
      return {
        'breadcrumbs--large': this.large
      }
    },
    computedDivider () {
      return this.$slots.divider
        ? this.$slots.divider
        : this.divider
    },
    styles () {
      const justify = this.justifyCenter
        ? 'center'
        : this.justifyEnd
          ? 'flex-end'
          : 'flex-start'

      return {
        'justify-content': justify
      }
    }
  },

  methods: {
    /**
     * Add dividers between
     * v-breadcrumbs-item
     *
     * @return {array}
     */
    genChildren () {
      if (!this.$slots.default) return null

      const children = []
      const dividerData = { staticClass: 'breadcrumbs__divider' }
      const length = this.$slots.default.length

      this.$slots.default.forEach((elm, i) => {
        children.push(elm)

        if (!elm.componentOptions ||
          elm.componentOptions.tag !== 'v-breadcrumbs-item' ||
          i === length - 1
        ) return

        children.push(this.$createElement('li', Object.assign({ key: i }, dividerData), this.computedDivider))
      })

      return children
    }
  },

  render (h) {
    return h('ul', {
      staticClass: 'breadcrumbs',
      'class': this.classes,
      style: this.styles
    }, this.genChildren())
  }
}
