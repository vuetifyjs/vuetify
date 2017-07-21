import {
  createSimpleFunctional
} from '~util/helpers'

const Grid = (name) => ({
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = (`${name} ${data.staticClass || ''}`).trim()


    Object.keys(data.attrs).forEach(attr => {
      const prop = data.attrs[attr]

      if (!prop) {
        data.staticClass += ` ${prop}`
        delete data.attrs[attr]
      }
    })

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
