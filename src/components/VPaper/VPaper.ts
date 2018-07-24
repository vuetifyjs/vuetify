// Styles
import '../../stylus/components/_paper.styl'

// Mixins
import Colorable, { addBackgroundColorClassChecks } from '../../mixins/colorable'
import Elevatable, { addElevation } from '../../mixins/elevatable'
import Themeable, { addTheme } from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
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

/* @vue/component */
export default mixins(Colorable, Elevatable, Themeable).extend({
  name: 'v-paper',

  functional: true,

  props: {
    // TODO: inherit these (same as v-card)
    color: String,
    dark: Boolean,
    light: Boolean,
    elevation: [Number, String],

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
