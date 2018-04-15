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
      const divider = this.$createElement('li', {
        staticClass: 'breadcrumbs__divider'
      }, this.computedDivider)

      let createDividers = false
      for (let i = 0; i < this.$slots.default.length; i++) {
        const elm = this.$slots.default[i]

        if (
          !elm.componentOptions ||
          elm.componentOptions.Ctor.options.name !== 'v-breadcrumbs-item'
        ) {
          children.push(elm)
        } else {
          if (createDividers) children.push(divider)
          children.push(elm)
          createDividers = true
        }
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
