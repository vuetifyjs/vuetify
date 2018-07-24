// Styles
import '../../stylus/components/_paper.styl'

// Mixins
import Colorable, { addBackgroundColorClassChecks } from '../../mixins/colorable'
import Elevatable, { addElevation } from '../../mixins/elevatable'
import Themeable, { addTheme } from '../../mixins/themeable'

// Types
import Vue, { VNode } from 'vue'
import { ClassesObject } from './../../../types'

export function addPaperClasses (props: any): ClassesObject {
  return addBackgroundColorClassChecks({
    ...addTheme(props.light, props.dark),
    ...addElevation(props.elevation)
  }, props.color)
}

export default Vue.extend({
  name: 'v-paper',

  functional: true,

  props: {
    ...Colorable.options.props,
    ...Elevatable.options.props,
    ...Themeable.options.props,
    elevation: {
      type: [Number, String],
      default: 0
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  render (h, { data, children, props }): VNode {
    data.staticClass = (`v-paper ${data.staticClass || ''}`).trim()
    data.class = addPaperClasses(props)

    return h(props.tag, data, children)
  }
})
