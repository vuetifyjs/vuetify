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
      if (!this.isActive) {
        // Return current zindex if not active

        return getZIndex(content)
      }
      // Return max current z-index (excluding self) + 2 (2 to leave room for an overlay below, if needed)

      return this.getMaxZIndex((this.stackExclude || (() => [content]))()) + 2
    }
  },
  methods: {
    getMaxZIndex (exclude = []) {
      const base = this.stackBase || this.$el
      // start with lowest allowed z-index or z-index of base component's element, whichever is greater
      const zis = [this.stackMinZIndex, getZIndex(base)]
      // get z-index for all active dialogs
      const activeElements = document.getElementsByClassName(this.stackClass)
      for (const activeElement of activeElements) {
        if (!exclude.includes(activeElement)) {
          zis.push(getZIndex(activeElement))
        }
      }

      return Math.max(...zis)
    }
  }
}
