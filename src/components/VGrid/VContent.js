// Styles
import '../../stylus/components/_content.styl'

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

    return h(this.tag, data, [
      h(
        'div',
        { staticClass: 'content--wrap' },
        this.$slots.default
      )
    ])
  }
}
