export default {
  functional: true,

  name: 'card',

  props: {
    flat: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    horizontal: Boolean,
    img: String,
    hover: Boolean,
    raised: Boolean
  },

  render (h, { data, props, children, style }) {
    data.staticClass = data.staticClass ? `card ${data.staticClass}` : 'card'
    data.style = style || {}
    data.style.height = props.height

    if (props.horizontal) data.staticClass += ' card--horizontal'
    if (props.hover) data.staticClass += ' card--hover'
    if (props.raised) data.staticClass += ' card--raised'
    if (props.flat) data.staticClass += ' card--flat'

    if (props.img) {
      data.style.background = `url(${props.img}) center center / cover no-repeat`
    }

    return h('div', data, children)
  }
}
