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

  render (h) {
    const data = {
      staticClass: 'content',
      style: this.styles
    }

    return h('div', data, this.$slots.default)
  }
}
