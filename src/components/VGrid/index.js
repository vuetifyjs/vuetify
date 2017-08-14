import {
  createSimpleFunctional
} from '../../util/helpers'

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

    if (props.id) {
      data.domProps = data.domProps || {}
      data.domProps.id = props.id
    }

    return h('div', data, children)
  }
})

// TODO: Do this another way?
import styles from '../../stylus/components/_grid.styl' // eslint-disable-line no-unused-vars

const VGrid = {}

VGrid.install = function install (Vue) {
  Vue.component('v-container', Grid('container'))
  Vue.component('v-flex', Grid('flex'))
  Vue.component('v-layout', Grid('layout'))
  Vue.component('v-spacer', createSimpleFunctional('spacer'))
}

export default VGrid
