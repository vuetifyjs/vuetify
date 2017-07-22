import {
  createSimpleFunctional
} from '~util/helpers'

const Grid = (name) => ({
  functional: true,

  props: {
    id: String
  },

  render: (h, { props, data, children }) => {
    data.staticClass = (`${name} ${data.staticClass || ''}`).trim()

    if (data.attrs) {
      data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
      delete data.attrs
    }
    data.domProps = data.domProps || {}
    data.domProps.id = props.id

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
