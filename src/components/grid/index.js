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

const VContainer = Grid('container')
const VFlex = Grid('flex')
const VLayout = Grid('layout')
const VSpacer = createSimpleFunctional('spacer')

export default {
  VContainer,
  VFlex,
  VLayout,
  VSpacer
}
