export default {
  functional: true,

  props: {
    dark: Boolean,
    id: {
      type: String,
      default: 'app'
    }
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `application ${data.staticClass} ` : 'application '

    const classes = {
      'application--dark': props.dark,
      'application--light': !props.dark
    }

    data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ')

    data.attrs = { 'data-app': true }
    data.domProps = { id: props.id }

    return h('div', data, children)
  }
}
