import VCell from './VCell'
import VCheckbox from '../VCheckbox'

export default {
  name: 'v-cell-checkbox',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  inheritAttrs: false,
  render (h) {
    const checkbox = h(VCheckbox, {
      props: {
        hideDetails: true,
        ...this.$attrs
      },
      on: this.$listeners
    })

    return h(VCell, {
      staticClass: 'v-cell-checkbox'
    }, [checkbox])
  }
}
