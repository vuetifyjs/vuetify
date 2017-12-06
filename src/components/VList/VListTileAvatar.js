// Components
import VAvatar from '../VAvatar'

export default {
  functional: true,

  name: 'v-list-tile-avatar',

  props: {
    color: String,
    size: {
      type: [Number, String],
      default: 40
    }
  },

  render (h, { data, children, props }) {
    data.staticClass = (`list__tile__avatar ${data.staticClass || ''}`).trim()

    const avatar = h(VAvatar, {
      props: {
        color: props.color,
        size: props.size
      }
    }, [children])

    return h('div', data, [avatar])
  }
}
