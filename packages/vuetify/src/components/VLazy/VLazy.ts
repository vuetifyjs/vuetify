// Mixins
import Toggleable from '../../mixins/toggleable'

// Directives
import intersect from '../../directives/intersect'

// Utilities
import mixins from '../../util/mixins'
import { convertToUnit, getSlot } from '../../util/helpers'

// Types
import { VNode } from 'vue'

export default mixins(Toggleable).extend({
  name: 'VLazy',

  directives: { intersect },

  props: {
    minHeight: [Number, String],
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: undefined,
        rootMargin: undefined,
        threshold: undefined,
      }),
    },
    transition: {
      type: String,
      default: 'fade-transition',
    },
  },

  computed: {
    styles (): object {
      return {
        minHeight: parseInt(this.minHeight) ? convertToUnit(this.minHeight) : this.minHeight,
      }
    },
  },

  methods: {
    genContent () {
      if (!this.isActive) return undefined

      const slot = getSlot(this)

      /* istanbul ignore if */
      if (!this.transition) return slot

      return this.$createElement('transition', {
        props: { name: this.transition },
      }, slot)
    },
    onObserve (entries: IntersectionObserverEntry[]) {
      if (this.isActive) return

      this.isActive = Boolean(entries.find(entry => entry.isIntersecting))
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-observe',
      attrs: this.$attrs,
      directives: [{
        name: 'intersect',
        value: {
          handler: this.onObserve,
          options: this.options,
        },
      }] as any,
      on: this.$listeners,
      style: this.styles,
    }, [this.genContent()])
  },
})
