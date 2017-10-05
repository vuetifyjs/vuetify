import { getZIndex } from '../util/helpers'

export function factory (opts = { stackClass: 'unspecified' }) {
  return {
    computed: {
      activeZIndex () {
        const content = opts.content || this.$refs.content
        if (!this.isActive) {
          // Return current zindex if not active
          return getZIndex(content)
        }
        // Return max current z-index (excluding self) + 2 (2 to leave room for an overlay below, if needed)
        return this.getMaxZIndex((opts.exclude || (() => [content]))()) + 2
      }
    },
    methods: {
      getMaxZIndex (exclude = []) {
        const base = opts.base || this.$el
        // start with lowest allowed z-index or z-index of base component's element, whichever is greater
        const zis = [opts.minZIndex, getZIndex(base)]
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
