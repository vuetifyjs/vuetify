export default {
  methods: {
    getActivator () {
      if (this.activator) return this.activator
      return this.$refs.activator.children
        ? this.$refs.activator.children[0]
        : this.$refs.activator
    },
    activatorClickHandler (e) {
      if (this.disabled) return
      else if (this.openOnClick && !this.isActive) {
        this.isActive = true
        this.absoluteX = e.clientX
        this.absoluteY = e.clientY
      } else if (this.closeOnClick && this.isActive) this.isActive = false
    },
    mouseEnterHandler (e) {
      clearTimeout(this.focusedTimeout)

      if (this.disabled || this.hasJustFocused) return
      this.hasJustFocused = true
      this.isActive = true
    },
    mouseLeaveHandler (e) {
      clearTimeout(this.focusedTimeout)

      if (this.disabled ||
        this.$refs.content.contains(e.relatedTarget)
      ) return

      this.focusedTimeout = setTimeout(() => (this.isActive = false), 500)
    },
    addActivatorEvents (activator = null) {
      if (!activator) return
      activator.addEventListener('click', this.activatorClickHandler)
    },
    removeActivatorEvents (activator = null) {
      if (!activator) return
      activator.removeEventListener('click', this.activatorClickHandler)
    }
  }
}
