import { createSimpleFunctional } from '../../util/helpers'

const Flex = {
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = (`flex ${data.staticClass || ''}`).trim()

    if (data.attrs) {
      data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
      delete data.attrs
    }

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
    fluid: Boolean,
    fillHeight: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `container ${data.staticClass}` : 'container'

    if (props.fluid) data.staticClass += ' container--fluid'
    if (props.fillHeight) data.staticClass += ' fill-height'

    return h('div', data, children)
  }
}

const Spacer = createSimpleFunctional('spacer')

export default {
  Flex,
  Container,
  Spacer,
  Layout
}
