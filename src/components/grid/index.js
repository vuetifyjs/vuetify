import { createSimpleFunctional } from '../../util/helpers'

const Col = {
  functional: true,

  props: {
    class: {
      type: String,
      default: ''
    }
  },

  render: (h, { data, children }) => {
    data.staticClass = data.staticClass ? `col ${data.staticClass}` : 'col'
    if (data.attrs) data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
    delete data.attrs

    return h('div', data, children)
  }
}

const Container = {
  functional: true,

  render (h, { data, children }) {
    data.staticClass = data.staticClass ? `container ${data.staticClass}` : 'container'
    if (data.attrs && 'fluid' in data.attrs) data.staticClass += ' container--fluid'
    delete data.attrs

    return h('div', data, children)
  }
}

const Content = createSimpleFunctional('content')
const Row = createSimpleFunctional('row')
const ColSpacer = createSimpleFunctional('col--spacer')
const Spacer = createSimpleFunctional('spacer')

export default {
  Col,
  ColSpacer,
  Container,
  Content,
  Spacer,
  Row
}
