import { createSimpleFunctional } from '../../util/helpers'

const Col = {
  functional: true,

  render: (h, context) => {
    context.data.class = context.data.class || []
    context.data.class.push('col')
    context.data.class.concat(Object.keys.data.attrs)

    return h('div', context.data, context.children)
  }
}

const Container = {
  functional: true,

  render (h, context) {
    context.data.class = context.data.class || []
    context.data.class.push('container')

    if (context.data.attrs) {
      'fluid' in context.data.attrs && context.data.class.push('container--fluid')
    }

    return h('div', context.data, context.children)
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
