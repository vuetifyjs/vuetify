const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export default {
  computed: {
    classes () {
      return {
        'v-input--text': true,
        'v-input--text--prefix': this.prefix,
        'v-input--text--single-line': this.isSingle,
        'v-input--text--solo': this.solo,
        'v-input--text--box': (this.box || this.solo)
      }
      // const classes = {
      // ...this.genSoloClasses(),
      // 'input-group--multi-line': this.multiLine,
      // 'input-group--full-width': this.fullWidth,
      // 'input-group--no-resize': this.noResizeHandle,
      // 'input-group--textarea': this.textarea
      // }

      // if (this.hasError) {
      //   classes['error--text'] = true
      // } else {
      //   return this.addTextColorClassChecks(classes)
      // }

      // return classes
    },
    count () {
      let inputLength
      if (this.inputValue) inputLength = this.inputValue.toString().length
      else inputLength = 0

      return `${inputLength} / ${this.counterLength}`
    },
    counterLength () {
      const parsedLength = parseInt(this.counter, 10)
      return isNaN(parsedLength) ? 25 : parsedLength
    },
    inputValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        if (this.mask) {
          this.lazyValue = this.unmaskText(this.maskText(this.unmaskText(val)))
          this.setSelectionRange()
        } else {
          this.lazyValue = val
          this.$emit('input', this.lazyValue)
        }
      }
    },
    isDirty () {
      return (this.lazyValue != null &&
        this.lazyValue.toString().length > 0) ||
        this.badInput ||
        dirtyTypes.includes(this.type)
    },
    isSingle () {
      return this.solo || this.singleLine
    },
    isTextarea () {
      return this.multiLine || this.textarea
    },
    noResizeHandle () {
      return this.isTextarea && (this.noResize || this.shouldAutoGrow)
    },
    shouldAutoGrow () {
      return this.isTextarea && this.autoGrow
    }
  }
}
