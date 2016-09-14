import { createSimpleFunctional } from '../../util/helpers'

const Col = {
  functional: true,

  render: (h, {data, children}) => {
    if (data.staticClass) {
      data.staticClass += ' col '
    } else {
      data.staticClass = 'col '
    }
    data.staticClass += Object.keys(data.attrs).join(' ')
    delete data.attrs

    return h('div', data, children)
  }
}

const Container = createSimpleFunctional('container')
const Row = createSimpleFunctional('row')
const ColSpacer = createSimpleFunctional('col--spacer')

export {
  Col,
  ColSpacer,
  Container,
  Row
}