import { createSimpleFunctional } from '../../util/helpers'

const Col = {
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = data.staticClass ? `col ${data.staticClass}` : 'col'
    data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
    delete data.attrs

    return h('div', data, children)
  }
}

const Layout = {
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = data.staticClass ? `layout ${data.staticClass}` : 'layout'
    if (data.attrs) {
      data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
      delete data.attrs
    }

    return h('div', data, children)
  }
}

const Container = {
  functional: true,

  props: {
    fluid: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `container ${data.staticClass}` : 'container'

    if (props.fluid) data.staticClass += ' container--fluid'

    return h('div', data, children)
  }
}

const Main = {
  functional: true,

  props: {
    row: Boolean
  },

  render (h, { props, data, children }) {
    if (props.row) {
      data.staticClass = data.staticClass ? `row ${data.staticClass}` : 'row'
    }

    return h('main', data, children)
  }
}

const ColSpacer = createSimpleFunctional('col--spacer')
const Spacer = createSimpleFunctional('spacer')

export default {
  Col,
  ColSpacer,
  Container,
  Spacer,
  Layout,
  Main
}
