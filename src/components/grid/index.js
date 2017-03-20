import {createSimpleFunctional} from '../../util/helpers'

const Col = {
  functional: true,

  render: (h, {data, children}) => {
    data.staticClass = data.staticClass ? `col ${data.staticClass}` : 'col'
    if (data.attrs) {
      data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
    } else {
      console.warn("you have to add static attributes of layout")
    }
    delete data.attrs

    return h('div', data, children)
  }
}

const Layout = {
  functional: true,

  render: (h, {data, children}) => {
    data.staticClass = data.staticClass ? `layout ${data.staticClass}` : 'layout'
    if (data.attrs) {
      data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
    } else {
      console.warn("you have to add static attributes of layout")
    }
    delete data.attrs

    return h('div', data, children)
  }
}

const Container = {
  functional: true,

  render (h, {data, children}) {
    let staticClass = data.staticClass ? `container ${data.staticClass}` : 'container'

    if (data.attrs && typeof data.attrs.fluid !== 'undefined') {
      staticClass += ' container--fluid'
      data.attrs.fluid = undefined
    }

    data.staticClass = staticClass

    return h('div', data, children)
  }
}

const Content = createSimpleFunctional('content')
const Row = createSimpleFunctional('row')
const Column = createSimpleFunctional('column')
const ColSpacer = createSimpleFunctional('col--spacer')
const Spacer = createSimpleFunctional('spacer')

export default {
  Col,
  ColSpacer,
  Container,
  Content,
  Spacer,
  Row,
  Layout
}
