import Vue from 'vue'
import mergeData from '../../util/mergeData'

const ALIGNMENT = ['start', 'end', 'center']

export default Vue.extend({
  name: 'v-row',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    dense: Boolean,
    noGutters: {
      type: Boolean,
      default: false
    },
    alignV: {
      type: String,
      default: null,
      validator: (str: any) => [...ALIGNMENT, 'baseline', 'stretch'].includes(str)
    },
    alignH: {
      type: String,
      default: null,
      validator: (str: any) => [...ALIGNMENT, 'between', 'around'].includes(str)
    },
    alignContent: {
      type: String,
      default: null,
      validator: (str: any) => [...ALIGNMENT, 'between', 'around', 'stretch'].includes(str)
    }
  },
  render (h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: props.dense ? 'form-row' : 'row',
        class: {
          'no-gutters': props.noGutters,
          [`align-items-${props.alignV}`]: props.alignV,
          [`justify-content-${props.alignH}`]: props.alignH,
          [`align-content-${props.alignContent}`]: props.alignContent
        }
      }),
      children
    )
  }
})
