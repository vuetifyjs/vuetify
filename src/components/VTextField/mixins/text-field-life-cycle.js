export default {
  mounted () {
    this.shouldAutoGrow && this.calculateInputHeight()
    this.autofocus && this.focus()
  },

  render () {
    return this.genInputGroup()
    // return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } })
  }
}
