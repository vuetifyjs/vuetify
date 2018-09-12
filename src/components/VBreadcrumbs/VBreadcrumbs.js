import '../../stylus/components/_breadcrumbs.styl'
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-breadcrumbs',

  mixins: [Themeable],

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
        'v-breadcrumbs--large': this.large,
        ...this.themeClasses
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

      const h = this.$createElement
      const children = []
      const dividerData = { staticClass: 'v-breadcrumbs__divider' }

      let createDividers = false
      for (let i = 0; i < this.$slots.default.length; i++) {
        const elm = this.$slots.default[i]

        if (
          !elm.componentOptions ||
          elm.componentOptions.Ctor.options.name !== 'v-breadcrumbs-item'
        ) {
          children.push(elm)
        } else {
          if (createDividers) {
            children.push(h('li', dividerData, this.computedDivider))
          }
          children.push(elm)
          createDividers = true
        }
      }

      return children
    }
  },

  render (h) {
    return h('ul', {
      staticClass: 'v-breadcrumbs',
      'class': this.classes,
      style: this.styles
    }, this.genChildren())
  }
}
