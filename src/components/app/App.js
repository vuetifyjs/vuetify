export default {
  functional: true,

  props: {
    light: {
      type: Boolean,
      default: true
    },
    dark: Boolean,
    footer: Boolean,
    fixedFooter: Boolean,
    id: {
      type: String,
      default: 'app'
    },
    toolbar: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `application ${data.staticClass} ` : 'application '

    data.staticClass += `application--${props.dark ? 'dark' : 'light'}`
    props.footer && (data.staticClass += ' application--footer')
    props.fixedFooter && (data.staticClass += ' application--footer-fixed')
    props.toolbar && (data.staticClass += ' application--toolbar')

    data.attrs = { 'data-app': true }
    data.domProps = { id: props.id }

    return h('div', data, children)
  }
}
