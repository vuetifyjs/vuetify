import '../../stylus/components/_breadcrumbs.styl'

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

      for (let i = 0; i < length; i++) {
        const elm = this.$slots.default[i]
        children.push(elm)

        if (!elm.componentOptions ||
          elm.componentOptions.tag !== 'v-breadcrumbs-item' ||
          i === length - 1
        ) continue

        children.push(this.$createElement('li', dividerData, this.computedDivider))
      }

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
