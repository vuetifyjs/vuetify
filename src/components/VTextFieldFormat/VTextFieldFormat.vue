<script>
import Formatter from '../../mixins/formatter'
import VTextField from '../VTextField'

export default {
  extends: VTextField,
  name: 'v-text-field-format',
  mixins: [Formatter],
  inheritAttrs: false,

  props: {
    /*
     * Not defined:
     * - Use internal formatter.
     * - Partially derived from https://github.com/nosir/cleave.js (numeral, date, credit card)
     * - Modifiers: Formatter.props.options
     * 
     * Function:
     * - Takes rawText as argument: fn(rawText)
     * - Returns formated text, which will override the text field
     * - Ignore Formatter.props.options
     * 
     * Object:
     * - Must contain formatValue(rawText)
     * - Ignore Formatter.props.options
     */ 
    format: [Function, Object]
  },

  computed: {
    formatter () {
      const _formatter = this.format != null && this.format

      if (!_formatter) {
        return this.formatInput
      } else if (typeof _formatter === 'function') {
        return _formatter
      } else {
        return _formatter.formatValue == null ? () => {} : _formatter
      }
    },
    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        let formated

        if (typeof this.formatter === 'function') {
          formated = this.formatter(val)
        } else {
          formated = this.formatter.formatValue(val)
        }

        val = formated == null ? val : formated
        this.$refs.input.value = this.lazyValue = val
        this.$emit('input', val)
      }
    }
  }
}
</script>
