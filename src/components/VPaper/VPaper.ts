// Styles
import '../../stylus/components/_paper.styl'

// Mixins
import Colorable, { addBackgroundColorClassChecks } from '../../mixins/colorable'
import Elevatable, { addElevation } from '../../mixins/elevatable'
import Themeable, { addTheme } from '../../mixins/themeable'

// Types
import Vue, { VNode } from 'vue'
import { ClassesObject } from './../../../types'
import { ColorString } from './../../mixins/colorable'

interface PaperClasses {
  color?: ColorString
  dark: boolean
  elevation: string | number
  light: boolean
}

export function addPaperClasses (props: PaperClasses): ClassesObject {
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
    tag: {
      type: String,
      default: 'div'
    }
  },

  render (h, { data, children, props }): VNode {
    data.staticClass = (`v-paper ${data.staticClass || ''}`).trim()
    data.class = addPaperClasses({
      color: props.color,
      dark: props.dark,
      elevation: props.elevation,
      light: props.light
    })

    return h(props.tag, data, children)
  }
})
