import Vue from 'vue'
import mergeData from '../../util/mergeData'

export default Vue.extend({
  name: 'v-container',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    fluid: {
      type: Boolean,
      default: false,
    },
  },
  render (h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          container: !props.fluid,
          'container-fluid': props.fluid,
        },
      }),
      children
    )
  },
})
