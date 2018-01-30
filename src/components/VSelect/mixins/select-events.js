/**
 * Select events
 *
 * @mixin
 *
 * Event based methods for
 * the v-select component
 */
export default {
  methods: {
    blur () {
      this.deactivateInput()
      this.menuIsActive = false
      this.$emit('blur')
    },
    focus () {
      this.showMenu()

      this.$emit('focus')
    },
    focusInput () {
      if (this.$refs.input && this.isAutocomplete) {
        this.$refs.input.focus()

        this.$nextTick(() => {
          this.$refs.input.select()
          this.shouldBreak && (
            this.$refs.input.scrollLeft = this.$refs.input.scrollWidth
          )
        })
      } else {
        !this.isFocused && this.$el.focus()
      }
    },
    genListeners () {
      const listeners = Object.assign({}, this.$listeners)
      delete listeners.input

      return {
        ...listeners,
        click: () => {
          if (this.disabled || this.readonly) return

          if (this.isFocused && !this.menuIsVisible) {
            return this.showMenuItems()
          }

          this.selectedIndex > -1
            ? (this.selectedIndex = -1)
            : this.focus()
        },
        focus: e => {
          if (this.disabled || this.readonly || this.isFocused) {
            return
          }

          this.activateInput()
          this.$nextTick(this.focusInput)
        },
        keydown: this.onKeyDown // Located in mixins/select-autocomplete.js
      }
    }
  }
}
