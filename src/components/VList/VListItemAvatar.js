// Components
import VAvatar from '../VAvatar'

/* @vue/component */
export default VAvatar.extend({
  name: 'v-list-item-avatar',

  props: {
    left: Boolean,
    right: Boolean,
    size: {
      type: [Number, String],
      default: 40
    }
  },

  render (h, context) {
    const render = VAvatar.options.render.call(null, h, context)

    render.data.staticClass += ' v-list__item__avatar'
    if (context.props.right) {
      render.data.staticClass += ' v-list__item__avatar--right'
    }
    if (context.props.left) {
      render.data.staticClass += ' v-list__item__avatar--left'
    }

    return render
  }
})
