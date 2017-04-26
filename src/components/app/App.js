export default {
  functional: true,

  props: {
    column: Boolean,
    row: Boolean,
    dark: Boolean,
    toolbar: Boolean,
    sidebar: Boolean,
    footer: Boolean,
    id: {
      type: String,
      default: 'app'
    }
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `application ${data.staticClass} ` : 'application '

    const classes = {
      'application--dark': props.dark,
      'application--light': !props.dark,
      'application--toolbar': props.toolbar,
      'application--sidebar': props.sidebar,
      'application--footer': props.footer,
      'application--column': props.column,
      'application--row': props.row
    }

    data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ')

    data.attrs = { 'data-app': true }
    data.domProps = { id: props.id }

    return h('div', data, children)
  }
}
