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

  render (h, { data, children }) {
    let staticClass = data.staticClass ? `container ${data.staticClass}` : 'container'

    if (data.attrs && typeof data.attrs.fluid !== 'undefined') {
      staticClass += ' container--fluid'
      data.attrs.fluid = undefined
    }

    data.staticClass = staticClass

    return h('div', data, children)
  }
}

const Content = {
  functional: true,

  render (h, { data, children }) {
    let staticClass = data.staticClass ? `content ${data.staticClass}` : 'content'

    if (data.attrs && typeof data.attrs.disableScroll !== 'undefined') {
      staticClass += ' no-scroll-y'
      data.attrs.disableScroll = undefined
    }

    data.staticClass = staticClass

    return h('div', data, children)
  }
}

const ColSpacer = createSimpleFunctional('col--spacer')
const Spacer = createSimpleFunctional('spacer')

export default {
  Col,
  ColSpacer,
  Container,
  Content,
  Spacer,
  Layout
}
