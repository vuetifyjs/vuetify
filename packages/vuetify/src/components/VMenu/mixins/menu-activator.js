/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
/* @vue/component */
export default {
  methods: {
    mouseEnterHandler () {
      this.runDelay('open', () => {
        if (this.hasJustFocused) return

        this.hasJustFocused = true
        this.isActive = true
      })
    },
    mouseLeaveHandler (e) {
      // Prevent accidental re-activation
      this.runDelay('close', () => {
        if (this.$refs.content.contains(e.relatedTarget)) return

        requestAnimationFrame(() => {
          this.isActive = false
          this.callDeactivate()
        })
      })
    }
  }
}
