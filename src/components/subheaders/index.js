const Subheader = {
  functional: true,

  render (h, { data, children }) {
    let listClass = 'subheader'

    if (
      (data.props && data.props.inset) ||
      (data.attrs && data.attrs.inset)
    ) {
      listClass += ' subheader--inset'
    }

    data.staticClass = data.staticClass ? `${listClass} ${data.staticClass}` : listClass

    return h('li', data, children)
  }
}

export default {
  Subheader
}
