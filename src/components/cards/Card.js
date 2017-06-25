import Themeable from '~mixins/themeable'

export default {
  functional: true,

  mixins: [Themeable],

  props: {
    flat: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    img: String,
    hover: Boolean,
    raised: Boolean,
    tile: Boolean
  },

  render (h, { data, props, children, style }) {
    data.staticClass = data.staticClass ? `card ${data.staticClass}` : 'card'
    data.style = style || {}
    data.style.height = props.height

    if (props.horizontal) data.staticClass += ' card--horizontal'
    if (props.hover) data.staticClass += ' card--hover'
    if (props.raised) data.staticClass += ' card--raised'
    if (props.tile) data.staticClass += ' card--tile'
    if (props.flat) data.staticClass += ' card--flat'
    if (props.light) data.staticClass += ' theme--light'
    if (props.dark) data.staticClass += ' theme--dark'

    if (props.img) {
      data.style.background = `url(${props.img}) center center / cover no-repeat`
    }

    return h('div', data, children)
  }
}
