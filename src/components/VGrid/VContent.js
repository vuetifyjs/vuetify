// Styles
require('../../stylus/components/_content.styl')

// Mixins
import SSRBootable from '../../mixins/ssr-bootable'

export default {
  name: 'v-content',

  mixins: [SSRBootable],

  props: {
    tag: {
      type: String,
      default: 'main'
    }
  },

  computed: {
    classes () {
      return {
        'content--is-booted': this.isBooted
      }
    },
    styles () {
      const {
        bar, top, right, footer, bottom, left
      } = this.$vuetify.application

      return {
        paddingTop: `${top + bar}px`,
        paddingRight: `${right}px`,
        paddingBottom: `${footer + bottom}px`,
        paddingLeft: `${left}px`
      }
    }
  },

  render (h) {
    const data = {
      staticClass: 'content',
      'class': this.classes,
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
