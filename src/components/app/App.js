export default {
  functional: true,

  props: {
    fixedToolbar: Boolean,
    fixedFooter: Boolean,
    sidebarUnderToolbar: Boolean,
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
      'application--light': !props.dark,
      'application--fixed-toolbar': props.fixedToolbar && props.sidebarUnderToolbar,
      'application--fixed-footer': props.fixedFooter,
      'application--sidebar-under-toolbar': props.sidebarUnderToolbar
    }

    data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ')

    data.attrs = { 'data-app': true }
    data.domProps = { id: props.id }

    return h('div', data, children)
  }
}
