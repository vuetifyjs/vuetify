import { getZIndex } from '../util/helpers'

export function factory (opts = { minZIndex: 5, stackClass: 'unspecified' }) {
  return {
    computed: {
      activeZIndex () {
        if (!this.isActive) {
          // Return zero if we're not active
          return 0
        }
        // Return max current z-index (excluding self) + 2 (2 to leave room for an overlay below, if needed)
        return this.getMaxZIndex((opts.exclude || (() => [this.$refs.content]))()) + 2
      }
    },
    methods: {
      getMaxZIndex (exclude = []) {
        // start with lowest allowed z-index or z-index of parent, whichever is greater
        const zis = [opts.minZIndex, this.$el ? getZIndex(this.$el) : 0]
        // get z-index for all active dialogs
        const activeElements = document.getElementsByClassName(opts.stackClass)
        for (const activeElement of activeElements) {
          if (!exclude.includes(activeElement)) {
            zis.push(getZIndex(activeElement))
          }
        }
        return Math.max(...zis)
      }
    }
  }
}

const Stackable = factory()

export default Stackable
