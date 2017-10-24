require('../../stylus/components/_content.styl')

export default {
  name: 'v-content',

  computed: {
    styles () {
      const {
        bar, top, right, bottom, left
      } = this.$vuetify.application

      return {
        paddingTop: `${top + bar}px`,
        paddingRight: `${right}px`,
        paddingBottom: `${bottom}px`,
        paddingLeft: `${left}px`
      }
    }
  },

  mounted () {
    // TODO: Deprecate
    if (this.$el.parentElement.tagName === 'MAIN') {
      console.warn('v-content no longer needs to be wrapped in a <main> tag', this.$el.parentElement)
    }
  },

  render (h) {
    const data = {
      staticClass: 'content',
      style: this.styles
    }

    return h('main', data, this.$slots.default)
  }
}
