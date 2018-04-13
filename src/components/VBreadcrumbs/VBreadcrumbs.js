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
      const breadcrumbItemList = this.$slots.default.filter(
        elm => elm.componentOptions && elm.componentOptions.tag === 'v-breadcrumbs-item')
      const length = breadcrumbItemList.length

      for (let i = 0; i < length; i++) {
        const elm = breadcrumbItemList[i]
        children.push(elm)

        if (i === length - 1) continue

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
