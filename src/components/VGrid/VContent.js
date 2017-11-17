require('../../stylus/components/_content.styl')

export default {
  name: 'v-content',

  props: {
    tag: {
      type: String,
      default: 'main'
    }
  },

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
      style: this.styles,
      ref: 'content'
    }

    return h('div', {
      staticClass: 'content--wrap'
    }, [
      h(this.tag, data, this.$slots.default)
    ])
  }
}
