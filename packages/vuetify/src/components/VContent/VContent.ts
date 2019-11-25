// Styles
import './VContent.sass'

// Mixins
import SSRBootable from '../../mixins/ssr-bootable'

// Types
import { VNode } from 'vue'
import { getVuetify } from '../../util/helpers'

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
      const fallback = {
        bar: 0, top: 0, right: 0, footer: 0, insetFooter: 0, bottom: 0, left: 0,
      }

      const {
        bar, top, right, footer, insetFooter, bottom, left,
      } = getVuetify(this, 'application', fallback)

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
