export default {
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = data.staticClass || ''
    data.staticClass += ' container'

    return h('div', data, children)
  }
}