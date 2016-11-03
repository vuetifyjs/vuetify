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

// const Container = {
//   functional: true,

//   render (h, { data, children }) {
//     let staticClass = ''

//     if (data.staticClass) {
//       staticClass = data.staticClass
//     }
//   }
// }

const Container = createSimpleFunctional('container')
const Row = createSimpleFunctional('row')
const ColSpacer = createSimpleFunctional('col--spacer')

export default {
  Col,
  ColSpacer,
  Container,
  Row
}