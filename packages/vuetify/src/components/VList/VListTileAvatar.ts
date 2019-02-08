// Components
import VAvatar from '../VAvatar'

// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-list-tile-avatar',

  functional: true,

  props: {
    color: String,
    size: {
      type: [Number, String],
      default: 40
    },
    tile: Boolean
  },

  render (h, { data, children, props }): VNode {
    data.staticClass = (`v-list__tile__avatar ${data.staticClass || ''}`).trim()

    const avatar = h(VAvatar, {
      props: {
        color: props.color,
        size: props.size,
        tile: props.tile
      }
    }, [children])

    return h('div', data, [avatar])
  }
})
