const Subheader = {
  functional: true,

  render (h, { data, children }) {
    let listClass = 'subheader'

    if (
      (data.props && 'inset' in data.props) ||
      (data.attrs && 'inset' in data.attrs)
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
