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
    context.data.staticClass = context.data.staticClass ? `card ${context.data.staticClass}` : 'card'
    context.data.style = context.style || {}
    context.data.style.height = context.props.height
    if (context.props.horizontal) {
      context.data.staticClass += ' card--horizontal'
    }

    if (context.props.img) {
      context.data.style.background = `url(${context.props.img}) center center / cover no-repeat`
    }

    return h('div', context.data, context.children)
  }
}
