import { createSimpleFunctional } from '../../util/helpers'

const Col = {
  functional: true,

  render: (h, {data, children}) => {
    data.staticClass = data.staticClass ? `col ${data.staticClass}` : 'col'
    data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
    delete data.attrs

    return h('div', data, children)
  }
}

const Container = {
  functional: true,

  render (h, { data, children }) {
    let staticClass = data.staticClass ? `container ${data.staticClass}` : 'container'

    if (data.attrs && data.attrs.fluid) {
      staticClass += ' container--fluid'
    }

    data.staticClass = staticClass

    return h('div', data, children)
  }
}

const Content = createSimpleFunctional('content')
const Row = createSimpleFunctional('row')
const ColSpacer = createSimpleFunctional('col--spacer')

export default {
  Col,
  ColSpacer,
  Container,
  Content,
  Row
}