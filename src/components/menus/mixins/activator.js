export default {
  methods: {
    getActivator () {
      if (this.activator) return this.activator
      return this.$refs.activator.children
        ? this.$refs.activator.children[0]
        : this.$refs.activator
    },
    activatorClickHandler (e) {
      e.stopPropagation()
      if (this.disabled) return
      else if (this.openOnClick && !this.isActive) this.isActive = true
      else if (this.closeOnClick && this.isActive) this.isActive = false
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
