import {
  createSimpleFunctional
} from '~util/helpers'

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
const Flex = Grid('flex')
const Layout = Grid('layout')
const Spacer = createSimpleFunctional('spacer')

export default {
  Container,
  Flex,
  Layout,
  Spacer
}
