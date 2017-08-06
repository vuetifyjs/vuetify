export default {
  props: {
    contentClass: {
      default: ''
    },
    detachableRoot: {
      default: () =>
        (elem) => {
          for (let p = elem; p instanceof HTMLElement; p = p.parentNode) {
            if (p.hasAttribute('data-popup-context')) {
              return p
            }
          }
          return null
        }
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.tryToMoveContentToRoot(0)
    })
  },

  beforeDestroy () {
    if (!this.$refs.content) return

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
    } catch (e) {}
  },
  methods: {
    tryToMoveContentToRoot (numTried = 0) {
      if (this._isDestroyed) return

      const app = this.detachableRoot(this.$el)

      if (!app) {
        if (numTried >= 10) {
          return console.warn('Application is missing <v-app> component.')
        } else {
          window.setTimeout(() => this.tryToContentToRoot(numTried + 1), 100)
          return
        }
      }

      app.insertBefore(
        this.$refs.content,
        app.firstChild
      )
    }
  }
}
