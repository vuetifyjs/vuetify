/**
 * Select menu methods
 *
 * @mixin
 *
 * Menu based methods for
 * the v-select component
 */
export default {
  methods: {
    activateInput () {
      this.isActive = true
      this.isFocused = true
    },
    deactivateInput () {
      this.isFocused = false
      this.isActive = false
      this.selectedIndex = -1
    },
    hideMenu () {
      this.menuIsActive = false
    },
    showMenu () {
      this.activateInput()
      this.showMenuItems()
      this.isMultiple && this.resetMenuIndex()
    },
    showMenuItems () {
      this.menuIsActive = true
    },
    toggleMenu () {
      if (this.disabled || this.readonly || this.menuIsVisible) return this.hideMenu()

      this.showMenu()
      this.focusInput()
    }
  }
}
