const SubHeader = {
  functional: true,

  render (h, { data, children }) {
    let listClass = 'sub-header'

    if (
      (data.props && data.props.inset) ||
      (data.attrs && data.attrs.inset)
    ) {
      listClass += ' sub-header--inset'
    }

    data.staticClass = data.staticClass ? `${listClass} ${data.staticClass}` : listClass

    return h('li', data, children)
  }
}

export default {
  SubHeader
}
