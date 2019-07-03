// Styles
import './VContent.sass'

// Mixins
import SSRBootable from '../../mixins/ssr-bootable'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default SSRBootable.extend({
  name: 'v-content',

  props: {
    tag: {
      type: String,
      default: 'main',
    },
  },

  computed: {
    styles (): object {
      const {
        bar, top, right, footer, insetFooter, bottom, left,
      } = this.$vuetify.application

      return {
        paddingTop: `${top + bar}px`,
        paddingRight: `${right}px`,
        paddingBottom: `${footer + insetFooter + bottom}px`,
        paddingLeft: `${left}px`,
      }
    },
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-content',
      style: this.styles,
      ref: 'content',
    }

    return h(this.tag, data, [
      h(
        'div',
        { staticClass: 'v-content__wrap' },
        this.$slots.default
      ),
    ])
  },
})
