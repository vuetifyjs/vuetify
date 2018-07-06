import Vue, { VNode } from 'vue'
import { toggleable } from './toggleable'

/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
/* @vue/component */
export default Vue.extend<toggleable>().extend({
  name: 'bootable',

  props: {
    lazy: Boolean,
    keepContentAlive: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    isBooted: false
  }),

  computed: {
    hasContent (): boolean {
      if (!this.keepContentAlive) return this.isActive
      return this.isBooted || !this.lazy || this.isActive
    }
  },

  watch: {
    isActive () {
      this.isBooted = true
    }
  },

  methods: {
    showLazyContent (content: VNode[]): VNode[] | null {
      return this.hasContent ? content : null
    }
  }
})
