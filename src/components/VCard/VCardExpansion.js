import { VExpandTransition , VSlideYReverseTransition } from '../transitions'

import { consoleWarn } from '../../util/console'

export default {
  name: 'v-card-expansion',

  props: {
    cover: {
      type: Boolean,
      default: false
    }
  },

  render (h) {
    const children = []
    if (typeof this.$slots.default === 'undefined') consoleWarn('no text was provided', this)

    children.push(this.$slots.default)

    const staticClass = 'v-card__expansion ' + (this.cover ? 'v-card__expansion--cover' : 'v-card__expansion--dropdown')
    const expansionStyle = h('div', {
      'class': staticClass
    }, children)

    return h(this.cover ? VSlideYReverseTransition : VExpandTransition, [expansionStyle])
  }
}
