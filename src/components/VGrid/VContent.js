// Styles
import '../../stylus/components/_content.styl'

// Mixins
import SSRBootable from '../../mixins/ssr-bootable'

/* @vue/component */
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
        bar, top, right, footer, insetFooter, bottom, left
      } = this.$vuetify.application

      return {
        paddingTop: `${top + bar}px`,
        paddingRight: `${right}px`,
        paddingBottom: `${footer + insetFooter + bottom}px`,
        paddingLeft: `${left}px`
      }
    }
  },

  render (h) {
    const data = {
      staticClass: 'v-content',
      style: this.styles,
      ref: 'content'
    }

    return h(this.tag, data, [
      h(
        'div',
        { staticClass: 'v-content__wrap' },
        this.$slots.default
      )
    ])
  }
}
