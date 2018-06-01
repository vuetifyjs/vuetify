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
    }
  },

  computed: {
    classes () {
      return {
        'v-textarea': true,
        'v-textarea--auto-grow': this.autoGrow,
        'v-textarea--no-resize': this.noResizeHandle,
        ...VTextField.computed.classes.call(this, null)
      }
    },
    dynamicHeight () {
      return this.autoGrow
        ? this.inputHeight
        : 'auto'
    },
    isEnclosed () {
      return this.textarea ||
        VTextField.computed.isEnclosed.call(this)
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
      this.$nextTick(() => {
        const height = this.$refs.marker ? this.$refs.marker.clientHeight : 0
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

      return [
        input,
        this.genMarker()
      ]
    },
    genMarker () {
      return this.$createElement('div', {
        staticClass: 'v-textarea__mask',
        domProps: { innerHTML: this.internalValue },
        ref: 'marker'
      })
    },
    onKeyDown (e) {
      // Prevents closing of a
      // dialog when pressing
      // enter
      if (this.isFocused &&
        e.keyCode === 13
      ) {
        e.stopPropagation()
      }

      this.internalChange = true
      this.$emit('keydown', e)
    }
  }
}
