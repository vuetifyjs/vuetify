// Styles
import './VMain.sass'

// Mixins
import SSRBootable from '../../mixins/ssr-bootable'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default SSRBootable.extend({
  name: 'v-main',

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
      staticClass: 'v-main',
      style: this.styles,
      ref: 'main',
    }

    return h(this.tag, data, [
      h(
        'div',
        { staticClass: 'v-main__wrap' },
        this.$slots.default
      ),
    ])
  },
})
