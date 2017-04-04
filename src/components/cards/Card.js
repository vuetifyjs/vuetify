export default {
  functional: true,

  name: 'card',

  props: {
    height: {
      type: String,
      default: 'auto'
    },
    horizontal: Boolean,
    img: String,
    hover: Boolean,
    raised: Boolean,
  },

  render (h, context) {
    context.data.staticClass = context.data.staticClass ? `card ${context.data.staticClass}` : 'card'
    context.data.style = context.style || {}
    context.data.style.height = context.props.height
    context.data.class.push('card')
    context.props.horizontal && context.data.class.push('card--horizontal')
    context.props.hover && context.data.class.push('card--hover')
    context.props.raised && context.data.class.push('card--raised')

    if (context.props.img) {
      context.data.style.background = `url(${context.props.img}) center center / cover no-repeat`
    }

    return h('div', context.data, context.children)
  }
}
