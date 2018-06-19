import VCell from './VCell'
import VCheckbox from '../VCheckbox'

export default {
  name: 'v-cell-checkbox',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    inputValue: Boolean,
    head: Boolean
  },
  inheritAttrs: false,
  render (h) {
    const checkbox = h(VCheckbox, {
      props: {
        hideDetails: true,
        inputValue: this.inputValue,
        ...this.$attrs
      },
      on: {
        change: v => this.$emit('change', v)
      }
    })

    return h(VCell, {
      props: {
        head: this.head
      },
      staticClass: 'v-cell-checkbox'
    }, [checkbox])
  }
}
