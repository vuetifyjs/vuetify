export function createSimpleFunctional (c, el = 'div') {
  return {
    functional: true,

    render: (h, { data, children }) => {
      if (data.staticClass) {
        data.staticClass += ` ${c}`
      } else {
        data.staticClass = `${c}`
      }

      return h(el, data, children)
    }
  }
}