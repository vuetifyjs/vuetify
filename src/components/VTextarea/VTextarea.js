// Styles
import '../../stylus/components/_textarea.styl'

// Extensions
import VTextField from '../VTextField/VTextField'

/* @vue/component */
export default {
  name: 'v-textarea',

  extends: VTextField,

  data: () => ({
    inputHeight: 0
  }),

  props: {
    autoGrow: Boolean,
    noResize: Boolean,
    outline: Boolean,
    rowHeight: {
      type: [Number, String],
      default: 24,
      validator: v => !isNaN(parseFloat(v))
    },
    rows: {
      type: [Number, String],
      default: 5,
      validator: v => !isNaN(parseInt(v, 10))
    },
    textarea: Boolean,
  },

  computed: {
    classes () {
      return {
        'v-textarea': true,
        'v-textarea--textarea': this.textarea,
        ...VTextField.computed.classes.call(this, null)
      }
    },
    dynamicHeight () {
      return this.autoGrow
        ? this.inputHeight
        : 'auto'
    },
    noResizeHandle () {
      return this.noResize || this.autoGrow
    }
  },

  watch: {
    lazyValue () {
      this.autoGrow && this.calculateInputHeight()
    }
  },

  mounted () {
    this.autoGrow && this.calculateInputHeight()
  },

  methods: {
    calculateInputHeight () {
      this.inputHeight = 0

      this.$nextTick(() => {
        const height = this.$refs.input ? this.$refs.input.scrollHeight : 0
        const minHeight = parseInt(this.rows, 10) * parseFloat(this.rowHeight)
        this.inputHeight = Math.max(minHeight, height)
      })
    },
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.tag = 'textarea'
      if (this.autoGrow) {
        input.data.style.height = this.inputHeight && `${this.inputHeight}px`
      }
      delete input.data.attrs.type
      input.data.attrs.rows = this.rows

      return input
    }
  }
}
