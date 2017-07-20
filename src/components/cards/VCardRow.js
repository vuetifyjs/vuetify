export default {
  functional: true,

  props: {
    actions: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    img: String,
    stackedActions: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `card__row ${data.staticClass}` : 'card__row'
    data.style = data.style || {}
    data.style.height = props.height

    if (props.img) data.style.background = `url(${props.img}) center center / cover no-repeat`
    if (props.actions) {
      data.ref = 'actions'
      data.staticClass += ' card__row--actions'
    }

    return h('div', data, children)
  }
}
