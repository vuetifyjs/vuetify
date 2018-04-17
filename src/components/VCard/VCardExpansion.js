import { VExpandTransition , VSlideYReverseTransition } from '../transitions'

export default {
  name: 'v-card-expansion',

  props: {
    show: {
      type: Boolean,
      default: false
    },
    cover: {
      type: Boolean,
      default: false
    }
  },

  render (h) {
    const children = []

    children.push(h('div', {
      'class': 'v-card__text'
    }, this.$slots.default))
    const staticClass = 'v-card__expansion ' + (this.cover ? 'v-card__expansion--cover' : 'v-card__expansion--dropdown')
    const expansionStyle = h('div', {
      'class': staticClass,
      directives: [
        {
          name: 'show',
          value: this.show
        }
      ]
    }, children)

    return h(this.cover ? VSlideYReverseTransition : VExpandTransition, [expansionStyle])
  }
}
