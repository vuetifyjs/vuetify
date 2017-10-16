import { getZIndex } from '../util/helpers'

export default {
  data () {
    return {
      stackBase: null,
      stackClass: 'unpecified',
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0
    }
  },
  computed: {
    activeZIndex () {
      const content = this.stackElement || this.$refs.content
      // Return current zindex if not active
      if (!this.isActive) return getZIndex(content)

      // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)
      return this.getMaxZIndex(this.stackExclude || [content]) + 2
    }
  },
  methods: {
    getMaxZIndex (exclude = []) {
      const base = this.stackBase || this.$el
      // Start with lowest allowed z-index or z-index of
      // base component's element, whichever is greater
      const zis = [this.stackMinZIndex, getZIndex(base)]
      // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      // https://github.com/vuetifyjs/vuetify/issues/2146
      const activeElements = [...document.getElementsByClassName(this.stackClass)]

      // Get z-index for all active dialogs
      for (const activeElement of activeElements) {
        if (!exclude.includes(activeElement)) {
          zis.push(getZIndex(activeElement))
        }
      }

      return Math.max(...zis)
    }
  }
}
