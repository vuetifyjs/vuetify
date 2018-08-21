import Vue from 'vue'
import { PropValidator } from 'vue/types/options'

export type NumberOrNumberString = PropValidator<string | number | undefined>

export default Vue.extend({
  name: 'measurable',

  props: {
    height: [Number, String] as NumberOrNumberString,
    maxHeight: [Number, String] as NumberOrNumberString,
    maxWidth: [Number, String] as NumberOrNumberString,
    width: [Number, String] as NumberOrNumberString
  }
})
