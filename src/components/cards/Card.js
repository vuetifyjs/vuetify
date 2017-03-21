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
    context.data.style.height = context.props.height

    if (context.props.img) {
      context.data.style.background = `url(${context.props.img}) center center / cover no-repeat`
    }

    context.data.class = {
      'card': true,
      'card--horizontal': context.props.horizontal
    }

    return h('div', context.data, context.children)
  }
}
