/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
export default {
  props: {
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 500
    }
  },

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
      clearTimeout(this.openTimeout)
      clearTimeout(this.closeTimeout)

      if (this.hasJustFocused) return

      this.openTimeout = setTimeout(() => {
        this.hasJustFocused = true
        this.isActive = true
      }, parseInt(this.openDelay, 10))
    },
    mouseLeaveHandler (e) {
      clearTimeout(this.openTimeout)
      clearTimeout(this.closeTimeout)

      if (this.$refs.content.contains(e.relatedTarget)) return

      // Prevent accidental re-activation
      this.closeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          this.isActive = false
          this.callDeactivate()
        })
      }, parseInt(this.closeDelay, 10))
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
