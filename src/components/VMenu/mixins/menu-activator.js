/**
 * Menu activator
 * 
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
export default {
  methods: {
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

      // Prevent accidental re-activation
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
