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
import { ClassesObject, StylesObject } from './../../../types'
import { ColorString } from './../../mixins/colorable'
import { convertToUnit, convertToObject } from '../../util/helpers'

interface PaperClasses {
  color?: ColorString
  dark: boolean
  elevation: string | number
  light: boolean
}

interface PaperStyles {
  height: string | number | undefined
  maxHeight: string | number | undefined
  maxWidth: string | number | undefined
  width: string | number | undefined
}

export function addPaperClasses (props: PaperClasses): ClassesObject {
  return addBackgroundColorClassChecks({
    ...addTheme(props.light, props.dark),
    ...addElevation(props.elevation)
  }, props.color)
}

export function addPaperStyles (styles: PaperStyles): StylesObject {
  return {
    height: convertToUnit(styles.height),
    maxHeight: convertToUnit(styles.maxHeight),
    maxWidth: convertToUnit(styles.maxWidth),
    width: convertToUnit(styles.width)
  }
}

/* @vue/component */
export default mixins(Colorable, Elevatable, Themeable).extend({
  name: 'v-paper',

  functional: true,

  props: {
    // TODO: inherit these (same as v-icon)
    color: String,
    dark: Boolean,
    light: Boolean,
    elevation: [Number, String],

    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    width: [Number, String],
    tag: {
      type: String,
      default: 'div'
    }
  },

  render (h, { data, children, props }): VNode {
    data.staticClass = (`v-paper ${data.staticClass || ''}`).trim()

    const classes = convertToObject(data.class)
    const styles = convertToObject(data.style)

    data.class = {
      ...classes,
      ...addPaperClasses({
        color: props.color,
        dark: props.dark,
        elevation: props.elevation,
        light: props.light
      })
    }
    data.style = {
      ...styles,
      ...addPaperStyles({
        height: props.height,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth,
        width: props.width
      })
    }

    return h(props.tag, data, children)
  }
})
