export default {
  functional: true,

  name: 'card',

  props: {
    height: {
      type: String,
      default: 'auto'
    },
    horizontal: Boolean,
    img: String
  },

  render (h, context) {
    context.data.style = context.style || {}
    context.data.class = context.data.class || []
    context.data.style.height = context.props.height
    context.data.class.push('card')
    context.props.horizontal && context.data.class.push('card--horizontal')

    if (context.props.img) {
      context.data.style.background = `url(${context.props.img}) center center / cover no-repeat`
    }

    return h('div', context.data, context.children)
  }
}
