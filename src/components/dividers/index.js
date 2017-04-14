const Divider = {
  functional: true,

  render (h, { data, children }) {
    data.staticClass = data.staticClass ? `divider ${data.staticClass}` : 'divider'

    if (data.attrs) {
      if ('inset' in data.attrs) data.staticClass += ' divider--inset'
      if ('light' in data.attrs) data.staticClass += ' divider--light'
    }

    return h('hr', data)
  }
}

export default {
  Divider
}
