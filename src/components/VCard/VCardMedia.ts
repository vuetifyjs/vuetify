// Helpers
import { convertToUnit } from '../../util/helpers'

// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-card-media',

  props: {
    contain: Boolean,
    height: {
      type: [Number, String],
      default: 'auto'
    },
    src: {
      type: String
    }
  },

  render (h): VNode {
    const data = {
      'class': 'v-card__media',
      style: {
        height: convertToUnit(this.height)
      },
      on: this.$listeners
    }

    const children = []

    if (this.src) {
      children.push(h('div', {
        'class': 'v-card__media__background',
        style: {
          background: `url("${this.src}") center center / ${this.contain ? 'contain' : 'cover'} no-repeat`
        }
      }))
    }

    children.push(h('div', {
      'class': 'v-card__media__content'
    }, this.$slots.default))

    return h('div', data, children)
  }
})
