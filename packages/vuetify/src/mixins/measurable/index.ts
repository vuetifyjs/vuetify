// Helpers
import { convertToUnit } from '../../util/helpers'

// Types
import Vue from 'vue'
import { PropValidator } from 'vue/types/options'

export type NumberOrNumberString = PropValidator<string | number | undefined>

export default Vue.extend({
  name: 'measurable',

  props: {
    height: [Number, String] as NumberOrNumberString,
    maxHeight: [Number, String] as NumberOrNumberString,
    maxWidth: [Number, String] as NumberOrNumberString,
    minHeight: [Number, String] as NumberOrNumberString,
    minWidth: [Number, String] as NumberOrNumberString,
    width: [Number, String] as NumberOrNumberString,
  },

  computed: {
    measurableStyles (): object {
      const styles: Record<string, string> = {}

      const height = convertToUnit(this.height)
      const minHeight = convertToUnit(this.minHeight)
      const minWidth = convertToUnit(this.minWidth)
      const maxHeight = convertToUnit(this.maxHeight)
      const maxWidth = convertToUnit(this.maxWidth)
      const width = convertToUnit(this.width)

      if (height) styles.height = height
      if (minHeight) styles.minHeight = minHeight
      if (minWidth) styles.minWidth = minWidth
      if (maxHeight) styles.maxHeight = maxHeight
      if (maxWidth) styles.maxWidth = maxWidth
      if (width) styles.width = width

      return styles
    },
  },
})
