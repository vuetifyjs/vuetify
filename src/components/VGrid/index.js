import {
  createSimpleFunctional
} from '../../util/helpers'

const Grid = (name) => ({
  name: `v-${name}`,

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

    if (props.id) {
      data.domProps = data.domProps || {}
      data.domProps.id = props.id
    }

    return h('div', data, children)
  }
})

// TODO: Do this another way?
import styles from '../../stylus/components/_grid.styl' // eslint-disable-line no-unused-vars

export const VContainer = Grid('container')
export const VFlex = Grid('flex')
export const VLayout = Grid('layout')
export const VSpacer = createSimpleFunctional('spacer')

const VGrid = {}

VGrid.install = function install (Vue) {
  Vue.component(VContainer.name, VContainer)
  Vue.component(VFlex.name, VFlex)
  Vue.component(VLayout.name, VLayout)
  Vue.component(VSpacer.name, VSpacer)
}

export default VGrid
