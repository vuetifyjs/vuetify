import { createSimpleFunctional } from '../../util/helpers'

const Grid = (name) => ({
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = (`${name} ${data.staticClass || ''}`).trim()

    if (data.attrs) {
      data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
      delete data.attrs
    }

    return h('div', data, children)
  }
})

const Container = Grid('container')
const Layout = Grid('layout')
const Flex = Grid('flex')

const Spacer = createSimpleFunctional('spacer')

export default {
  Flex,
  Container,
  Spacer,
  Layout
}
